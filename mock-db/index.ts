import { createHash } from './util/createHash.ts';
import { existsSync, readFileSync, readdirSync, statSync } from 'fs';
import { resolve } from 'path';
import axios from 'axios';

type Data = Record<string, Array<Record<string, any>>>;

const queryDelay = 100;
const doQueryDelay = () => new Promise((resolve) => setTimeout(resolve, queryDelay));

function getFieldsOfItem(item: Record<string, any>, fields?: string[] | null) {
  if (!fields) return { ...item };
  const result: Record<string, any> = {};
  for (const field of fields) {
    result[field] = item[field];
  }
  return result;
}

function getRootDir() {
  if (import.meta.dirname.includes('nextjs-site')) {
    return resolve(process.cwd(), '../mock-db');
  }
  return import.meta.dirname;
}

export default class MockDB {
  private webhookUrl = '';
  private data: Data = {};

  private get serverPath() {
    return MockDB.getServerPath(this.serverHash);
  }

  private static getServerPath(serverHash: string) {
    return resolve(getRootDir(), 'servers', serverHash);
  }

  /**
   * This will load all data from files into memory
   */
  private constructor(private serverHash: string) {
    readdirSync(this.serverPath).forEach((table) => {
      const tablePath = resolve(this.serverPath, table);
      if (!statSync(tablePath).isDirectory()) return;

      this.data[table] = [];
      const files = readdirSync(tablePath).filter((file) => file.endsWith('.json'));
      for (const file of files) {
        try {
          const filecontent = readFileSync(resolve(tablePath, file), 'utf-8');
          this.data[table]?.push(JSON.parse(filecontent));
        } catch (e) {
          console.error('Unable to add', file, 'to table', table);
          console.error(e);
        }
      }
    });
  }

  public static async connect(hostname: string, username: string, password: string) {
    const serverHash = createHash(hostname);
    const serverPath = MockDB.getServerPath(serverHash);
    const authCheckPath = resolve(serverPath, 'authCheck.json');
    if (!existsSync(authCheckPath)) return new Error(`Cannot connect to ${hostname}`);

    const authJson = readFileSync(authCheckPath, 'utf-8');
    const authObj = JSON.parse(authJson);
    if (authObj.username !== username || authObj.passwordHash !== createHash(password)) {
      return new Error(`Cannot connect to ${hostname}`);
    }

    return new MockDB(serverHash);
  }

  public async getList(
    table: string,
    filter?: Record<string, any>,
    fields?: string[] | null,
    max?: number,
  ) {
    await doQueryDelay();
    let results = this.data[table];
    if (!results) return new Error('Table does not exist');

    // sort by date desc
    results.sort((a, b) => {
      if (!('date' in a) || !('date' in b)) return 0;
      return b.date.localeCompare(a.date);
    });

    // filter items
    for (const [key, value] of Object.entries(filter ?? {})) {
      results = results?.filter((item) => item[key] === value);
    }

    // filter fields
    results = results.map((item) => getFieldsOfItem(item, fields));

    // limit items
    if (max) results = results.slice(0, max);

    return results;
  }

  public async getItem(table: string, id: string, fields?: string[] | null) {
    await doQueryDelay();
    let results = this.data[table];
    if (!results) return new Error('Table does not exist');

    const result = results.find((item) => item.id === id);
    if (!result) return new Error(`Item with id '${id}' not found in table '${table}'`);

    return getFieldsOfItem(result, fields);
  }

  public async addItem(table: string, value: Record<string, any>) {
    await doQueryDelay();
    if (!(table in this.data)) return new Error('Table does not exist');

    const fullValue = {
      ...value,
      id: value.id ?? Math.floor(Math.random() * Number.MAX_SAFE_INTEGER).toString(36),
    };

    this.data[table]?.push(fullValue);

    if (this.webhookUrl) {
      axios.post(this.webhookUrl, { type: 'add', table, id: fullValue.id });
    }
  }

  public async updateItem(table: string, value: Record<string, any>) {
    await doQueryDelay();

    let results = this.data[table];
    if (!results) return new Error('Table does not exist');

    if (!('id' in value)) return new Error('Cannot update value without id');

    const resultIndex = results.findIndex((item) => item.id === value.id);
    if (resultIndex === -1)
      return new Error(`Item with id '${value.id}' not found in table '${table}'`);

    results.splice(resultIndex, 1, value);

    if (this.webhookUrl) {
      axios.post(this.webhookUrl, { type: 'update', table, id: value.id });
    }
  }

  public async deleteItem(table: string, id: string) {
    await doQueryDelay();

    let results = this.data[table];
    if (!results) return new Error('Table does not exist');

    const resultIndex = results.findIndex((item) => item.id === id);
    if (resultIndex === -1) return new Error(`Item with id '${id}' not found in table '${table}'`);

    results.splice(resultIndex, 1);

    if (this.webhookUrl) {
      axios.post(this.webhookUrl, { type: 'delete', table, id });
    }
  }

  public setWebhookUrl(url: string) {
    this.webhookUrl = url;
  }
}

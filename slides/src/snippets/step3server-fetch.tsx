// @ts-nocheck

import { Item, type TItem } from '../components/item';

export default async function ServerComponent() {
  const items = await fetch('http://some-api/items').then((response): TItem[] => response.json());

  return (
    <ul className="item-list">
      {items.map((item) => (
        <Item data={item} />
      ))}
    </ul>
  );
}

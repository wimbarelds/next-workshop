export default function authCheck(username: string, passwordHash: string) {
  return username === 'admin' && passwordHash === '-1364457326';
}

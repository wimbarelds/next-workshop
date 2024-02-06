// @ts-nocheck

import { useState, useEffect } from 'react';
import { Item, type TItem } from '../components/item';

export default function ClientComponent() {
  const [items, setItems] = useState<TItem[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

    fetch('http://some-api/items')
      .then((response) => response.json())
      .then((data: TItem[]) => setItems(data))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <Spinner />;
  }

  return (
    <ul className="item-list">
      {items.map((item) => (
        <Item data={item} />
      ))}
    </ul>
  );
}

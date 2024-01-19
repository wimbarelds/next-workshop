import { useState, useEffect } from 'react';
import { PenTile } from '../../components/pen-tile';
import { PenPost } from 'types';

export function PenOverview() {
  const [pens, setPens] = useState<PenPost[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

    fetch('http://localhost:1234/pens/posts')
      .then((response) => response.json())
      .then((data: PenPost[]) => setPens(data))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="container mx-auto px-4">
      <div className="overflow-hidden">
        <h1 className="text-2xl font-bold mb-4">Welcome to PenTastic</h1>
        <p className="mb-8">
          News and rants below. Please note all content on this website is AI generated purely for
          demo purposes.
        </p>
      </div>
      {loading ? (
        <>Loading...</>
      ) : (
        <div className="grid grid-cols-1 xl:grid-cols-4 gap-4">
          {pens.map((pen) => (
            <PenTile key={pen.id} pen={pen} />
          ))}
        </div>
      )}
    </div>
  );
}

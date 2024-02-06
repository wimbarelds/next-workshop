import { getPosts } from '@/actions/db-actions';
import { PenTile } from '@/components/PenTile';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: `Pentastic! - Pens overview`,
};

export default async function Page() {
  const pens = await getPosts('pen');

  return (
    <div className="container mx-auto px-4">
      <div className="overflow-hidden">
        <h1 className="text-2xl font-bold mb-4">Welcome to PenTastic</h1>
        <p className="mb-8">
          News and rants below. Please note all content on this website is AI generated purely for
          demo purposes.
        </p>
      </div>
      <div className="grid grid-cols-1 xl:grid-cols-4 gap-4">
        {pens.map((pen) => (
          <PenTile key={pen.id} pen={pen} />
        ))}
      </div>
    </div>
  );
}

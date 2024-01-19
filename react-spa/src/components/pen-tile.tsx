import { Link } from 'react-router-dom';
import { PenPost } from 'types';

export function PenTile({ pen }: { pen: PenPost }) {
  return (
    <Link
      to={`/pens/${pen.id}`}
      key={pen.id}
      className="flex flex-col p-2 bg-gray-950 transition-transform hover:scale-105 rounded-lg overflow-hidden relative isolate group"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900 to-purple-700 -z-10 opacity-0 group-hover:opacity-100 transition-opacity" />
      <div className="w-full aspect-video overflow-hidden">
        <img
          src={`https://codepen.io/wimbarelds/pen/${pen.id}/image/small.png`}
          className="w-full object-cover rounded-md"
          alt=""
        />
      </div>
      <div className="flex-1 p-2 flex flex-col">
        <div className="flex-1">
          <h2 className="text-lg font-semibold">{pen.title}</h2>
          <p className="text-gray-200">{pen.shortDescription}</p>
        </div>
        <div className="flex flex-wrap gap-2 mt-2">
          {pen.tags.map((tag) => (
            <span
              key={tag}
              className="bg-blue-200 text-blue-800 text-sm font-semibold px-2 py-1 rounded"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
}

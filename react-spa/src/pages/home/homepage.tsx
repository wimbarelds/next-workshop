import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { BlogPost, PenPost } from 'types';
import { PenTile } from '../../components/pen-tile';

function getDate(post: BlogPost) {
  const date = post && new Date(Date.parse(post.date));
  return new Intl.DateTimeFormat(navigator.language, { dateStyle: 'long' }).format(date);
}

const ads = [
  { text: 'Cheap FDM 2D printers', img: 'ad-2d-fdm-printer.png' },
  { text: 'Where to buy second hand arc reactors', img: 'ad-2ndhand-arc-reactor.png' },
  { text: 'Marketplace for second hand T-Rex arms', img: 'ad-2ndhand-trex-arms.png' },
  { text: 'High quality cat jewelry', img: 'ad-cat-jewelry.png' },
  { text: 'Best disposable helicopters?', img: 'ad-disposable-helicopter.png' },
];

export function HomePage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [pen, setPen] = useState<PenPost | null>(null);
  const [loading, setLoading] = useState(false);
  const adRef = useRef(ads[Math.floor(Math.random() * ads.length)]);

  useEffect(() => {
    setLoading(true);

    Promise.all([
      fetch('http://localhost:1234/blog/posts').then((response) => response.json()),
      fetch('http://localhost:1234/pens/posts').then((response) => response.json()),
    ])

      .then(([blogposts, penposts]: [BlogPost[], PenPost[]]) => {
        setPosts(blogposts);
        setPen(penposts[Math.floor(Math.random() * penposts.length)]);
      })
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
        <div className="flex gap-8">
          <div className="flex flex-col gap-4 flex-1">
            {posts.map((post) => (
              <Link
                to={`/blog/${post.id}`}
                key={post.id}
                className="flex flex-col p-2 bg-gray-950 rounded-lg overflow-hidden relative isolate group"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-blue-900 to-purple-700 -z-10 opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="flex-1 p-2 flex flex-col">
                  <div className="flex-1">
                    <h2 className="text-lg font-semibold">{post.title}</h2>
                    <p className="text-gray-200">{post.shortDescription}</p>
                  </div>
                  <div className="flex mt-2 gap-4 justify-between items-end">
                    <div className="flex flex-wrap gap-2 mt-2">
                      {post.tags.map((tag) => (
                        <span
                          key={tag}
                          className="bg-blue-200 text-blue-800 text-sm font-semibold px-2 py-1 rounded"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <div className="text-gray-400 group-hover:text-gray-200">{getDate(post)}</div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          <div className="w-[300px] flex flex-col gap-8">
            <a
              href={`https://www.google.com/search?q=${encodeURIComponent(adRef.current.text)}`}
              target="_blank"
              className="relative overflow-hidden group block transition-all hover:outline outline-2 outline-yellow-400"
            >
              <span className="absolute bg-yellow-400 text-white font-bold rounded-br-lg px-3 transition-transform group-hover:-translate-x-full">
                Ad
              </span>
              <img src={`/ads/${adRef.current.img}`} alt={adRef.current.text} className="w-full" />
            </a>
            {pen && <PenTile pen={pen} key={pen.id} />}
          </div>
        </div>
      )}
    </div>
  );
}

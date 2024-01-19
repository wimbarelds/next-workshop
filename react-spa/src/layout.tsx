import { ReactNode } from 'react';
import { Link } from 'react-router-dom';

export function Layout({ children }: { children: ReactNode}) {
  return (
    <div className="flex flex-col min-h-screen mw bg-gray-900">
      <header>
        <img src="/banner.jpg" alt="" className='w-full max-h-[30vh] object-cover' />
        <nav className="container flex justify-evenly bg-purple-700">
          <Link to="/" className="text-lg text-center p-4 flex-1 font-bold hover:text-yellow-300">Home</Link>
          <Link to="/pens" className="text-lg text-center p-4 flex-1 font-bold hover:text-yellow-300">Pens</Link>
          <Link to="/wiki" className="text-lg text-center p-4 flex-1 font-bold hover:text-yellow-300">Wiki</Link>
          <Link to="/contact" className="text-lg text-center p-4 flex-1 font-bold hover:text-yellow-300">Contact</Link>
        </nav>
      </header>

      <main className="container mx-auto flex-1 p-4">
        {children}
      </main>

      <footer className="bg-purple-700 p-4 text-center">
        <p>© 2024 Pentastic. All rights reserved.</p>
      </footer>
    </div>
  );
}
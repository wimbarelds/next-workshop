import Link from 'next/link';

export function Navigation() {
  return (
    <nav className="container flex justify-evenly bg-purple-700">
      <Link href="/" className="text-lg text-center p-4 flex-1 font-bold hover:text-yellow-300">
        Home
      </Link>
      <Link href="/pens" className="text-lg text-center p-4 flex-1 font-bold hover:text-yellow-300">
        Pens
      </Link>
      <Link href="/wiki" className="text-lg text-center p-4 flex-1 font-bold hover:text-yellow-300">
        Wiki
      </Link>
      <Link
        href="/contact"
        className="text-lg text-center p-4 flex-1 font-bold hover:text-yellow-300"
      >
        Contact
      </Link>
    </nav>
  );
}

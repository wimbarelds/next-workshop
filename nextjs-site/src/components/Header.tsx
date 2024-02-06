import { Navigation } from './Navigation';

export function Header() {
  return (
    <header>
      <img src="/banner.jpg" alt="" className="w-full max-h-[30vh] object-cover" />
      <Navigation />
    </header>
  );
}

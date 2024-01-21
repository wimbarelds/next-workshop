import { useCallback, useEffect, useState } from 'react'
import { Slide1 } from './slides/1';
import { Slide2 } from './slides/2';
import { Slide3 } from './slides/3';
import { Slide4 } from './slides/4';
import { Slide5 } from './slides/5';

const slides = [Slide1, Slide2, Slide3, Slide4, Slide5];

function App() {
  const [slide, setSlide] = useState(0);

  const nextSlide = useCallback(
    () => setSlide((cur) => Math.min(cur + 1, slides.length - 1)),
    []
  );
  const prevSlide = useCallback(
    () => setSlide((cur) => Math.max(cur - 1, 0)),
    []
  );

  useEffect(() => {
    function onClick(event: MouseEvent) {
      event.preventDefault();

      if (event.button === 0 && !event.shiftKey) nextSlide();
      else prevSlide();
    }

    window.addEventListener('click', onClick);
    window.addEventListener('contextmenu', onClick);

    return () => {
      window.removeEventListener('click', onClick);
      window.removeEventListener('contextmenu', onClick);
    }
  }, []);

  const Slide = slides[slide];

  return <Slide />
}

export default App

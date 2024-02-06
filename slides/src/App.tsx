import { useEffect, useState } from 'react';
import { Slide1 } from './slides/1';
import { Slide2 } from './slides/2';
import { Slide3 } from './slides/3';
import { Slide4 } from './slides/4';
import { Slide5 } from './slides/5';
import { Slide6 } from './slides/6';
import { Slide7 } from './slides/7';
import { Slide8 } from './slides/8';
import { Slide9 } from './slides/9';
import { Step1 } from './slides/step1';
import { Step2 } from './slides/step2';
import { Step3 } from './slides/step3';
import { Step4 } from './slides/step4';
import { Step5 } from './slides/step5';
import { Step6 } from './slides/step6';
import { Step7 } from './slides/step7';
import { Step8 } from './slides/step8';
import { Toggle } from './components/Toggle';

const slides = [
  Slide1,
  Slide2,
  Slide3,
  Slide4,
  Slide5,
  Slide6,
  Slide7,
  Slide8,
  Slide9,
  Step1,
  Step2,
  Step3,
  Step4,
  Step5,
  Step6,
  Step7,
  Step8,
];

function App() {
  const [slide, setSlide] = useState(0);
  const [navEnabled, setNavEnabled] = useState(true);

  useEffect(() => {
    if (navEnabled) document.documentElement.classList.add('select-none');
    else document.documentElement.classList.remove('select-none');
  }, [navEnabled]);

  useEffect(() => {
    const nextSlide = () => setSlide((cur) => Math.min(cur + 1, slides.length - 1));
    const prevSlide = () => setSlide((cur) => Math.max(cur - 1, 0));

    function onClick(event: MouseEvent) {
      if (!navEnabled) return;
      if (event.target instanceof HTMLAnchorElement) return;
      event.preventDefault();

      if (event.button === 0 && !event.shiftKey) nextSlide();
      else prevSlide();
    }

    window.addEventListener('click', onClick);
    window.addEventListener('contextmenu', onClick);

    return () => {
      window.removeEventListener('click', onClick);
      window.removeEventListener('contextmenu', onClick);
    };
  }, [navEnabled]);

  const Slide = slides[slide];

  return (
    <>
      <Toggle value={navEnabled} setValue={setNavEnabled} className="absolute top-4 right-4" />
      <Slide />
    </>
  );
}

export default App;

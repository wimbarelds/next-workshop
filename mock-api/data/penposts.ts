import type { PenPost, FullPenPost } from 'types';
import checkboxPixelart from './penposts/checkbox-pixelart';
import epicDatepicker from './penposts/epic-datepicker';
import eyeTracking from './penposts/eye-tracking';
import loadTacToe from './penposts/load-tac-toe';
import pacman from './penposts/pacman';
import pendulum from './penposts/pendulum';
import radioColors from './penposts/radio-colors';
import tetrisSignal from './penposts/tetris-signal';
import typewriter from './penposts/typewriter';

export const fullPenposts: FullPenPost[] = [
  pacman,
  typewriter,
  checkboxPixelart,
  epicDatepicker,
  eyeTracking,
  loadTacToe,
  pendulum,
  radioColors,
  tetrisSignal,
]
  .sort((a, b) => b.date.localeCompare(a.date))
  .map((post) => ({
    ...post,
    comments: post.comments.slice().sort((c1, c2) => c2.date.localeCompare(c1.date)),
  }));

export const penposts = fullPenposts.map(({ body, ...post }): PenPost => post);

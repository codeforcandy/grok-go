import { App } from './app/app';
import { Effects } from './render/effects';
import { Renderer } from './render/renderer';

const canvas = document.querySelector<HTMLCanvasElement>('#scene')!;
const renderer = new Renderer(canvas);
const effects = new Effects(window.innerWidth, window.innerHeight);
const app = new App(renderer, effects, canvas);

new ResizeObserver(() => {
  renderer.resize();
  effects.reseed(window.innerWidth, window.innerHeight);
}).observe(canvas);

const ctx = canvas.getContext('2d')!;
let last = performance.now();
const loop = (now: number) => {
  effects.update(now - last, window.innerWidth, window.innerHeight);
  last = now;
  app.frame(now);
  effects.draw(ctx, now);
  requestAnimationFrame(loop);
};
requestAnimationFrame(loop);
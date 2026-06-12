import type { Board, Color, Point } from '../engine/types';
import { toPoint } from '../engine/board';
import { computeGeometry, pixelOf, type BoardGeometry } from './geometry';
import { STAR_POINTS_9, theme } from './theme';

export interface RenderState {
  board: Board;
  lastMove: Point | null;
  placing: { point: Point; color: Color; start: number } | null;
  focus: Point[] | null;
  glow: Point[];
  territoryOverlay: Map<number, Color | 'neutral'> | null;
  hover: Point | null;
  quizActive: boolean;
}

export class Renderer {
  private ctx: CanvasRenderingContext2D;
  private geometry: BoardGeometry;
  private staticLayer: HTMLCanvasElement | null = null;
  private width = 0;
  private height = 0;

  constructor(private canvas: HTMLCanvasElement) {
    this.ctx = canvas.getContext('2d')!;
    this.geometry = computeGeometry(1, 1);
    this.resize();
  }

  get geo(): BoardGeometry {
    return this.geometry;
  }

  resize(): void {
    const dpr = window.devicePixelRatio || 1;
    this.width = this.canvas.clientWidth || window.innerWidth;
    this.height = this.canvas.clientHeight || window.innerHeight;
    this.canvas.width = Math.round(this.width * dpr);
    this.canvas.height = Math.round(this.height * dpr);
    this.ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    this.geometry = computeGeometry(this.width, this.height);
    this.staticLayer = null;
  }

  draw(state: RenderState, now: number): void {
    const { ctx } = this;
    ctx.clearRect(0, 0, this.width, this.height);
    ctx.drawImage(this.ensureStaticLayer(), 0, 0, this.width, this.height);
    this.drawTerritory(state);
    this.drawStones(state, now);
    this.drawGlowMarkers(state.glow, now);
    this.drawHover(state);
    this.drawFocusVeil(state.focus);
  }

  private ensureStaticLayer(): HTMLCanvasElement {
    if (this.staticLayer) return this.staticLayer;
    const layer = document.createElement('canvas');
    const dpr = window.devicePixelRatio || 1;
    layer.width = Math.round(this.width * dpr);
    layer.height = Math.round(this.height * dpr);
    const ctx = layer.getContext('2d')!;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    this.paintBackground(ctx);
    this.paintBoard(ctx);
    this.staticLayer = layer;
    return layer;
  }

  private paintBackground(ctx: CanvasRenderingContext2D): void {
    const grad = ctx.createRadialGradient(
      this.width * 0.45, this.height * 0.25, 0,
      this.width * 0.45, this.height * 0.25, Math.max(this.width, this.height) * 0.9
    );
    grad.addColorStop(0, theme.nightInner);
    grad.addColorStop(1, theme.nightOuter);
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, this.width, this.height);
  }

  private paintBoard(ctx: CanvasRenderingContext2D): void {
    const g = this.geometry;
    const left = g.centerX - g.side / 2;
    const top = g.centerY - g.side / 2;

    ctx.save();
    ctx.shadowColor = 'rgba(255, 180, 80, 0.35)';
    ctx.shadowBlur = g.side * 0.18;
    const wood = ctx.createLinearGradient(left, top, left + g.side, top + g.side);
    wood.addColorStop(0, theme.woodLight);
    wood.addColorStop(0.55, theme.woodMid);
    wood.addColorStop(1, theme.woodDark);
    ctx.fillStyle = wood;
    this.roundRect(ctx, left, top, g.side, g.side, g.side * 0.02);
    ctx.fill();
    ctx.restore();

    ctx.save();
    ctx.globalAlpha = 0.05;
    ctx.strokeStyle = theme.line;
    for (let i = 0; i < 28; i++) {
      const y = top + (g.side * (i + Math.sin(i * 3.7) * 0.4)) / 28;
      ctx.beginPath();
      ctx.moveTo(left + 2, y);
      ctx.bezierCurveTo(
        left + g.side * 0.3, y + 3, left + g.side * 0.7, y - 3, left + g.side - 2, y
      );
      ctx.stroke();
    }
    ctx.restore();

    ctx.strokeStyle = theme.line;
    ctx.globalAlpha = 0.65;
    ctx.lineWidth = 1;
    for (let i = 0; i < g.boardSize; i++) {
      const { px } = pixelOf(g, { x: i, y: 0 });
      const { py: topY } = pixelOf(g, { x: 0, y: 0 });
      const { py: botY } = pixelOf(g, { x: 0, y: g.boardSize - 1 });
      ctx.beginPath();
      ctx.moveTo(px + 0.5, topY);
      ctx.lineTo(px + 0.5, botY);
      ctx.stroke();
      const { py } = pixelOf(g, { x: 0, y: i });
      const { px: leftX } = pixelOf(g, { x: 0, y: 0 });
      const { px: rightX } = pixelOf(g, { x: g.boardSize - 1, y: 0 });
      ctx.beginPath();
      ctx.moveTo(leftX, py + 0.5);
      ctx.lineTo(rightX, py + 0.5);
      ctx.stroke();
    }
    ctx.globalAlpha = 1;

    ctx.fillStyle = theme.line;
    for (const p of STAR_POINTS_9) {
      const { px, py } = pixelOf(g, p);
      ctx.beginPath();
      ctx.arc(px, py, Math.max(2.5, g.cell * 0.07), 0, Math.PI * 2);
      ctx.fill();
    }
  }

  private drawTerritory(state: RenderState): void {
    if (!state.territoryOverlay) return;
    const { ctx } = this;
    const g = this.geometry;
    for (const [i, owner] of state.territoryOverlay) {
      if (owner === 'neutral') continue;
      const { px, py } = pixelOf(g, toPoint(g.boardSize, i));
      ctx.fillStyle = owner === 'black' ? theme.territoryBlack : theme.territoryWhite;
      ctx.beginPath();
      ctx.arc(px, py, g.cell * 0.32, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  private drawStones(state: RenderState, now: number): void {
    const g = this.geometry;
    for (let i = 0; i < state.board.cells.length; i++) {
      const color = state.board.cells[i];
      if (color === null) continue;
      const p = toPoint(g.boardSize, i);
      let scale = 1;
      if (state.placing && state.placing.point.x === p.x && state.placing.point.y === p.y) {
        const t = Math.min(1, (now - state.placing.start) / 400);
        scale = easeOutBack(t);
      }
      this.drawStone(p, color, scale, state.lastMove);
    }
  }

  private drawStone(p: Point, color: Color, scale: number, lastMove: Point | null): void {
    const { ctx } = this;
    const g = this.geometry;
    const { px, py } = pixelOf(g, p);
    const r = g.cell * 0.46 * scale;
    if (r <= 0) return;

    ctx.save();
    if (color === 'white') {
      ctx.shadowColor = 'rgba(255, 240, 200, 0.45)';
      ctx.shadowBlur = g.cell * 0.35;
    } else {
      ctx.shadowColor = 'rgba(0, 0, 0, 0.6)';
      ctx.shadowBlur = g.cell * 0.2;
    }
    const grad = ctx.createRadialGradient(
      px - r * 0.35, py - r * 0.4, r * 0.1, px, py, r
    );
    if (color === 'black') {
      grad.addColorStop(0, theme.blackStoneHi);
      grad.addColorStop(1, theme.blackStoneLo);
    } else {
      grad.addColorStop(0, theme.whiteStoneHi);
      grad.addColorStop(1, theme.whiteStoneLo);
    }
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(px, py, r, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    if (lastMove && lastMove.x === p.x && lastMove.y === p.y && scale === 1) {
      ctx.strokeStyle = theme.amber;
      ctx.lineWidth = 1.5;
      ctx.globalAlpha = 0.9;
      ctx.beginPath();
      ctx.arc(px, py, r + g.cell * 0.14, 0, Math.PI * 2);
      ctx.stroke();
      ctx.globalAlpha = 1;
    }
  }

  private drawGlowMarkers(points: Point[], now: number): void {
    const { ctx } = this;
    const g = this.geometry;
    const pulse = 0.55 + 0.45 * Math.sin(now / 450);
    for (const p of points) {
      const { px, py } = pixelOf(g, p);
      ctx.save();
      ctx.globalCompositeOperation = 'lighter';
      const grad = ctx.createRadialGradient(px, py, 0, px, py, g.cell * 0.5);
      grad.addColorStop(0, `rgba(255, 217, 138, ${0.55 * pulse})`);
      grad.addColorStop(1, 'rgba(255, 217, 138, 0)');
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(px, py, g.cell * 0.5, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }
  }

  private drawHover(state: RenderState): void {
    if (!state.quizActive || !state.hover) return;
    const { ctx } = this;
    const g = this.geometry;
    const { px, py } = pixelOf(g, state.hover);
    ctx.save();
    ctx.strokeStyle = theme.amber;
    ctx.setLineDash([4, 4]);
    ctx.globalAlpha = 0.85;
    ctx.beginPath();
    ctx.arc(px, py, g.cell * 0.46, 0, Math.PI * 2);
    ctx.stroke();
    ctx.restore();
  }

  private drawFocusVeil(focus: Point[] | null): void {
    if (!focus || focus.length === 0) return;
    const { ctx } = this;
    const g = this.geometry;
    ctx.save();
    ctx.fillStyle = theme.dimVeil;
    ctx.fillRect(0, 0, this.width, this.height);
    ctx.globalCompositeOperation = 'destination-out';
    for (const p of focus) {
      const { px, py } = pixelOf(g, p);
      const grad = ctx.createRadialGradient(px, py, 0, px, py, g.cell * 2.2);
      grad.addColorStop(0, 'rgba(0, 0, 0, 1)');
      grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(px, py, g.cell * 2.2, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.restore();
  }

  private roundRect(
    ctx: CanvasRenderingContext2D,
    x: number, y: number, w: number, h: number, r: number
  ): void {
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.arcTo(x + w, y, x + w, y + h, r);
    ctx.arcTo(x + w, y + h, x, y + h, r);
    ctx.arcTo(x, y + h, x, y, r);
    ctx.arcTo(x, y, x + w, y, r);
    ctx.closePath();
  }
}

function easeOutBack(t: number): number {
  const c1 = 1.70158;
  const c3 = c1 + 1;
  return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2);
}

export function emptyRenderState(board: Board): RenderState {
  return {
    board,
    lastMove: null,
    placing: null,
    focus: null,
    glow: [],
    territoryOverlay: null,
    hover: null,
    quizActive: false
  };
}
interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  age: number;
  life: number;
  size: number;
  kind: 'ember' | 'ripple';
}

interface Firefly {
  x: number;
  y: number;
  phase: number;
  speed: number;
  drift: number;
}

const FIREFLY_COUNT = 14;

export class Effects {
  private particles: Particle[] = [];
  private fireflies: Firefly[] = [];

  constructor(width: number, height: number) {
    this.reseed(width, height);
  }

  reseed(width: number, height: number): void {
    this.fireflies = Array.from({ length: FIREFLY_COUNT }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      phase: Math.random() * Math.PI * 2,
      speed: 6 + Math.random() * 10,
      drift: Math.random() * Math.PI * 2
    }));
  }

  spawnRipple(px: number, py: number, cell: number): void {
    this.particles.push({
      x: px, y: py, vx: 0, vy: 0, age: 0, life: 600, size: cell, kind: 'ripple'
    });
  }

  spawnEmbers(px: number, py: number, cell: number): void {
    for (let i = 0; i < 14; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = cell * (0.2 + Math.random() * 0.8);
      this.particles.push({
        x: px + (Math.random() - 0.5) * cell * 0.4,
        y: py + (Math.random() - 0.5) * cell * 0.4,
        vx: Math.cos(angle) * speed * 0.3,
        vy: -speed * (0.5 + Math.random() * 0.7),
        age: 0,
        life: 700 + Math.random() * 500,
        size: cell * (0.06 + Math.random() * 0.08),
        kind: 'ember'
      });
    }
  }

  update(dtMs: number, width: number, height: number): void {
    const dt = dtMs / 1000;
    this.particles = this.particles.filter((p) => (p.age += dtMs) < p.life);
    for (const p of this.particles) {
      p.x += p.vx * dt;
      p.y += p.vy * dt;
      if (p.kind === 'ember') p.vy -= 14 * dt;
    }
    for (const f of this.fireflies) {
      f.drift += dt * 0.25;
      f.x += Math.cos(f.drift) * f.speed * dt;
      f.y += Math.sin(f.drift * 0.8) * f.speed * dt * 0.6;
      if (f.x < -10) f.x = width + 10;
      if (f.x > width + 10) f.x = -10;
      if (f.y < -10) f.y = height + 10;
      if (f.y > height + 10) f.y = -10;
    }
  }

  draw(ctx: CanvasRenderingContext2D, now: number): void {
    ctx.save();
    ctx.globalCompositeOperation = 'lighter';

    for (const f of this.fireflies) {
      const glow = 0.35 + 0.3 * Math.sin(now / 700 + f.phase);
      const grad = ctx.createRadialGradient(f.x, f.y, 0, f.x, f.y, 7);
      grad.addColorStop(0, `rgba(255, 217, 138, ${glow})`);
      grad.addColorStop(1, 'rgba(255, 217, 138, 0)');
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(f.x, f.y, 7, 0, Math.PI * 2);
      ctx.fill();
    }

    for (const p of this.particles) {
      const t = p.age / p.life;
      if (p.kind === 'ripple') {
        const radius = p.size * (0.4 + t * 1.6);
        ctx.strokeStyle = `rgba(255, 217, 138, ${0.5 * (1 - t)})`;
        ctx.lineWidth = 2 * (1 - t);
        ctx.beginPath();
        ctx.arc(p.x, p.y, radius, 0, Math.PI * 2);
        ctx.stroke();
      } else {
        const alpha = (1 - t) * 0.8;
        const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 2.5);
        grad.addColorStop(0, `rgba(255, 200, 110, ${alpha})`);
        grad.addColorStop(1, 'rgba(255, 200, 110, 0)');
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * 2.5, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    ctx.restore();
  }
}
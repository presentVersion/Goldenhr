import * as React from 'react';

interface AmbientAuraCanvasProps {
  className?: string;
  theme?: 'light' | 'command';
}

export const AmbientAuraCanvas: React.FC<AmbientAuraCanvasProps> = ({
  className = '',
  theme = 'light',
}) => {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);

  React.useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.clientHeight || window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.parentElement?.clientWidth || window.innerWidth;
      height = canvas.height = canvas.parentElement?.clientHeight || window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    // Particle nodes for high-tech constellation
    const particlesCount = theme === 'command' ? 36 : 24;
    const particles: {
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      baseAlpha: number;
    }[] = [];

    for (let i = 0; i < particlesCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        radius: Math.random() * 2 + 1,
        baseAlpha: Math.random() * 0.4 + 0.15,
      });
    }

    let mouseX = width / 2;
    let mouseY = height / 3;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;
    };

    window.addEventListener('mousemove', handleMouseMove);

    let time = 0;

    const render = () => {
      time += 0.01;
      ctx.clearRect(0, 0, width, height);

      // 1. Draw glowing volumetric light orbs
      const orbColor = theme === 'command' ? 'rgba(0, 180, 200, 0.12)' : 'rgba(0, 180, 200, 0.08)';
      const orbGradient = ctx.createRadialGradient(
        mouseX,
        mouseY,
        10,
        mouseX,
        mouseY,
        Math.min(width, height) * 0.5
      );
      orbGradient.addColorStop(0, orbColor);
      orbGradient.addColorStop(1, 'transparent');

      ctx.fillStyle = orbGradient;
      ctx.fillRect(0, 0, width, height);

      // Secondary floating ambient light orb
      const orb2X = width * 0.2 + Math.sin(time * 0.8) * 80;
      const orb2Y = height * 0.3 + Math.cos(time * 0.6) * 60;
      const orb2Gradient = ctx.createRadialGradient(orb2X, orb2Y, 20, orb2X, orb2Y, width * 0.4);
      orb2Gradient.addColorStop(0, theme === 'command' ? 'rgba(31, 95, 168, 0.16)' : 'rgba(31, 95, 168, 0.06)');
      orb2Gradient.addColorStop(1, 'transparent');
      ctx.fillStyle = orb2Gradient;
      ctx.fillRect(0, 0, width, height);

      // 2. Draw particle network with distance connections
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = theme === 'command' ? `rgba(0, 229, 255, ${p.baseAlpha})` : `rgba(0, 180, 200, ${p.baseAlpha})`;
        ctx.fill();

        // Connect nearby nodes
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            const lineAlpha = (1 - dist / 120) * (theme === 'command' ? 0.15 : 0.08);
            ctx.strokeStyle = theme === 'command' ? `rgba(0, 229, 255, ${lineAlpha})` : `rgba(0, 180, 200, ${lineAlpha})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [theme]);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 pointer-events-none z-0 ${className}`}
    />
  );
};

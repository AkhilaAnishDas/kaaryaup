import React, { useEffect, useRef } from 'react';
import { useApp } from '../context/AppContext';

const StarBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { theme } = useApp();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let stars: Star[] = [];
    let glitches: Glitch[] = [];
    let comets: Comet[] = [];
    let gridOffset = 0;

    class Comet {
      x: number;
      y: number;
      w: number;
      h: number;
      vx: number;
      vy: number;
      opacity: number;
      color: string;

      constructor() {
        this.reset();
      }

      reset() {
        this.x = Math.random() * canvas!.width;
        this.y = -100;
        this.w = 1;
        this.h = 40 + Math.random() * 100;
        this.vx = (Math.random() - 0.5) * 5;
        this.vy = 15 + Math.random() * 20;
        this.opacity = 0.4 + Math.random() * 0.4;
        this.color = theme === 'dark' ? '#ff4500' : '#ffffff';
      }

      draw() {
        if (!ctx) return;
        const gradient = ctx.createLinearGradient(this.x, this.y, this.x + this.vx, this.y + this.h);
        gradient.addColorStop(0, 'transparent');
        gradient.addColorStop(1, this.color);
        
        ctx.strokeStyle = gradient;
        ctx.lineWidth = this.w;
        ctx.lineCap = 'round';
        ctx.beginPath();
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(this.x + this.vx, this.y + this.h);
        ctx.stroke();
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;
        return this.y < canvas!.height + 200;
      }
    }

    class Glitch {
      x: number;
      y: number;
      w: number;
      h: number;
      opacity: number;
      life: number;
      color: string;

      constructor() {
        this.x = Math.random() * canvas!.width;
        this.y = Math.random() * canvas!.height;
        this.w = 5 + Math.random() * 20;
        this.h = 1 + Math.random() * 3;
        this.life = 30 + Math.random() * 60;
        this.opacity = 0.2;
        this.color = theme === 'dark' ? '#ff0000' : '#800000';
      }

      draw() {
        if (!ctx) return;
        ctx.fillStyle = this.color;
        ctx.globalAlpha = this.opacity * (this.life / 90);
        ctx.fillRect(this.x, this.y, this.w, this.h);
        ctx.globalAlpha = 1.0;
      }

      update() {
        this.life--;
        this.x += (Math.random() - 0.5) * 2;
        return this.life > 0;
      }
    }

    class Star {
      x: number;
      y: number;
      size: number;
      opacity: number;
      speed: number;
      parallax: number;
      color: string;

      constructor() {
        this.x = Math.random() * canvas!.width;
        this.y = Math.random() * canvas!.height;
        this.size = 0.5 + Math.random() * 1.5;
        this.opacity = Math.random();
        this.speed = 0.005 + Math.random() * 0.01;
        this.parallax = this.size * 0.5;
        
        const colors = theme === 'dark' 
          ? ['#ff4500', '#ffa500', '#ffffff', '#ff00ff'] 
          : ['#ffffff', '#ffcc00', '#ffaa00'];
        this.color = colors[Math.floor(Math.random() * colors.length)];
      }

      draw() {
        if (!ctx) return;
        ctx.fillStyle = this.color;
        ctx.globalAlpha = this.opacity * (theme === 'dark' ? 1.0 : 0.4);
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = 1.0;
      }

      update() {
        this.opacity += this.speed;
        if (this.opacity > 1 || this.opacity < 0.2) this.speed = -this.speed;
        
        this.y += 0.1 * this.parallax;
        if (this.y > canvas!.height) {
          this.y = 0;
          this.x = Math.random() * canvas!.width;
        }
      }
    }

    const drawNebula = () => {
      if (!ctx || !canvas || theme !== 'dark') return;
      const time = Date.now() * 0.001;
      
      const g1 = ctx.createRadialGradient(
        canvas.width * (0.5 + Math.sin(time * 0.3) * 0.2), 
        canvas.height * (0.5 + Math.cos(time * 0.2) * 0.2), 
        0, 
        canvas.width * 0.5, 
        canvas.height * 0.5, 
        canvas.width * 0.8
      );
      g1.addColorStop(0, 'rgba(127, 29, 29, 0.05)');
      g1.addColorStop(1, 'transparent');
      
      const g2 = ctx.createRadialGradient(
        canvas.width * (0.3 + Math.cos(time * 0.4) * 0.2), 
        canvas.height * (0.7 + Math.sin(time * 0.5) * 0.2), 
        0, 
        canvas.width * 0.3, 
        canvas.height * 0.7, 
        canvas.width * 0.6
      );
      g2.addColorStop(0, 'rgba(88, 28, 135, 0.05)');
      g2.addColorStop(1, 'transparent');
      
      ctx.fillStyle = g1;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = g2;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    };

    const drawGrid = () => {
      if (!ctx || !canvas) return;

      const gridColor = theme === 'dark' ? '#ff4500' : '#ffffff';
      ctx.strokeStyle = gridColor;
      ctx.lineWidth = 1;
      ctx.globalAlpha = 0.1;

      const horizon = canvas.height * 0.55;
      
      // Horizontal lines
      for (let i = 0; i < 15; i++) {
        const y = horizon + Math.pow(i + gridOffset, 2.5) * 1.5;
        if (y > canvas.height) break;
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }

      // Vertical lines
      const vpX = canvas.width / 2;
      const vpY = horizon;
      const numLines = 15;
      for (let i = -numLines; i <= numLines; i++) {
        ctx.beginPath();
        ctx.moveTo(vpX, vpY);
        const xAtBottom = vpX + (i * canvas.width / 8);
        ctx.lineTo(xAtBottom, canvas.height);
        ctx.stroke();
      }
      
      if (theme === 'dark') {
        gridOffset += 0.015;
      } else {
        gridOffset += 0.005; // Slower grid for light mode
      }
      if (gridOffset >= 1) gridOffset = 0;
      ctx.globalAlpha = 1.0;
    };

    const init = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      stars = [];
      for (let i = 0; i < 400; i++) {
        stars.push(new Star());
      }
    };

    const animate = () => {
      // Background base
      ctx.fillStyle = theme === 'dark' ? '#000000' : '#450a0a';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      drawNebula();
      drawGrid();
      
      stars.forEach(star => {
        star.draw();
        star.update();
      });

      // More frequent comets
      if (Math.random() > 0.96) {
        comets.push(new Comet());
      }
      
      comets = comets.filter(c => {
        c.draw();
        return c.update();
      });

      // Glitches only in dark mode
      if (theme === 'dark' && Math.random() > 0.98) {
        glitches.push(new Glitch());
      }
      
      glitches = glitches.filter(g => {
        g.draw();
        return g.update();
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    init();
    animate();

    window.addEventListener('resize', init);
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', init);
    };
  }, [theme]);

  return <canvas ref={canvasRef} className="star-bg" />;
};

export default StarBackground;

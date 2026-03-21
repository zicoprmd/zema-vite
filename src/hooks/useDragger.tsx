import { useEffect, useRef } from 'react';

const useDragger = (id: string): void => {
  const isDragging = useRef<boolean>(false);
  const startMouse = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const startPos = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const isBottomMode = useRef<boolean>(true);
  const hasPositioned = useRef<boolean>(false);

  useEffect(() => {
    const target = document.getElementById(id);
    if (!target) throw new Error("Element with given id doesn't exist");

    // Center the navbar only on FIRST mount (not on resize)
    const centerNavbarOnce = () => {
      if (hasPositioned.current) return;
      hasPositioned.current = true;

      const rect = target.getBoundingClientRect();
      const viewportWidth = window.innerWidth;
      const centerX = (viewportWidth - rect.width) / 2;
      target.style.left = `${centerX}px`;
      target.style.bottom = '1.75rem';
      target.style.top = 'auto';
      isBottomMode.current = true;
    };

    // Initial center on mount
    centerNavbarOnce();

    const onMouseDown = (e: MouseEvent) => {
      if ((e.target as HTMLElement).closest('a, button')) {
        return;
      }

      e.preventDefault();
      e.stopPropagation();

      isDragging.current = true;
      startMouse.current = { x: e.clientX, y: e.clientY };

      // Get current position
      if (isBottomMode.current) {
        const rect = target.getBoundingClientRect();
        startPos.current = {
          x: parseFloat(target.style.left) || 0,
          y: window.innerHeight - rect.bottom,
        };
      } else {
        startPos.current = {
          x: parseFloat(target.style.left) || 0,
          y: parseFloat(target.style.top) || 0,
        };
      }
    };

    const onMouseUp = () => {
      isDragging.current = false;
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!isDragging.current) return;

      const dx = e.clientX - startMouse.current.x;
      const dy = e.clientY - startMouse.current.y;

      const newX = startPos.current.x + dx;
      const newY = startPos.current.y + dy;

      // Clamp to viewport
      const clampedX = Math.max(0, Math.min(newX, window.innerWidth - target.offsetWidth));
      const clampedY = Math.max(0, newY);

      target.style.left = `${clampedX}px`;
      target.style.top = `${clampedY}px`;
      target.style.bottom = 'auto';
      isBottomMode.current = false;
    };

    const onTouchStart = (e: TouchEvent) => {
      if (e.touches.length !== 1) return;
      if ((e.target as HTMLElement).closest('a, button')) {
        return;
      }

      e.preventDefault();
      e.stopPropagation();

      const touch = e.touches[0];
      isDragging.current = true;
      startMouse.current = { x: touch.clientX, y: touch.clientY };

      if (isBottomMode.current) {
        const rect = target.getBoundingClientRect();
        startPos.current = {
          x: parseFloat(target.style.left) || 0,
          y: window.innerHeight - rect.bottom,
        };
      } else {
        startPos.current = {
          x: parseFloat(target.style.left) || 0,
          y: parseFloat(target.style.top) || 0,
        };
      }
    };

    const onTouchEnd = () => {
      isDragging.current = false;
    };

    const onTouchMove = (e: TouchEvent) => {
      if (!isDragging.current || e.touches.length !== 1) return;
      e.preventDefault();

      const touch = e.touches[0];
      const dx = touch.clientX - startMouse.current.x;
      const dy = touch.clientY - startMouse.current.y;

      const newX = startPos.current.x + dx;
      const newY = startPos.current.y + dy;

      const clampedX = Math.max(0, Math.min(newX, window.innerWidth - target.offsetWidth));
      const clampedY = Math.max(0, newY);

      target.style.left = `${clampedX}px`;
      target.style.top = `${clampedY}px`;
      target.style.bottom = 'auto';
      isBottomMode.current = false;
    };

    target.addEventListener('mousedown', onMouseDown);
    target.addEventListener('touchstart', onTouchStart, { passive: false });
    window.addEventListener('mouseup', onMouseUp);
    window.addEventListener('touchend', onTouchEnd);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('touchmove', onTouchMove, { passive: false });

    return () => {
      target.removeEventListener('mousedown', onMouseDown);
      target.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('mouseup', onMouseUp);
      window.removeEventListener('touchend', onTouchEnd);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('touchmove', onTouchMove);
    };
  }, [id]);
};

export default useDragger;

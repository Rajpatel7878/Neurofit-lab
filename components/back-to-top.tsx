'use client';

import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowUp } from 'lucide-react';
import { cn } from '@/lib/utils';

export function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <Button
      onClick={scrollToTop}
      size="icon"
      aria-label="Back to top"
      className={cn(
        'fixed bottom-6 right-6 z-50 h-10 w-10 rounded-full shadow-lg',
        'bg-primary hover:bg-primary/90 text-primary-foreground',
        'transition-all duration-300',
        visible ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 translate-y-4 pointer-events-none'
      )}
    >
      <ArrowUp className="h-4 w-4" />
    </Button>
  );
}

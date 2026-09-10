'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';

interface Testimonial {
  id: number;
  name: string;
  role: string;
  content: string;
  rating: number;
  image: string;
}

const TESTIMONIALS: Testimonial[] = [
  {
    id: 1,
    name: 'Alex Chen',
    role: 'Software Engineer',
    content: 'NeuroFit Labs transformed my focus and productivity. My concentration improved by 40% in just 3 months!',
    rating: 5,
    image: '/avatars/alex.jpg',
  },
  {
    id: 2,
    name: 'Jordan Smith',
    role: 'Business Executive',
    content: 'The VR training is incredibly immersive. I love seeing my progress on the leaderboard and competing with friends.',
    rating: 5,
    image: '/avatars/jordan.jpg',
  },
  {
    id: 3,
    name: 'Casey Moore',
    role: 'Student',
    content: 'As a student, this tool helped me retain information 3x better. The AI personalization is genius!',
    rating: 5,
    image: '/avatars/casey.jpg',
  },
];

export function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);

  useEffect(() => {
    if (!autoPlay) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % TESTIMONIALS.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [autoPlay]);

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
    setAutoPlay(false);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % TESTIMONIALS.length);
    setAutoPlay(false);
  };

  const testimonial = TESTIMONIALS[currentIndex];

  return (
    <section className="py-12 sm:py-16">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-balance">
            Loved by Thousands of Brain Athletes
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            See how NeuroFit Labs has transformed the cognitive performance of users worldwide
          </p>
        </div>

        {/* Carousel */}
        <div className="max-w-2xl mx-auto">
          <Card className="border-0 shadow-lg">
            <CardContent className="p-8 sm:p-12">
              {/* Testimonial Content */}
              <div className="mb-6">
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <blockquote className="text-lg sm:text-xl font-medium text-foreground mb-6">
                  "{testimonial.content}"
                </blockquote>
              </div>

              {/* Author */}
              <div className="flex items-center gap-4 mb-8 pb-8 border-b border-border">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white font-bold flex-shrink-0">
                  {testimonial.name.charAt(0)}
                </div>
                <div>
                  <div className="font-semibold">{testimonial.name}</div>
                  <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                </div>
              </div>

              {/* Controls */}
              <div className="flex items-center justify-between">
                <div className="flex gap-2">
                  {TESTIMONIALS.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        setCurrentIndex(idx);
                        setAutoPlay(false);
                      }}
                      className={`h-2 rounded-full transition-all ${
                        idx === currentIndex ? 'bg-primary w-8' : 'bg-muted w-2'
                      }`}
                      aria-label={`Go to testimonial ${idx + 1}`}
                    />
                  ))}
                </div>

                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={goToPrevious}
                    className="h-10 w-10"
                    aria-label="Previous testimonial"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={goToNext}
                    className="h-10 w-10"
                    aria-label="Next testimonial"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}

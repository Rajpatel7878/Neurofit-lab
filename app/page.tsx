'use client';

import React, { useState } from 'react';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { BrainQuiz } from '@/components/brain-quiz';
import { Testimonials } from '@/components/testimonials';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight, Zap, Brain, TrendingUp, Users } from 'lucide-react';
import Link from 'next/link';

const FEATURES = [
  {
    icon: Brain,
    title: 'AI-Powered Training',
    description: 'Personalized programs that adapt to your cognitive profile in real-time',
  },
  {
    icon: TrendingUp,
    title: 'Measurable Progress',
    description: 'Track detailed metrics and watch your scores improve week over week',
  },
  {
    icon: Zap,
    title: 'Immersive VR',
    description: 'Full-body VR experiences that make training feel like gaming',
  },
  {
    icon: Users,
    title: 'Competitive Community',
    description: 'Join leaderboards and compete with thousands of brain athletes',
  },
];

export default function HomePage() {
  const [showQuiz, setShowQuiz] = useState(false);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative py-20 sm:py-32 overflow-hidden">
          {/* Background gradient */}
          <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent" />

          <div className="container mx-auto px-4 sm:px-6 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Left content */}
              <div className="space-y-6 animate-fade-in-up">
                <div className="space-y-3">
                  <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight text-balance">
                    Unlock Your Brain&apos;s{' '}
                    <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                      Full Potential
                    </span>
                  </h1>
                  <p className="text-lg text-muted-foreground max-w-xl text-pretty">
                    Advanced VR brain training powered by neuroscience. Boost memory, focus, and
                    reaction time with personalized AI coaching.
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Button
                    onClick={() => setShowQuiz(true)}
                    className="h-12 px-8 bg-primary hover:bg-primary/90 text-primary-foreground text-base"
                  >
                    Get Your Brain Plan
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                  <Button asChild variant="outline" className="h-12 px-8">
                    <Link href="/vr-demo">View VR Demo</Link>
                  </Button>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-4 pt-4">
                  <div className="animate-fade-in-up-delay-1">
                    <div className="text-2xl sm:text-3xl font-bold text-primary">50K+</div>
                    <p className="text-xs sm:text-sm text-muted-foreground">Active Users</p>
                  </div>
                  <div className="animate-fade-in-up-delay-2">
                    <div className="text-2xl sm:text-3xl font-bold text-accent">87%</div>
                    <p className="text-xs sm:text-sm text-muted-foreground">See Results</p>
                  </div>
                  <div className="animate-fade-in-up-delay-3">
                    <div className="text-2xl sm:text-3xl font-bold text-primary">4.9★</div>
                    <p className="text-xs sm:text-sm text-muted-foreground">Rating</p>
                  </div>
                </div>
              </div>

              {/* Right — animated brain visual */}
              <div className="relative h-96 lg:h-full flex items-center justify-center animate-fade-in-up-delay-1">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 rounded-3xl blur-3xl" />
                <div className="relative w-full h-full max-h-96 rounded-3xl bg-gradient-to-br from-primary/10 to-accent/10 border border-primary/20 flex items-center justify-center overflow-hidden">
                  {/* Animated neural network visual */}
                  <div className="relative w-64 h-64">
                    {/* Pulsing rings */}
                    <div className="absolute inset-0 rounded-full border-2 border-primary/20 animate-ping" style={{ animationDuration: '3s' }} />
                    <div className="absolute inset-4 rounded-full border-2 border-accent/30 animate-ping" style={{ animationDuration: '2.5s', animationDelay: '0.5s' }} />
                    <div className="absolute inset-8 rounded-full border border-primary/40 animate-ping" style={{ animationDuration: '2s', animationDelay: '1s' }} />
                    {/* Center brain */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-8xl select-none" style={{ filter: 'drop-shadow(0 0 20px #00AEEF88)' }}>
                        🧠
                      </div>
                    </div>
                    {/* Floating data points */}
                    <div className="absolute top-4 right-8 bg-primary/20 backdrop-blur-sm border border-primary/30 rounded-lg px-2 py-1 text-xs text-primary font-mono animate-bounce" style={{ animationDuration: '2s' }}>
                      Focus: 94%
                    </div>
                    <div className="absolute bottom-8 left-4 bg-accent/20 backdrop-blur-sm border border-accent/30 rounded-lg px-2 py-1 text-xs text-accent font-mono animate-bounce" style={{ animationDuration: '2.5s', animationDelay: '0.3s' }}>
                      Memory: 87%
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 sm:py-24 bg-muted/30">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-balance">
                Why Choose NeuroFit Labs?
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
                Science-backed training designed by neuroscientists and powered by cutting-edge AI
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {FEATURES.map((feature, idx) => (
                <Card
                  key={idx}
                  className="border-0 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300"
                >
                  <CardContent className="p-6">
                    <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                      <feature.icon className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                    <p className="text-muted-foreground text-sm">{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Quiz Section */}
        <section id="quiz" className="py-16 sm:py-24">
          <div className="container mx-auto px-4 sm:px-6">
            {showQuiz ? (
              <BrainQuiz onComplete={() => setShowQuiz(false)} />
            ) : (
              <div className="text-center space-y-6">
                <h2 className="text-3xl sm:text-4xl font-bold">
                  Discover Your Cognitive Strengths
                </h2>
                <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
                  Take our quick assessment to get a personalized training plan tailored to your
                  brain
                </p>
                <Button
                  onClick={() => setShowQuiz(true)}
                  size="lg"
                  className="bg-primary hover:bg-primary/90 text-primary-foreground h-12 px-8"
                >
                  Start Free Quiz
                </Button>
              </div>
            )}
          </div>
        </section>

        {/* Testimonials */}
        <Testimonials />

        {/* CTA Section */}
        <section className="py-16 sm:py-24 bg-gradient-to-r from-primary/5 via-accent/5 to-primary/5">
          <div className="container mx-auto px-4 sm:px-6 text-center space-y-8">
            <div className="space-y-4">
              <h2 className="text-3xl sm:text-4xl font-bold">Ready to Transform Your Mind?</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
                Join thousands of users improving their cognitive performance with NeuroFit Labs
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                asChild
                size="lg"
                className="bg-primary hover:bg-primary/90 text-primary-foreground h-12 px-8"
              >
                <Link href="/shop">Shop Now</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="h-12 px-8">
                <Link href="/vr-demo">Try VR Demo</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

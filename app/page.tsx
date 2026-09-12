'use client';

import React, { useState } from 'react';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { BrainQuiz } from '@/components/brain-quiz';
import { Testimonials } from '@/components/testimonials';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight, Zap, Brain, TrendingUp, Users, Check } from 'lucide-react';
import Link from 'next/link';
import { useInView, useCountUp } from '@/hooks/use-in-view';

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

const PRICING = [
  {
    name: 'Starter',
    price: 0,
    period: 'forever',
    description: 'Perfect for getting started with brain training',
    features: ['5 training sessions/month', 'Basic progress tracking', 'Community access'],
    cta: 'Start Free',
    href: '/dashboard',
    featured: false,
  },
  {
    name: 'Pro',
    price: 19.99,
    period: 'month',
    description: 'For serious brain athletes who want real results',
    features: [
      'Unlimited sessions',
      'Advanced analytics',
      'AI coaching',
      'Leaderboard access',
      'Priority support',
    ],
    cta: 'Start Pro',
    href: '/shop',
    featured: true,
  },
  {
    name: 'Elite',
    price: 249,
    period: 'one-time',
    description: 'Everything + EEG headset for the ultimate experience',
    features: [
      'Everything in Pro',
      'EEG Headset included',
      'VR integration',
      'Personal coach session',
      'Lifetime updates',
    ],
    cta: 'Get Elite Bundle',
    href: '/shop',
    featured: false,
  },
];

// Animated stat item
function AnimatedStat({
  value,
  suffix,
  label,
  enabled,
  duration = 1800,
}: {
  value: number;
  suffix: string;
  label: string;
  enabled: boolean;
  duration?: number;
}) {
  const count = useCountUp(value, duration, enabled);
  return (
    <div>
      <div className="text-3xl sm:text-4xl font-bold text-primary tabular-nums">
        {count.toLocaleString()}
        {suffix}
      </div>
      <p className="text-sm text-muted-foreground mt-1">{label}</p>
    </div>
  );
}

export default function HomePage() {
  const [showQuiz, setShowQuiz] = useState(false);

  // Stats section — animate counters when visible
  const { ref: statsRef, inView: statsInView } = useInView();

  // Features section — fade in when visible
  const { ref: featuresRef, inView: featuresInView } = useInView();

  // Pricing section
  const { ref: pricingRef, inView: pricingInView } = useInView();

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* ── Hero Section ─────────────────────────────────────────────────────── */}
        <section className="relative py-20 sm:py-32 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent dark:from-primary/10" />

          <div className="container mx-auto px-4 sm:px-6 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Left */}
              <div className="space-y-6 animate-fade-in-up">
                <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-sm text-primary">
                  <Zap className="h-3.5 w-3.5" />
                  <span>Now with AI-powered neural mapping</span>
                </div>

                <div className="space-y-4">
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

                {/* Trust badges */}
                <div className="flex flex-wrap gap-4 pt-2 text-sm text-muted-foreground">
                  {['No credit card required', 'Free plan available', '30-day guarantee'].map((t) => (
                    <span key={t} className="flex items-center gap-1.5">
                      <Check className="h-3.5 w-3.5 text-accent" />
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Right — animated brain visual */}
              <div className="relative h-96 lg:h-full flex items-center justify-center animate-fade-in-up-delay-1">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 rounded-3xl blur-3xl" />
                <div className="relative w-full h-full max-h-96 rounded-3xl bg-gradient-to-br from-primary/10 to-accent/10 border border-primary/20 dark:border-primary/30 flex items-center justify-center overflow-hidden">
                  <div className="relative w-64 h-64">
                    {/* Pulsing rings */}
                    <div
                      className="absolute inset-0 rounded-full border-2 border-primary/20"
                      style={{
                        animationName: 'ping',
                        animationDuration: '3s',
                        animationTimingFunction: 'cubic-bezier(0,0,0.2,1)',
                        animationIterationCount: 'infinite',
                      }}
                    />
                    <div
                      className="absolute inset-4 rounded-full border-2 border-accent/30"
                      style={{
                        animationName: 'ping',
                        animationDuration: '2.5s',
                        animationTimingFunction: 'cubic-bezier(0,0,0.2,1)',
                        animationIterationCount: 'infinite',
                        animationDelay: '0.5s',
                      }}
                    />
                    <div
                      className="absolute inset-8 rounded-full border border-primary/40"
                      style={{
                        animationName: 'ping',
                        animationDuration: '2s',
                        animationTimingFunction: 'cubic-bezier(0,0,0.2,1)',
                        animationIterationCount: 'infinite',
                        animationDelay: '1s',
                      }}
                    />
                    {/* Center brain */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-8xl select-none" style={{ filter: 'drop-shadow(0 0 20px #00AEEF88)' }}>
                        🧠
                      </div>
                    </div>
                    {/* Floating data points */}
                    <div
                      className="absolute top-4 right-8 bg-primary/20 backdrop-blur-sm border border-primary/30 rounded-lg px-2 py-1 text-xs text-primary font-mono"
                      style={{
                        animationName: 'bounce',
                        animationDuration: '2s',
                        animationTimingFunction: 'cubic-bezier(0.8,0,1,1)',
                        animationIterationCount: 'infinite',
                        animationDirection: 'alternate',
                      }}
                    >
                      Focus: 94%
                    </div>
                    <div
                      className="absolute bottom-8 left-4 bg-accent/20 backdrop-blur-sm border border-accent/30 rounded-lg px-2 py-1 text-xs text-accent font-mono"
                      style={{
                        animationName: 'bounce',
                        animationDuration: '2.5s',
                        animationTimingFunction: 'cubic-bezier(0.8,0,1,1)',
                        animationIterationCount: 'infinite',
                        animationDirection: 'alternate',
                        animationDelay: '0.3s',
                      }}
                    >
                      Memory: 87%
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Animated Stats Banner ─────────────────────────────────────────────── */}
        <section className="border-y border-border bg-muted/30">
          <div
            ref={statsRef}
            className="container mx-auto px-4 sm:px-6 py-10"
          >
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
              <AnimatedStat value={50000} suffix="+" label="Active Users" enabled={statsInView} />
              <AnimatedStat value={87} suffix="%" label="See Results in 30 Days" enabled={statsInView} duration={1400} />
              <AnimatedStat value={12} suffix="M+" label="Training Sessions" enabled={statsInView} duration={2000} />
              <AnimatedStat value={49} suffix="★" label="Average Rating" enabled={statsInView} duration={1200} />
            </div>
          </div>
        </section>

        {/* ── Features Section ──────────────────────────────────────────────────── */}
        <section className="py-16 sm:py-24">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-balance">
                Why Choose NeuroFit Labs?
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
                Science-backed training designed by neuroscientists and powered by cutting-edge AI
              </p>
            </div>

            <div
              ref={featuresRef}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
            >
              {FEATURES.map((feature, idx) => (
                <Card
                  key={idx}
                  className={`border-0 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-500 ${
                    featuresInView
                      ? 'opacity-100 translate-y-0'
                      : 'opacity-0 translate-y-6'
                  }`}
                  style={{ transitionDelay: featuresInView ? `${idx * 100}ms` : '0ms' }}
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

        {/* ── Quiz Section ─────────────────────────────────────────────────────── */}
        <section id="quiz" className="py-16 sm:py-24 bg-muted/30">
          <div className="container mx-auto px-4 sm:px-6">
            {showQuiz ? (
              <BrainQuiz onComplete={() => setShowQuiz(false)} />
            ) : (
              <div className="text-center space-y-6">
                <div className="inline-block text-6xl mb-2">🧠</div>
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
                  Start Free Quiz — 2 minutes
                </Button>
              </div>
            )}
          </div>
        </section>

        {/* ── Testimonials ─────────────────────────────────────────────────────── */}
        <Testimonials />

        {/* ── Pricing Section ──────────────────────────────────────────────────── */}
        <section id="pricing" className="py-16 sm:py-24 bg-muted/30">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">Simple, Transparent Pricing</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
                Start free, upgrade when you&apos;re ready. No hidden fees.
              </p>
            </div>

            <div
              ref={pricingRef}
              className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto"
            >
              {PRICING.map((plan, idx) => (
                <div
                  key={idx}
                  className={`relative rounded-2xl border-2 p-8 flex flex-col transition-all duration-500 ${
                    plan.featured
                      ? 'border-primary bg-primary/5 shadow-xl shadow-primary/10 scale-105'
                      : 'border-border bg-card'
                  } ${
                    pricingInView
                      ? 'opacity-100 translate-y-0'
                      : 'opacity-0 translate-y-8'
                  }`}
                  style={{ transitionDelay: pricingInView ? `${idx * 150}ms` : '0ms' }}
                >
                  {plan.featured && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                      <span className="bg-primary text-primary-foreground text-xs font-bold px-4 py-1.5 rounded-full shadow-lg">
                        MOST POPULAR
                      </span>
                    </div>
                  )}

                  <div className="mb-6">
                    <h3 className="text-xl font-bold mb-1">{plan.name}</h3>
                    <p className="text-muted-foreground text-sm mb-4">{plan.description}</p>
                    <div className="flex items-end gap-1">
                      <span className="text-4xl font-bold">
                        {plan.price === 0 ? 'Free' : `$${plan.price}`}
                      </span>
                      {plan.price > 0 && (
                        <span className="text-muted-foreground pb-1">/{plan.period}</span>
                      )}
                    </div>
                  </div>

                  <ul className="space-y-3 flex-1 mb-8">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-2 text-sm">
                        <Check className="h-4 w-4 text-accent flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Button
                    asChild
                    className={plan.featured
                      ? 'bg-primary hover:bg-primary/90 text-primary-foreground w-full h-11'
                      : 'w-full h-11'
                    }
                    variant={plan.featured ? 'default' : 'outline'}
                  >
                    <Link href={plan.href}>{plan.cta}</Link>
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Final CTA ────────────────────────────────────────────────────────── */}
        <section className="py-16 sm:py-24 bg-gradient-to-r from-primary/5 via-accent/5 to-primary/5">
          <div className="container mx-auto px-4 sm:px-6 text-center space-y-8">
            <div className="space-y-4">
              <h2 className="text-3xl sm:text-4xl font-bold">Ready to Transform Your Mind?</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
                Join 50,000+ users improving their cognitive performance with NeuroFit Labs
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

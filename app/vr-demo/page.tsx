'use client';

import React, { useState } from 'react';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Headset, Smartphone, Monitor } from 'lucide-react';
import { toast } from 'sonner';

export default function VRDemoPage() {
  const [isVRSupported, setIsVRSupported] = useState<boolean | null>(null);
  const [vrAttempted, setVrAttempted] = useState(false);

  React.useEffect(() => {
    if ('xr' in navigator) {
      (navigator.xr as any)
        .isSessionSupported('immersive-vr')
        .then((supported: boolean) => {
          setIsVRSupported(supported);
        })
        .catch(() => {
          setIsVRSupported(false);
        });
    } else {
      setIsVRSupported(false);
    }
  }, []);

  const handleVRLaunch = async () => {
    setVrAttempted(true);
    try {
      if (!('xr' in navigator)) {
        toast.error('WebXR not supported', {
          description: 'Please use a VR-compatible device or headset to launch the full experience.',
        });
        return;
      }

      const session = await (navigator.xr as any).requestSession('immersive-vr', {
        requiredFeatures: ['local-floor'],
        optionalFeatures: ['dom-overlay', 'dom-overlay-for-handheld-ar'],
      });

      toast.success('VR session initializing…', {
        description:
          'In production this renders an interactive 3D brain model with live neural data. Press OK to exit.',
        duration: 5000,
      });

      if (session) {
        await session.end();
      }
    } catch (err) {
      toast.info('VR launch unavailable on this device', {
        description: 'Try on a Meta Quest, PlayStation VR2, or other WebXR headset.',
      });
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero */}
        <section className="py-12 sm:py-16 border-b border-border bg-gradient-to-b from-primary/5 to-transparent">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="space-y-4 animate-fade-in-up">
              <h1 className="text-4xl sm:text-5xl font-bold text-balance">
                Immersive VR Brain Training
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl">
                Experience interactive 3D brain visualization with real-time neural feedback in full
                VR
              </p>
              {isVRSupported !== null && (
                <div
                  className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium ${
                    isVRSupported
                      ? 'bg-green-500/10 text-green-600 border border-green-500/20'
                      : 'bg-yellow-500/10 text-yellow-600 border border-yellow-500/20'
                  }`}
                >
                  <span
                    className={`h-2 w-2 rounded-full ${isVRSupported ? 'bg-green-500' : 'bg-yellow-500'} animate-pulse`}
                  />
                  {isVRSupported ? 'VR Ready — WebXR Detected' : 'VR Not Available on This Device'}
                </div>
              )}
            </div>
          </div>
        </section>

        {/* VR Demo Section */}
        <section className="py-16 sm:py-24">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Left: Animated 3D Brain Visual */}
              <div className="relative h-96 lg:h-full lg:min-h-96">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 rounded-3xl blur-3xl" />
                <div className="relative w-full h-full rounded-3xl bg-gradient-to-br from-primary/10 to-accent/10 border-2 border-primary/30 flex items-center justify-center overflow-hidden">
                  {/* Animated neural network */}
                  <div className="relative w-72 h-72">
                    {/* Orbiting rings */}
                    <div
                      className="absolute inset-0 rounded-full border border-primary/30"
                      style={{ animation: 'spin 8s linear infinite' }}
                    />
                    <div
                      className="absolute inset-4 rounded-full border border-accent/30"
                      style={{ animation: 'spin 5s linear infinite reverse' }}
                    />
                    <div
                      className="absolute inset-8 rounded-full border border-primary/20"
                      style={{ animation: 'spin 12s linear infinite' }}
                    />

                    {/* Pulsing node dots */}
                    {[
                      { top: '8%', left: '50%', delay: '0s' },
                      { top: '50%', left: '8%', delay: '0.5s' },
                      { top: '50%', right: '8%', delay: '1s' },
                      { bottom: '8%', left: '50%', delay: '1.5s' },
                    ].map((pos, i) => (
                      <div
                        key={i}
                        className="absolute h-3 w-3 rounded-full bg-primary/60"
                        style={{ ...pos, animation: `ping 2s ease-in-out ${pos.delay} infinite` }}
                      />
                    ))}

                    {/* Center brain */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div
                        className="text-7xl select-none"
                        style={{ filter: 'drop-shadow(0 0 24px #00AEEF99)' }}
                      >
                        🧠
                      </div>
                    </div>
                  </div>

                  {/* Neural activity overlay */}
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="bg-background/80 backdrop-blur-sm rounded-lg p-3 border border-primary/20">
                      <p className="text-xs text-muted-foreground mb-2 font-mono">
                        NEURAL ACTIVITY
                      </p>
                      <div className="flex gap-1">
                        {Array.from({ length: 20 }).map((_, i) => (
                          <div
                            key={i}
                            className="flex-1 rounded-sm bg-primary/60"
                            style={{
                              height: `${Math.random() * 20 + 4}px`,
                              animation: `pulse ${1 + Math.random()}s ease-in-out infinite`,
                              animationDelay: `${i * 0.1}s`,
                            }}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right: Features */}
              <div className="space-y-6">
                <div>
                  <h2 className="text-3xl font-bold mb-4">Features</h2>
                  <ul className="space-y-5">
                    {[
                      {
                        icon: '🎯',
                        title: 'Interactive Visualization',
                        desc: '360° view of brain neural networks with real-time data overlay',
                      },
                      {
                        icon: '📊',
                        title: 'Live Neural Feedback',
                        desc: 'See your brain activity mapped in real-time during training',
                      },
                      {
                        icon: '🎮',
                        title: 'Immersive Controls',
                        desc: 'Hand tracking and gesture controls for intuitive interaction',
                      },
                      {
                        icon: '🏆',
                        title: 'Competitive Modes',
                        desc: 'Multi-player VR training sessions with leaderboard ranking',
                      },
                    ].map((feature, idx) => (
                      <li key={idx} className="flex gap-4 group">
                        <div className="text-2xl flex-shrink-0 group-hover:scale-110 transition-transform">
                          {feature.icon}
                        </div>
                        <div>
                          <h3 className="font-semibold">{feature.title}</h3>
                          <p className="text-sm text-muted-foreground">{feature.desc}</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>

                <Button
                  onClick={handleVRLaunch}
                  disabled={isVRSupported === false}
                  size="lg"
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground h-12"
                >
                  <Headset className="mr-2 h-5 w-5" />
                  {isVRSupported === null
                    ? 'Checking VR Support…'
                    : isVRSupported
                      ? 'Launch VR Experience'
                      : 'VR Not Supported on This Device'}
                </Button>

                {isVRSupported === false && !vrAttempted && (
                  <p className="text-sm text-muted-foreground text-center">
                    Use a Meta Quest or other WebXR headset for the full experience. The desktop
                    visualization above runs on any device.
                  </p>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Device Compatibility */}
        <section className="py-16 sm:py-24 bg-muted/30">
          <div className="container mx-auto px-4 sm:px-6">
            <h2 className="text-3xl font-bold mb-12 text-center">Device Compatibility</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  icon: Headset,
                  title: 'VR Headsets',
                  items: ['Meta Quest 3', 'PlayStation VR2', 'HTC Vive', 'Valve Index'],
                },
                {
                  icon: Smartphone,
                  title: 'Mobile AR',
                  items: ['iPhone 12+', 'Android ARCore', 'iPad Pro', 'Samsung Galaxy S21+'],
                },
                {
                  icon: Monitor,
                  title: 'Desktop Experience',
                  items: ['WebGL Viewer', 'Standard Display', '3D Visualization', 'Analytics Dashboard'],
                },
              ].map((category, idx) => (
                <Card key={idx} className="hover:shadow-md transition-shadow">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div className="h-9 w-9 rounded-lg bg-primary/10 flex items-center justify-center">
                        <category.icon className="h-5 w-5 text-primary" />
                      </div>
                      <CardTitle>{category.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {category.items.map((item, itemIdx) => (
                        <li key={itemIdx} className="text-sm flex items-center gap-2">
                          <span className="text-accent font-bold">✓</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* System Requirements */}
        <section className="py-16 sm:py-24">
          <div className="container mx-auto px-4 sm:px-6 max-w-2xl">
            <h2 className="text-3xl font-bold mb-8 text-center">System Requirements</h2>

            <div className="space-y-6">
              {[
                {
                  title: 'Minimum VR Requirements',
                  items: [
                    'VR Headset with 6DoF tracking',
                    '90Hz+ display refresh rate',
                    'At least 4GB RAM',
                    'Stable internet connection',
                  ],
                },
                {
                  title: 'Recommended Specs',
                  items: [
                    'High-end VR headset (Meta Quest 3, PlayStation VR2)',
                    '120Hz+ display refresh rate',
                    '8GB+ RAM',
                    'Gigabit ethernet or 5GHz WiFi',
                  ],
                },
              ].map((section, idx) => (
                <Card key={idx}>
                  <CardHeader>
                    <CardTitle className="text-lg">{section.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {section.items.map((item, itemIdx) => (
                        <li key={itemIdx} className="flex items-center gap-3 text-sm">
                          <span className="h-2 w-2 rounded-full bg-primary flex-shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

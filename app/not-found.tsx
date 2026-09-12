import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 flex flex-col items-center justify-center text-center px-4 py-24">
        {/* Animated brain */}
        <div className="relative mb-8">
          <div className="text-[120px] leading-none select-none" style={{ filter: 'drop-shadow(0 0 32px #00AEEF66)' }}>
            🧠
          </div>
          <div
            className="absolute -top-4 -right-4 text-4xl"
            style={{
              animationName: 'bounce',
              animationDuration: '2s',
              animationTimingFunction: 'cubic-bezier(0.8,0,1,1)',
              animationIterationCount: 'infinite',
              animationDirection: 'alternate',
            }}
          >
            ❓
          </div>
        </div>

        {/* Error text */}
        <div className="space-y-4 max-w-lg">
          <p className="text-sm font-semibold uppercase tracking-widest text-primary">Error 404</p>
          <h1 className="text-4xl sm:text-5xl font-bold text-balance">
            Neural pathway not found
          </h1>
          <p className="text-lg text-muted-foreground">
            Looks like this part of your brain hasn&apos;t been trained yet. Let&apos;s get you back to familiar territory.
          </p>
        </div>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-4 mt-10">
          <Button asChild className="bg-primary hover:bg-primary/90 text-primary-foreground h-12 px-8">
            <Link href="/">Back to Home</Link>
          </Button>
          <Button asChild variant="outline" className="h-12 px-8">
            <Link href="/dashboard">Go to Dashboard</Link>
          </Button>
        </div>

        {/* Quick links */}
        <div className="mt-12 flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
          {[
            { href: '/shop', label: 'Shop' },
            { href: '/vr-demo', label: 'VR Demo' },
            { href: '/#quiz', label: 'Take Quiz' },
          ].map(({ href, label }) => (
            <Link key={href} href={href} className="hover:text-primary transition-colors">
              {label} →
            </Link>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}

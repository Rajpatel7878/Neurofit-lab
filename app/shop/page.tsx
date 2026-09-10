'use client';

import React, { useState } from 'react';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { ProductCard } from '@/components/product-card';
import { products } from '@/lib/products';
import { toast } from 'sonner';

export default function ShopPage() {
  const [isProcessing, setIsProcessing] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);

  const handleCheckout = async (productId: string) => {
    setIsProcessing(true);
    setSelectedProductId(productId);

    try {
      const product = products.find((p) => p.id === productId);

      // Call the checkout API route
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productId }),
      });

      const data = await response.json();

      if (!response.ok) throw new Error(data.error || 'Checkout failed');

      // In production: window.location.href = data.sessionUrl
      toast.success(`Order initiated for ${product?.name}!`, {
        description:
          'In production, this redirects to Stripe Checkout. Stripe integration is ready to plug in.',
        duration: 5000,
      });
    } catch (error) {
      console.error('Checkout error:', error);
      toast.error('Checkout failed', {
        description: 'Something went wrong. Please try again.',
      });
    } finally {
      setIsProcessing(false);
      setSelectedProductId(null);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero Header */}
        <section className="py-12 sm:py-16 border-b border-border bg-gradient-to-b from-primary/5 to-transparent">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="space-y-4 animate-fade-in-up">
              <h1 className="text-4xl sm:text-5xl font-bold text-balance">
                Premium Training Solutions
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl">
                Choose the perfect plan for your cognitive enhancement journey
              </p>
            </div>
          </div>
        </section>

        {/* Products Grid */}
        <section className="py-16 sm:py-24">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {products.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onCheckout={handleCheckout}
                  isLoading={isProcessing && selectedProductId === product.id}
                />
              ))}
            </div>

            {/* Info Section */}
            <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold mb-4">What&apos;s Included</h3>
                <ul className="space-y-3 text-muted-foreground">
                  {[
                    'Unlimited training sessions',
                    'Real-time EEG monitoring',
                    'AI-powered personalization',
                    'Community leaderboards',
                  ].map((item) => (
                    <li key={item} className="flex gap-3 items-start">
                      <span className="text-primary mt-0.5 font-bold">✓</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-4">Support &amp; Guarantee</h3>
                <ul className="space-y-3 text-muted-foreground">
                  {[
                    '30-day money-back guarantee',
                    '24/7 customer support',
                    'Free technical setup assistance',
                    'Lifetime software updates',
                  ].map((item) => (
                    <li key={item} className="flex gap-3 items-start">
                      <span className="text-accent mt-0.5 font-bold">✓</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 sm:py-24 bg-muted/30">
          <div className="container mx-auto px-4 sm:px-6">
            <h2 className="text-3xl font-bold mb-12 text-center">Frequently Asked Questions</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
              {[
                {
                  q: 'Can I upgrade my plan later?',
                  a: 'Yes! You can upgrade or downgrade your plan at any time with prorated billing.',
                },
                {
                  q: 'Is the EEG headset compatible with my device?',
                  a: 'Our EEG headset works with all modern VR platforms and mobile devices.',
                },
                {
                  q: "What if I don't see results?",
                  a: "We offer a full 30-day money-back guarantee if you're not satisfied.",
                },
                {
                  q: 'Do I need technical expertise?',
                  a: 'No, our setup is simple and we provide free technical assistance if needed.',
                },
              ].map((item, idx) => (
                <div key={idx} className="space-y-2 p-4 rounded-lg bg-background border">
                  <h3 className="font-semibold">{item.q}</h3>
                  <p className="text-muted-foreground text-sm">{item.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

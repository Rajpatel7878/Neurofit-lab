'use client';

import React from 'react';
import Image from 'next/image';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Check } from 'lucide-react';
import type { Product } from '@/lib/products';

interface ProductCardProps {
  product: Product;
  onCheckout: (productId: string) => void;
  isLoading?: boolean;
}

export function ProductCard({ product, onCheckout, isLoading }: ProductCardProps) {
  return (
    <Card className="flex flex-col h-full hover:shadow-lg transition-shadow">
      {/* Product Image */}
      <div className="relative h-48 w-full overflow-hidden rounded-t-lg bg-muted">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover"
        />
        {product.badge && (
          <div className="absolute top-4 right-4">
            <Badge className="bg-accent text-accent-foreground">{product.badge}</Badge>
          </div>
        )}
      </div>

      <CardHeader>
        <CardTitle className="text-xl">{product.name}</CardTitle>
        <CardDescription>{product.description}</CardDescription>
        <div className="mt-4">
          <div className="flex items-baseline gap-1">
            <span className="text-3xl font-bold text-primary">${product.price.toFixed(2)}</span>
            {product.billingPeriod === 'monthly' && <span className="text-muted-foreground">/month</span>}
          </div>
        </div>
      </CardHeader>

      <CardContent className="flex-1 flex flex-col">
        {/* Features List */}
        <ul className="space-y-3 mb-6 flex-1">
          {product.features.map((feature, idx) => (
            <li key={idx} className="flex gap-2 items-start">
              <Check className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
              <span className="text-sm text-foreground">{feature}</span>
            </li>
          ))}
        </ul>

        {/* CTA Button */}
        <Button
          onClick={() => onCheckout(product.id)}
          disabled={isLoading}
          className="w-full bg-primary hover:bg-primary/90 text-white"
        >
          {isLoading ? 'Processing...' : product.billingPeriod === 'monthly' ? 'Subscribe Now' : 'Buy Now'}
        </Button>
      </CardContent>
    </Card>
  );
}

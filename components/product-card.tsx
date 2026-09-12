'use client';

import React from 'react';
import Image from 'next/image';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Check, Loader2 } from 'lucide-react';
import type { Product } from '@/lib/products';
import { cn } from '@/lib/utils';

interface ProductCardProps {
  product: Product;
  onCheckout: (productId: string) => void;
  isLoading?: boolean;
}

export function ProductCard({ product, onCheckout, isLoading }: ProductCardProps) {
  return (
    <div className={cn('relative', product.featured && 'md:-mt-4')}>
      {/* Featured label */}
      {product.featured && (
        <div className="absolute -top-4 inset-x-0 flex justify-center z-10">
          <span className="bg-primary text-primary-foreground text-xs font-bold px-4 py-1.5 rounded-full shadow-lg">
            MOST POPULAR
          </span>
        </div>
      )}

      <Card
        className={cn(
          'flex flex-col h-full hover:shadow-xl transition-all duration-300 hover:-translate-y-1',
          product.featured
            ? 'border-2 border-primary shadow-lg shadow-primary/10'
            : 'border hover:border-primary/30'
        )}
      >
        {/* Product Image */}
        <div className="relative h-52 w-full overflow-hidden rounded-t-lg bg-muted">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-500 hover:scale-105"
          />
          {/* Overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-background/40 to-transparent" />
          {product.badge && (
            <div className="absolute top-4 right-4">
              <Badge className="bg-accent text-accent-foreground font-semibold shadow-md">
                {product.badge}
              </Badge>
            </div>
          )}
        </div>

        <CardHeader>
          <div className="flex items-start justify-between gap-2">
            <CardTitle className="text-xl">{product.name}</CardTitle>
            {product.featured && (
              <Badge variant="outline" className="border-primary text-primary text-xs flex-shrink-0">
                Popular
              </Badge>
            )}
          </div>
          <CardDescription>{product.description}</CardDescription>
          <div className="mt-4">
            <div className="flex items-baseline gap-1">
              <span className="text-3xl font-bold text-primary">${product.price.toFixed(2)}</span>
              {product.billingPeriod === 'monthly' && (
                <span className="text-muted-foreground">/month</span>
              )}
              {product.billingPeriod === 'one-time' && (
                <span className="text-muted-foreground text-xs">one-time</span>
              )}
            </div>
          </div>
        </CardHeader>

        <CardContent className="flex-1 flex flex-col">
          {/* Features List */}
          <ul className="space-y-2.5 mb-6 flex-1">
            {product.features.map((feature, idx) => (
              <li key={idx} className="flex gap-2 items-start">
                <Check className="h-4 w-4 text-accent flex-shrink-0 mt-0.5" />
                <span className="text-sm text-foreground">{feature}</span>
              </li>
            ))}
          </ul>

          {/* CTA Button */}
          <Button
            onClick={() => onCheckout(product.id)}
            disabled={isLoading}
            className={cn(
              'w-full h-11 font-semibold',
              product.featured
                ? 'bg-primary hover:bg-primary/90 text-primary-foreground'
                : 'bg-secondary hover:bg-secondary/80 text-secondary-foreground'
            )}
            variant={product.featured ? 'default' : 'outline'}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Processing…
              </>
            ) : product.billingPeriod === 'monthly' ? (
              'Subscribe Now'
            ) : (
              'Buy Now'
            )}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

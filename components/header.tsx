'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { BrainLogo } from './brain-logo';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Menu } from 'lucide-react';
import { cn } from '@/lib/utils';

interface HeaderProps {
  variant?: 'default' | 'transparent';
}

const NAV_LINKS = [
  { href: '/shop', label: 'Shop' },
  { href: '/vr-demo', label: 'VR Demo' },
  { href: '/dashboard', label: 'Dashboard' },
];

export function Header({ variant = 'default' }: HeaderProps) {
  const pathname = usePathname();

  return (
    <header
      className={cn(
        'sticky top-0 z-50 w-full border-b transition-colors',
        variant === 'transparent'
          ? 'border-transparent bg-transparent backdrop-blur-sm'
          : 'border-border bg-background/95 backdrop-blur-sm'
      )}
    >
      <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 font-bold text-lg flex-shrink-0">
          <BrainLogo animated />
          <span className="hidden sm:inline bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            NeuroFit Labs
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={cn(
                'text-sm font-medium transition-colors',
                pathname === href
                  ? 'text-primary'
                  : 'text-muted-foreground hover:text-foreground'
              )}
            >
              {label}
            </Link>
          ))}
        </nav>

        {/* Right side: CTA + mobile menu */}
        <div className="flex items-center gap-3">
          <Button
            asChild
            className="hidden sm:inline-flex bg-primary hover:bg-primary/90 text-primary-foreground"
          >
            <Link href="/#quiz">Get Your Brain Plan</Link>
          </Button>

          {/* Mobile hamburger menu */}
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="md:hidden h-9 w-9"
                aria-label="Open menu"
              >
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-72">
              <SheetHeader>
                <SheetTitle>
                  <Link href="/" className="flex items-center gap-2">
                    <BrainLogo animated />
                    <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent font-bold">
                      NeuroFit Labs
                    </span>
                  </Link>
                </SheetTitle>
              </SheetHeader>
              <nav className="flex flex-col gap-1 mt-8">
                {NAV_LINKS.map(({ href, label }) => (
                  <Link
                    key={href}
                    href={href}
                    className={cn(
                      'flex items-center px-4 py-3 rounded-lg text-sm font-medium transition-colors',
                      pathname === href
                        ? 'bg-primary/10 text-primary'
                        : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                    )}
                  >
                    {label}
                  </Link>
                ))}
                <div className="mt-4 px-4">
                  <Button
                    asChild
                    className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
                  >
                    <Link href="/#quiz">Get Your Brain Plan</Link>
                  </Button>
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}

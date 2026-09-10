export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  billingPeriod?: 'monthly' | 'one-time';
  features: string[];
  badge?: string;
  image: string;
}

export const products: Product[] = [
  {
    id: 'eeg_device',
    name: 'EEG Headset',
    description: 'Professional-grade wireless EEG headset with real-time neural feedback',
    price: 199,
    billingPeriod: 'one-time',
    features: [
      '8-channel EEG sensors',
      'Real-time neural data streaming',
      'Wireless connectivity',
      'Premium comfort design',
      '24-month warranty',
      'Lifetime technical support',
    ],
    image: '/products/eeg-device.jpg',
  },
  {
    id: 'subscription_monthly',
    name: 'Monthly Pro Plan',
    description: 'Access to all premium brain training programs and features',
    price: 19.99,
    billingPeriod: 'monthly',
    features: [
      'Unlimited training sessions',
      'AI-powered personalization',
      'Advanced analytics dashboard',
      'Community leaderboards',
      'Priority support',
      'Monthly challenges and rewards',
    ],
    image: '/products/subscription.jpg',
  },
  {
    id: 'bundle',
    name: 'Ultimate Bundle',
    description: 'EEG Headset + 12 months of Pro Plan. Save $34.88!',
    price: 249,
    billingPeriod: 'one-time',
    badge: 'Save $34.88',
    features: [
      'EEG Headset included',
      '12 months Pro Plan',
      'Early access to new features',
      'VIP community access',
      'Quarterly coaching sessions',
      'Custom training programs',
      'Premium support',
    ],
    image: '/products/bundle.jpg',
  },
];

export const productStripeIds: Record<string, string> = {
  eeg_device: process.env.NEXT_PUBLIC_STRIPE_PRODUCT_EEG || '',
  subscription_monthly: process.env.NEXT_PUBLIC_STRIPE_PRODUCT_SUB || '',
  bundle: process.env.NEXT_PUBLIC_STRIPE_PRODUCT_BUNDLE || '',
};

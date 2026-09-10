'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Brain, ChevronRight, RotateCcw, ShoppingCart } from 'lucide-react';
import Link from 'next/link';

interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correct: number;
}

const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    question: 'How often do you struggle with focus during work?',
    options: ['Rarely', 'Sometimes', 'Often', 'Very often'],
    correct: 2,
  },
  {
    id: 2,
    question: 'What is your primary cognitive goal?',
    options: ['Memory improvement', 'Better focus', 'Faster reaction time', 'All of the above'],
    correct: 3,
  },
  {
    id: 3,
    question: 'How many hours daily can you commit to brain training?',
    options: ['Less than 15 minutes', '15–30 minutes', '30–60 minutes', 'Over 1 hour'],
    correct: 1,
  },
];

interface BrainQuizProps {
  onComplete?: (results: { score: number; type: string }) => void;
}

export function BrainQuiz({ onComplete }: BrainQuizProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [completed, setCompleted] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);

  const question = QUIZ_QUESTIONS[currentQuestion];
  const progress = ((currentQuestion + 1) / QUIZ_QUESTIONS.length) * 100;

  const handleNext = () => {
    if (selectedAnswer === null || isAnimating) return;

    setIsAnimating(true);
    const newAnswers = [...answers, parseInt(selectedAnswer)];
    setAnswers(newAnswers);

    setTimeout(() => {
      if (currentQuestion < QUIZ_QUESTIONS.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedAnswer(null);
      } else {
        setCompleted(true);
        const score = Math.round(
          (newAnswers.filter((a, i) => a === QUIZ_QUESTIONS[i].correct).length /
            QUIZ_QUESTIONS.length) *
            100
        );
        onComplete?.({ score, type: 'brain_assessment' });
      }
      setIsAnimating(false);
    }, 250);
  };

  const handleReset = () => {
    setCurrentQuestion(0);
    setAnswers([]);
    setCompleted(false);
    setSelectedAnswer(null);
  };

  if (completed) {
    const correctCount = answers.filter((a, i) => a === QUIZ_QUESTIONS[i].correct).length;
    const score = Math.round((correctCount / QUIZ_QUESTIONS.length) * 100);

    const profile =
      score >= 80
        ? { label: 'Peak Performer', emoji: '🚀', color: 'text-primary' }
        : score >= 60
          ? { label: 'Strong Foundation', emoji: '💪', color: 'text-accent' }
          : { label: 'High Growth Potential', emoji: '🌱', color: 'text-orange-500' };

    const plans: string[] =
      score >= 80
        ? [
            'Elite tier training with advanced neural feedback',
            'Competitive leaderboard participation',
            'Custom neuroplasticity programs',
          ]
        : score >= 60
          ? [
              'Progressive training curriculum',
              'AI-powered skill development',
              'Weekly personalized insights',
            ]
          : [
              'Beginner-friendly foundation training',
              'One-on-one coaching available',
              'Flexible scheduling options',
            ];

    return (
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <div className="flex items-center gap-2 mb-2">
            <Brain className="h-6 w-6 text-primary" />
            <CardTitle>Your Brain Profile</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Score display */}
          <div className="text-center py-4">
            <div className="text-7xl mb-3">{profile.emoji}</div>
            <div className={`text-5xl font-bold mb-2 ${profile.color}`}>{score}%</div>
            <p className={`text-xl font-semibold ${profile.color}`}>{profile.label}</p>
            <p className="text-sm text-muted-foreground mt-2">
              {correctCount} of {QUIZ_QUESTIONS.length} questions matched our optimal pattern
            </p>
          </div>

          {/* Score bar */}
          <div>
            <div className="h-3 bg-muted rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-primary to-accent rounded-full transition-all duration-1000"
                style={{ width: `${score}%` }}
              />
            </div>
            <div className="flex justify-between text-xs text-muted-foreground mt-1">
              <span>Beginner</span>
              <span>Advanced</span>
              <span>Elite</span>
            </div>
          </div>

          {/* Personalized plan */}
          <div className="bg-muted/50 p-5 rounded-xl border">
            <h3 className="font-semibold mb-3 flex items-center gap-2">
              <span>🎯</span> Your Personalized Brain Plan
            </h3>
            <ul className="space-y-2">
            {plans.map((item, i) => (
                <li key={i} className="flex items-start gap-2 text-sm">
                  <span className="text-accent font-bold mt-0.5">✓</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-3">
            <Button
              asChild
              className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground h-12"
            >
              <Link href="/shop">
                <ShoppingCart className="mr-2 h-4 w-4" />
                Get Your Brain Plan
              </Link>
            </Button>
            <Button
              variant="outline"
              onClick={handleReset}
              className="h-12"
            >
              <RotateCcw className="mr-2 h-4 w-4" />
              Retake Quiz
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <div className="flex items-center gap-2 mb-2">
          <Brain className="h-6 w-6 text-primary" />
          <CardTitle>Brain Training Quiz</CardTitle>
        </div>
        <CardDescription>3 quick questions to personalize your training plan</CardDescription>

        {/* Progress bar */}
        <div className="mt-4 bg-muted rounded-full h-2.5 w-full overflow-hidden">
          <div
            className="bg-gradient-to-r from-primary to-accent h-full rounded-full transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="flex justify-between text-xs text-muted-foreground mt-1.5">
          <span>Question {currentQuestion + 1} of {QUIZ_QUESTIONS.length}</span>
          <span>{Math.round(progress)}% complete</span>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        <div
          className={`transition-opacity duration-250 ${isAnimating ? 'opacity-0' : 'opacity-100'}`}
        >
          <h3 className="text-lg font-semibold mb-5">{question.question}</h3>

          <RadioGroup value={selectedAnswer || ''} onValueChange={setSelectedAnswer}>
            <div className="space-y-3">
              {question.options.map((option, idx) => (
                <label
                  key={idx}
                  htmlFor={`option-${idx}`}
                  className={`flex items-center gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all duration-200 ${
                    selectedAnswer === idx.toString()
                      ? 'border-primary bg-primary/5'
                      : 'border-border hover:border-primary/40 hover:bg-muted/30'
                  }`}
                >
                  <RadioGroupItem value={idx.toString()} id={`option-${idx}`} />
                  <span className="flex-1 font-medium text-sm">{option}</span>
                </label>
              ))}
            </div>
          </RadioGroup>
        </div>

        <Button
          onClick={handleNext}
          disabled={selectedAnswer === null || isAnimating}
          className="w-full bg-primary hover:bg-primary/90 text-primary-foreground h-12 text-base"
        >
          {currentQuestion === QUIZ_QUESTIONS.length - 1 ? 'See My Results' : 'Next Question'}
          <ChevronRight className="ml-2 h-5 w-5" />
        </Button>
      </CardContent>
    </Card>
  );
}

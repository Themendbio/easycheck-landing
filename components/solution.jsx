'use client';
import React from 'react';
import { IconWatch, IconChevronRight, IconBellRing } from './icons';
import { useLanguage } from '../contexts/LanguageContext';
import { Reveal } from './ui/Reveal';

// Easycheck — Section 3 "Solution"
// 3 STEP cards w/ connectors + highlight box

/* ─── STEP visuals (presentational only, all static) ─── */

function StepHaloVisual({ Glyph, accentDot = false }) {
  return (
    <div
      className="relative w-full aspect-[4/3] bg-bg-subtle rounded-lg flex items-center justify-center overflow-hidden"
    >
      {/* halo */}
      <div
        aria-hidden="true"
        className="absolute rounded-full"
        style={{
          width: '160px',
          height: '160px',
          background: 'rgba(0,104,183,0.08)',
        }}
      />
      <div className="relative text-brand-primary">
        <Glyph size={64} strokeWidth={1.6} />
        {accentDot && (
          <span
            aria-hidden="true"
            className="absolute rounded-full bg-brand-accent"
            style={{ width: 8, height: 8, top: -2, right: -2 }}
          />
        )}
      </div>
    </div>
  );
}

function StepWaveVisual() {
  // Static PPG-style sine: 4-5 cycles + arrow + 4x4 spectrogram grid
  return (
    <div className="relative w-full aspect-[4/3] bg-bg-subtle rounded-lg flex items-center justify-center px-5 gap-4 overflow-hidden">
      {/* wave */}
      <svg
        viewBox="0 0 200 60"
        className="flex-1 max-w-[180px] text-brand-primary"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        aria-hidden="true"
      >
        <path d="M 2 30
                 C 12 8, 22 8, 32 30
                 S 52 52, 62 30
                 S 82 8, 92 30
                 S 112 52, 122 30
                 S 142 8, 152 30
                 S 172 52, 182 30
                 L 198 30" />
      </svg>

      {/* arrow */}
      <IconChevronRight size={20} className="text-text-tertiary shrink-0" aria-hidden="true" />

      {/* 4x4 spectrogram grid */}
      <div
        className="grid grid-cols-4 gap-[3px] shrink-0"
        style={{ width: 64, height: 64 }}
        aria-hidden="true"
      >
        {[
          0.10, 0.20, 0.35, 0.55,
          0.20, 0.35, 0.55, 0.75,
          0.35, 0.55, 0.75, 0.90,
          0.55, 0.75, 0.90, 1.00,
        ].map((t, i) => (
          <span
            key={i}
            className="rounded-[2px]"
            style={{ background: `rgba(0,104,183,${t})` }}
          />
        ))}
      </div>
    </div>
  );
}

/* ─── STEP timeline row — lg 이상 세로 타임라인 ─── */
function StepTimelineRow({ step, index, isLast }) {
  return (
    <Reveal
      as="article"
      delay={0}
      className="relative grid grid-cols-[88px_1fr] gap-10 xl:gap-14"
    >
      {/* 좌측: 번호 원형 + 세로 라인 */}
      <div className="relative flex flex-col items-center">
        <div
          className="
            relative z-10
            w-16 h-16 rounded-full
            bg-white border-2 border-brand-primary
            flex items-center justify-center
            text-brand-primary font-bold text-[20px]
            shadow-sm
          "
          aria-hidden="true"
        >
          {String(step.n).padStart(2, '0')}
        </div>
        {!isLast && (
          <span
            aria-hidden="true"
            className="flex-1 w-px mt-2"
            style={{ borderLeft: '2px dashed rgba(0,104,183,0.35)' }}
          />
        )}
      </div>

      {/* 우측: 이미지 + 텍스트 */}
      <div className="grid grid-cols-12 gap-10 xl:gap-14 items-center pb-20 xl:pb-24">
        <div className="col-span-5">
          <div className="rounded-2xl overflow-hidden border border-border shadow-sm">
            {step.visual}
          </div>
        </div>
        <div className="col-span-7">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-[13px] font-semibold uppercase tracking-[0.08em] text-brand-primary">
              STEP {step.n}
            </span>
            <span className="block h-px w-8 bg-border-strong" aria-hidden="true" />
          </div>
          <h3
            className="text-[38px] xl:text-[52px] font-bold leading-[1.15] tracking-[-0.025em] text-text-primary mb-5"
            style={{ wordBreak: 'keep-all' }}
          >
            {step.title}
          </h3>
          <p
            className="text-[18px] xl:text-[19px] leading-[1.7] text-text-secondary max-w-[34em]"
            style={{ wordBreak: 'keep-all' }}
          >
            {step.body}
          </p>
        </div>
      </div>
    </Reveal>
  );
}

/* ─── STEP card ─── */
function StepCard({ step, delay }) {
  return (
    <Reveal
      as="article"
      delay={delay}
      className="
        relative flex flex-col bg-white border border-border rounded-xl shadow-sm
        p-6 lg:p-7
        transition-all duration-200 ease-out
        hover:-translate-y-1 hover:shadow-md
      "
    >
      {/* A. STEP number + label */}
      <div className="flex items-center gap-3 mb-6">
        <span
          aria-hidden="true"
          className="
            inline-flex items-center justify-center
            w-8 h-8 rounded-full
            bg-brand-primary-soft text-brand-primary
            text-[14px] font-bold
          "
        >
          {step.n}
        </span>
        <span className="text-[13px] lg:text-[14px] font-semibold uppercase tracking-[0.08em] text-brand-primary">
          STEP {step.n}
        </span>
      </div>

      {/* B. Visual */}
      <div className="mb-6">
        {step.visual}
      </div>

      {/* C. Title */}
      <h3 className="text-[20px] lg:text-[28px] font-semibold leading-[1.4] tracking-[-0.02em] text-text-primary mb-3">
        {step.title}
      </h3>

      {/* D. Body */}
      <p
        className="text-[15px] lg:text-[17px] leading-[1.6] text-text-secondary"
        style={{ wordBreak: 'keep-all' }}
      >
        {step.body}
      </p>
    </Reveal>
  );
}

/* ─── Pulse dot (respects prefers-reduced-motion) ─── */
function PulseDot() {
  return (
    <span
      aria-hidden="true"
      className="absolute rounded-full"
      style={{
        width: 12, height: 12,
        top: 6, right: 6,
        background: '#F39800',
        boxShadow: '0 0 0 0 rgba(243,152,0,0.6)',
        animation: 'pulseAccent 2s ease-in-out infinite',
      }}
    />
  );
}

/* ─── Highlight box ─── */
function HighlightBox() {
  const { t } = useLanguage();

  return (
    <Reveal
      delay={0}
      y={0}
      duration={700}
      className="
        relative overflow-hidden
        bg-brand-deep text-white
        rounded-2xl shadow-lg
        px-8 py-10 lg:px-20 lg:py-16
        mt-20 lg:mt-20
      "
      style={{
        // initial scale handled via inline override since Reveal default uses y-only
      }}
    >
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-12 items-center">
        {/* Left text */}
        <div className="lg:col-span-3">
          <span
            className="block text-[13px] lg:text-[14px] font-semibold uppercase tracking-[0.08em] mb-4"
            style={{ color: '#00AEEB' }}
          >
            {t('solution.highlight.badge')}
          </span>
          <h3
            className="text-[32px] lg:text-[48px] font-bold leading-[1.2] tracking-[-0.025em] text-white mb-4"
            style={{ wordBreak: 'keep-all' }}
          >
            {t('solution.highlight.title')}
          </h3>
          <p
            className="text-[17px] lg:text-[19px] leading-[1.6]"
            style={{ color: 'rgba(255,255,255,0.85)', wordBreak: 'keep-all' }}
          >
            {t('solution.highlight.description')}
          </p>
        </div>

        {/* Right visual (desktop only) */}
        <div className="hidden lg:flex lg:col-span-2 justify-center">
          <div className="relative" style={{ width: 200, height: 200 }}>
            <div
              aria-hidden="true"
              className="absolute inset-0 rounded-full"
              style={{ background: 'rgba(255,255,255,0.08)' }}
            />
            <div className="absolute inset-0 flex items-center justify-center" style={{ color: 'rgba(255,255,255,0.9)' }}>
              <IconBellRing size={80} strokeWidth={1.6} />
            </div>
            <PulseDot />
          </div>
        </div>
      </div>
    </Reveal>
  );
}

/* ─── Mobile connector (vertical dashed line between cards) ─── */
function MobileConnector() {
  return (
    <div className="lg:hidden flex justify-center" aria-hidden="true">
      <span
        className="block"
        style={{
          width: 1, height: 32,
          borderLeft: '1px dashed #CBD2DB',
        }}
      />
    </div>
  );
}

/* ─── Section ─── */
function SolutionSection() {
  const { t } = useLanguage();

  const steps = [
    {
      n: 1,
      title: t('solution.steps.step1.title'),
      body: t('solution.steps.step1.body'),
      visual: <StepHaloVisual Glyph={IconWatch} />,
    },
    {
      n: 2,
      title: t('solution.steps.step2.title'),
      body: t('solution.steps.step2.body'),
      visual: <StepWaveVisual />,
    },
    {
      n: 3,
      title: t('solution.steps.step3.title'),
      body: t('solution.steps.step3.body'),
      visual: <StepHaloVisual Glyph={IconBellRing} accentDot />,
    },
  ];

  return (
    <section
      id="solution"
      className="bg-white"
      aria-labelledby="solution-headline"
      data-screen-label="Solution"
    >
      <div className="mx-auto max-w-8xl px-6 lg:px-20 py-20 lg:py-[120px]">
        {/* Header */}
        <Reveal y={16} className="flex flex-col items-center text-center">
          <h2
            id="solution-headline"
            className="text-[34px] md:text-[40px] lg:text-[52px] font-bold leading-[1.15] tracking-[-0.025em] text-text-primary mb-6"
            style={{ wordBreak: 'keep-all' }}
          >
            {t('solution.title')}
          </h2>

          <p
            className="text-[17px] lg:text-[19px] leading-[1.6] text-text-secondary max-w-[40em] mb-16 lg:mb-20"
            style={{ wordBreak: 'keep-all' }}
          >
            {t('solution.description')}
          </p>
        </Reveal>

        {/* STEP — lg 이상: 세로 타임라인 / lg 미만: 기존 카드 스택 */}
        <div className="relative">
          {/* Desktop timeline */}
          <div className="hidden lg:block">
            {steps.map((s, i) => (
              <StepTimelineRow
                key={s.n}
                step={s}
                index={i}
                isLast={i === steps.length - 1}
              />
            ))}
          </div>

          {/* Mobile stack w/ connectors */}
          <div className="lg:hidden flex flex-col">
            {steps.map((s, i) => (
              <React.Fragment key={s.n}>
                <StepCard step={s} delay={i * 120} />
                {i < steps.length - 1 && <MobileConnector />}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Highlight box */}
        <HighlightBox />
      </div>

      {/* keyframes for pulse */}
      <style>{`
        @keyframes pulseAccent {
          0%, 100% { transform: scale(1);   opacity: 1;   }
          50%      { transform: scale(1.25); opacity: 0.6; }
        }
        @media (prefers-reduced-motion: reduce) {
          [style*="pulseAccent"] { animation: none !important; }
        }
      `}</style>
    </section>
  );
}


export { SolutionSection };

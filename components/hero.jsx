'use client';
import React from 'react';
import { IconMenu, IconPlay, IconCheck } from './icons';

// Easycheck — Nav + Hero section
// React component using design-system tokens (Tailwind extended in index <script>).
// NOTE: 이 Hero는 이전 cta.jsx 의 CtaSection 을 이전한 것으로, 실제로 사용되는 Hero 입니다.

const { useState } = React;

/* ─────────────── NAV ─────────────── */
function Nav() {
    const [open, setOpen] = useState(false);

    return (
        <header className="sticky top-0 z-30 nav-blur border-b border-border">
            <div className="mx-auto max-w-8xl container-x flex items-center justify-between h-16 lg:h-[72px]">
                {/* Wordmark */}
                <a href="#" className="focus-ring rounded-md" aria-label="Easycheck 홈으로">
                    <img
                        src="/images/easycheck-logo.webp"
                        alt="EASYCHECK"
                        className="h-6 lg:h-7 w-auto select-none"
                    />
                </a>

                {/* Desktop links */}
                <nav className="hidden lg:flex items-center gap-8" aria-label="주요 메뉴">
                    <a
                        href="#"
                        className="inline-flex items-center gap-2 bg-brand-accent text-white font-semibold text-[14px] px-4 py-2.5 rounded-lg shadow-sm hover:bg-brand-accent-hover hover:-translate-y-px hover:shadow-md transition-all duration-200 focus-ring"
                        aria-label="다운로드"
                    >
                        다운로드
                    </a>
                </nav>

                {/* Mobile hamburger */}
                <button
                    type="button"
                    className="lg:hidden inline-flex items-center justify-center w-10 h-10 rounded-md text-text-primary hover:bg-bg-subtle focus-ring"
                    aria-label="메뉴 열기"
                    aria-expanded={open}
                    onClick={() => setOpen((v) => !v)}
                >
                    <IconMenu size={22} />
                </button>
            </div>
        </header>
    );
}

/* ─────────────── HERO ─────────────── */
function Hero() {
    const certifications = [
        '식약처 웰니스 기기 인증',
        '신촌세브란스 협업',
        'UNIST 폭염연구센터 협업',
        '연구 데이터 36,000건+',
        'SCI 논문 게재',
    ];

    const stagger = (i) => ({ animationDelay: `${i * 80}ms` });

    return (
        <>
            <section
                aria-labelledby="hero-headline"
                data-screen-label="01 Hero"
                className="relative overflow-hidden hero-video-section"
            >
                {/* ─── 배경 영상 ─── */}
                <video
                    className="hero-video"
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="auto"
                    aria-hidden="true"
                >
                    <source
                        src={
                            "/video/hero-video.mp4"
                        }
                        type="video/mp4"
                    />
                </video>
                {/* ─── 반투명 검정 오버레이 ─── */}
                <div className="hero-video-overlay" aria-hidden="true" />

                <div
                    className="
            relative z-10
            mx-auto max-w-8xl px-6 lg:px-20
            py-28 lg:py-[160px]
            flex flex-col items-start justify-center
          "
                >
                    {/* ─── 텍스트 + CTA + 인증 ─── */}
                    <div className="w-full max-w-[820px] flex flex-col lg:pl-8 xl:pl-12">
                        {/* Headline */}
                        <h1
                            id="hero-headline"
                            className="
                anim-up hero-headline
                text-[44px] lg:text-[80px] font-bold leading-[1.13] tracking-[-0.025em]
                text-white mb-5
              "
                            style={{ ...stagger(1), wordBreak: 'keep-all' }}
                        >
                            <span className="block text-brand-accent">몸이 보내는 SOS,</span>
                            <span className="block">놓치고 계셨나요?</span>
                        </h1>

                        {/* 설명 */}
                        <p
                            className="anim-up text-[17px] lg:text-[19px] leading-[1.6] max-w-[32em] mb-10"
                            style={{
                                ...stagger(2),
                                color: 'rgba(255,255,255,0.88)',
                                textShadow: '0 1px 12px rgba(0,16,40,0.4)',
                            }}
                        >
                            수분 부족은 조용히, 그리고 빠르게 진행됩니다.
                        </p>

                        {/* CTA 버튼 영역 */}
                        <div className="anim-up" style={stagger(3)}>
                            <div className="flex flex-col lg:flex-row lg:items-center gap-3 lg:gap-5">
                                {/* 주 버튼 — Google Play */}
                                <a
                                    href="#"
                                    aria-label="Google Play에서 EASYCHECK 다운로드"
                                    className="
                    inline-flex items-center justify-center gap-2.5
                    w-full max-w-[360px] lg:w-auto lg:max-w-none
                    bg-white text-text-primary font-semibold text-[17px]
                    px-7 py-4 lg:px-8 lg:py-[18px]
                    rounded-lg shadow-md
                    transition-all duration-200 focus-ring cta-primary-btn
                  "
                                >
                                    <IconPlay
                                        size={20}
                                        className="text-brand-primary"
                                        aria-hidden="true"
                                    />
                                    Google Play에서 다운로드
                                </a>
                            </div>

                            {/* 캡션 */}
                            <p
                                className="mt-4 text-[13px] leading-snug"
                                style={{ color: 'rgba(255,255,255,0.7)' }}
                            >
                                무료 다운로드 · 스마트워치 필요
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* ─── Hero 하단 신뢰 정보 띠지 (정적 한 줄) ─── */}
            <div className="trust-band" aria-label="인증 및 연구 정보">
                <div className="mx-auto max-w-8xl px-6 lg:px-12 py-5">
                    <ul className="flex flex-wrap items-center justify-center gap-x-7 gap-y-3 lg:gap-x-9">
                        {certifications.map((c, i) => (
                            <React.Fragment key={c}>
                                <li className="inline-flex items-center gap-2 whitespace-nowrap">
                                    <IconCheck
                                        size={15}
                                        className="text-brand-primary shrink-0"
                                        strokeWidth={2.4}
                                        aria-hidden="true"
                                    />
                                    <span className="text-[14px] lg:text-[15px] font-medium text-text-secondary tracking-[-0.01em]">
                                        {c}
                                    </span>
                                </li>
                                {i < certifications.length - 1 ? (
                                    <li aria-hidden="true" className="hidden lg:block">
                                        <span
                                            className="block w-[5px] h-[5px] rounded-full"
                                            style={{ backgroundColor: '#cbd2db' }}
                                        />
                                    </li>
                                ) : null}
                            </React.Fragment>
                        ))}
                    </ul>
                </div>
            </div>
        </>
    );
}


export { Nav, Hero };

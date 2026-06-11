'use client';
import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { useInView } from '../hooks/useInView';
import { Reveal } from './ui/Reveal';

/* 2. 통계 — 연도별 여름 평균기온 (클린 레이아웃 스타일) */

const { useEffect, useState } = React;

function StatsSection() {
    const { t, locale } = useLanguage();
    const [chartRef, chartInView] = useInView({ threshold: 0.2, rootMargin: '0px 0px -100px 0px' }, [locale]);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 1024);
        };
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    const data = [
        { year: 2019, temp: 24.1 },
        { year: 2020, temp: 23.6 },
        { year: 2021, temp: 24.7 },
        { year: 2022, temp: 24.5 },
        { year: 2023, temp: 24.9 },
        { year: 2024, temp: 25.6 },
        { year: 2025, temp: 25.8 },
        { year: 2026, temp: 26.4 },
    ];

    // 모바일과 데스크톱에서 다른 차트 설정
    const W = isMobile ? 600 : 1280;
    const H = isMobile ? 400 : 500;
    const P = isMobile
        ? { l: 50, r: 50, t: 40, b: 60 } // 모바일: 좌우 균등
        : { l: 80, r: 520, t: 60, b: 80 }; // 데스크톱: 우측 텍스트 공간
    const plotW = W - P.l - P.r;
    const plotH = H - P.t - P.b;
    const tMin = 22,
        tMax = 27;
    const yTicks = [24, 25, 26, 27];

    const x = (i) => P.l + (i / (data.length - 1)) * plotW;
    const y = (t) => P.t + (1 - (t - tMin) / (tMax - tMin)) * plotH;

    const pts = data.map((d, i) => ({ ...d, cx: x(i), cy: y(d.temp) }));
    const last = pts[pts.length - 1];

    const linePath = pts
        .map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.cx.toFixed(2)} ${p.cy.toFixed(2)}`)
        .join(' ');
    const areaPath =
        linePath +
        ` L ${last.cx.toFixed(2)} ${(H - P.b).toFixed(2)}` +
        ` L ${pts[0].cx.toFixed(2)} ${(H - P.b).toFixed(2)} Z`;

    return (
        <section
            id="stats"
            data-screen-label="02 통계"
            aria-label="연도별 여름 평균기온"
            className="px-6 lg:px-20 py-24 md:py-32 bg-bg-subtle border-y border-border"
        >
            <div className="mx-auto max-w-7xl">
                {/* 섹션 헤더 */}
                <div className="text-center mb-8 md:mb-10">
                    {/* 제목 */}
                    <Reveal as="h2" delay={0} className="text-[34px] md:text-[40px] lg:text-[52px] font-bold leading-tight text-text-primary mb-4" style={{ letterSpacing: '-0.02em' }}>
                        {t('stats.title')}
                    </Reveal>

                    {/* 설명 */}
                    <Reveal as="p" delay={100} className="text-[15px] lg:text-[17px] leading-[1.6] text-text-secondary max-w-2xl mx-auto">
                        {t('stats.description')}
                    </Reveal>
                </div>

                {/* 영어일 때 Placeholder */}
                {locale === 'en' ? (
                    <Reveal delay={200} className="flex items-center justify-center py-20 lg:py-32">
                        <div className="text-center max-w-2xl px-6">
                            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-bg-muted mb-6">
                                <svg
                                    className="w-10 h-10 text-text-tertiary"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    aria-hidden="true"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                                    />
                                </svg>
                            </div>
                            <h3 className="text-[24px] lg:text-[32px] font-bold text-text-primary mb-4" style={{ letterSpacing: '-0.02em' }}>
                                Global Climate Data
                            </h3>
                            <p className="text-[15px] lg:text-[17px] text-text-secondary leading-[1.6]" style={{ wordBreak: 'keep-all' }}>
                                Chart visualization with global temperature trends will be displayed here.
                            </p>
                        </div>
                    </Reveal>
                ) : (
                    <>
                <svg
                    ref={chartRef}
                    viewBox={`0 0 ${W} ${H}`}
                    preserveAspectRatio="xMidYMid meet"
                    role="img"
                    aria-label="2019년부터 2026년까지 여름 평균기온 추이 — 2026년이 26.4도로 최고"
                    className={`w-full h-auto ${chartInView ? 'chart-visible' : ''}`}
                >
                    <defs>
                        <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#0068B7" stopOpacity="0.15" />
                            <stop offset="100%" stopColor="#0068B7" stopOpacity="0" />
                        </linearGradient>
                    </defs>

                    {/* ─── 수직 점선 (데스크톱만) ─── */}
                    {!isMobile && (
                        <line
                            x1={last.cx}
                            x2={last.cx}
                            y1={last.cy}
                            y2={H - P.b}
                            stroke="#F39800"
                            strokeWidth="1.5"
                            strokeDasharray="4 4"
                            className="chart-axis-label"
                            style={{ animationDelay: '0.9s' }}
                        />
                    )}

                    {/* ─── 우측 텍스트 박스 (데스크톱만) ─── */}
                    {!isMobile && (
                        <foreignObject x={W - P.r + 40} y={P.t} width={P.r - 60} height={plotH}>
                            <div
                                xmlns="http://www.w3.org/1999/xhtml"
                                style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    height: '100%',
                                    justifyContent: 'center',
                                    fontFamily:
                                        "'Pretendard Variable', Pretendard, -apple-system, sans-serif",
                                }}
                            >
                                {/* 큰 온도 숫자 (Tech 섹션 스타일) */}
                                <div
                                    className="chart-axis-label"
                                    style={{
                                        fontSize: 64,
                                        fontWeight: 800,
                                        lineHeight: 1,
                                        color: '#F39800',
                                        margin: 0,
                                        marginBottom: 16,
                                        letterSpacing: '-0.03em',
                                        animationDelay: '1s',
                                    }}
                                >
                                    {t('stats.chart.temp')}
                                </div>

                                {/* 메인 헤드라인 */}
                                <h3
                                    className="chart-axis-label"
                                    style={{
                                        fontSize: 24,
                                        fontWeight: 700,
                                        lineHeight: 1.3,
                                        color: '#1F2937',
                                        margin: 0,
                                        marginBottom: 12,
                                        letterSpacing: '-0.02em',
                                        animationDelay: '1.05s',
                                    }}
                                >
                                    {t('stats.chart.headline')}
                                </h3>

                                {/* 온도 정보 */}
                                <p
                                    className="chart-axis-label"
                                    style={{
                                        fontSize: 15,
                                        lineHeight: 1.6,
                                        color: '#6B7280',
                                        margin: 0,
                                        marginBottom: 16,
                                        letterSpacing: '-0.01em',
                                        animationDelay: '1.1s',
                                    }}
                                >
                                    {t('stats.chart.comparison')}{' '}
                                    <strong style={{ color: '#F39800', fontWeight: 700 }}>
                                        {t('stats.chart.comparisonValue')}
                                    </strong>
                                </p>

                                {/* 추가 메시지 */}
                                <div
                                    className="chart-axis-label"
                                    style={{
                                        fontSize: 14,
                                        fontWeight: 600,
                                        color: '#9CA3AF',
                                        lineHeight: 1.5,
                                        letterSpacing: '-0.01em',
                                        animationDelay: '1.15s',
                                    }}
                                >
                                    {t('stats.chart.message')}
                                </div>
                            </div>
                        </foreignObject>
                    )}

                    {/* ─── 가로 격자선 + Y축 라벨 ─── */}
                    {yTicks.map((t, i) => (
                        <g
                            key={t}
                            className="chart-axis-label"
                            style={{ animationDelay: `${0.2 + i * 0.03}s` }}
                        >
                            <line
                                x1={P.l}
                                x2={W - P.r}
                                y1={y(t)}
                                y2={y(t)}
                                stroke="#E5E9EF"
                                strokeWidth="1"
                            />
                            <text
                                x={P.l - (isMobile ? 10 : 16)}
                                y={y(t)}
                                textAnchor="end"
                                dominantBaseline="central"
                                fontSize={isMobile ? "12" : "16"}
                                fill="#9CA3AF"
                                fontFamily="Pretendard Variable, Pretendard, sans-serif"
                                style={{ letterSpacing: '-0.01em' }}
                            >
                                {t}°
                            </text>
                        </g>
                    ))}

                    {/* ─── 면적 채움 ─── */}
                    <path d={areaPath} fill="url(#areaGrad)" className="chart-area" />

                    {/* ─── 라인 ─── */}
                    <path
                        d={linePath}
                        fill="none"
                        stroke="#0068B7"
                        strokeWidth={isMobile ? "2.5" : "3"}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        pathLength="1"
                        className="chart-line"
                    />

                    {/* ─── X축 라벨 ─── */}
                    {pts.map((p, i) => (
                        <text
                            key={p.year}
                            x={p.cx}
                            y={H - P.b + (isMobile ? 22 : 28)}
                            textAnchor="middle"
                            fontSize={isMobile ? "12" : "16"}
                            fill={i === pts.length - 1 ? '#1F2937' : '#9CA3AF'}
                            fontWeight={i === pts.length - 1 ? 700 : 400}
                            fontFamily="Pretendard Variable, Pretendard, sans-serif"
                            className="chart-axis-label"
                            style={{
                                letterSpacing: '-0.01em',
                                animationDelay: `${0.3 + i * 0.04}s`,
                            }}
                        >
                            {p.year}
                        </text>
                    ))}

                    {/* ─── 데이터 포인트 ─── */}
                    {pts.slice(0, -1).map((p, i) => (
                        <circle
                            key={p.year}
                            cx={p.cx}
                            cy={p.cy}
                            r={isMobile ? "4" : "5"}
                            fill="#FFFFFF"
                            stroke="#0068B7"
                            strokeWidth={isMobile ? "2" : "2.5"}
                            className="chart-dot"
                            style={{ animationDelay: `${0.2 + i * 0.08}s` }}
                        />
                    ))}

                    {/* ─── 고점 강조 (2026) ─── */}
                    <g>
                        {/* 강조 점 */}
                        <circle
                            cx={last.cx}
                            cy={last.cy}
                            r={isMobile ? "6" : "8"}
                            fill="#F39800"
                            stroke="#FFFFFF"
                            strokeWidth={isMobile ? "2" : "2.5"}
                            className="chart-axis-label"
                            style={{ animationDelay: '0.85s' }}
                        />
                    </g>
                </svg>

                {/* 모바일 텍스트 박스 (차트 아래) */}
                {isMobile && (
                    <Reveal delay={200} className="mt-12 text-center px-4">
                        {/* 큰 온도 숫자 */}
                        <div className="text-[56px] font-bold text-brand-accent mb-4" style={{ letterSpacing: '-0.03em' }}>
                            {t('stats.chart.temp')}
                        </div>

                        {/* 메인 헤드라인 */}
                        <h3 className="text-[24px] md:text-[28px] font-bold text-text-primary mb-3" style={{ letterSpacing: '-0.02em' }}>
                            {t('stats.chart.headline')}
                        </h3>

                        {/* 온도 정보 */}
                        <p className="text-[15px] text-text-secondary mb-4" style={{ letterSpacing: '-0.01em' }}>
                            {t('stats.chart.comparison')}{' '}
                            <strong className="text-brand-accent font-bold">
                                {t('stats.chart.comparisonValue')}
                            </strong>
                        </p>

                        {/* 추가 메시지 */}
                        <div className="text-[14px] font-semibold text-text-tertiary">
                            {t('stats.chart.message')}
                        </div>
                    </Reveal>
                )}
                </>
                )}
            </div>
        </section>
    );
}

export { StatsSection };

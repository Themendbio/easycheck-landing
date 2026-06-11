'use client';
import { IconInfo } from './icons';

// Easycheck — Footer (섹션 7) · 단일 페이지용 단순 버전
// React. Tailwind (extended via index <script>). lucide-equivalent icons (icons.jsx). 정적, 모션 없음.

/* ────────────────── 면책 박스 ────────────────── */
function FooterDisclaimer() {
    return (
        <section
            role="region"
            aria-label="앱 안내사항"
            className="
                flex items-start gap-3 lg:gap-4
                bg-bg-subtle border border-border
                rounded-lg
                px-5 py-5 lg:px-8 lg:py-6
                mb-10 lg:mb-12
            "
        >
            <span className="shrink-0 mt-0.5 text-text-secondary" aria-hidden="true">
                <IconInfo size={20} strokeWidth={1.8} />
            </span>
            <div className="min-w-0">
                <p
                    className="
                        text-[12px] lg:text-[13px] font-semibold
                        uppercase tracking-[0.08em] text-text-tertiary
                        leading-none mb-1
                    "
                >
                    안내사항
                </p>
                <p
                    className="text-[14px] lg:text-[15px] font-normal text-text-secondary leading-[1.6] m-0"
                    style={{ wordBreak: 'keep-all' }}
                >
                    본 앱은 의료기기가 아닌 웰니스 기기입니다. EASYCHECK가 제공하는 수분 지수는
                    참고용 정보이며, 의학적 진단·치료의 목적으로 사용되지 않습니다.
                </p>
            </div>
        </section>
    );
}

/* ────────────────── 푸터 본체 ────────────────── */
function Footer() {
    return (
        <footer className="bg-white border-t border-border" aria-labelledby="footer-heading">
            <h2 id="footer-heading" className="sr-only">
                사이트 푸터
            </h2>

            <div
                className="
                    mx-auto max-w-8xl px-6 lg:px-20
                    py-12 lg:py-16
                "
            >
                {/* 1. 면책 박스 */}
                <FooterDisclaimer />

                {/* 2. 브랜드 + 모회사 (좌측 정렬, 단순) */}
                <div className="flex flex-col gap-3 items-start">
                    <img
                        src="/images/easycheck-logo.webp"
                        alt="EASYCHECK"
                        className="h-8 lg:h-9 w-auto select-none"
                    />
                    <span
                        className="
                            inline-flex items-center self-start
                            h-8 px-3
                            bg-bg-muted rounded-md
                        "
                        aria-label="모회사"
                    >
                        <span className="text-[12px] lg:text-[13px] font-medium text-text-tertiary leading-none whitespace-nowrap">
                            The M.E.N.D. BioSimulator
                        </span>
                    </span>
                </div>

                {/* 3. 하단 영역 — 저작권 + 사업자 정보 */}
                <div
                    className="
                        mt-10 lg:mt-12 pt-6 lg:pt-8
                        border-t border-border
                        flex flex-col gap-2
                    "
                >
                    <p className="text-[12px] lg:text-[13px] font-normal text-text-tertiary leading-[1.6] m-0">
                        © 2026 EASYCHECK. 더멘드바이오시뮬레이터(주). All rights reserved.
                    </p>
                    <p
                        className="text-[12px] lg:text-[13px] font-normal text-text-tertiary leading-[1.6] m-0"
                        style={{ wordBreak: 'keep-all' }}
                    >
                        사업자등록번호: 000-00-00000 · 대표: [대표자명] · 주소: [회사 주소]
                    </p>
                </div>
            </div>
        </footer>
    );
}

export { Footer };

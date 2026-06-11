// Easycheck — Section 5 "Tech / Differentiation"
// Header → Stats strip → 2×2 cards

const { useEffect, useRef, useState } = React;

// ─── useInView hook (IntersectionObserver, re-triggers on every entry) ───
function useInView(options = { threshold: 0.15, rootMargin: '0px 0px -80px 0px' }) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    // Reduce motion: skip observer, show immediately.
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setInView(true);
      return;
    }
    const io = new IntersectionObserver(([entry]) => {
      // Toggle on every entry/exit so the animation replays on re-scroll.
      setInView(entry.isIntersecting);
    }, options);
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return [ref, inView];
}

// 카운팅 애니메이션 훅
function useCountUp(end, duration = 1000, inView) {
  const [count, setCount] = useState(0);
  const hasAnimatedRef = useRef(false);

  useEffect(() => {
    if (!inView || hasAnimatedRef.current) return;

    hasAnimatedRef.current = true;
    let startTime = null;

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      const percentage = Math.min(progress / duration, 1);

      // easeOutExpo 곡선
      const easeOut = 1 - Math.pow(2, -10 * percentage);
      const current = easeOut * end;

      setCount(current);

      if (percentage < 1) {
        requestAnimationFrame(animate);
      } else {
        setCount(end); // 정확한 최종값 설정
      }
    };

    requestAnimationFrame(animate);
  }, [end, duration, inView]);

  return count;
}

function StatItem({ value, label, caption, inView }) {
  // 숫자 추출 (89.5, 36000, 195, 600 등)
  const numMatch = value.match(/[\d.]+/);
  const num = numMatch ? parseFloat(numMatch[0]) : 0;
  const suffix = value.replace(/[\d.]+/, '').trim(); // %, 건+, 명 등

  const count = useCountUp(num, 1000, inView);

  // 소수점 처리
  const hasDecimal = value.includes('.');
  const displayValue = hasDecimal ? count.toFixed(1) : Math.floor(count).toLocaleString();

  return (
    <div className="flex flex-col items-center text-center px-4 py-2">
      <span
        className="font-bold leading-[1.05] text-brand-primary text-[36px] md:text-[48px] lg:text-[56px]"
        style={{
          letterSpacing: '-0.03em'
        }}>

        {displayValue}{suffix}
      </span>
      <span className="mt-4 text-[15px] lg:text-[16px] font-semibold text-text-primary">
        {label}
      </span>
      <span className="mt-1.5 text-[13px] lg:text-[14px] text-text-secondary">
        {caption}
      </span>
    </div>);

}

function TechCard({ card, delay }) {
  const isHL = card.isHighlight;
  return (
    <Reveal
      as="article"
      delay={delay}
      className={`
        flex flex-col rounded-xl border border-border shadow-sm
        p-7 lg:p-8
        transition-all duration-200 ease-out
        hover:-translate-y-1 hover:shadow-md
        ${isHL ? 'bg-brand-primary-soft' : 'bg-white'}
      `}>
      
      {/* A. 아이콘 + pill 라벨 */}
      <div className="flex items-center justify-between gap-3">
        <span
          aria-hidden="true"
          className="inline-flex items-center justify-center rounded-full shrink-0"
          style={{
            width: 56,
            height: 56,
            background: isHL ? 'rgba(0,104,183,0.12)' : '#E6F0F9',
            color: '#0068B7'
          }}>

          <card.Icon size={32} strokeWidth={1.8} />
        </span>

        {card.pill ? (
          <span
            className={`
              inline-flex items-center shrink-0
              text-[12px] lg:text-[13px] font-semibold tracking-[-0.01em]
              px-3 py-1.5 rounded-full whitespace-nowrap
              ${isHL
                ? 'bg-brand-primary text-white'
                : 'bg-white text-text-secondary border border-border'}
            `}>
            {card.pill}
          </span>
        ) : null}
      </div>

      {/* B. 제목 */}
      <h3
        className="mt-6 text-[24px] lg:text-[36px] font-bold leading-[1.3] tracking-[-0.025em] text-text-primary"
        style={{ wordBreak: 'keep-all' }}>

        {card.title}
      </h3>

      {/* C. 본문 */}
      <p
        className="mt-3 text-[15px] lg:text-[17px] leading-[1.6] text-text-secondary"
        style={{ wordBreak: 'keep-all' }}>
        
        {card.body}
      </p>
    </Reveal>);

}

function TechSection() {
  const [statsRef, statsInView] = useInView({ threshold: 0.3, rootMargin: '0px 0px -100px 0px' });

  const stats = [
  { value: '89.5%', label: '수분 지수 정확도', caption: '연구 검증 수치' },
  { value: '3.6만+건', label: '다기관 연구 PPG 데이터', caption: '축적 데이터' },
  { value: '195명', label: '세브란스 협업 연구', caption: '임상 연구 참여' },
  { value: '600+명', label: '총 연구 참여자', caption: '누적 피험자' }];


  const cards = [
  {
    isHighlight: true,
    pill: '정확도 0.895',
    Icon: IconTarget,
    title: 'PPG → 스펙트로그램 변환 AI',
    body: '단순 파형 분석이 아닌 시간-주파수 변환(STFT/CWT)을 통해 수분 상태를 확인하는 멀티모델 딥러닝 앙상블 기술'
  },
  {
    pill: '세브란스 협업',
    Icon: IconBuilding2,
    title: '세브란스 병원 연구 기반 개발',
    body: '신촌세브란스 응급의학과와의 협업으로 195명의 연구 데이터를 기반으로 알고리즘을 개발 및 검증'
  },
  {
    pill: '스마트워치 전용',
    Icon: IconWatch,
    title: '스마트워치 전용 최적화',
    body: '스마트워치 PPG 센서에 최적화된 신호처리 파이프라인으로 일상 착용 중에도 정확한 측정 가능'
  },
  {
    pill: '선제적 알림',
    Icon: IconBellRing,
    title: '선제적 알림 시스템',
    body: '갈증이 느껴지기 이전, 수분 지수가 기준치에 도달하는 즉시 알림을 보내는 알림 중심 알고리즘'
  }];


  return (
    <section
      id="tech"
      className="bg-white"
      aria-labelledby="tech-headline"
      data-screen-label="Tech">
      
      <div className="mx-auto max-w-8xl px-6 lg:px-20 py-20 lg:py-[120px]">
        {/* Header */}
        <Reveal y={16} className="js-hdr vary-left flex flex-col items-center text-center">
          <h2
            id="tech-headline"
            className="text-[34px] md:text-[40px] lg:text-[52px] font-bold leading-[1.15] tracking-[-0.025em] text-text-primary mb-6"
            style={{ wordBreak: 'keep-all' }}>

            다른 어플은 기록합니다<br />EASYCHECK는 예방합니다
          </h2>

          <p
            className="text-[17px] lg:text-[19px] leading-[1.6] text-text-secondary max-w-[40em] mb-16 lg:mb-20"
            style={{ wordBreak: 'keep-all' }}>
            
            갈증은 탈수의 마지막 신호입니다. EASYCHECK는 그 전에 먼저 움직입니다.
          </p>
        </Reveal>

        {/* Stats strip */}
        <Reveal delay={100} y={16}>
          <dl
            className="
              bg-bg-subtle rounded-xl
              px-6 py-10 lg:px-12 lg:py-12
              grid grid-cols-2 lg:grid-cols-4
              gap-y-8 lg:gap-y-0
              mb-16 lg:mb-20
            "
            ref={statsRef}
            aria-label="연구 지표">

            {stats.map((s, i) =>
            <div
              key={s.label}
              className={`
                  ${i > 0 ? 'lg:border-l lg:border-border' : ''}
                `}>

                <dt className="sr-only">{s.label}</dt>
                <dd className="m-0">
                  <StatItem {...s} inView={statsInView} />
                </dd>
              </div>
            )}
          </dl>
        </Reveal>

        {/* 2×2 cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
          {cards.map((c, i) =>
          <TechCard key={c.title} card={c} delay={200 + i * 100} />
          )}
        </div>
      </div>
    </section>);

}

Object.assign(window, { TechSection, TechCard, StatItem });
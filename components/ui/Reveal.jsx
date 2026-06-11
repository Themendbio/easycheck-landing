'use client';
import { useInView } from '../../hooks/useInView';

// 스크롤 진입 시 fade + slide-up 애니메이션을 적용하는 래퍼.
export function Reveal({
    as: Tag = 'div',
    delay = 0,
    y = 24,
    duration = 600,
    className = '',
    children,
    ...rest
}) {
    const [ref, inView] = useInView();
    const style = {
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateY(0)' : `translateY(${y}px)`,
        transition: `opacity ${duration}ms cubic-bezier(0.22,1,0.36,1) ${delay}ms, transform ${duration}ms cubic-bezier(0.22,1,0.36,1) ${delay}ms`,
        willChange: 'opacity, transform',
    };
    return (
        <Tag ref={ref} className={className} style={style} {...rest}>
            {children}
        </Tag>
    );
}

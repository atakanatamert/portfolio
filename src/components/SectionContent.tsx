"use client";
import { rectBorderVariants } from "@/animations/ContentAnimations";
import { AnimatePresence, motion } from "framer-motion";
import {
    forwardRef,
    useCallback,
    useContext,
    useEffect,
    useImperativeHandle,
    useRef,
    useState,
} from "react";

import AnimationContext from "@/contexts/AnimationContext";
import { Action, Reference } from "@/enums";

interface ILogoColorRefs {
    anchorRef: HTMLDivElement | null;
    logoRef: HTMLDivElement | null;
}
const SectionContent = forwardRef<ILogoColorRefs>(({ }, ref) => {
    const { animationReferences, content } = useContext(AnimationContext);

    const containerRef = animationReferences[Reference.CONTAINER].scope;

    const borderRef = animationReferences[Reference.BORDER].scope;

    const anchorRef = useRef<HTMLDivElement>(null);

    const logoRef = useRef<HTMLDivElement>(null);

    const [overflow, setOverflow] = useState({ above: false, below: false });

    useImperativeHandle(ref, () => ({
        anchorRef: anchorRef.current,
        logoRef: logoRef.current,
    }));

    const updateOverflow = useCallback(() => {
        const el: HTMLDivElement | null = containerRef.current;
        if (!el) return;
        const above = el.scrollTop > 1;
        const below = el.scrollTop + el.clientHeight < el.scrollHeight - 1;
        setOverflow((prev) =>
            prev.above === above && prev.below === below ? prev : { above, below }
        );
    }, [containerRef]);

    useEffect(() => {
        containerRef.current.scrollTo(0, 0);
        updateOverflow();
    }, [content, containerRef, updateOverflow]);

    useEffect(() => {
        const el: HTMLDivElement | null = containerRef.current;
        if (!el) return;
        const observer = new ResizeObserver(updateOverflow);
        observer.observe(el);
        Array.from(el.children).forEach((child) => observer.observe(child));
        return () => observer.disconnect();
    }, [content, containerRef, updateOverflow]);

    return (
        <div className="relative w-full h-full sm:h-auto sm:aspect-square sm:w-[min(100cqw,100cqh)]">
            <AnimatePresence>
                <motion.div
                    key="information-container"
                    initial={false}
                    ref={containerRef}
                    onScroll={updateOverflow}
                    data-more-above={overflow.above}
                    data-more-below={overflow.below}
                    className="info-container absolute inset-[1.5%] z-20 text-white"
                >
                    {content.type === Action.LOGO ? (
                        <div
                            id="anchor"
                            className="w-full h-full relative z-0"
                            ref={anchorRef}
                        >
                            <div
                                id="blur"
                                className="w-full h-full flex flex-row justify-center "
                                ref={logoRef}
                            >
                                {content.current}
                            </div>
                        </div>
                    ) : (
                        content.current
                    )}
                </motion.div>
                <motion.svg
                    key="rectangle-container"
                    className="absolute inset-0 h-full w-full overflow-visible pointer-events-none"
                >
                    <motion.rect
                        initial={rectBorderVariants.hidden()}
                        ref={borderRef}
                        width="99.4%"
                        height="99.4%"
                        y="0.3%"
                        x="0.3%"
                        rx="8"
                        stroke="#ffffff"
                        strokeWidth="2"
                        custom={3}
                    />
                </motion.svg>
            </AnimatePresence>
        </div>
    );
});

SectionContent.displayName = "SectionContent";

export default SectionContent;

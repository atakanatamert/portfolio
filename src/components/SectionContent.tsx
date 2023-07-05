"use client";
import { rectBorderVariants } from "@/animations/ContentAnimations";
import { AnimatePresence, motion } from "framer-motion";
import {
    forwardRef,
    useContext,
    useEffect,
    useImperativeHandle,
    useRef,
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

    useImperativeHandle(ref, () => ({
        anchorRef: anchorRef.current,
        logoRef: logoRef.current,
    }));

    useEffect(() => {
        containerRef.current.scrollTo(0, 0);
    }, [content, containerRef]);

    return (
        <AnimatePresence>
            <motion.div
                key="information-container"
                initial={false}
                ref={containerRef}
                className={`info-container z-20 text-white row-start-1 col-start-1 aspect-square max-h-[98%] overflow-scroll 
                    }`}
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
            <div key="rectangle-container" className="row-start-1 col-start-1">
                <motion.svg width="100%" viewBox="0 0 100 100" className="float-left">
                    <motion.rect
                        initial={rectBorderVariants.hidden()}
                        ref={borderRef}
                        width="99.4%"
                        height="99.4%"
                        y="0.3%"
                        x="0.3%"
                        rx="2"
                        stroke="#ffffff"
                        strokeWidth="0.5"
                        custom={3}
                    />
                </motion.svg>
            </div>
        </AnimatePresence>
    );
});

SectionContent.displayName = "SectionContent";

export default SectionContent;

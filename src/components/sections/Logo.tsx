import AnimationContext from "@/contexts/AnimationContext";
import { motion } from "framer-motion";
import { forwardRef, useContext, useImperativeHandle, useRef } from "react";
import { isIOS, isSafari } from "react-device-detect";

const inOutVariant = {
    open: {
        y: 0,
        opacity: 1,
        transition: {
            y: {
                stiffness: 1000,
                velocity: -100,
            },
        },
    },
    close: {
        y: 50,
        opacity: 0,
        transition: {
            y: {
                stiffness: 1000,
            },
        },
    },
};

const Logo = (
    props: {},
    ref: React.Ref<{ anchor: HTMLDivElement; logo: HTMLDivElement }>
) => {
    const references = useContext(AnimationContext);
    const anchor = useRef(null);
    const logo = useRef(null);

    useImperativeHandle(ref, () => ({
        get anchor() {
            return anchor.current!;
        },
        get logo() {
            return logo.current!;
        },
    }));

    return (
        <motion.div
            variants={inOutVariant}
            id="anchor"
            className="w-full h-full relative z-0"
            ref={anchor}
        >
            <div
                ref={logo}
                className="absolute inset-0 flex justify-center items-center z-10"
            >
                <video autoPlay loop muted playsInline>
                    <source
                        src="/assets/videos/LogoAnimationApple_H.265.mp4"
                        type="video/mp4;codecs=hvc1"
                    />
                    <source
                        src="/assets/videos/LogoAnimationLight.webm"
                        type="video/webm"
                    />
                </video>
            </div>
        </motion.div>
    );
};

export default forwardRef(Logo);

// animate={isVisible ? "close" : "open"}
// ref={logo}

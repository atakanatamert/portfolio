import { listItemVariants } from "@/animations/ContentAnimations";
import AnimationContext from "@/contexts/AnimationContext";
import { motion } from "framer-motion";
import { forwardRef, useContext, useImperativeHandle, useRef } from "react";
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
            variants={listItemVariants}
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
                        src="https://res.cloudinary.com/dsmzhrgji/video/upload/v1688584788/p1fme3oz7rguxkvt0w8e.webm"
                        type="video/webm"
                    />
                    <source
                        src="https://res.cloudinary.com/dsmzhrgji/video/upload/v1688584898/jge1je0nuqnfxvdmnear.mp4"
                        type="video/mp4;codecs=hvc1"
                    />
                </video>
            </div>
        </motion.div>
    );
};

export default forwardRef(Logo);

// animate={isVisible ? "close" : "open"}
// ref={logo}

"use client";

import AnimationContext from "@/contexts/AnimationContext";
import HeaderContext from "@/contexts/HeaderContext";
import { MouseEvent, useContext, useEffect, useState } from "react";

const BlinkingHeader = ({ headerText }: { headerText: string }) => {
    const { hoverActions } = useContext(HeaderContext);

    const { updateContent, content, isDisabled } = useContext(AnimationContext);

    const [blink, setBlink] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            setBlink(!blink);
        }, 500);
    }, [blink]);

    let currentHover = hoverActions?.hover;

    const handleHover = () => {
        hoverActions?.setHover(headerText);
    };

    const handleClick = (event: MouseEvent) => {
        event.stopPropagation();
        event.nativeEvent.stopPropagation();
        if (!isDisabled) {
            updateContent({ type: headerText });
        }
    };

    const textColor =
        content.type === headerText ? "text-white" : "text-gray-400";

    return (
        <button
            type="button"
            id={headerText}
            onMouseEnter={handleHover}
            onFocus={handleHover}
            onClick={handleClick}
            aria-pressed={content.type === headerText}
            className={`block ml-auto mb-[1.5vh] cursor-pointer focus:outline-none focus-visible:text-white ${textColor}`}
        >
            {currentHover === headerText
                ? blink
                    ? `>_\xa0${headerText}`
                    : `>\xa0\xa0\xa0\xa0${headerText}`
                : `${headerText}`}
        </button>
    );
};

export default BlinkingHeader;

"use client";

import AnimationContext from "@/contexts/AnimationContext";
import HeaderContext from "@/contexts/HeaderContext";
import { MouseEvent, useContext, useEffect, useState } from "react";

const BlinkingHeader = ({ headerText }: { headerText: string }) => {
    const { hoverActions, contentMap } = useContext(HeaderContext);

    const { updateContent, content, isDisabled } = useContext(AnimationContext);

    const [blink, setBlink] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            setBlink(!blink);
        }, 500);
    }, [blink]);

    let currentHover = hoverActions?.hover;

    const handleHover = (event: MouseEvent) => {
        hoverActions?.setHover(headerText);
    };

    const handleClick = (event: MouseEvent) => {
        event.stopPropagation();
        event.nativeEvent.stopPropagation();
        if (!isDisabled) {
            updateContent({ type: headerText, payload: contentMap?.get(headerText) });
        }
    };

    const textColor =
        content.type === headerText ? "text-white" : "text-gray-400";

    return (
        <h1
            id={headerText}
            onMouseEnter={handleHover}
            onClick={handleClick}
            className={`mb-[1.5vh] cursor-pointer ${textColor}`}
        >
            {currentHover === headerText
                ? blink
                    ? `>_\xa0${headerText}`
                    : `>\xa0\xa0\xa0\xa0${headerText}`
                : `${headerText}`}
        </h1>
    );
};

export default BlinkingHeader;

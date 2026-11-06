"use client";

import { useContext } from "react";
import AnimationContext from "@/contexts/AnimationContext";
import { Action } from "@/enums";

const HomeLink = ({ children }: { children: React.ReactNode }) => {
    const { updateContent, isDisabled } = useContext(AnimationContext);

    return (
        <button
            type="button"
            onClick={() => !isDisabled && updateContent({ type: Action.LOGO })}
            className="cursor-pointer hover:text-gray-300 focus:outline-none focus-visible:text-gray-300"
        >
            {children}
        </button>
    );
};

export default HomeLink;

"use client";

import { createContext, useReducer, useState } from "react";

import Logo from "@/components/sections/Logo";
import {
    closeBorder,
    closeContent,
    openBorder,
    openContent,
} from "@/animations/ContentActions";
import contentReducer from "@/reducers/ContentReducer";
import { IAnimationObject, IReducerAction, IReducerState } from "@/types";
import { Action } from "@/enums";

const initialValue: IReducerState = {
    type: Action.LOGO,
    current: <Logo />,
    border: false,
};

const AnimationContext = createContext<{
    animationReferences: IAnimationObject;
    updateContent: Function;
    content: IReducerState;
    isDisabled: boolean;
}>({
    animationReferences: {},
    updateContent: () => { },
    content: { type: Action.LOGO, current: <Logo />, border: false },
    isDisabled: false,
});

export const AnimationProvider = ({
    animationReferences,
    children,
}: {
    animationReferences: IAnimationObject;
    children: React.ReactNode;
}) => {
    const [content, dispatch] = useReducer(contentReducer, initialValue);

    const [isDisabled, setIsDisabled] = useState(false);

    const updateContent = async (action: IReducerAction) => {
        const next = contentReducer(content, action);
        if (next.type === content.type) {
            return;
        }
        setIsDisabled(true);
        if (content.border) {
            await closeBorder(animationReferences);
        }
        await closeContent(animationReferences);
        dispatch({
            type: action.type,
        });
        if (next.border) {
            openBorder(animationReferences);
        }
        openContent(animationReferences);
        setIsDisabled(false);
    };

    const value = {
        animationReferences,
        updateContent,
        content,
        isDisabled,
    };

    return (
        <AnimationContext.Provider value={value}>
            {children}
        </AnimationContext.Provider>
    );
};

export default AnimationContext;

"use client";

import {
    createContext,
    useReducer,
    Reducer,
    useContext,
    useEffect,
    Dispatch,
} from "react";

import type { IAnimationObject } from "../types/AnimationTypes";
import { Action } from "@/types/ActionTypes";
import Logo from "@/components/sections/Logo";
import {
    closeBorder,
    closeContent,
    openBorder,
    openContent,
} from "@/animations/ContentActions";
import contentReducer from "@/reducers/ContentReducer";
import { References } from "@/types/ReferenceTypes";
import Projects from "@/components/sections/Projects";
import { ImportOrExportSpecifier } from "typescript";

interface IReducerState {
    type: Action;
    current: JSX.Element;
    border: boolean;
}

interface IActionType {
    type: Action;
    payload?: JSX.Element;
}

const initialValue: IReducerState = {
    type: Action.LOGO,
    current: <Logo />,
    border: false,
};

const AnimationContext = createContext<{
    animationReferences: IAnimationObject;
    updateContent: Function;
    content: IReducerState;
}>({
    animationReferences: {},
    updateContent: () => { },
    content: { type: Action.LOGO, current: <Logo />, border: false },
});

export const AnimationProvider = ({
    animationReferences,
    children,
}: {
    animationReferences: IAnimationObject;
    children: JSX.Element;
}) => {
    const [content, dispatch] = useReducer<Reducer<IReducerState, IActionType>>(
        contentReducer,
        initialValue
    );

    const updateContent = async (action: IActionType) => {
        if (content.border) {
            await closeBorder(animationReferences);
        }
        await closeContent(animationReferences);
        dispatch({
            type: action.type,
        });
        if (action.type !== content.type) {
            //This is the case for clicking on same option for second time
            openBorder(animationReferences);
        }
        openContent(animationReferences);
    };

    const value = {
        animationReferences,
        updateContent,
        content,
    };

    return (
        <AnimationContext.Provider value={value}>
            {children}
        </AnimationContext.Provider>
    );
};

export default AnimationContext;

import type { JSX } from "react";
import About from "@/components/sections/About";
import Blog from "@/components/sections/Blog";
import Contact from "@/components/sections/Contact";
import Logo from "@/components/sections/Logo";
import Projects from "@/components/sections/Projects";
import Work from "@/components/sections/Work";
import { Action } from "@/enums";
import { IReducerAction, IReducerState } from "@/types";

const sections: Partial<Record<Action, () => JSX.Element>> = {
    [Action.WORK]: () => <Work />,
    [Action.PROJECTS]: () => <Projects />,
    [Action.BLOG]: () => <Blog />,
    [Action.ABOUT]: () => <About />,
    [Action.CONTACT]: () => <Contact />,
};

const logo: IReducerState = {
    type: Action.LOGO,
    current: <Logo />,
    border: false,
};

// Selecting the open section again closes it and goes back to the logo.
const contentReducer = (
    state: IReducerState,
    action: IReducerAction
): IReducerState => {
    const render = sections[action.type];
    if (!render || state.type === action.type) {
        return logo;
    }
    return { type: action.type, current: render(), border: true };
};

export default contentReducer;

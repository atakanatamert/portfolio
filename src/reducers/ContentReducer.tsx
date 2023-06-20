import About from "@/components/sections/About";
import Certificates from "@/components/sections/Certificates";
import Logo from "@/components/sections/Logo";
import Projects from "@/components/sections/Projects";
import { Action } from "@/types/ActionTypes";

interface IReducerState {
    type: Action;
    current: JSX.Element;
    border: boolean;
}

interface IActionType {
    type: Action;
    payload?: JSX.Element;
}

const contentReducer = (
    state: IReducerState,
    action: IActionType
): IReducerState => {
    const logo = {
        type: Action.LOGO,
        current: <Logo />,
        border: false,
    };
    switch (action.type) {
        case Action.LOGO:
            return logo;

        case Action.PROJECTS:
            console.log("State Type: \n", state.type);
            if (state.type === Action.PROJECTS) {
                return logo;
            }
            return {
                type: Action.PROJECTS,
                current: <Projects />,
                border: true,
            };
        case Action.CERTS:
            if (state.type === Action.CERTS) {
                return logo;
            }
            return {
                type: Action.CERTS,
                current: <Certificates />,
                border: true,
            };
        case Action.ABOUT:
            if (state.type === Action.ABOUT) {
                return logo;
            }
            return {
                type: Action.ABOUT,
                current: <About />,
                border: true,
            };
        default:
            return {
                type: Action.LOGO,
                current: <Logo />,
                border: false,
            };
    }
};

export default contentReducer;
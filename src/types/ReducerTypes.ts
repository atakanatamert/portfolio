import { Action } from "@/enums";

export interface IReducerState {
    type: Action;
    current: JSX.Element;
    border: boolean;
}

export interface IReducerAction {
    type: Action;
    payload?: JSX.Element;
}

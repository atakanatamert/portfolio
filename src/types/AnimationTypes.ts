import { AnimationScope } from "framer-motion";

export interface IAnimationObject {
    [key: string]: {
        scope: AnimationScope;
        animate: Function;
        render?: JSX.Element;
    };
}

import {
    listItemVariants,
    rectBorderVariants,
} from "@/animations/ContentAnimations";
import { Reference } from "@/enums";
import { IAnimationObject } from "@/types";

export const openBorder = async (AnimationReference: IAnimationObject) => {
    await AnimationReference[Reference.BORDER].animate(
        AnimationReference[Reference.BORDER].scope.current,
        rectBorderVariants.visible()
    );
};

export const closeBorder = async (AnimationReference: IAnimationObject) => {
    await AnimationReference[Reference.BORDER].animate(
        AnimationReference[Reference.BORDER].scope.current,
        rectBorderVariants.close()
    );
};

export const openContent = async (AnimationReference: IAnimationObject) => {
    await AnimationReference[Reference.CONTAINER].animate(
        AnimationReference[Reference.CONTAINER].scope.current,
        listItemVariants.open()
    );
};

export const closeContent = async (AnimationReference: IAnimationObject) => {
    await AnimationReference[Reference.CONTAINER].animate(
        AnimationReference[Reference.CONTAINER].scope.current,
        listItemVariants.close()
    );
};

import {
    listItemVariants,
    rectBorderVariants,
} from "@/animations/ContentAnimations";
import type { IAnimationObject } from "@/types/AnimationTypes";
import { References } from "@/types/ReferenceTypes";

export const openBorder = async (Reference: IAnimationObject) => {
    await Reference[References.BORDER].animate(
        Reference[References.BORDER].scope.current,
        rectBorderVariants.visible()
    );
};

export const closeBorder = async (Reference: IAnimationObject) => {
    await Reference[References.BORDER].animate(
        Reference[References.BORDER].scope.current,
        rectBorderVariants.close()
    );
};

export const openContent = async (Reference: IAnimationObject) => {
    await Reference[References.CONTAINER].animate(
        Reference[References.CONTAINER].scope.current,
        listItemVariants.open()
    );
};

export const closeContent = async (Reference: IAnimationObject) => {
    await Reference[References.CONTAINER].animate(
        Reference[References.CONTAINER].scope.current,
        listItemVariants.close()
    );
};

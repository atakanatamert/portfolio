import { Dispatch, SetStateAction } from "react";

export interface IHeaderContext {
    hoverActions?: {
        hover: string;
        setHover: Dispatch<SetStateAction<string>>;
    };
    sectionActions?: {
        selectedSection: string;
        isVisible: boolean;
        setVisible: Dispatch<SetStateAction<boolean>>;
        setSelectedSection: Dispatch<SetStateAction<string>>;
    };
    blinkActions?: {
        blink: boolean;
        setBlink: Dispatch<SetStateAction<boolean>>;
    };
    contentMap?: Map<string, JSX.Element>;
}

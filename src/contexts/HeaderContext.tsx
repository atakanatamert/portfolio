import { Dispatch, SetStateAction, createContext } from "react";

interface IHeaderContext {
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

const HeaderContext = createContext<IHeaderContext>({});

export default HeaderContext;

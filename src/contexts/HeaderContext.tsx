import { IHeaderContext } from "@/types";
import { createContext } from "react";

const HeaderContext = createContext<IHeaderContext>({});

export default HeaderContext;

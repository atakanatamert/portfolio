"use client";

import { useRef, useState } from "react";
import DateTime from "@/components/DateTime";
import { orbitron } from "./fonts";
import HeaderContext from "@/contexts/HeaderContext";
import { AnimationProvider } from "@/contexts/AnimationContext";
import SectionHeaders from "@/components/SectionHeaders";
import SectionContent from "@/components/SectionContent";
import Projects from "@/components/sections/Projects";
import About from "@/components/sections/About";
import Certificates from "@/components/sections/Certificates";
import Logo from "@/components/sections/Logo";
import { useAnimate } from "framer-motion";
import { IAnimationObject } from "@/types/AnimationTypes";
import { Action, Reference } from "@/enums";
interface ILogoColorRefs {
    anchorRef: HTMLDivElement | null;
    logoRef: HTMLDivElement | null;
}

const Home = () => {
    const [hover, setHover] = useState("");
    const [isVisible, setVisible] = useState(true);
    const [selectedSection, setSelectedSection] = useState("Logo");
    const projectRef = useRef<HTMLInputElement>(null);

    const logoColorRefs = useRef<ILogoColorRefs>(null);

    const [containerRef, containerAnimate] = useAnimate();

    const [borderRef, borderAnimate] = useAnimate();

    const updatedSections = [Action.PROJECTS, Action.CERTS, Action.ABOUT];

    const animationReferences: IAnimationObject = {
        [Reference.CONTAINER]: {
            scope: containerRef,
            animate: containerAnimate,
            render: <Logo />,
        },
        [Reference.BORDER]: {
            scope: borderRef,
            animate: borderAnimate,
        },
    };

    const ContentMap = new Map<string, JSX.Element>([
        ["Projects", <Projects key="pro" />],
        ["About", <About key="ab" />],
        ["Certs", <Certificates key="cert" />],
        ["Logo", <Logo key="logo" />],
    ]);

    const headerActions = {
        hoverActions: {
            hover,
            setHover,
        },
        sectionActions: {
            isVisible,
            setVisible,
            selectedSection,
            setSelectedSection,
        },
        contentMap: ContentMap,
    };

    const projectScroll = () =>
        projectRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });

    const handleMouseMove = (event: React.MouseEvent): void => {
        event.preventDefault();
        const mouseX = event.clientX;
        const mouseY = event.clientY;
        const anchor = logoColorRefs.current?.anchorRef;
        const logo = logoColorRefs.current?.logoRef;
        if (anchor && logo) {
            const rect = anchor.getBoundingClientRect();
            const anchorX = rect.left + rect.width / 2;
            const anchorY = rect.top + rect.height / 2;
            const angleDeg = angle(mouseX, mouseY, anchorX, anchorY);
            logo!.style.filter = `hue-rotate(${angleDeg}deg)`;
        }
    };

    const angle = (cx: number, cy: number, ex: number, ey: number) => {
        const dy = ey - cy;
        const dx = ex - cx;
        const rad = Math.atan2(dy, dx);
        const deg = (rad * 180) / Math.PI;
        return deg;
    };

    return (
        <main
            onMouseMove={handleMouseMove}
            className="flex pb-[env(safe-area-inset-bottom)] flex-col items-center justify-between bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-gray-800 via-gray-950 to-black"
        >
            <div className="flex h-screen w-full flex-col items-center xs:p-8 md:p-24">
                <div className="flex w-full mb-6 max-w-7xl items-center justify-between font-mono text-sm lg:flex ">
                    <h1 className={`text-white text-2xl ${orbitron.className}`}>
                        Atakan Atamert
                    </h1>
                    <DateTime className={`text-right ${orbitron.className}`} />
                </div>

                <AnimationProvider animationReferences={animationReferences}>
                    <div className="flex xs:flex-col lg:flex-row w-full max-w-7xl m-auto max-h-full">
                        <HeaderContext.Provider value={headerActions}>
                            <div className="text-right xs:mb-4 lg:m-auto xs:text-[7vw] sm:text-[4vw] md:text-[2vw] 3xl:text-5xl xs:w-full lg:w-1/3 m-auto">
                                <SectionHeaders sections={updatedSections} />
                            </div>
                        </HeaderContext.Provider>
                        <div className="xs:w-full lg:w-2/3 m-auto md:pl-44 md:pr-12 grid grid-cols-1 max-h-full h-full overflow-hidden items-center">
                            <SectionContent ref={logoColorRefs} />
                        </div>
                    </div>
                </AnimationProvider>
            </div>
        </main>
    );
};

export default Home;

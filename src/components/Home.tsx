"use client";

import { useRef, useState } from "react";
import DateTime from "@/components/DateTime";
import { montserrat, orbitron } from "@/app/fonts";
import HeaderContext from "@/contexts/HeaderContext";
import BlogContext from "@/contexts/BlogContext";
import { BLOG_ENABLED } from "@/lib/blogConfig";
import { IPostMeta } from "@/types";
import { AnimationProvider } from "@/contexts/AnimationContext";
import SectionHeaders from "@/components/SectionHeaders";
import SectionContent from "@/components/SectionContent";
import Logo from "@/components/sections/Logo";
import HomeLink from "@/components/HomeLink";
import Availability from "@/components/Availability";
import { SITE_TAGLINE } from "@/lib/site";
import { useAnimate } from "framer-motion";
import { IAnimationObject } from "@/types/AnimationTypes";
import { Action, Reference } from "@/enums";
interface ILogoColorRefs {
    anchorRef: HTMLDivElement | null;
    logoRef: HTMLDivElement | null;
}

const Home = ({ posts }: { posts: IPostMeta[] }) => {
    const [hover, setHover] = useState("");
    const [isVisible, setVisible] = useState(true);
    const [selectedSection, setSelectedSection] = useState("Logo");

    const logoColorRefs = useRef<ILogoColorRefs>(null);

    const [containerRef, containerAnimate] = useAnimate();

    const [borderRef, borderAnimate] = useAnimate();

    const updatedSections = BLOG_ENABLED
        ? [Action.WORK, Action.PROJECTS, Action.BLOG, Action.ABOUT, Action.CONTACT]
        : [Action.WORK, Action.PROJECTS, Action.ABOUT, Action.CONTACT];

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
    };

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
            <div className="flex h-screen w-full flex-col items-center xs:p-8 md:p-24 md:pb-8">
                <BlogContext.Provider value={posts}>
                    <AnimationProvider animationReferences={animationReferences}>
                        <div className="flex w-full mb-6 max-w-7xl shrink-0 items-start justify-between gap-4 font-mono text-sm lg:flex ">
                            <div>
                                <h1 className={`text-white text-2xl ${orbitron.className}`}>
                                    <HomeLink>Atakan Atamert</HomeLink>
                                </h1>
                                <p className={`mt-1 text-gray-400 ${montserrat.className}`}>
                                    {SITE_TAGLINE}
                                </p>
                                <Availability className="mt-2" />
                            </div>
                            <DateTime className={`text-right ${orbitron.className}`} />
                        </div>
                        <div className="flex xs:flex-col lg:flex-row w-full max-w-7xl flex-1 min-h-0">
                            <HeaderContext.Provider value={headerActions}>
                                <div className="text-right xs:mb-4 lg:m-auto xs:text-[7vw] sm:text-[4vw] md:text-[2vw] 3xl:text-5xl xs:w-full lg:w-1/3 m-auto">
                                    <SectionHeaders sections={updatedSections} />
                                </div>
                            </HeaderContext.Provider>
                            <div className="xs:w-full lg:w-2/3 md:pl-44 md:pr-12 flex-1 min-h-0 flex items-center justify-center [container-type:size]">
                                <SectionContent ref={logoColorRefs} />
                            </div>
                        </div>
                    </AnimationProvider>
                </BlogContext.Provider>
            </div>
        </main>
    );
};

export default Home;

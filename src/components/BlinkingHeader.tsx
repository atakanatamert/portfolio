"use client";

import AnimationContext from "@/contexts/AnimationContext";
import HeaderContext from "@/contexts/HeaderContext";
import { Action } from "@/types/ActionTypes";
import { MouseEvent, useContext, useEffect, useState } from "react";
import Projects from "./sections/Projects";

const BlinkingHeader = ({ headerText }: { headerText: string }) => {
    const { hoverActions, sectionActions, contentMap } =
        useContext(HeaderContext);

    const { updateContent, content } = useContext(AnimationContext);

    const handleClick = (event: MouseEvent) => {
        console.log(headerText);
        updateContent({ type: headerText, payload: contentMap?.get(headerText) });
    };

    const [blink, setBlink] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            setBlink(!blink);
        }, 500);
    }, [blink]);

    const isVisible = sectionActions?.isVisible;

    //useEffect(() => {
    // if (isVisible) {
    //     contentSelector(sectionActions.selectedSection ?? "Projects");
    // }
    //}, [sectionActions?.isVisible, sectionActions?.selectedSection]);

    const contentSelector = (chosenContent: string): void => {
        sectionActions?.setVisible(true);
        const fallback = () => <></>;
        const createContent = contentMap?.get(chosenContent) ?? fallback;
        //wait(1000, createContent, chosenContent);
    };

    const wait = async (duration: number, status: string) => {
        await new Promise(() => {
            setTimeout(() => {
                if (status === "change") {
                    sectionActions?.setSelectedSection(headerText);
                    wait(duration, "content");
                }

                if (status === "content") {
                    sectionActions?.setVisible(true);
                }
                if (status === "logo") {
                    sectionActions?.setSelectedSection("Logo");
                    wait(duration, "content");
                }
            }, duration);
        });
    };

    let style = "mb-[1.5vh] cursor-pointer";
    let currentHover = hoverActions?.hover;
    const handleHover = (event: MouseEvent) => {
        hoverActions?.setHover(headerText);
        //setCurrentHover(headerText);
    };

    const handleClicker = (event: MouseEvent) => {
        console.log(
            "Previous: ",
            sectionActions?.selectedSection,
            "Current: ",
            headerText
        );
        //There are 3 cases
        //I. Previous is ""
        if (sectionActions?.selectedSection === "") {
            console.log("EMPTY");
            sectionActions?.setSelectedSection(headerText);
            sectionActions?.setVisible(true);
            return;
        }
        //II. Previous is the same
        if (sectionActions?.selectedSection === headerText) {
            sectionActions?.setVisible(false);
            wait(500, "logo");
            return;
            // console.log("SAME");
            // sectionActions?.setVisible(!sectionActions.isVisible);
            // if (sectionActions?.isVisible) {
            //     return;
            // }
            // sectionActions?.setSelectedSection("Logo");
            // return;
        }
        //III. Previous is content
        if (!sectionActions?.isVisible) {
            console.log("CONTENT");
            sectionActions?.setSelectedSection(headerText);
            wait(200, "content");
            return;
        }
        sectionActions?.setVisible(false);
        wait(500, "change");
        return;
    };

    // if (sectionActions?.selectedSection === headerText) {
    //     style += " text-white";
    // } else {
    //     style += " text-gray-400";
    // }
    const textColor =
        content.type === headerText ? "text-white" : "text-gray-400";
    return (
        <h1
            id={headerText}
            onMouseEnter={handleHover}
            onClick={handleClick}
            className={`mb-[1.5vh] cursor-pointer ${textColor}`}
        >
            {currentHover === headerText
                ? blink
                    ? `>_\xa0${headerText}`
                    : `>\xa0\xa0\xa0\xa0${headerText}`
                : `${headerText}`}
        </h1>
    );
};

export default BlinkingHeader;

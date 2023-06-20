export const rectBorderVariants = {
    hidden: () => {
        return { pathLength: 0, opacity: 0 };
    },
    visible: () => {
        return {
            pathLength: 1.004,
            opacity: 1,
            transition: {
                pathLength: { type: "spring", duration: 0.5, bounce: 0 },
                opacity: { duration: 0.5 },
            },
            fill: "#cccccc",
            fillOpacity: "0.1",
        };
    },
    close: () => {
        return {
            pathLength: 0,
            opacity: 0,
            transition: {
                pathLength: { type: "spring", duration: 0.5, bounce: 0 },
                opacity: { duration: 0.5 },
            },
        };
    },
};
export const listItemVariants = {
    open: () => {
        return {
            y: 0,
            opacity: 1,
            transition: {
                y: {
                    stiffness: 1000,
                    velocity: -100,
                },
            },
        };
    },
    close: () => {
        return {
            y: 50,
            opacity: 0,
            transition: {
                y: {
                    stiffness: 1000,
                },
            },
        };
    },
};

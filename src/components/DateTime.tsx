"use client";

import { useSyncExternalStore } from "react";

const subscribe = (onTick: () => void) => {
    const id = setInterval(onTick, 1000);
    return () => clearInterval(id);
};

const getSeconds = () => Math.floor(Date.now() / 1000);

// The server has no meaningful clock for the visitor, so render nothing until hydrated.
const getServerSeconds = () => null;

const DateTime = ({ className }: { className?: string | null }) => {
    const seconds = useSyncExternalStore(subscribe, getSeconds, getServerSeconds);

    if (seconds === null) {
        return null;
    }

    const date = new Date(seconds * 1000);

    return (
        <h1 className={`text-white ${className}`}>{`_${date.getDate()}.${date.getMonth() + 1
            }.${date.getFullYear()} _${date.toLocaleString("en-US", {
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
                hour12: true,
            })}`}</h1>
    );
};

export default DateTime;

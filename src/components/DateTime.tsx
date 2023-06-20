"use client";

import { useEffect, useState } from "react";

const DateTime = ({ className }: { className?: string | null }) => {
    const [date, setDate] = useState(new Date());
    const [isDomLoaded, setDomLoaded] = useState(false);

    useEffect(() => {
        setDomLoaded(true);
        setInterval(() => {
            setDate(new Date());
        }, 1000);
    }, []);

    return (
        <>
            {isDomLoaded && (
                <h1 className={`text-white ${className}`}>{`_${date.getDate()}.${date.getMonth() + 1
                    }.${date.getFullYear()} _${date.toLocaleString("en-US", {
                        hour: "2-digit",
                        minute: "2-digit",
                        second: "2-digit",
                        hour12: true,
                    })}`}</h1>
            )}
        </>
    );
};

export default DateTime;

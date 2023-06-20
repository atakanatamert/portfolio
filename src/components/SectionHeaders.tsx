import { useEffect, useState } from "react";
import BlinkingHeader from "./BlinkingHeader";

const SectionHeaders = ({ sections }: { sections: string[] }) => {
    const sectionHeadings = sections.map((section, index) => (
        <BlinkingHeader key={`blinking_header_${index}`} headerText={section} />
    ));
    return <>{sectionHeadings}</>;
};

export default SectionHeaders;

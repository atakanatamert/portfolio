import Link from "next/link";
import { motion } from "framer-motion";
import { montserrat } from "@/app/fonts";
import { listItemVariants } from "@/animations/ContentAnimations";

const badges = [
    {
        id: "clickhouse-badge",
        name: "ClickHouse Certified Developer",
        image: "/assets/images/ClickHouse_Badge.webp",
        url: "https://www.credly.com/badges/4836071f-d7c9-4000-86c8-bf99e6549335/public_url",
    },
    {
        id: "sap-badge",
        name: "AWS Certified Solutions Architect – Professional",
        image: "/assets/images/SAP_Badge.webp",
        url: "https://www.credly.com/badges/cc28c4c5-fa07-464c-927e-6dd82662fcd3/public_url",
    },
    {
        id: "saa-badge",
        name: "AWS Certified Solutions Architect – Associate",
        image: "/assets/images/SAA_Badge.webp",
        url: "https://www.credly.com/badges/467f074b-11bd-4599-81f9-0200d108fe7c/public_url",
    },
];

const Certificates = () => {
    return (
        <motion.div
            variants={listItemVariants}
            id="certificates"
            className="max-w-7xl"
        >
            <div className="flex flex-col m-auto p-8">
                <div className="m-auto px-4 pt-[12%] mb-[12%]">
                    <p className={`${montserrat.className}`}>
                        I view certificates not as proof of deep knowledge or expertise, but
                        rather as proof of work and dedication to learning. I think they
                        also benefit ones self-development as they are good for laying a
                        solid foundation and these are the reasons why I got mine.
                    </p>
                </div>
                <div className="grid grid-cols-3 gap-4">
                    {badges.map((badge) => (
                        <Link
                            key={badge.id}
                            id={badge.id}
                            aria-label={badge.name}
                            title={badge.name}
                            className="w-full aspect-square bg-cover bg-center hover:scale-95"
                            style={{ backgroundImage: `url('${badge.image}')` }}
                            href={badge.url}
                        ></Link>
                    ))}
                </div>
            </div>
        </motion.div>
    );
};

export default Certificates;

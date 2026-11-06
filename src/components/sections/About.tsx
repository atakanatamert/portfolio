import { listItemVariants } from "@/animations/ContentAnimations";
import { montserrat } from "@/app/fonts";
import { motion } from "framer-motion";
import Image from "next/image";
import { AiFillLinkedin, AiFillGithub, AiFillMail } from "react-icons/ai";
import LinkButton from "../buttons/LinkButton";
import Availability from "../Availability";
import { EMAIL, GITHUB_URL, LINKEDIN_URL } from "@/lib/site";

const badges = [
    {
        id: "clickhouse-badge",
        name: "ClickHouse Certified Developer",
        year: "2026",
        image: "/assets/images/ClickHouse_Badge.webp",
        url: "https://www.credly.com/badges/4836071f-d7c9-4000-86c8-bf99e6549335/public_url",
    },
    {
        id: "sap-badge",
        name: "AWS Certified Solutions Architect – Professional",
        year: "Issued 2023",
        image: "/assets/images/SAP_Badge.webp",
        url: "https://www.credly.com/badges/cc28c4c5-fa07-464c-927e-6dd82662fcd3/public_url",
    },
    {
        id: "saa-badge",
        name: "AWS Certified Solutions Architect – Associate",
        year: "Issued 2022",
        image: "/assets/images/SAA_Badge.webp",
        url: "https://www.credly.com/badges/467f074b-11bd-4599-81f9-0200d108fe7c/public_url",
    },
];

const About = () => {
    return (
        <motion.div variants={listItemVariants} className="flex flex-col pt-10">
            <div className="relative overflow-hidden rounded-full border-[3px] border-white m-auto w-5/12 aspect-square">
                <Image
                    src="/assets/images/ProfilePic_BW.webp"
                    alt="Atakan Atamert"
                    fill
                    sizes="(min-width: 1024px) 20vw, 40vw"
                    className="object-cover"
                />
            </div>
            <div className="m-auto p-8">
                <h1 className="m-auto text-xl pb-4">{"Hi, I'm Atakan Atamert"}</h1>

                <div className={`space-y-3 ${montserrat.className}`}>
                    <p>
                        I&apos;m a backend engineer with 5+ years of experience. Most of my
                        work is in Go, along with DevOps and platform work like
                        Kubernetes and CI/CD.
                    </p>
                    <p>
                        I work as a Full Stack Developer at DHL Supply Chain R&D. On the
                        side I build small products and open source tools.
                    </p>
                    <p>
                        I&apos;m based in Auckland, New Zealand, and I&apos;m open to
                        full-time roles in backend, Go and platform engineering.
                    </p>
                </div>
                <Availability className="mt-4" />

                <div className="flex flex-row mt-4">
                    <LinkButton url={GITHUB_URL} Icon={AiFillGithub} label="GitHub" />
                    <LinkButton url={LINKEDIN_URL} Icon={AiFillLinkedin} label="LinkedIn" />
                    <LinkButton url={`mailto:${EMAIL}`} Icon={AiFillMail} label="Email" />
                </div>

                <h2 className="text-lg mt-12 mb-2">Certifications and education</h2>
                <p className={`text-sm text-gray-400 mb-6 ${montserrat.className}`}>
                    I see certificates as proof of work and steady learning, not proof
                    of expertise.
                </p>
                <div className="grid grid-cols-3 gap-4">
                    {badges.map((badge) => (
                        <a
                            key={badge.id}
                            id={badge.id}
                            href={badge.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group flex flex-col"
                        >
                            <span className="relative w-full aspect-square group-hover:scale-95 transition-transform">
                                <Image
                                    src={badge.image}
                                    alt={badge.name}
                                    fill
                                    sizes="(min-width: 1024px) 12vw, 30vw"
                                    className="object-contain"
                                />
                            </span>
                            <span
                                className={`mt-2 text-xs text-gray-300 ${montserrat.className}`}
                            >
                                {badge.name}
                            </span>
                            <span className={`text-xs text-gray-500 ${montserrat.className}`}>
                                {badge.year}
                            </span>
                        </a>
                    ))}
                </div>
                <p className={`mt-6 ${montserrat.className}`}>
                    BS Computer Science, Özyeğin University{" "}
                    <span className="text-sm text-gray-400">(2020)</span>
                </p>
            </div>
        </motion.div>
    );
};

export default About;

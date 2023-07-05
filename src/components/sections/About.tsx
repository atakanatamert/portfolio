import { listItemVariants } from "@/animations/ContentAnimations";
import { montserrat } from "@/app/fonts";
import { motion } from "framer-motion";
import { AiFillLinkedin, AiFillGithub } from "react-icons/ai";
import LinkButton from "../buttons/LinkButton";

const About = () => {
    return (
        <motion.div variants={listItemVariants} className="flex flex-col pt-10">
            <motion.div className="rounded-full border-[3px] border-white object-cover m-auto w-5/12 aspect-square bg-cover bg-center bg-[url('https://res.cloudinary.com/dsmzhrgji/image/upload/v1688584785/sskiavcn88oibfvjxttw.webp')]"></motion.div>
            <div className="m-auto p-8">
                <h1 className="m-auto text-xl pb-4">{"Hi, I'm Atakan Atamert"}</h1>

                <p className={`m-auto ${montserrat.className}`}>
                    A versatile Full-Stack Web Developer who bring different skills
                    acquired from working on various projects. Anywhere ranging from cloud
                    computing, STM32 programming, game development to automation and 3D
                    modelling.
                </p>

                <div className="flex flex-row mt-4">
                    <LinkButton
                        url="https://github.com/atakanatamert"
                        Icon={AiFillGithub}
                    />

                    <LinkButton url="#" Icon={AiFillLinkedin} />
                </div>
            </div>
        </motion.div>
    );
};

export default About;

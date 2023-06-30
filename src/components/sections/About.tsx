import { motion } from "framer-motion";

const listVariants = {
    open: {
        y: 0,
        opacity: 1,
        transition: {
            y: {
                stiffness: 1000,
                velocity: -100,
            },
        },
    },
    close: {
        y: 50,
        opacity: 0,
        transition: {
            y: {
                stiffness: 1000,
            },
        },
    },
};

const About = () => {
    return (
        <motion.div variants={listVariants} className="flex flex-col pt-10">
            <motion.div className="rounded-full border-[3px] border-white object-cover m-auto w-5/12 aspect-square bg-cover bg-center bg-[url('/assets/images/ProfilePic.webp')]"></motion.div>
            <div className="m-auto p-8">
                <h1 className="m-auto text-xl pb-4">{"Hi, I'm Atakan Atamert"}</h1>
                <p className="m-auto ">
                    {"I'm a Full-Stack Developer based in Istanbul, Turkey."}
                </p>
            </div>
        </motion.div>
    );
};

export default About;

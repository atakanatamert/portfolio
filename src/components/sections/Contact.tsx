import { motion } from "framer-motion";
import { AiFillGithub, AiFillLinkedin } from "react-icons/ai";
import { montserrat } from "@/app/fonts";
import { listItemVariants } from "@/animations/ContentAnimations";
import LinkButton from "../buttons/LinkButton";
import { EMAIL, GITHUB_URL, LINKEDIN_URL } from "@/lib/site";

const Contact = () => {
    return (
        <motion.div
            variants={listItemVariants}
            className="flex flex-col justify-center h-full p-8 md:p-12"
        >
            <h2 className="text-xl mb-4">Say hello</h2>
            <p className={`mb-6 ${montserrat.className}`}>
                Email is the best way to reach me.
            </p>
            <a
                href={`mailto:${EMAIL}`}
                className="text-lg sm:text-2xl break-all underline decoration-gray-500 underline-offset-8 hover:decoration-white"
            >
                {EMAIL}
            </a>
            <p className={`mt-10 mb-2 text-sm text-gray-400 ${montserrat.className}`}>
                Also on
            </p>
            <div className="flex flex-row">
                <LinkButton url={GITHUB_URL} Icon={AiFillGithub} label="GitHub" />
                <LinkButton url={LINKEDIN_URL} Icon={AiFillLinkedin} label="LinkedIn" />
            </div>
        </motion.div>
    );
};

export default Contact;

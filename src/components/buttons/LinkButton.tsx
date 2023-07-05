import { listItemVariants } from "@/animations/ContentAnimations";
import { motion } from "framer-motion";
import { IconType } from "react-icons";

const LinkButton = ({ url, Icon }: { url: string; Icon: IconType }) => {
    return (
        <motion.div
            variants={listItemVariants}
            whileHover={{
                scale: 1.3,
                cursor: "pointer",
            }}
            className="text-2xl mr-4"
        >
            <a target="_blank" rel="noopener noreferrer" href={url}>
                <Icon />
            </a>
        </motion.div>
    );
};

export default LinkButton;

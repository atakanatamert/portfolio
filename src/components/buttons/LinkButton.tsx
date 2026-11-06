import { listItemVariants } from "@/animations/ContentAnimations";
import { motion } from "framer-motion";
import { IconType } from "react-icons";

const LinkButton = ({
    url,
    Icon,
    label,
}: {
    url: string;
    Icon: IconType;
    label: string;
}) => {
    const isMail = url.startsWith("mailto:");
    return (
        <motion.div
            variants={listItemVariants}
            whileHover={{
                scale: 1.3,
                cursor: "pointer",
            }}
            className="text-2xl mr-4"
        >
            <a
                href={url}
                aria-label={label}
                title={label}
                {...(isMail ? {} : { target: "_blank", rel: "noopener noreferrer" })}
            >
                <Icon />
            </a>
        </motion.div>
    );
};

export default LinkButton;

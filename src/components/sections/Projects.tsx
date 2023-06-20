import { montserrat } from "@/app/fonts";
import ProjectData from "../../assets/projects.json";
import { motion } from "framer-motion";

const listVariants = {
    open: {
        transition: {
            staggerChildren: 0.07,
            delayChildren: 0.2,
        },
    },
    close: {
        transition: {
            staggerChildren: 0.05,
            staggerDirection: -1,
        },
    },
};

const listItemVariants = {
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

interface IProjects {
    id: number;
    name: string;
    description: string;
}

const Projects = () => {
    return (
        <motion.ul variants={listVariants}>
            {ProjectData.map((item: IProjects, index: number) => {
                return (
                    <motion.li
                        key={`project-item-${index}`}
                        variants={listItemVariants}
                        whileHover={{
                            scale: 0.95,
                            cursor: "pointer",
                        }}
                        whileTap={{
                            scale: 0.95,
                        }}
                    >
                        <div className="font-medium rounded-3xl m-12">
                            <div className="mb-4 flex gap-4 items-center">
                                <div>
                                    <h3 className="text-lg">{item.name}</h3>
                                </div>
                            </div>
                            <p className={montserrat.className}>{item.description}</p>
                        </div>
                    </motion.li>
                );
            })}
        </motion.ul>
    );
};

export default Projects;

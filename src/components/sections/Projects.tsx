import { montserrat } from "@/app/fonts";
import ProjectData from "../../assets/projects.json";
import { motion } from "framer-motion";
import { listItemVariants } from "@/animations/ContentAnimations";
import { IProjects } from "@/types";

const Projects = () => {
    return (
        <motion.ul>
            {ProjectData.map((item: IProjects, index: number) => {
                return (
                    <motion.li
                        key={`project-item-${index}`}
                        variants={listItemVariants}
                        className={"text-gray-400 "}
                        whileHover={{
                            scale: 0.97,
                            cursor: "pointer",
                            color: "rgb(255,255,255)",
                        }}
                        whileTap={{
                            scale: 0.97,
                        }}
                    >
                        <a
                            target="_blank"
                            rel="noopener noreferrer"
                            href={item.project_url}
                        >
                            <div className="font-medium rounded-3xl m-12">
                                <div className="mb-4 flex gap-4 items-center">
                                    <div>
                                        <h3 className="text-lg">{item.name}</h3>
                                    </div>
                                </div>
                                <p className={montserrat.className}>{item.description}</p>
                            </div>
                        </a>
                    </motion.li>
                );
            })}
        </motion.ul>
    );
};

export default Projects;

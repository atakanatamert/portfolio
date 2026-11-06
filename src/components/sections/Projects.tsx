import { montserrat } from "@/app/fonts";
import ProjectData from "../../assets/projects.json";
import { motion } from "framer-motion";
import { listItemVariants } from "@/animations/ContentAnimations";
import { IProjectGroup } from "@/types";

const groups: IProjectGroup[] = ProjectData;

const Projects = () => {
    return (
        <div className="pt-4">
            {groups.map((group) => (
                <section key={group.title}>
                    <motion.h2
                        variants={listItemVariants}
                        className={`mx-6 sm:mx-12 mt-10 text-sm uppercase tracking-widest text-gray-500 ${montserrat.className}`}
                    >
                        {group.title}
                    </motion.h2>
                    <motion.ul>
                        {group.projects.map((item) => (
                            <motion.li
                                key={item.name}
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
                                    <div className="font-medium rounded-3xl mx-6 sm:mx-12 my-8">
                                        <h3 className="text-lg mb-2">{item.name}</h3>
                                        <p className={montserrat.className}>{item.description}</p>
                                        <p
                                            className={`mt-2 text-xs text-gray-500 ${montserrat.className}`}
                                        >
                                            {item.stack.join(" · ")}
                                        </p>
                                    </div>
                                </a>
                            </motion.li>
                        ))}
                    </motion.ul>
                </section>
            ))}
        </div>
    );
};

export default Projects;

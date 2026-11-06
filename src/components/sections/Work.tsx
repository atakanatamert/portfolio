import { motion } from "framer-motion";
import { montserrat } from "@/app/fonts";
import { listItemVariants } from "@/animations/ContentAnimations";

interface IRole {
    company: string;
    title: string;
    period: string;
    summary?: string;
    points: string[];
}

const roles: IRole[] = [
    {
        company: "DHL Supply Chain R&D",
        title: "Full Stack Developer",
        period: "Nov 2023 – present · Istanbul",
        summary:
            "I build and run backend services and tooling for warehouse and delivery operations. It is client work, so client names stay private.",
        points: [
            "Go services running on Kubernetes.",
            "Warehouse and operations tooling. One paperwork automation handles about 300 orders a day and freed three people from manual work.",
            "CI/CD with GitHub Actions self-hosted runners and Argo CD.",
            "Operating a RAG service on Azure that another team built, keeping it running and fixing issues.",
        ],
    },
    {
        company: "Side products",
        title: "Founder & Engineer",
        period: "2025 – present",
        summary:
            "Small products I build and run myself: prepublish.ai and stillindexed.com. Details under Projects.",
        points: [],
    },
    {
        company: "Epoch Wires",
        title: "Full Stack Developer",
        period: "Feb 2021 – Apr 2023",
        points: [
            "An inventory system that replaced offline copies.",
            "Postgres backups with AWS Lambda, S3 and EventBridge, with a 1-hour RPO.",
            "Procurement and delivery tools.",
        ],
    },
];

const earlier = [
    { company: "Image4io", detail: "Node SDK", period: "2020" },
    {
        company: "Compello",
        detail: "Model2Image, training data for object detection from 3D models",
        period: "2018 – 2019",
    },
];

const Work = () => {
    return (
        <motion.div variants={listItemVariants} className="p-8 md:p-12">
            {roles.map((role) => (
                <section key={role.company} className="mb-12">
                    <h3 className="text-lg">{role.company}</h3>
                    <p className={`text-sm text-gray-400 mb-4 ${montserrat.className}`}>
                        {role.title} · {role.period}
                    </p>
                    {role.summary && (
                        <p className={`mb-3 ${montserrat.className}`}>{role.summary}</p>
                    )}
                    {role.points.length > 0 && (
                        <ul
                            className={`list-disc pl-5 space-y-1 text-gray-300 ${montserrat.className}`}
                        >
                            {role.points.map((point) => (
                                <li key={point}>{point}</li>
                            ))}
                        </ul>
                    )}
                </section>
            ))}
            <section>
                <h3 className="text-lg mb-4">Earlier</h3>
                <ul className={`space-y-2 text-gray-300 ${montserrat.className}`}>
                    {earlier.map((item) => (
                        <li key={item.company}>
                            <span className="text-white">{item.company}</span>, {item.detail}{" "}
                            <span className="text-sm text-gray-400">({item.period})</span>
                        </li>
                    ))}
                </ul>
            </section>
        </motion.div>
    );
};

export default Work;

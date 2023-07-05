import Link from "next/link";
import { motion } from "framer-motion";
import { montserrat } from "@/app/fonts";
import { listItemVariants } from "@/animations/ContentAnimations";

const Certificates = () => {
    return (
        <motion.div
            variants={listItemVariants}
            id="certificates"
            className="max-w-7xl"
        >
            <div className="grid grid-cols-2 grid-rows-7 m-auto pt-8 px-8 pb-8">
                <div className="row-start-2 row-span-1 col-start-1 col-span-2 m-auto px-4 pt-4 mb-8">
                    <p className={`${montserrat.className}`}>
                        I view certificates not as proof of deep knowledge or expertise, but
                        rather as proof of work and dedication to learning. I think they
                        also benefit ones self-development as they are good for laying a
                        solid foundation and these are the reasons why I got mine.
                    </p>
                </div>
                <Link
                    id="saa-badge"
                    className="row-start-5 row-span-2 col-start-1 col-span-1 w-full aspect-square bg-cover bg-center bg-[url('/assets/images/SAA_Badge.webp')] hover:scale-95"
                    href="https://www.credly.com/badges/467f074b-11bd-4599-81f9-0200d108fe7c/public_url"
                ></Link>
                <Link
                    id="sap-badge"
                    className="row-start-5 row-span-2 col-start-2 col-span-1 w-full aspect-square bg-cover bg-center bg-[url('/assets/images/SAP_Badge.webp')] hover:scale-95"
                    href="https://www.credly.com/badges/cc28c4c5-fa07-464c-927e-6dd82662fcd3/public_url"
                ></Link>
            </div>
        </motion.div>
    );
};

export default Certificates;

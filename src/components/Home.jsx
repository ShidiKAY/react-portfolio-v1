import { motion } from "framer-motion";
import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={{
        hidden: {
          scale: 0.8,
          opacity: 0,
        },
        visible: {
          scale: 1,
          opacity: 1,
          transition: {
            delay: 0.6,
          },
        },
      }}
    >
      <div className="container mx-auto flex flex-col justify-center items-center h-[500px]">
        <div className="text-center">
          <h1 className="text-4xl text-black font-extrabold md:text-4xl">
            Make Your Web Application
          </h1>
          <h1 className="text-4xl text-blue-500 font-extrabold md:text-4xl">
            Come True
          </h1>
          <p className="text-xl mt-4 sm:leading-relaxed md:text-xl text-black">
            À la recherche d'un développeur freelance polyvalent pour
            concrétiser vos projets web ? Vous êtes au bon endroit !
          </p>
          <div className="flex flex-wrap justify-center gap-4 mt-8 grid-cols-2">
            <Link
              to="/contact"
              className="px-12 py-3 text-sm font-medium text-culturedWhite bg-mnBlue rounded shadow active:bg-blue-500 hover:bg-carolinaBlue focus:outline-none focus:ring"
            >
              Contact Me
            </Link>
            <Link
              to="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="px-12 py-3 text-sm font-medium text-culturedWhite bg-mnBlue rounded shadow active:bg-blue-500 hover:bg-carolinaBlue focus:outline-none focus:ring"
            >
              Resume
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Home;

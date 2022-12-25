import React from "react";
import { motion } from "framer-motion";

import StackCard from "../components/StackCard";
import techData from "../data/TechnologyData.json";
import { useTranslation } from "react-i18next";

function Home(): JSX.Element {
  const { t } = useTranslation();

  return (
    <main className="">
      <header className="mt-4 mb-16">
        <motion.h1
          className="my-awesome-h1"
          initial={{
            opacity: 0,
            y: "100%",
          }}
          animate={{
            animationDuration: "500ms",
            opacity: 1,
            y: 0,
          }}
          transition={{
            type: "tween",
          }}
        >
          {t("template_title")}
        </motion.h1>
        <motion.p
          initial={{
            opacity: 0,
            y: "100%",
          }}
          animate={{
            animationDuration: "500ms",
            opacity: 1,
            y: 0,
          }}
          transition={{
            ease: "easeOut",
            delay: 0.3,
            type: "tween",
          }}
          className="text-center text-gray-500 dark:text-gray-300"
        >
          {t("template_description")}
        </motion.p>
      </header>

      <div className="mx-auto w-2/3 flex flex-wrap gap-7 justify-center items-center">
        {techData.map((data, index) => (
          <StackCard
            key={index}
            delay={index}
            title={data.title}
            description={t(data.title)}
            url={data.url}
          />
        ))}
      </div>
    </main>
  );
}

export default Home;

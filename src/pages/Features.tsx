import React from "react";
import { useTranslation } from "react-i18next";

import featuresData from "../data/Features.json";

function Features(): JSX.Element {
  const { t } = useTranslation();

  return (
    <div className="max-w-[1400px] mx-auto md:px-8">
      <h1 className="text-xl font-bold mb-10">
        {t("Detailed list of features that are baked into this template")}
      </h1>

      <ul className="flex flex-col gap-2">
        {featuresData.map((feature, index) => (
          <li
            key={index}
            className="border dark:border-gray-600 border-gray-200 border-solid p-3"
          >
            ✨ {t(feature)}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Features;

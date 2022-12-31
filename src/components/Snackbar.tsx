import React, { ReactNode } from "react";
import { motion } from "framer-motion";
import { snackbarMotion } from "../motions/snackbarMotions";

type Props = {
  type: "info" | "success" | "error" | "default";
};

function Snackbar({ type }: Props): JSX.Element {
  let icon: ReactNode = <div></div>;
  let color: string;
  let message: string;
  switch (type) {
    case "info":
      color = "bg-blue-400";
      message = "This is an information.";
      break;
    case "success":
      icon = (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          className="block"
          viewBox="0 0 16 16"
        >
          <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425a.247.247 0 0 1 .02-.022Z" />
        </svg>
      );
      color = "bg-green-400";
      message = "Your NFT has been minted successfully!";
      break;
    case "error":
      icon = (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          className="block"
          viewBox="0 0 16 16"
        >
          <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z" />
        </svg>
      );
      color = "bg-red-400";
      message =
        "Something went wrong in the minting process. Please try again later.";
      break;
    default:
      color = "bg-white";
      message = "This is a default message";
  }

  return (
    <motion.div
      variants={snackbarMotion}
      initial="hidden"
      animate="show"
      exit="hidden"
      className={`${color} flex items-center w-fit py-2 px-5 rounded-lg fixed bottom-9 left-1/2 transform -translate-x-1/2`}
    >
      {icon} <span className="block ml-2">{message}</span>
    </motion.div>
  );
}

export default Snackbar;

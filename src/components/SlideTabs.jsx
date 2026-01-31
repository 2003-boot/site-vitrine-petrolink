import React, { useRef, useState } from "react";
import { motion } from "framer-motion";

export const SlideTabs = () => {
  const [position, setPosition] = useState({
    left: 0,
    width: 0,
    opacity: 0,
  });

  const [activeIndex, setActiveIndex] = useState(null);

  const tabs = ["Service", "Temoignages", "Reservation"];

  return (
    <ul
      onMouseLeave={() => {
        setPosition((pv) => ({ ...pv, opacity: 0 }));
        setActiveIndex(null);
      }}
      className="relative mx-auto flex w-fit"
    >
      {tabs.map((label, i) => (
        <Tab
          key={label}
          index={i}
          activeIndex={activeIndex}
          setActiveIndex={setActiveIndex}
          setPosition={setPosition}
        >
          {label}
        </Tab>
      ))}

      <Cursor position={position} />
    </ul>
  );
};

const Tab = ({ children, index, activeIndex, setActiveIndex, setPosition }) => {
  const ref = useRef(null);

  const isActive = activeIndex === index;

  return (
    <li
      ref={ref}
      onMouseEnter={() => {
        if (!ref.current) return;

        const { width } = ref.current.getBoundingClientRect();
        setPosition({
          left: ref.current.offsetLeft,
          width,
          opacity: 1,
        });

        setActiveIndex(index);
      }}
      className={[
        "relative z-10 block cursor-pointer select-none",
        "px-3 py-1.5 md:px-5 md:py-3",
        "text-xs md:text-base uppercase font-medium",
        "transition-colors duration-200",
        isActive ? "text-[#ffffff]" : "text-[#0a2540]", // ✅ hover blanc pur / idle bleu foncé
      ].join(" ")}
    >
      {children}
    </li>
  );
};

const Cursor = ({ position }) => {
  return (
    <motion.li
      animate={{ ...position }}
      transition={{ type: "spring", stiffness: 500, damping: 40 }}
      className="absolute z-0 h-7 rounded-full bg-[#FF6A00] md:h-12"
    />
  );
};

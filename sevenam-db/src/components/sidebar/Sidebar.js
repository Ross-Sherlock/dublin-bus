import React, { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import "./Sidebar.css";
import { GiNewspaper } from "react-icons/gi";
import { FaRoute, FaHeart, FaInfo, FaBars, FaBus } from "react-icons/fa";
import { NavLink } from "react-router-dom";

const routes = [
  {
    path: "/JourneyPlanner",
    name: "Journey Planner",
    icon: <FaBus />,
  },
  {
    path: "/AllRoutes",
    name: "All Routes",
    icon: <FaRoute />,
  },
  {
    path: "/News",
    name: "News",
    icon: <GiNewspaper />,
  },
  {
    path: "/Favourite",
    name: "Favourite",
    icon: <FaHeart />,
  },
  {
    path: "/About",
    name: "About",
    icon: <FaInfo />,
  },
];

const Sidebar = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => {
    setIsOpen(!isOpen);
  };

  // const [isExtended, setIsExtended] = useState(false);

  // function setExtend() {
  //   setIsExtended(!isExtended)
  // }

  // function getStyle() {
  //   let css;
  //   if (isExtended) {
  //     css = `
  // .side-panel {
  //   display:block !important;
  // }
  // `;
  //   } else {
  //     css = `
  // .side-panel {
  //   display:none !important;
  // }
  // `;
  //   }
  //   return css;
  // }

  return (
    <div className="main-container">
      <motion.div
        animate={{ width: isOpen ? "172px" : "42px" }}
        className="sidebar"
      >
        {/* <style>{getStyle()}</style> */}
        <div className="top_section">
          <div className="bars">
            <FaBars onClick={toggle} />
          </div>
        </div>
        <section className="routes">
          {routes.map((route) => (
            <NavLink to={route.path} key={route.name} className="link">
              <div className="icon">{route.icon}</div>
              <AnimatePresence>
                {isOpen && (
                  <motion.div className="link_text">{route.name}</motion.div>
                )}
              </AnimatePresence>
            </NavLink>
          ))}
        </section>
      </motion.div>
      <main className="main">{children}</main>
    </div>
  );
};

export default Sidebar;

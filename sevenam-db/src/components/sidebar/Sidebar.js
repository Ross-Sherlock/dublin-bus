import React, { useState} from "react";
import { AnimatePresence, motion } from "framer-motion";
import "./Sidebar.css";
import { GiNewspaper } from "react-icons/gi";
import NewspaperIcon from '@mui/icons-material/Newspaper';
import { FaRoute, FaHeart, FaInfo, FaBars, FaBus } from "react-icons/fa";
import { NavLink } from "react-router-dom";

const routes = [
  {
    path: "/JourneyPlanner",
    name: "Journey Planner",
    icon: <FaBus />,
  },
  {
    path: "/JourneyPlanner",
    name: "All Routes",
    icon: <FaRoute />,
  },
  {
    path: "/News",
    name: "News",
    icon: <NewspaperIcon style={{fontSize:"18px"}} />,
  },
  {
    path: "/Favourites",
    name: "Favourite",
    icon: <FaHeart />,
  },
  {
    path: "/About",
    name: "About",
    icon: <FaInfo />,
  },
];

const Sidebar = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => {
    setIsOpen(!isOpen);
  };

  const setJourneyPlan = props.setJourneyPlan;
  const setMap = props.setMap;
  const setDirectionsResponse = props.setDirectionsResponse;
  const setMarkers = props.setMarkers;

  const setAllRoutes = () => {
    setJourneyPlan(false);
    setMap(null);
    setDirectionsResponse(null);
  };

  const setJPlan = () => {
    setJourneyPlan(true);
    setDirectionsResponse(null);
    setMarkers([]);
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

  const allRoutesBtn = (
    <NavLink
      to={"/JourneyPlanner"}
      key={"AllRoutes"}
      onClick={setAllRoutes}
      className="link"
    >
      <div className="icon">
        <FaRoute />
      </div>
      <AnimatePresence>
        {isOpen && (
          <motion.div className="link_text">{"TEST ALL ROUTES"}</motion.div>
        )}
      </AnimatePresence>
    </NavLink>
  );

  //  const routePathBtns = (
  //   routes.map((route) => (
  //     <NavLink to={route.path} key={route.name} className="link">
  //       <div className="icon">{route.icon}</div>
  //       <AnimatePresence>
  //         {isOpen && (
  //           <motion.div className="link_text">{route.name}</motion.div>
  //         )}
  //       </AnimatePresence>
  //     </NavLink>
  //   ))
  //  )

  const routePathBtns = routes.map(function (route) {
    let navlink;
    if (route.name === "All Routes") {
      return (
        <NavLink
          to={"/JourneyPlanner"}
          key={"AllRoutes"}
          onClick={setAllRoutes}
          className="link"
        >
          <div className="icon">{route.icon}</div>
          <AnimatePresence>
            {isOpen && (
              <motion.div className="link_text">{route.name}</motion.div>
            )}
          </AnimatePresence>
        </NavLink>
      );
    } else if (route.name === "Journey Planner") {
      return (
        <NavLink
          to={"/JourneyPlanner"}
          key={"JourneyPlanner"}
          onClick={setJPlan}
          className="link"
        >
          <div className="icon">{route.icon}</div>
          <AnimatePresence>
            {isOpen && (
              <motion.div className="link_text">{route.name}</motion.div>
            )}
          </AnimatePresence>
        </NavLink>
      );
    } else {
      return (
        <NavLink to={route.path} key={route.name} className="link">
          <div className="icon">{route.icon}</div>
          <AnimatePresence>
            {isOpen && (
              <motion.div className="link_text">{route.name}</motion.div>
            )}
          </AnimatePresence>
        </NavLink>
      );
    }
  });

  return (
    <div className="main-container">
      <motion.div
        animate={{ width: isOpen ? "172px" : "42px" }}
        className="sidebar"
      >
        <div className="top_section">
          <div className="bars">
            <FaBars onClick={toggle} />
          </div>
        </div>
        <section className="routes">{routePathBtns}</section>
      </motion.div>
      <main className="main">{props.children}</main>
    </div>
  );
};

export default Sidebar;

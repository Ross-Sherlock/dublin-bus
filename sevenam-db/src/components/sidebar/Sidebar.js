import React, { useState } from "react";
import {AnimatePresence, motion}from "framer-motion";
import "./Sidebar.css";
import {GiNewspaper} from "react-icons/gi";
import {FaRoute, FaHeart, FaInfo, FaBars, FaBus} from "react-icons/fa";
import { NavLink } from "react-router-dom";

const  routes=[
  {
    path: "/",
    name: "Journey Planner",
    icon: <FaBus/>,
  },
  {
    path: "/AllRoutes",
    name: "All Routes",
    icon: <FaRoute/>,
  },
  {
    path: "/News",
    name: "News",
    icon: <GiNewspaper/>,
  },
  {
    path: "/Favourite",
    name: "Favourite",
    icon: <FaHeart/>,
  },
  {
    path: "/About",
    name: "About",
    icon: <FaInfo/>,
  },
]



const Sidebar = ({children}) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(! isOpen);

  return (
    <div className='main-container'>
      <motion.div animate={{ width: isOpen ? "175px" : "45px"}} className="sidebar">
        <div className="top_section">
          <div className="bars">
            <FaBars onClick={toggle}/>
          </div>
        </div>
         <section className="routes">
           {routes.map((route => (
             <NavLink to={route.path} key={route.name} className="link">
               <div className="icon">{route.icon}</div>
               <AnimatePresence>
                {isOpen && <motion.div className="link_text">{route.name}</motion.div>}
               </AnimatePresence>
             </NavLink>
           )))}
         </section>
      </motion.div>
      <main>{children}</main>
    </div>
  )
}

export default Sidebar
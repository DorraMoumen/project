//import useState hook to create menu collapse state
import React, { useState } from "react";

//import react pro sidebar components
import {
  ProSidebar,
  Menu,
  MenuItem,
  SidebarHeader,
  SidebarFooter,
  SidebarContent
} from "react-pro-sidebar";

//import icons from react icons
import {FaRegHeart } from "react-icons/fa";
import{CgProfile} from "react-icons/cg"
import {
  FiHome,
  FiLogOut,
  FiArrowLeftCircle,
  FiArrowRightCircle
} from "react-icons/fi";
import { RiPencilLine } from "react-icons/ri";
import { BiCog } from "react-icons/bi";
import {ImList2}  from "react-icons/im";
import solvy from "../assets/solvy1.png";
import solvypp from"../assets/solvypp.png";
//import sidebar css from react-pro-sidebar module and our custom css
import "react-pro-sidebar/dist/css/styles.css";
import "./Header1.css";
import { Link, NavLink } from 'react-router-dom';

const Header = () => {
  //create initial menuCollapse state using useState hook
  const [menuCollapse, setMenuCollapse] = useState(false);

  //create a custom function that will change menucollapse state from false to true and true to false
  const menuIconClick = () => {
    //condition checking to change state from true to false and vice versa
    menuCollapse ? setMenuCollapse(false) : setMenuCollapse(true);
  };

  return (
    <>
      <div id="header">
        {/* collapsed props to change menu size using menucollapse state */}
        <ProSidebar collapsed={menuCollapse}>
          <SidebarHeader>
            <div className="logotext">
              {/* small and big change using menucollapse state */}
              <p>{menuCollapse ?  <img src={solvypp} style={{width:'40px' ,margin:'20px'}}/> : <img src={solvy} style={{width:'150px' ,margin:'30px'}}/>}</p>
            </div>
            <div className="closemenu" onClick={menuIconClick}>
              {/* changing menu collapse icon on click */}
              {menuCollapse ? <FiArrowRightCircle /> : <FiArrowLeftCircle />}
            </div>
          </SidebarHeader>
          <SidebarContent>
            <Menu iconShape="square">
              <MenuItem active={true} icon={<FiHome />}  ><Link to="/" >
                Accueil</Link>
              </MenuItem>
              <MenuItem icon={<CgProfile/>}><Link to="/" >Profile</Link></MenuItem>
              <MenuItem icon={<FaRegHeart />}><Link to="/Accueil" >Favoris</Link></MenuItem>
              <MenuItem icon={<ImList2/>}><Link to="/Accueil" >mes éléments</Link></MenuItem>
              <MenuItem icon={<BiCog />}><Link to="/Accueil">Paramètre</Link></MenuItem>
            </Menu>
          </SidebarContent>
          <SidebarFooter>
            <Menu iconShape="square">
              <MenuItem icon={<FiLogOut />} >Déconnecter</MenuItem>
            </Menu>
          </SidebarFooter>
        </ProSidebar>
      </div>
    </>
  );
};

export default Header;

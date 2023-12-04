import React from "react";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Offcanvas from "react-bootstrap/Offcanvas";
import { AiOutlineMenu, AiOutlineSearch } from "react-icons/ai";
import { ImProfile } from "react-icons/im";
import { IoMdNotificationsOutline } from "react-icons/io";
import { BiMessageSquareDetail } from "react-icons/bi";
import image from "../../../assets/hashImage2.png";
import { HiOutlineLogout } from "react-icons/hi";
import { useSelector } from "react-redux";
import { selectUser } from "../../../store/slices/AuthSlice";
import LogoutModel from "./LogoutModel";
import MenuFooter from "./MenuFooter";

const MenuBar = () => {
  const [show, setShow] = useState(false);
  const user = useSelector(selectUser);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  
  const [showLogoutModel,setShowLogoutModel] = useState(false);

  return (
    <div className="menubar_wrap">
      <Button variant="dark" className="d-md-none" onClick={handleShow}>
        <AiOutlineMenu />
      </Button>

      <Offcanvas show={show} onHide={handleClose} responsive="md" className='offcanvas_menubar'>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Menu</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body className="offcanvas_menubar_body">
          <div className="menubar_items">
            <div>
              <img src={image} alt="logo" width={30} height={30} className="menubar_logo_image" />
            </div>
            <li>
              <span className="menubar_icons">
                <ImProfile />
              </span>
              <span>Profile</span>
            </li>
            <li className="d-block d-md-none">
              <span className="menubar_icons">
                <AiOutlineSearch />
              </span>
              <span>Search</span>
            </li>
            <li>
              <span className="menubar_icons">
                <IoMdNotificationsOutline />
              </span>
              <span>Notifications</span>
            </li>
            <li>
              <span className="menubar_icons">
                <BiMessageSquareDetail />
              </span>
              <span>Messages</span>
            </li>
            <li onClick={()=>setShowLogoutModel(true)}>
              <span className="menubar_icons">
                <HiOutlineLogout />
              </span>
              <span className="cursor-pointer">LogOut</span>
            </li>
          </div>
          <div className="d-block d-md-none">
          <MenuFooter/>
          </div>
          
        </Offcanvas.Body>
      </Offcanvas>
      <LogoutModel show={showLogoutModel} setShow={setShowLogoutModel}/>
      <div className="d-none d-md-block">
      <MenuFooter /> 
      </div>
    </div>
  );
};

export default MenuBar;

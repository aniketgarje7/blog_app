import React from "react";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Offcanvas from "react-bootstrap/Offcanvas";
import { AiOutlineMenu, AiOutlineSearch } from "react-icons/ai";
import { ImProfile } from "react-icons/im";
import { IoMdNotificationsOutline,IoMdHome } from "react-icons/io";
import { BiMessageSquareDetail } from "react-icons/bi";
import image from "../../../assets/hashImage2.png";
import { HiOutlineLogout } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../../../store/slices/AuthSlice";
import LogoutModel from "./LogoutModel";
import MenuFooter from "./MenuFooter";
import { useNavigate } from "react-router-dom";

const MenuBar = () => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [showLogoutModel,setShowLogoutModel] = useState(false);
  const navigate = useNavigate();
  const user = useSelector(selectUser)
  const handleChangeMenuItem = (payload)=>{
      navigate(payload);
  }
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
              <span className="menubar_icons" onClick={()=>handleChangeMenuItem('/')}>
                <IoMdHome/>
              </span>
              <span onClick={()=>handleChangeMenuItem('/')} className="cursor-pointer">Home</span>
            </li>
            <li>
              <span className="menubar_icons" onClick={()=>handleChangeMenuItem(`/profile/${user.username}`)}>
                <ImProfile />
              </span>
              <span onClick={()=>handleChangeMenuItem(`/profile/${user.username}`)} className="cursor-pointer">Profile</span>
            </li>
            <li className="d-block d-lg-none">
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

import React from 'react'
import { useSelector } from 'react-redux';
import { selectUser } from '../../../store/slices/AuthSlice';
import { FaRegUserCircle } from "react-icons/fa";

const MenuFooter = () => {
    const user = useSelector(selectUser);
  return (
    <div className="menubar_footer">
    <span className="menubar_icons">
      <FaRegUserCircle />
    </span>
    @{user?.username}
  </div>
  )
}

export default MenuFooter;
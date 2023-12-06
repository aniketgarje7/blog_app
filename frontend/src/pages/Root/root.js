import React, { useEffect, useState } from "react";
import MenuBar from "../../components/Root/Menu/MenuBar";
import BlogBar from "../../components/Root/Blog/BlogBar";
import SearchBar from "../../components/Root/Search/SearchBar";
import "./index.root.css";
import { useDispatch } from "react-redux";
import { getUser } from "../../store/slices/AuthSlice";
import { Outlet, useLocation } from "react-router-dom";
const Root = () => {
  const dispatch = useDispatch();
  const [element, setElement] = useState();
  const { pathname } = useLocation();
  useEffect(() => {
    dispatch(getUser());
    const ele = document.querySelector("div#scroll_bar");
    setElement(ele);
  }, [dispatch]);
  return (
    <div className="root_bg">
      <div className="container root_page">
        <div className="menu_bar">
          <MenuBar />
        </div>
        {pathname === "/" && (
          <div className="blog_bar" id="scroll_bar">
            <BlogBar element={element} />
          </div>
        )}

        {pathname.startsWith("/profile") && (
          <div className="profile">
            <Outlet />
          </div>
        )}
        <div className="d-none d-lg-block search_bar">
          <SearchBar />
        </div>
      </div>
    </div>
  );
};

export default Root;

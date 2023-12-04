import React, { useEffect, useState } from "react";
import MenuBar from "../../components/Root/Menu/MenuBar";
import BlogBar from "../../components/Root/Blog/BlogBar";
import SearchBar from "../../components/Root/Search/SearchBar";
import "./index.root.css";
import { useDispatch } from "react-redux";
import { getUser } from "../../store/slices/AuthSlice";

const Root = () => {
  const dispatch = useDispatch();
  const [element, setElement] = useState();
  const [menuActiveItem,setMenuActiveItem] = useState('Home')
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
        <div className="blog_bar" id="scroll_bar">
          <BlogBar element={element} />
        </div>
        <div className="d-none d-md-block search_bar">
          <SearchBar />
        </div>
      </div>
    </div>
  );
};

export default Root;

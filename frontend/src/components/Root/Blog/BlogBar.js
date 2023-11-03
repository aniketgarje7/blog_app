import React, { useEffect, useRef, useState } from "react";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import BlogRAndC from "./BlogRAndC";
import MenuBar from "../Menu/MenuBar";
import { useDispatch, useSelector } from "react-redux";
import { getBlogs, selectIsNoData } from "../../../store/slices/BlogSlice";
import ButtonLoader from "../../Elements/ButtonLoader";

const BlogBar = ({ element }) => {
  const userCall = useRef(true);
  const [isLoading, setIsLoading] = useState(false);
  const pageNumber = useRef(0);
  const didApiCall = useRef(false);
  const isNoData = useSelector(selectIsNoData);
  const dispatch = useDispatch();

  // getBlogsFunction
  const fetchblogs = (pageNumber)=>{
    if(isNoData){
      return;
    }
    setIsLoading(true);
    dispatch(getBlogs({page:pageNumber.current})).then((res) => {
      setIsLoading(false);
      if(res){
        pageNumber.current+=1
      }
    });
  }
  // getblog initial call
  useEffect(() => {
    if(didApiCall.current){
      return;
    }
    didApiCall.current = true;
    fetchblogs(pageNumber);
  }, [dispatch]);

  // infinite scrolling
  useEffect(() => {
    if (!element || isNoData) {
      return;
    }
    const handleScroll = () => {
      if (!userCall.current) {
        return;
      }
      const { scrollTop, clientHeight, scrollHeight } = element;
      if (scrollTop + clientHeight >= scrollHeight - 10) {
        userCall.current = false;
        fetchblogs(pageNumber);
        setTimeout(() => {
          userCall.current = true;
        }, 1000);
      }
    };

    element.addEventListener("scroll", handleScroll);
    return () => {
      element.removeEventListener("scroll", handleScroll);
    };
  }, [element,isNoData]);
  return (
    <div>
      <div className="p-3 d-none d-md-block">Home</div>
      <div className="py-3 d-block d-md-none">
        <MenuBar />
      </div>
      <Tabs defaultActiveKey="Explore" id="uncontrolled-tab-example" className="mb-3">
        <Tab eventKey="Explore" title="Explore">
          <div className="mb-3 ">
            <BlogRAndC />
          </div>
        </Tab>
        <Tab eventKey="Following" title="Following">
          Tab content for Profile
        </Tab>
      </Tabs>
      <div>
        {isLoading && <ButtonLoader/>}
        {isNoData && <div className="no_data">You all caught up!</div>}
      </div>
    </div>
  );
};

export default BlogBar;

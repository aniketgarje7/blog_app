import React, { useEffect, useRef, useState } from "react";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import BlogRAndC from "./BlogRAndC";
import MenuBar from "../Menu/MenuBar";
import { useDispatch, useSelector } from "react-redux";
import { getBlogs, selectIsNoData,selectData} from "../../../store/slices/BlogSlice";
import ButtonLoader from "../../Elements/ButtonLoader";
import { selectUser } from "../../../store/slices/AuthSlice";

const BlogBar = ({ element }) => {
  const userCall = useRef(true);
  const [isLoading, setIsLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [textBody, setTextBody] = useState("");
  const pageNumber = useRef(0);
  const didApiCall = useRef(false);
  const isNoData = useSelector(selectIsNoData);
  const blogs = useSelector(selectData);
  const user = useSelector(selectUser);
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

  const filterFollowingBlogs = ()=>{
    if(!user){
      return [];
    }
    const blogsOfFollwingUser = blogs.filter((blog)=>
      user.following.includes(blog.userId._id)
    );
    return blogsOfFollwingUser;
  };
  const createBlogData = {title,setTitle,textBody,setTextBody}
  return (
    <div>
      <div className="p-3 d-none d-md-block">Home</div>
      <Tabs defaultActiveKey="Explore" id="uncontrolled-tab-example" className="mb-3 blog_tabs">
        <Tab eventKey="Explore" title="Explore">
          <div className="mb-3 ">
            <BlogRAndC blogs={blogs} createBlogData={createBlogData}/>
          </div>
        </Tab>
        <Tab eventKey="Following" title="Following">
           <BlogRAndC blogs={filterFollowingBlogs()} createBlogData={createBlogData}/>
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

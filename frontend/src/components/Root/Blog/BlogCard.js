import React,{useState,useRef} from "react";
import Card from "react-bootstrap/Card";
import {AiFillLike,AiFillDelete,AiFillEdit} from 'react-icons/ai';
import {BsFillReplyFill} from 'react-icons/bs';
import BlogEditModel from "./BlogEditModel";
import BlogDeleteModel from "./BlogDeleteModel";
import { useDispatch, useSelector } from "react-redux";
import { likeBlog } from "../../../store/slices/BlogSlice";
import CommentBar from "../Comment/CommentBar";
import { selectUser } from "../../../store/slices/AuthSlice";

const BlogCard = ({blog}) => {
  const {name,username} = blog.userId;
  const [show, setShow] = useState(false);
  const [showDelete,setShowDelete] = useState(false);
  const [cLength,setCLength] = useState(blog?.comments.length);
  const user = useSelector(selectUser);
  const [like,setLike] = useState(()=>{
    if(blog?.likes.includes(user?._id)){
      return true;
    }
    return false;
  });
  const likeRef = useRef(null);
  const [openCommentBar,setOpenCommentBar] = useState(false);
  const dispatch = useDispatch();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleCloseDelete = () => setShowDelete(false);
  const handleShowDelete = () => setShowDelete(true);

  const handleLike = ()=>{
    const id = blog._id;
    if(likeRef.current){
      return;
    }
    likeRef.current = true;
    dispatch(likeBlog({blogId:id})).then(()=>{
      likeRef.current = false;
      setLike(!like);
    });
  }
 
  return (
    <div className="mb-2" >
      <Card>
        <Card.Header as="h6">
          <span>{name}</span>
          <span className="username_card">@{username}</span>
        </Card.Header>
        <Card.Body>
          <Card.Title>{blog.title}</Card.Title>
          <Card.Text>
           {blog.text}
          </Card.Text>
        </Card.Body>
        <Card.Footer className="card_footer">
          <span className="card_icons" onClick={handleLike} >
            {blog?.likes?.length}
            <AiFillLike className={like?'green_icon':'default'}/>
            </span>
          <span className="card_icons" onClick={()=>setOpenCommentBar(!openCommentBar)}>{cLength}<BsFillReplyFill/></span>
          <span className="card_icons" onClick={handleShow}><AiFillEdit/></span>
          <span className="card_icons" onClick={handleShowDelete}>
            <AiFillDelete className="danger_icon"/>
            </span>
          <div>
            {openCommentBar && <CommentBar blogId = {blog._id} cLength={cLength} setCLength={setCLength}/>}
          </div>
        </Card.Footer>
      </Card>
      <BlogEditModel show={show} handleClose={handleClose} blog={blog}/>
      <BlogDeleteModel show={showDelete} handleClose={handleCloseDelete} blog={blog}/>
    </div>
  );
};

export default BlogCard;

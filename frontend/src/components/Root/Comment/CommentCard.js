import React,{useState,useRef} from "react";
import Card from "react-bootstrap/Card";
import {AiFillLike} from 'react-icons/ai';
import { useDispatch,useSelector } from "react-redux";
import { likeComment } from "../../../store/slices/CommentSlice";
import { selectUser } from "../../../store/slices/AuthSlice";

const CommentCard = ({comment}) => {
    const {name,username} = comment.userId;
    const dispatch = useDispatch();
    const {_id,likes} = comment;
    const user = useSelector(selectUser);
    const [like,setLike] = useState(()=>{
      if(comment?.likes.includes(user?._id)){
        return true;
      }
      return false;
    });
    const likeRef = useRef(null);
    const handleLike = ()=>{
      if(likeRef.current){
        return;
      }
      likeRef.current = true;
      dispatch(likeComment({commentId:_id})).then(()=>{
        likeRef.current = false;
        setLike(!like);
      });
    }
    return (
      <div className="my-1" >
        <Card>
          <Card.Header as="h6">
            <span>{name}</span>
            <span className="username_card">@{username}</span>
          </Card.Header>
          <Card.Body>
            <Card.Text>
             {comment.text}
            </Card.Text>
          </Card.Body>
          <Card.Footer className="card_footer">
            <span className="card_icons" onClick={handleLike}>{likes.length}
            <AiFillLike className={like?'green_icon':'default'}/>
            </span>
            {/* <span className="card_icons">{blog?.comments?.length}<BsFillReplyFill/></span> */}
            {/* <span className="card_icons" onClick={handleShow}><AiFillEdit/></span> */}
            {/* <span className="card_icons" onClick={handleShowDelete}><AiFillDelete/></span> */}
          </Card.Footer>
        </Card>
      
      </div>
    );
}

export default CommentCard;
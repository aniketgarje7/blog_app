import React, { useState,useRef, useEffect } from "react";
import CommentCreate from "./CommentCreate";
import CommentCard from "./CommentCard";
import Button from "react-bootstrap/Button";
import { useDispatch, useSelector } from "react-redux";
import { getComments, selectData } from "../../../store/slices/CommentSlice";
import ButtonLoader from "../../Elements/ButtonLoader";

const CommentBar = ({ blogId, cLength, setCLength }) => {
  const [seeComments, setSeeComments] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [seeMoreCommentIsLoading,setSeeMoreIsLoading] = useState(false);
  const [pageNumber, setPageNumber] = useState(0);
  const isNoCommentData = useRef(false);
  const comments = useSelector(selectData);
  const dispatch = useDispatch();

  const handleComments = () => {
    if (seeComments) {
      setSeeComments(false);
      return;
    }
    if(isNoCommentData.current){
      setSeeComments(true);
      return;
    }
     fetchComments(setIsLoading);
  };
  const fetchComments = (setIsLoading)=>{
    if(isNoCommentData.current){
      return;
    }
    const data = { blogId: blogId, page: pageNumber };
    setIsLoading(true);
    dispatch(getComments(data)).then((res) => {
      setSeeComments(true);
      setIsLoading(false);
      setPageNumber(pageNumber+1);
      if(!res){
        isNoCommentData.current = true;
      }
    });
  }
  return (
    <div className="comment_bar">
      <div>
        <CommentCreate blogId={blogId} setCLength={setCLength} />
        <div>
          {cLength > 0 ? (
            <div onClick={handleComments} className="see_comment_button">
              {isLoading ? <ButtonLoader /> : <>{seeComments ? "Hide" : "See"} comments</>}
            </div>
          ) : (
            <div className="see_comment_button">No comments</div>
          )}
        </div>
      </div>
      <div>
        {seeComments && (
          <div>
            {" "}
            {comments.map((comment, key) => (
              <div key={key}>
                <CommentCard comment={comment} />
              </div>
            ))}
            {isNoCommentData.current && <div className="no_data">No More Comments</div>}
          </div>
        )}
      </div>
      {!isNoCommentData.current && <div>{seeComments && <div onClick={()=>fetchComments(setSeeMoreIsLoading)} className="see_comment_button">
        {seeMoreCommentIsLoading ? <ButtonLoader /> : <>See More comments</>}
      </div>}
      </div>}
    </div>
  );
};

export default CommentBar;

import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import ButtonLoader from "../../Elements/ButtonLoader";
import {useDispatch} from 'react-redux';
import { createComment } from "../../../store/slices/CommentSlice";

const CommentCreate = ({blogId,setCLength}) => {
    const [text, setText] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useDispatch();
  
    const setDefault = ()=>{
      setText('');
    }
    const handleSubmit = (e) => {
      e.preventDefault();
      setIsLoading(true);
      const data = {text:text,blogId:blogId};
      dispatch(createComment(data)).then((res)=>{
        if(res){
          setDefault();
          setCLength((pre)=>pre+1);
        }
        setIsLoading(false);
      })
    };
    return (
      <div className="my-1">
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-2 px-1" controlId="exampleForm.ControlTextarea1">
            <Form.Control as="textarea" rows={3} placeholder="Write something" onChange={(e) => setText(e.target.value)} value={text} />
          </Form.Group>
          <div className="text-end">
            <Button type="submit" disabled={isLoading}>
              {isLoading ? <ButtonLoader /> : "Post"}
            </Button>
          </div>
        </Form>
      </div>
    )
}

export default CommentCreate
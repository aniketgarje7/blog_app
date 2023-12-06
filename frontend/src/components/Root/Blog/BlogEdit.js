import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import ButtonLoader from "../../Elements/ButtonLoader";
import {useDispatch} from 'react-redux';
import {  editBlog} from "../../../store/slices/BlogSlice";

const BlogEdit = ({title,text,blogId,handleClose}) => {
    const [titleEdit, setTitle] = useState(title);
    const [textBody, setTextBody] = useState(text);
    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useDispatch();
    const handleSubmit = (e) => {
      e.preventDefault();
      setIsLoading(true);
      const data = {title:titleEdit,text:textBody,blogId:blogId}
      dispatch(editBlog(data)).then((res)=>{
        setIsLoading(false);
        handleClose();
      })
    };
  return (
    <div className="mb-2">
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-2 px-1" controlId="exampleForm.ControlInput1">
          <Form.Control type="text" placeholder="Title" onChange={(e) => setTitle(e.target.value)} value={titleEdit} />
        </Form.Group>
        <Form.Group className="mb-2 px-1" controlId="exampleForm.ControlTextarea1">
          <Form.Control as="textarea" rows={3} placeholder="Write something" onChange={(e) => setTextBody(e.target.value)} value={textBody} />
        </Form.Group>
        <div className="text-end">
          <Button type="submit" disabled={isLoading}>
            {isLoading ? <ButtonLoader /> : "Edit"}
          </Button>
        </div>
      </Form>
    </div>
  )
}

export default BlogEdit
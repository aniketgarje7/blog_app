import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import ButtonLoader from "../../Elements/ButtonLoader";
import {useDispatch} from 'react-redux';
import { createBlog, getBlogs } from "../../../store/slices/BlogSlice";
import autosize from 'autosize';

const BlogCreate = () => {
  const [title, setTitle] = useState("");
  const [textBody, setTextBody] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  const setDefault = ()=>{
    setTitle('');
    setTextBody('');
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    const data = {title:title,text:textBody}
    dispatch(createBlog(data)).then((res)=>{
      if(res){
        setDefault();
      }
      setIsLoading(false);
    })
  };
  const adjustHeight=(element)=>{
    const el = element.target;
    // el.style.height = (el.scrollHeight > el.clientHeight) && (el.scrollHeight)+10+"px";
    autosize(el);
  }
  return (
    <div className="mb-2">
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-2 px-1" controlId="exampleForm.ControlInput1">
          <Form.Control type="text" placeholder="Title" onChange={(e) => setTitle(e.target.value)} value={title} />
        </Form.Group>
        <Form.Group className="mb-2 px-1" controlId="exampleForm.ControlTextarea1">
          <Form.Control as="textarea" rows={3} placeholder="Write something" onChange={(e) => setTextBody(e.target.value)} value={textBody} onKeyUp={adjustHeight} className="textarea_blog"/>
        </Form.Group>
        <div className="text-end">
          <Button type="submit" disabled={isLoading}>
            {isLoading ? <ButtonLoader /> : "Post"}
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default BlogCreate;

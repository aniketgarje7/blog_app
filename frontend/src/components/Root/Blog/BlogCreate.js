import React, { useEffect, useRef, useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import ButtonLoader from "../../Elements/ButtonLoader";
import { useDispatch, useSelector } from "react-redux";
import { createBlog,rewriteTextByAI, selectAiContent, setAicontent } from "../../../store/slices/BlogSlice";
import autosize from "autosize";

const BlogCreate = ({createBlogData}) => {
  const {title,setTitle,textBody,setTextBody} = createBlogData;
  const [dummyTextBody, setDummyTextBody] = useState("");
  const [toggleContent, setToggleContent] = useState("Original Content");
  const [isLoading, setIsLoading] = useState(false);
  const [aiContentIsLoading, setAiContentIsLoading] = useState(false);
  const aiContentRef = useRef(null);
  const textareaRef = useRef(null);
  const aiContent = useSelector(selectAiContent);
  const dispatch = useDispatch();

  const setDefault = () => {
    setTitle("");
    setTextBody("");
    dispatch(setAicontent(null));
    setDummyTextBody("");
    changeHeight(textareaRef.current,86)
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    const data = { title: title, text: textBody };
    dispatch(createBlog(data)).then((res) => {
      if (res) {
        setDefault();
      }
      setIsLoading(false);
    });
  };

  const getAiContent = () => {
    setAiContentIsLoading(true);
    const data = { content: textBody };
    dispatch(rewriteTextByAI(data)).then(() => {
      setAiContentIsLoading(false);
    });
  };
  const adjustHeight = (element) => {
    const el = element.target;
    // el.style.height = (el.scrollHeight > el.clientHeight) && (el.scrollHeight)+10+"px";
    autosize(el);
  };
  const changeHeight = (element,height)=>{
    const targetElement = element.target;
    targetElement.style.height = height+'px';
  }
  const handleToggleContent = () => {
    if (toggleContent === "Ai Content") {
      setToggleContent("Original Content");
      setDummyTextBody(textBody);
      setTextBody(aiContent);
    } else {
      setToggleContent("Ai Content");
      dispatch(setAicontent(textBody));
      setTextBody(dummyTextBody);
    }
  };
  const handleOnChangeTextArea = (e) => {
    setTextBody(e.target.value);
    adjustHeight(e);
    textareaRef.current = e;
  };
  useEffect(() => {
    if (!aiContent || aiContentRef.current) {
      return;
    }
    aiContentRef.current = true;
    setDummyTextBody(textBody);
    setTextBody(aiContent);
    setToggleContent("Original Content");
  }, [aiContent]);

  return (
    <div className="mb-2">
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-2 px-1" controlId="exampleForm.ControlInput1">
          <Form.Control type="text" placeholder="Title" onChange={(e) => setTitle(e.target.value)} value={title} />
        </Form.Group>
        <Form.Group className="mb-2 px-1" controlId="exampleForm.ControlTextarea1">
          <Form.Control
            as="textarea"
            rows={3}
            placeholder="Write something"
            onChange={handleOnChangeTextArea}
            value={textBody}
            className="textarea_blog"
          />
        </Form.Group>
        <div className="text-end">
          <Button variant="dark" onClick={getAiContent} className="mx-1">
            {aiContentIsLoading ? <ButtonLoader /> : "Rewrite with Ai"}
          </Button>

          {aiContent && (
            <Button variant="dark" className="mx-1" onClick={handleToggleContent}>
              {toggleContent}
            </Button>
          )}

          <Button type="submit" disabled={isLoading} className="m-1">
            {isLoading ? <ButtonLoader /> : "Post"}
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default BlogCreate;

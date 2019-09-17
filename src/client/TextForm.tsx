import React, { useState, FC, useCallback, ChangeEventHandler, MouseEventHandler } from "react";
import styled from "styled-components";

type Props = {
  onSubmit: (text: string) => void;
}

const Container = styled.div`
  display: flex;
  width: 100%;
  padding: 0 0.75rem;
  box-sizing: border-box;
`

const Button = styled.button`
  cursor: pointer;
  display: inline-block;
  min-height: 1em;
  outline: 0;
  border: none;
  vertical-align: baseline;
  background: #e0e1e2 none;
  color: rgba(0,0,0,.6);
  margin: 0 .25em 0 0;
  padding: .78571429em 1.5em .78571429em;
  text-transform: none;
  text-shadow: none;
  font-weight: 700;
  line-height: 1em;
  font-style: normal;
  text-align: center;
  text-decoration: none;
  border-radius: .28571429rem;
`;

const Textarea = styled.textarea`
  flex: 1 1 auto;
  vertical-align: top;
  margin: 0;
  -webkit-appearance: none;
  padding: .78571429em 1em;
  background: #fff;
  border: 1px solid rgba(34,36,38,.15);
  outline: 0;
  color: rgba(0,0,0,.87);
  border-radius: .28571429rem;
  box-shadow: 0 0 0 0 transparent inset;
  transition: color .1s ease,border-color .1s ease;
  font-size: 1em;
  line-height: 1.2857;
  resize: vertical;
`;

export const Form: FC<Props> = ({ onSubmit }) => {
  const [content, setContent] = useState("");
  const handleChange = useCallback<ChangeEventHandler<HTMLTextAreaElement>>(e => {
    setContent(e.target.value);
  }, []);

  const handleSubmit = useCallback<MouseEventHandler>((e) => {
    e.preventDefault();
    onSubmit(content);
  }, [content]);

  return (
    <Container>
      <Textarea value={content} onChange={handleChange} maxLength={200} rows={3} />
      <Button onClick={handleSubmit} disabled={!content}>send</Button>
    </Container>
  )
}
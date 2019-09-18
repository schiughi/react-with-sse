import React, { FC } from 'react';
import styled from 'styled-components';

type Props = {
  messages: {
    id: number;
    name: string;
    date: number;
    content: string;
    avatar: string;
  }[];
};

const Container = styled.div`
  box-sizing: border-box;
  width: 100%;
  padding: 0.5rem;
`;

const Message = styled.section`
  box-sizing: border-box;
  display: flex;
  -webkit-box-orient: horizontal;
  -webkit-box-direction: normal;
  flex-direction: row;
  width: 100%;
  padding: 0.21428571rem 0;
  margin: 0;
  background: 0 0;
  border-top: none;
`;

const MessageContent = styled.div`
  margin: 0.5em 0 0.35714286em 1.14285714em;
  flex: 1 1 auto;
  align-self: stretch;
  text-align: left;
  word-wrap: break-word;
`;

const MessageSummary = styled.div`
  margin: 0;
  font-size: 1em;
  font-weight: 700;
  color: rgba(0, 0, 0, 0.87);

  > a {
    color: #4183c4;
    text-decoration: none;
  }

  > time {
    display: inline-block;
    float: none;
    font-weight: 400;
    font-size: 0.85714286em;
    font-style: normal;
    margin: 0 0 0 0.5em;
    padding: 0;
    color: rgba(0, 0, 0, 0.4);
  }
`;

const MessageText = styled.div`
  padding: 0;
  border-left: none;
  font-size: 1em;
  max-width: 500px;
  line-height: 1.4285em;
  margin: 0.5em 0 0;
  background: 0 0;
  padding: 0;
  color: rgba(0, 0, 0, 0.87);
`;

const MessageLabel = styled.div`
  display: block;
  flex: 0 0 auto;
  width: 2.5em;
  height: auto;
  align-self: stretch;
  text-align: left;

  > img {
    width: 100%;
    height: auto;
    border-radius: 500rem;
  }
`;

export const Chat: FC<Props> = ({ messages }) => (
  <Container>
    {messages.map(message => (
      <Message key={message.id}>
        <MessageLabel>
          <img src={message.avatar} />
        </MessageLabel>
        <MessageContent>
          <MessageSummary>
            <a>{message.name}</a>
            <time>{new Date(message.date).toLocaleString()}</time>
          </MessageSummary>
          <MessageText>{message.content}</MessageText>
        </MessageContent>
      </Message>
    ))}
  </Container>
);

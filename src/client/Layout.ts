import styled from "styled-components";

export const Grid = styled.div`
  display: grid;
  overflow: hidden;
  box-sizing: border-box;
  width: 100vw;
  height: 100vh;
  grid-template-columns: 200px 1fr;
  grid-template-rows: 1fr 100px;
  grid-template-areas: 'sidebar chat' 'sidebar form';
  background-color: gray;
`

export const Sidebar = styled.div`
  grid-area: sidebar;
  background-color: white;
`;

export const Chat = styled.div`
  grid-area: chat;
  background-color: white;
`;

export const Form = styled.div`
  grid-area: form;
  background-color: white;
  width: 100%;
`;
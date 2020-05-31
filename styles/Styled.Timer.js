import styled from "styled-components";

export const StyledTimer = styled.div`
  font-family: "Indie Flower", cursive;
  text-align: center;
  h1 {
    padding-top: 2rem;
  }
  h2 {
    color: #291f1e;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    span {
      position: static;
    }
  }
`;

export const Seconds = styled.span`
  font-family: "Indie Flower", cursive;
  display: block;
  font-size: 5rem;
  font-weight: bolder;
  text-align: center;
  color: #a3333d;
  text-shadow: 2px 2px 2px black;
`;
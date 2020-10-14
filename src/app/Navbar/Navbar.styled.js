import styled from "styled-components";

export const StyledNavbar = styled.nav`
  margin: 20px 5px 0px 5px;
  border-radius: 5px;
  padding: 10px 20px;
  color: rgba(0, 0, 0, 1);
  background: rgba(255, 255, 255, 0.7);
  display: block;

  a {
    color: rgba(50, 50, 50, 1);
    text-decoration: none;
    margin: 5px;
    font-size: 1rem;

    &:hover {
      color: rgba(0, 0, 0, 1);
      font-weight: 500;
    }
  }

  h1 {
    font-size: 50px;
    margin: 10px;
    text-decoration: underline;
  }

  .navHeader {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  button {
    margin: 10px;
    background: rgba(255, 255, 255, 0.7);
    border: 2px solid;
    border-color: rgba(50, 50, 50, 0.7);
    border-radius: 20px;
    padding: 3px 10px;
    height: 40px;
    font: inherit;
    cursor: pointer;
    outline: none;
    &:hover {
      transform: scale(1.01);
      border-color: black;
      color: black;
    }
    &:active {
      transform: scale(0.9);
    }
  }
`;

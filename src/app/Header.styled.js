import styled from "styled-components";

export const StyledHeader = styled.div`
  .navHeader {
    display: flex;
    justify-content: space-between;
    align-items: center;
    h1 {
      font-size: 50px;
      margin: 10px;
      text-decoration: underline;
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
  }
`;

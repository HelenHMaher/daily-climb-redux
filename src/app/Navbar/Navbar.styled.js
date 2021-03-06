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
`;

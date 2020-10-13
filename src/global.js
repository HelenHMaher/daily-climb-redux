import { createGlobalStyle } from "styled-components";
import climbGear from "./climbGear.jpg";

export const GlobalStyles = createGlobalStyle`

html {
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
  color: white;
  background: url(${climbGear});
  background-size: cover;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  display: flex;
  justify-content: center;
  width: 100vw;
}
.App {
  margin: 5px;
  background: rgba(128, 128, 128, .5);
  border-radius: 5px;
  padding: 5px;
  min-width: 320px;
}

.App-header {
  padding: 0 5px;
  line-height: 20px;
  font-size: 50px;
  @media (max-width: ${({ theme }) => theme.mobile}) {
    font-size: 30px;
  }
}

`;

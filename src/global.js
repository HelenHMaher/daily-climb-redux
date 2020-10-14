import { createGlobalStyle } from "styled-components";
import climbGear from "./climbGear.jpg";

export const GlobalStyles = createGlobalStyle`

html {
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
  color: white;
  background-image: url(${climbGear});
  background-attachment: fixed;
  background-size: cover;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  display: flex;
  justify-content: center;
  
  height: 100vh;
  width: 100vw;
}

.App {
  margin: 20px 5px 50px 5px;
  background: rgba(255, 255, 255, 0.7);
  border-radius: 5px;
  padding: 10px 20px;
  min-width: 320px;
  color: rgba(50, 50, 50, 1);
  h2 {
    color: black;
  }

}

.Container {
  align-items: center;
}

`;

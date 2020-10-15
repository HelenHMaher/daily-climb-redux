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
  min-width: 320px;
  color: rgba(50, 50, 50, 1);
  h2 {
    color: black;
  }
  ul {
    list-style: none;
  }
  li::before {
    content: 	"\u25b6";
    color: rgba(50,50,50,.7);
    margin-right: 10px;
  }

  a {
    color: rgba(50, 50, 50, 1);
    text-decoration: none;
    margin: 5px;
    font-size: 1.1rem;
    font-weight: 700;

    &:hover {
      color: rgba(0, 0, 0, 1);
      margin-left: 10px;
    }
  }

  .component {
    padding: 20px;
  }

  #workoutType {
    font-style: italic;
  }

  .description {
    margin-left: 40px;
  }

  input {
    background: rgba(255, 255, 255, 1);
    border: 2px solid;
    border-color: rgba(50, 50, 50, 1);
    border-radius: 5px;
    padding: 0px 10px;
    font: inherit;
    cursor: pointer;
    outline: none;
    &:focus {
      transform: scale(1.01);
      border-color: rgba(190, 190, 190, 1);
      color: black;
    }
  }

  textarea {
    background: rgba(255, 255, 255, 1);
    border: 2px solid;
    border-color: rgba(50, 50, 50, 1);
    border-radius: 5px;
    width: 500px;
    height: 150px;
    resize: none;
    font: inherit;
    cursor: pointer;
    outline: none;
    &:focus {
      transform: scale(1.01);
      border-color: rgba(190, 190, 190, 1);
      color: black;
    }
  }

  select {
    background: rgba(255, 255, 255, 0.7);
    border: 2px solid;
    border-color: rgba(50, 50, 50, 0.7);
    border-radius: 5px;
    padding: 0px 10px;
    font: inherit;
    cursor: pointer;
    outline: none;
    &:focus {
      transform: scale(1.01);
      border-color: black;
      color: black;
    }
  }

  .formTitle {
    padding: 20px 20px 0px 20px;
  }

  .formSection {
    padding: 20px;

    select {
      background: white;
      border-color: rgba(50, 50, 50, 1);
      &:active {
        border-color: rgba(190, 190, 190, 1);
    }
  }

}

form {
    background: rgba(50,50,50,.7);
    button {
      background: rgba(255, 255, 255, 1);
      border-color: rgba(50, 50, 50, 1);
      &:hover {
        border-color: rgba(190, 190, 190, 1);
      }
    }
    label {
      color: white;
    }

  }

.Container {
  align-items: center;
}

label {
  font-weight: 500;
  padding-right: 10px;
}


button {
    background: rgba(255, 255, 255, 0.7);
    border: 2px solid;
    border-color: rgba(50, 50, 50, 0.7);
    border-radius: 20px;
    padding: 5px 15px;
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

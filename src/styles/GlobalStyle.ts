import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
  }

  body {
    font-family: 'Roboto', sans-serif;
    button {
      cursor: pointer;
    }
  }
`;

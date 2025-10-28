import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  /* Reset / Normalize */
  *, *::before, *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  /* Ustawienia globalne */
  html, body {
  font-family: "Open Sans", sans-serif;
  font-optical-sizing: auto;
  }

  h1{
    font-size: 2.5rem;
  }
  p{
    font-size: 1.1rem;
  }

`;

export default GlobalStyle;

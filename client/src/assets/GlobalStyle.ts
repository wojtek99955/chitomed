import { createGlobalStyle } from "styled-components";
import { device } from "./device";

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
    color:#444444;
  }
  h2{
    font-size: 1.8rem;
    margin-bottom: 2rem;
    color:#444444;
    text-transform: uppercase;

    @media ${device.tablet}{
      font-size: 2.2rem;
    }
  }
  p{
    font-size: 1.2rem;
    color:#444444;
  }

`;

export default GlobalStyle;

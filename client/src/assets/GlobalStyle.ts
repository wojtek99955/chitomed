import { createGlobalStyle } from "styled-components";
import { device } from "./device";

import Regular from "../assets/fonts/telegraf/PPTelegraf-Regular.otf";
import Ultralight from "../assets/fonts/telegraf/PPTelegraf-Ultralight.otf";
import Ultrabold from "../assets/fonts/telegraf/PPTelegraf-Ultrabold.otf";

const GlobalStyle = createGlobalStyle`
  /* Reset / Normalize */
  *, *::before, *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  /* Deklaracje @font-face – MUSZĄ być na najwyższym poziomie! */
  @font-face {
    font-family: 'PP Telegraf';
    src: url(${Ultralight}) format('opentype');
    font-weight: 200; /* Ultralight – dostosuj jeśli potrzeba */
    font-style: normal;
    font-display: swap;
  }

  @font-face {
    font-family: 'PP Telegraf';
    src: url(${Regular}) format('opentype');
    font-weight: 400; /* Regular */
    font-style: normal;
    font-display: swap;
  }

  @font-face {
    font-family: 'PP Telegraf';
    src: url(${Ultrabold}) format('opentype');
    font-weight: 800; /* Ultrabold */
    font-style: normal;
    font-display: swap;
  }

  /* Globalne ustawienia */
  body {
    font-family: 'PP Telegraf', sans-serif; /* Teraz pasuje do nazwy z @font-face */
    font-optical-sizing: auto;
  }

  html, body {
    /* inne ustawienia */
  }

  h1 {
    font-size: 2.1rem;
    color: #444444;
    @media ${device.desktop} {
      font-size: 2.5rem;
    }
  }

  h2 {
    font-size: 1.8rem;
    margin-bottom: 2rem;
    color: #444444;
    text-transform: uppercase;
    @media ${device.tablet} {
      font-size: 2.2rem;
    }
  }

  p {
    font-size: 1.2rem;
    color: #444444;
  }
`;

export default GlobalStyle;

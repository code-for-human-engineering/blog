import React from "react"
import { createGlobalStyle } from "styled-components"
import * as fonts from "../assets/fonts/index"

const GlobalStyle = createGlobalStyle`
@font-face {
    font-family: 'KarnakPro';
    src: url('${fonts.KarnakProBoldWoff2}') format('woff2'),
        url('${fonts.KarnakProBoldWoff1}') format('woff');
    font-weight: bold;
    font-style: normal;
}
@font-face {
    font-family: 'Helvetica';
    src: url('${fonts.Helvetica2}') format('woff2'),
        url('${fonts.Helvetica1}') format('woff');
    font-weight: normal;
    font-style: normal;
}
body{
  margin: 0px;
  padding: 0px;
}
`

export default GlobalStyle

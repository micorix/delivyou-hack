import {createGlobalStyle} from "styled-components";

require('normalize.css')

const GlobalStyle = createGlobalStyle`
    body{
        font-family: Roboto;
        // background:rgba(0,0,0, 0.1);
    }
    h1,h2,h3,h4,h5{
        font-family: 'Montserrat';
    }
`;

export default GlobalStyle

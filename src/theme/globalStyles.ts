import { createGlobalStyle } from "styled-components";


export const GlobalStyle = createGlobalStyle`

    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    *::-webkit-scrollbar {
        width: 7px;
        background: #fff;
        border-radius: 2px;
    }

    *::-webkit-scrollbar-thumb {
        background: rgba(44, 44, 44, 0.99);
        border-radius: 10px;
    }

    *::-webkit-scrollbar-button {
        display: none;
    }

    body {
        padding: 0;
        margin: 0;
        box-sizing: border-box;

        background-color: #EFF2F6;

        font-family: 'Public Sans', sans-serif;
        font-weight: 400;
    }
`
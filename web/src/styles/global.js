import { createGlobalStyle } from 'styled-components';
import 'react-toastify/dist/ReactToastify.css';
import 'react-datepicker/dist/react-datepicker.css';

export default createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    outline: 0;
    box-sizing: border-box;
  }
  *:focus {
    outline: 0;
  }
  html, body {
    height: 100%;
  }
   #root {
    min-height: 100%;
  }
  body {
    -webkit-font-smoothing: antialiased
  }
  body, input, button {
    font: 14px 'Helvetica', sans-serif;
  }
  a{
    text-decoration: none;
  }
  ul{
    list-style: none;
  }
  button{
    cursor: pointer;
  }
`;

import styled from 'styled-components';
import { createGlobalStyle } from "styled-components"

const GlobalStyle = createGlobalStyle`
  body, html {
    background: white;
    color: black;
    font-family: "Roboto", sans-serif;
    font-size: 1.15em;
    font-weight: bold;
    margin: 0;
    max-width: 100%;
    overflow-x: hidden;

  
  }`

/* const Title = styled.h1`
  font-size: 1.5em;
  color: black;
`

const Wrapper = styled.section`
  display: flex;
`

const Break = styled.section`
  flex-basis: 100%;
  height: 0;
`
const Container = styled.section`
  display:flex;
  justify-content: center;
  
`
const Space = styled.section`
  flex-direction: column;
  height: 50px;
  marging: 20px;

`
const Right = styled.section`
  margin-left: auto;
`
const Dark = styled.section`
  color: #30393b;`
  */

export { GlobalStyle}
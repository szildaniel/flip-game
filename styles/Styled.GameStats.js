import styled from 'styled-components';
import { device } from "../styles/breakpoints";

export const GameStats = styled.div`
display: flex;
justify-content: center;
align-items:center;
padding: 0.5rem 1rem;
  @media ${device.laptop}{
    padding: 2rem 1rem;
  }
div{
    padding: 20px 10px;
}
span.totalClicks{
    display: block;
    font-weight: bold;
    font-size: 1.3rem;
    text-align: center;
}
`
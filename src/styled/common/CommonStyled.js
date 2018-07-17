import styled from 'styled-components'

export const Nav = styled.nav`
  height: 65px;
  background-color: ${props => props.theme.blue};
`;

export const FlexContainer = styled.div`
  display: flex;
  flex-wrap: nowrap;
  justify-content: center;
`;

export const FlexLinks = FlexContainer.extend`
  .navlink{
    display: inline-block;
    font-size: 20px;
    font-weight: bold;
    line-height: 65px;
    padding: 0 40px;
    color: ${props => props.theme.lily};
    transition: .25s;
    &:hover{
      color: ${props => props.theme.white};
      background-color: ${props => props.theme.darkBlue};
    }
    &.active{
      color: ${props => props.theme.white};
      background-color: ${props => props.theme.deepBlue};
    }
  }
`;

export const BodyBackGround = styled.section`
  background-color: ${props => props.theme.lightGray};
  padding: 20px 0;
  min-height: calc(100vh - 65px);
`
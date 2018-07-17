import styled, { css } from 'styled-components'

export const ChkboxStyled = styled.label`
  cursor: pointer;
  width: 20px;
  height: 20px;
  border: 2px solid ${props => props.theme.blue};
  border-radius: 3px;
  margin: 0;
  position: relative;
  background-color: ${props => props.isChecked ? props.theme.blue : 'transparent'};

  ${props => props.isChecked && css`
     &:after {
      content: '';
      position: absolute;
      transform: rotate(-45deg);
      top: 3px;
      left: 2px;
      width: 12px;
      height: 6px;
      border: 2px solid ${props => props.theme.white};
      border-top-style: none;
      border-right-style: none; 
    }
  `}

  input[type=checkbox] {
    outline: 0;
    visibility: hidden;
  }
`;


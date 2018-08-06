import styled, { keyframes, css } from 'styled-components'

export const EditTodoWrapper = styled.div`
  position: relative;
  border-radius: 0 0 3px 3px;
  transform-origin: 0 0;
  background-color: ${props => props.theme.white};
  padding: ${props => props.isEdit? '20px' : '0px'};
  height: ${props => props.isEdit? props.height+'px' : '0px'};
  transform: ${props => props.isEdit? 'scaleY(1)' : 'scaleY(0)'};

  ${props => {
    if(props.height === 551 || (props.height - 551) % 31 === 0) 
      return css`transition: .8s ease-in-out;`
    else
      return css`transition: 0s;`
  }}

  ${props => props.isEdit && css`
    ${Block} {
      animation-name: ${slowEaseIn};
      animation-duration: .8s;
    }
  `}

  ${props => !props.isEdit && css`
    ${Block} {
      animation-name: ${slowEaseOut};
      animation-duration: .5s;
      animation-delay: ${props => delayTimout(props) + 's'};
    }
  `}

`;

const slowEaseIn = keyframes`
  from { visibility: hidden; opacity: 0; transform: translateY(15px) }
  to { visibility: visible; opacity: 1; transform: translateY(0) }
`;

const slowEaseOut = keyframes`
  from { visibility: visible; opacity: 1; transform: translateY(0) }
  to { visibility: hidden; opacity: 0; transform: translateY(15px) }
`;

const delayTimout = props => {
  if (props.isEdit === false)
    return 0;
  else
    return props.index * 0.35 + 0.7;
}

export const Block = styled.div`
  position: relative;
  margin-bottom: 40px;
  padding: 0 20px;
  /* animation-name: ${slowEaseIn}; */
  animation-delay: ${props => delayTimout(props)+'s'};
  animation-fill-mode: both;
  
  &.picker-zindex{
    z-index: 50;
  }
`;



export const Title = styled.h5`
  font-size: 18px;
  font-weight: bold;
  line-height: 2;
  color: ${props => props.theme.materialSteel};
  .fa-icon{
    margin-right: 10px;
    vertical-align: text-top !important;
  }
`;

export const Content = styled.div`
  display: ${props => props.last ? 'block' : 'flex'};
  align-items: center;
  padding: 0 20px;
  margin-bottom: ${props => props.last? '80px' : '0'};
`;

export const DropText = styled.p`
  margin-bottom: 0;
  font-weight: bold;
  width: 80%;
  text-align: center;
  color: ${props => props.theme.materialLightSteel};
`;

export const DropEnterBlock = styled.div`
  position: absolute;
  color: ${props => props.theme.white};
  font-size: 24px;
  font-weight: bold;
  line-height: 100px;
  text-align: center;
  border: 2px dashed ${props => props.theme.white};
  left: 0;
  top: 34px;
  background-color: rgba(0, 0, 0, .45);
  width: 100%;
  height: 100px;
`;

export const FilesContainer = styled.div`
  padding: 0 20px;
  .file-list{
    font-size: 14px;
    color: ${props => props.theme.materialSteel};
    margin-top: 10px;
    display: flex;
    justify-content: space-between;
    p{
      margin: 0;
    }
    .fa-icon{
      width: 20px;
      height: 20px;
      border-radius: 50%;
      color: ${props => props.theme.blue};
      cursor: pointer;
      &:hover{
        color: ${props => props.theme.deepBlue};
        background-color: ${props => props.theme.lightGray};
      }
    }
  }
`;

export const TextArea = styled.textarea`
  resize: none;
  width: 100%;
  height: 100px;
`;

export const EditTodoBtnWrapper = styled.div`
  position: absolute;
  width: 100%;
  bottom: 0;
  left: 0;
`;

const ButtonStyle = styled.button`
  width: 50%;
  line-height: 2.5em;
  cursor: pointer;
  font-size: 1.5em;
  font-weight: bold;
  transition: .25s;
`;

export const BtnAdd = ButtonStyle.extend`
  background-color: ${props => props.theme.blue};
  color: ${props => props.theme.white};
  &:hover{
    background-color: ${props => props.theme.darkBlue};
  }
`;

export const BtnCancel = ButtonStyle.extend`
  background-color: ${props => props.theme.white};
  color: ${props => props.theme.blue};
  &:hover{
    background-color: ${props => props.theme.lily};
  }
`;

export const WariningText = styled.p`
  font-size: 12px;
  color: ${props => props.theme.red};
`;
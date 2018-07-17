import styled, { keyframes, css } from 'styled-components'

export const EditTodoWrapper = styled.div`
  background-color: ${props => props.theme.white};
  border-radius: 0 0 3px 3px;
  transition: .8s ease-in-out;
  transform-origin: 0 0;
  padding: ${props => props.isEdit? '20px' : '0px'};
  height: ${props => props.isEdit? '545px' : '0px'};
  opacity: ${props => props.isEdit ? '1' : '0'};
  transform: ${props => props.isEdit ? 'scaleY(1)' : 'scaleY(0)'};
  position: relative;

  ${props => props.isEdit && css`
    ${Block} {
      animation-name: ${slowEaseIn};
    }
  `}
`;

const slowEaseIn = keyframes`
  from { opacity: 0; transform: translateY(15px) }
  to { opacity: 1; transform: translateY(0)}
`;

const delayTimout = index => {
  return index * 0.35 + 1
}

export const Block = styled.div`
  position: relative;
  margin-bottom: 40px;
  padding: 0 20px;
  /* animation-name: ${slowEaseIn}; */
  animation-duration: 1s;
  animation-delay: ${props => props.index? delayTimout(props.index)+'s' : '1.65s'};
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
  display: flex;
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

export const BtnAddTask = ButtonStyle.extend`
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
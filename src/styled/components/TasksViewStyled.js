import styled, { keyframes, css } from 'styled-components'

export const TaskContainer = styled.div`
  max-width: 680px;
  padding: 0 10px;
  margin: auto;
`;

export const InputTaskWrapper = styled.div`
  background-color: ${props => props.theme.white};
  padding: 20px;
  border-bottom: 2px solid ${props => props.theme.gray};
  position: relative;
  border-radius: 3px 3px 0 0;
  .fa-plus{
    width: 20px;
    font-size: 20px;
    color: ${props => props.theme.silver};
  }
  &:after{
    content: '';
    width: ${props => props.isEdit ? '100%' : '0%'};
    height: 2px;
    background-color: ${props => props.theme.blue};
    position: absolute;
    bottom: -2px;
    left: 0;
    transition: .7s .25s;
  }
`;

export const InputTask = styled.input`
  width: calc(100% - 80px);
  padding: 0 15px;
  border: none;
  font-size: 22px;
  font-weight: bold;
  vertical-align: middle;
  background-color: ${props => props.theme.white};
  &::placeholder{
    color: ${props => props.theme.silver};
  }
  &:focus{
    outline: none;
    border: none;
    box-shadow: none;
  }
`;

export const TaskToolsDefault = styled.span`
  .fa-icon{
    cursor: pointer;
    font-size: 20px;
    width: 20px;
    margin-left: 10px;
    color: ${props => props.theme.silver};
  }
  .fa-pencil{
    color: ${props => props.theme.silver};
    &:hover{
      color: ${props => props.theme.blue};
    }
  }
  .fa-starO{
    &:hover{
      color: ${props => props.theme.yellow};
    }
  }
  .fa-star{
    color: ${props => props.theme.yellow};
    &.appear{
      color: ${props => props.theme.silver};
      &:hover{
        color: ${props => props.theme.yellow};
      }
    }
  }
`;

export const TaskTools = TaskToolsDefault.extend`
  visibility: ${props => props.isEdit ? 'visable' : 'hidden'};
  .fa-pencil{
    color: ${props => props.isEdit ? props.theme.blue : props.theme.silver};
    animation: ${props => props.isEdit ? slowEaseIn + ' .5s 1s both' : null};
  }
  .fa-starO{
    animation: ${props => props.isEdit ? slowEaseIn+' .5s 1.3s both' : null};
  }
`;


const slowEaseIn = keyframes`
  from { opacity: 0; transform: translateY(15px) }
  to { opacity: 1; transform: translateY(0)}
`;


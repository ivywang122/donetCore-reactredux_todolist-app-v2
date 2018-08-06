import styled, { keyframes, css } from 'styled-components'

export const TodoContainer = styled.div`
  position: relative;
  margin-top: 10px;
  padding: 20px;
  background-color: ${props => props.theme.white};
  label {
    vertical-align: middle;
  }
  .fa-pencil {
    color: ${props => props.isEdit ? props.theme.blue : props.theme.silver}
  }
  &:after{
    content: '';
    width: ${props => props.isEdit ? '100%' : '0%'};
    height: 2px;
    background-color: ${props => props.theme.blue};
    position: absolute;
    bottom: 0;
    left: 0;
    transition: .7s .25s;
  }
`;

export const TodoTitle = styled.input`
  width: calc(100% - 80px);
  padding: 0 15px;
  border: none;
  font-size: 22px;
  font-weight: bold;
  vertical-align: middle;
  background-color: ${props => props.theme.white};
  color: ${props => props.isCompleted ? props.theme.silver : props.theme.darkGray};
  text-decoration: ${props => props.isCompleted ? 'line-through' : 'none'};
  &:focus{
    outline: none;
    border: none;
    box-shadow: none;
  }
`;

export const TodoIfnoWrapper = styled.div`
  margin-top: 10px;
  color: ${props => props.theme.materialSteel};
  span{
    margin-right: 10px;
  }
  .fa-icon{
    vertical-align: text-top;
    font-size: 20px;
    padding-right: 5px;
  }
`;

export const InfoText = styled.span`
  vertical-align: bottom;
  font-size: 14px;
  display: ${props => props.comment ? 'inline-block' : 'inline'};
  text-overflow: ${props => props.comment ? 'ellipsis' : 'clip'};
  width: ${props => props.comment ? '140px' : 'auto'};
  white-space: nowrap;
  overflow : hidden;
  color: ${props => props.theme.darkGray};
`;
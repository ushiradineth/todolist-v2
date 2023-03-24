import styled from "styled-components";

const StyledContainer = styled.div`
  display: flex;
  height: 35px;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  padding-left: 16px;
  padding-right: 16px;
  background-color: #3f3f46;
`;

const StyledInput = styled.input`
  border-style: none;
  background-color: #3f3f46;
  color: white;
  box-shadow: none;
  outline: none;
  font-size: 20px;
`;

interface propType {
  id: string;
  register?: any;
  placeholder: string;
  type: string;
  maxlength?: number;
  minlength?: number;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input = (props: propType) => {
  return (
    <StyledContainer key={props.id}>
      <StyledInput onChange={props.onChange} autoComplete="off" type={props.type || "text"} {...props.register} id={props.id} name={props.id} placeholder={props.placeholder} maxLength={props.maxlength || 200} minLength={props.minlength || 1} />
    </StyledContainer>
  );
};

export default Input;

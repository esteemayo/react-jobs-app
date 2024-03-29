import styled from 'styled-components';

const FormRow = ({
  type,
  name,
  value,
  handleChange,
  horizontal,
  placeholder,
}) => {
  return (
    <Container className='form-row'>
      {!horizontal && (
        <label htmlFor={name} className='form-label'>
          {name}
        </label>
      )}
      <input
        id={name}
        type={type}
        value={value}
        name={name}
        onChange={handleChange}
        className='form-input'
        placeholder={placeholder}
      />
    </Container>
  );
};

const Container = styled.div`
  .form-label{
    display: inline-block;
    color: ${({ theme }) => theme.text}
  }

  .form-input {
    display: inline-block;
    padding: 1rem 0.75rem;
    background-color: ${({ theme }) => theme.bg};
    color: #999;
    border: 1px solid ${({ theme }) => theme.colorBorder};
    caret-color: ${({ theme }) => theme.crInput};

    &::placeholder {
      font-size: 0.75rem;
      color: #bbb;
    }
    
    &:focus {
      outline: 1px solid ${({ theme }) => theme.colorOutline};
    }
  }
`;

export default FormRow;

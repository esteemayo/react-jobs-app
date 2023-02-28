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
  .form-input {
    background-color: ${({ theme }) => theme.bg};
    border: 1px solid ${({ theme }) => theme.colorBorder};
    caret-color: ${({ theme }) => theme.crInput};
    
    &:focus {
      outline-color: ${({ theme }) => theme.colorBorder};
    }
  }
`;

export default FormRow;

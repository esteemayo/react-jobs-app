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
  width: 100%;
  padding: 0.375rem 0.75rem;
  border-radius: var(--borderRadius);
  background: ${({ theme }) => theme.bg};
`;

export default FormRow;

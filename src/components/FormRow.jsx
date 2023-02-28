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
    <Container>
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
  border: 1px solid var(--grey-200);
  caret-color: var(--primary-500);
`;

export default FormRow;

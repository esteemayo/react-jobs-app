import styled from 'styled-components';

const Alert = () => {
  return (
    <Container>
      <div className='alert alert-danger'>
        there was an error, please try again
      </div>
    </Container>
  );
};

const Container = styled.div`
  .alert {
    max-width: var(--max-width);
    margin-bottom: 1rem;
  }
`;

export default Alert;

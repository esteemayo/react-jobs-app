import styled from 'styled-components';

const JobColumns = () => {
  return (
    <Wrapper>
      <span>position</span>
      <span>company</span>
      <span>date</span>
      <span>status</span>
      <span className='action'>action</span>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  display: none;
  
  @media (min-width: 62em) {
    display: block;
    background: ${({ theme }) => theme.bgColumn};
    color: ${({ theme }) => theme.textColumn};
    border-top-left-radius: var(--borderRadius);
    border-top-right-radius: var(--borderRadius);
    display: grid;
    grid-template-columns: 1fr 1fr 150px 100px 100px;
    align-items: center;
    padding: 1rem 1.5rem;
    column-gap: 1rem;
    text-transform: capitalize;
    letter-spacing: var(--letterSpacing);
    font-size: var(--small-text);
    font-weight: 600;
  
    .action {
      margin-left: 1rem;
    }
  }
`;

export default JobColumns;

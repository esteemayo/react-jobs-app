import styled from 'styled-components';
import { Link } from 'react-router-dom';

import img from 'assets/not-found.svg';

const Error = () => {
  return (
    <Wrapper className='page full-page'>
      <div>
        <img src={img} alt='' />
        <h3>Ohh! page not found</h3>
        <p>We can't seem to find the page you're looking for</p>
        <Link to='/'>Back to home</Link>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.main`
  text-align: center;

  img {
    max-width: 600px;
    display: block;
    margin-bottom: 2rem;
  }

  display: flex;
  align-items: center;
  justify-content: center;

  h3 {
    color: ${({ theme }) => theme.text};
    margin-bottom: 0.5rem;
  }

  p {
    margin-top: 0;
    margin-bottom: 0.5rem;
    color: ${({ theme }) => theme.textError};
  }

  a {
    color: ${({ theme }) => theme.errorLink};
    text-decoration: underline;
  }
`;

export default Error;

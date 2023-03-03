import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import logo from 'assets/logo.svg';
import { toggle } from 'redux/darkMode/darkMode';
import main from 'assets/main.svg';

const Home = () => {
  return (
    <Wrapper>
      <nav>
        <img src={logo} alt='' />
      </nav>
      <div className='container page'>
        <div className='info'>
          <h1>job tracking app</h1>
          <p>
            I'm baby viral enamel pin chartreuse cliche retro af selfies kinfolk
            photo booth plaid jianbing actually squid 3 wolf moon lumbersexual.
            Hell of humblebrag gluten-free lo-fi man braid leggings.
          </p>

          <Link to='/register' className='btn hero-btn'>
            Login / Register
          </Link>
        </div>
        <img src={main} alt='' className='img main-img' />
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  .container {
    min-height: calc(100vh - 6rem);
    display: grid;
    align-items: center;
    margin-top: -3rem;

    .info {
      color: ${({ theme }) => theme.textInfo};
    }

    .hero-btn{
      background-color: ${({ theme }) => theme.bgBtn};
      color: ${({ theme }) => theme.textBtn};
      
      &:hover {
        background-color: ${({ theme }) => theme.bgBtnHover};
      }
    }
  }

  nav {
    width: var(--fluid-width);
    max-width: var(--max-width);
    margin: 0 auto;
    height: 6rem;
    display: flex;
    align-items: center;
    justify-content: space-between;

    .icon-container {
      color: ${({ theme }) => theme.text};
      cursor: pointer;
    }
  }

  h1 {
    font-weight: 700;
  }

  .main-img {
    display: none;
  }

  @media (min-width: 62em) {
    .container {
      grid-template-columns: 1fr 1fr;
      column-gap: 6rem;
    }

    .main-img {
      display: block;
    }
  }
`;

export default Home;

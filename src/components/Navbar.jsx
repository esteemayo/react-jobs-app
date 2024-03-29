import styled from 'styled-components';
import { useState } from 'react';
import { FaCaretDown, FaUserCircle } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';

import { setLogout } from 'redux/users/userSlice';
import logo from 'assets/logo.svg';

const Navbar = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);

  const [showLogout, setShowLogout] = useState(false);

  return (
    <Wrapper>
      <div className='nav-center'>
        <img src={logo} alt='' />
        {user && (
          <div className='btn-container'>
            <button className='btn' onClick={() => setShowLogout(!showLogout)}>
              <FaUserCircle />
              {user?.name}
              <FaCaretDown />
            </button>
            <div className={showLogout ? 'dropdown show-dropdown' : 'dropdown'}>
              <button
                className='dropdown-btn'
                onClick={() => dispatch(setLogout())}
              >
                logout
              </button>
            </div>
          </div>
        )}
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.nav`
  height: 6rem;
  display: flex;
  justify-content: center;
  align-items: center;

  .nav-center {
    width: var(--fluid-width);
    max-width: var(--max-width);
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .btn-container {
    position: relative;
    
    .btn {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0 0.5rem;
      position: relative;
      background-color: ${({ theme }) => theme.bgBtn};
      color: ${({ theme }) => theme.textBtn};
      outline-color: ${({ theme }) => theme.colorOutline};
  
      &:hover {
        background-color: ${({ theme }) => theme.bgBtnHover};
      }
    }
  }

  .dropdown {
    position: absolute;
    top: 40px;
    left: 0;
    width: 100%;
    background-color: ${({ theme }) => theme.bgLighter};
    padding: 0.5rem;
    text-align: center;
    visibility: hidden;
    transition: var(--transition);
    border-radius: var(--borderRadius);
    
    &.show-dropdown {
      visibility: visible;
    }

    .dropdown-btn {
      background-color: transparent;
      border-color: transparent;
      color: ${({ theme }) => theme.textDrop};
      letter-spacing: var(--letterSpacing);
      text-transform: capitalize;
      cursor: pointer;
    }
  }
`;

export default Navbar;

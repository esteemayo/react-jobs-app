import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';

import Alert from 'components/Alert';
import logo from 'assets/logo.svg';
import { loginUser, registerUser, reset } from 'redux/users/userSlice';
import FormRow from 'components/FormRow';

const initialState = {
  name: '',
  email: '',
  password: '',
  isMember: true,
  confirmPassword: '',
};

const Register = () => {
  const dispatch = useDispatch();
  const { isFetching, showAlert } = useSelector((state) => state.user);

  const [values, setValues] = useState(initialState);

  const toggleMember = () => {
    setValues((prev) => ({ ...prev, isMember: !prev.isMember }));
  };

  const handleChange = ({ target: input }) => {
    const { name, value } = input;
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  const { name, email, password, confirmPassword, isMember } = values;

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isMember) {
      const userData = {
        email,
        password,
      };

      dispatch(loginUser({ user: userData, toast }));
    } else {
      const userData = {
        name,
        email,
        password,
        confirmPassword,
      };

      dispatch(registerUser({ user: userData, toast }));
    }
  };

  useEffect(() => {
    return () => dispatch(reset());
  }, [dispatch]);

  return (
    <Wrapper className='page full-page'>
      <div className='container'>
        {showAlert && <Alert />}
        <form className='form' onSubmit={handleSubmit}>
          <img src={logo} alt='' className='logo' />
          <h4>{isMember ? 'Login' : 'Register'}</h4>
          {!isMember && (
            <FormRow
              type='name'
              name='name'
              value={name}
              placeholder='Name'
              handleChange={handleChange}
            />
          )}

          <FormRow
            type='email'
            name='email'
            value={email}
            placeholder='Email'
            handleChange={handleChange}
          />

          <FormRow
            type='password'
            name='password'
            value={password}
            placeholder='********'
            handleChange={handleChange}
          />

          {!isMember && (
            <FormRow
              type='password'
              name='confirmPassword'
              placeholder='********'
              value={confirmPassword}
              handleChange={handleChange}
            />
          )}

          <button
            type='submit'
            className='btn btn-block'
            disabled={isFetching}
          >
            {isFetching ? 'Fetching User...' : 'Submit'}
          </button>
          <p>
            {isMember ? 'Not a member yet?' : 'Already a member?'}

            <button
              type='button'
              onClick={toggleMember}
              className='member-btn'
            >
              {isMember ? 'Register' : 'Login'}
            </button>
          </p>
        </form>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  display: grid;
  align-items: center;

  .container {
    background-color: ${({ theme }) => theme.bgLighter};
  
  .form {
    max-width: 400;
    background-color: ${({ theme }) => theme.bgLighter};
    border-top: 5px solid ${({ theme }) => theme.bgBtn};
    box-shadow: ${({ theme }) => theme.box};

    .logo {
      display: block;
      margin: 0 auto;
      margin-bottom: 1.38rem;
    }
    
    h4 {
      text-align: center;
      color: ${({ theme }) => theme.text};
    }

    p {
      margin: 0;
      margin-top: 1rem;
      text-align: center;
      color: ${({ theme }) => theme.text};
    }

    .btn {
      margin-top: 1rem;
      background-color: ${({ theme }) => theme.bgBtn};
      color: ${({ theme }) => theme.textBtn};
      outline-color: ${({ theme }) => theme.colorOutline};
  
      &:hover {
        background-color: ${({ theme }) => theme.bgBtnHover};
      }
      
      &:disabled {
        opacity: 0.7;
        cursor: not-allowed;
      }
    }

    .member-btn {
      background-color: transparent;
      border: transparent;
      color: var(--primary-500);
      cursor: pointer;
    }
  }
`;

export default Register;

import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';

import Alert from 'components/Alert';
import FormRow from 'components/FormRow';
import { loginUserAsync, registerUserAsync, reset } from 'redux/users/userSlice';

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
      if (email && password) {
        const userData = { email, password };

        dispatch(loginUserAsync({ user: userData, toast }));
      }
    } else {
      if (name && email && password && confirmPassword) {
        const userData = { name, email, password, confirmPassword };

        dispatch(registerUserAsync({ user: userData, toast }));
      }
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
          <img src={logo} alt='jobio' className='logo' />
          <h4>{isMember ? 'Login' : 'Register'}</h4>
          {!isMember && (
            <FormRow
              type='name'
              name='name'
              value={name}
              handleChange={handleChange}
            />
          )}

          <FormRow
            type='email'
            name='email'
            value={email}
            handleChange={handleChange}
          />

          <FormRow
            type='password'
            name='password'
            value={password}
            handleChange={handleChange}
          />

          {!isMember && (
            <FormRow
              type='password'
              name='confirmPassword'
              value={confirmPassword}
              handleChange={handleChange}
            />
          )}

          <button type='submit' className='btn btn-block' disabled={isFetching}>
            {isFetching ? 'Fetching User...' : 'Submit'}
          </button>
          <p>
            {isMember ? 'Not a member yet?' : 'Already a member?'}

            <button type='button' onClick={toggleMember} className='member-btn'>
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

  .logo {
    display: block;
    margin: 0 auto;
    margin-bottom: 1.38rem;
  }

  .form {
    max-width: 400;
    border-top: 5px solid var(--primary-500);
  }

  h4 {
    text-align: center;
  }

  p {
    margin: 0;
    margin-top: 1rem;
    text-align: center;
  }

  .btn {
    margin-top: 1rem;
  }

  .btn:disabled {
    cursor: not-allowed;
  }

  .member-btn {
    background: transparent;
    border: transparent;
    color: var(--primary-500);
    cursor: pointer;
  }
`;

export default Register;

import { useState } from 'react';
import styled from 'styled-components';
import { Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import logo from 'assets/logo.svg';
import FormRow from 'components/FormRow';
import { loginUserAsync, registerUserAsync } from 'redux/user';

const Register = () => {
    const dispatch = useDispatch();
    const { user, isFetching, showAlert } = useSelector((state) => state.user);

    const [values, setValues] = useState({
        name: '',
        email: '',
        password: '',
        isMember: true,
        confirmPassword: '',
    });

    const toggleMember = () => {
        setValues({ ...values, isMember: !values.isMember });
    };

    const handleChange = ({ target: input }) => {
        setValues({ ...values, [input.name]: input.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const { name, email, password, confirmPassword, isMember } = values;

        if (isMember) {
            if (email && password) {
                const userData = { email, password };

                dispatch(loginUserAsync({ ...userData }));
            }
        } else {
            if (name && email && password && confirmPassword) {
                const userData = { name, email, password, confirmPassword };

                dispatch(registerUserAsync({ ...userData }));
            }
        }
    };

    return (
        <>
            {user && <Navigate to='/dashboard' />}
            <Wrapper className='page full-page'>
                <div className='container'>
                    {showAlert && (
                        <div className='alert alert-danger'>
                            there was an error, please try again
                        </div>
                    )}
                    <form className='form' onSubmit={handleSubmit}>
                        <img src={logo} alt='jobio' className='logo' />
                        <h4>{values.isMember ? 'Login' : 'Register'}</h4>
                        {!values.isMember && (
                            <FormRow
                                type='name'
                                name='name'
                                value={values.name}
                                handleChange={handleChange}
                            />
                        )}

                        <FormRow
                            type='email'
                            name='email'
                            value={values.email}
                            handleChange={handleChange}
                        />

                        <FormRow
                            type='password'
                            name='password'
                            value={values.password}
                            handleChange={handleChange}
                        />

                        {!values.isMember && (
                            <FormRow
                                type='password'
                                name='confirmPassword'
                                value={values.confirmPassword}
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
                            {values.isMember ? 'Not a member yet?' : 'Already a member?'}

                            <button
                                type='button'
                                onClick={toggleMember}
                                className='member-btn'
                            >
                                {values.isMember ? 'Register' : 'Login'}
                            </button>
                        </p>
                    </form>
                </div>
            </Wrapper>
        </>
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
  .member-btn {
    background: transparent;
    border: transparent;
    color: var(--primary-500);
    cursor: pointer;
  }
`;

export default Register;

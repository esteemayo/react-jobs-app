import { useState } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';

import { createJobAsync } from 'redux/jobs';
import { FormRow, Jobs, Navbar } from 'components';

const Dashboard = () => {
  const dispatch = useDispatch();
  const { showAlert, isLoading } = useSelector((state) => state.jobs);
  const [values, setValues] = useState({ company: '', position: '' });

  const handleChange = ({ target: input }) => {
    const { name, value } = input;
    setValues({ ...values, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { company, position } = values;

    if (company && position) {
      const newJob = { company, position };
      dispatch(createJobAsync({ ...newJob }));
      setValues({ company: '', position: '' });
    }
  };

  return (
    <>
      <Navbar />

      <Wrapper className='page'>
        {showAlert && (
          <div className='alert alert-danger'>
            there was an error, please try again
          </div>
        )}
        <form className='job-form' onSubmit={handleSubmit}>
          <FormRow
            type='name'
            name='position'
            value={values.position}
            handleChange={handleChange}
            horizontal
            placeholder='Position'
          />

          <FormRow
            type='name'
            name='company'
            value={values.company}
            handleChange={handleChange}
            horizontal
            placeholder='Company'
          />
          <button type='submit' className='btn' disabled={isLoading}>
            {isLoading ? 'Adding New Job...' : 'Add Job'}
          </button>
        </form>

        <Jobs />
      </Wrapper>
    </>
  );
};

const Wrapper = styled.section`
  padding: 3rem 0;

  .job-form {
    background: var(--white);
    display: grid;
    row-gap: 1rem;
    column-gap: 0.5rem;
    align-items: center;
    margin-bottom: 3rem;
    border-radius: var(--borderRadius);
    padding: 1.5rem;

    .form-input {
      padding: 0.75rem;
    }

    .form-input:focus {
      outline: 1px solid var(--primary-500);
    }

    .form-row {
      margin-bottom: 0;
    }

    .btn {
      padding: 0.75rem;
    }

    @media (min-width: 776px) {
      grid-template-columns: 1fr 1fr auto;

      .btn {
        height: 100%;
        padding: 0 2rem;
      }

      column-gap: 2rem;
    }
  }

  .alert {
    max-width: var(--max-width);
    margin-bottom: 1rem;
  }
`;

export default Dashboard;

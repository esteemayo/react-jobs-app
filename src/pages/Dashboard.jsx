import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';

import Alert from 'components/Alert';
import Jobs from 'components/Jobs';
import { createJob, reset } from 'redux/jobs/jobSlice';
import FormRow from 'components/FormRow';

const initialState = {
  company: '',
  position: '',
};

const Dashboard = () => {
  const dispatch = useDispatch();
  const { showAlert, isLoading } = useSelector((state) => state.jobs);

  const [values, setValues] = useState(initialState);

  const handleChange = ({ target: input }) => {
    const { name, value } = input;
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  const { company, position } = values;

  const handleClear = () => {
    setValues(initialState);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (company && position) {
      const newJob = { company, position };
      dispatch(createJob({ newJob, toast }));
      handleClear();
    }
  };

  useEffect(() => {
    return () => dispatch(reset());
  }, [dispatch]);

  return (
    <Wrapper className='page'>
      {showAlert && <Alert />}
      <form className='job-form' onSubmit={handleSubmit}>
        <FormRow
          type='name'
          name='position'
          value={position}
          handleChange={handleChange}
          horizontal
          placeholder='Position'
        />

        <FormRow
          type='name'
          name='company'
          value={company}
          handleChange={handleChange}
          horizontal
          placeholder='Company'
        />
        <button
          type='submit'
          className='btn'
          disabled={isLoading}
        >
          {isLoading ? 'Adding New Job...' : 'Add Job'}
        </button>
      </form>

      <Jobs />
    </Wrapper>
  );
};

const Wrapper = styled.section`
  padding: 3rem 0;

  .job-form {
    background: ${({ theme }) => theme.bgLighter};
    display: grid;
    row-gap: 1rem;
    column-gap: 0.5rem;
    align-items: center;
    margin-bottom: 3rem;
    border-radius: var(--borderRadius);
    padding: 1.5rem;

    .form-input {
      padding: 0.75rem;

      &::placeholder {
        color: #bbb;
      }
    }

    .form-input:focus {
      outline: 1px solid var(--primary-500);
    }

    .form-row {
      margin-bottom: 0;
    }

    .btn {
      padding: 0.75rem;
      background-color: ${({ theme }) => theme.bgBtn};
      color: ${({ theme }) => theme.textBtn};
      outline-color: ${({ theme }) => theme.colorOutline};
      
      &:hover {
        background-color: ${({ theme }) => theme.bgBtnHover};
      }

      &:disabled {
        cursor: not-allowed;
      }
    }

    @media (min-width: 48.5em) {
      grid-template-columns: 1fr 1fr auto;

      .btn {
        height: 100%;
        padding: 0 2rem;
      }

      column-gap: 2rem;
    }
  }
`;

export default Dashboard;

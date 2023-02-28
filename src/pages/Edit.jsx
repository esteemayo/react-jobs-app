import styled from 'styled-components';
import { useLocation, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import FormRow from 'components/FormRow';
import { fetchJob, reset, updateJob } from 'redux/jobs/jobSlice';
import Spinner from 'components/Spinner';

const initialState = {
  id: null,
  company: '',
  position: '',
  status: '',
};

const Edit = () => {
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const path = pathname.split('/')[2];

  const {
    editItem,
    isLoading,
    editComplete,
    singleJobError: error,
  } = useSelector((state) => state.jobs);

  const [values, setValues] = useState(initialState);

  const handleChange = ({ target: input }) => {
    const { name, value } = input;
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  const { id, company, position, status } = values;

  const handleSubmit = (e) => {
    e.preventDefault();

    if (company && position) {
      const updJob = { company, position, status };
      dispatch(updateJob({ jobId: id, job: updJob }));
    }
  };

  useEffect(() => {
    dispatch(fetchJob(path));
  }, [dispatch, path]);

  useEffect(() => {
    if (editItem) {
      const { _id: id, company, position, status } = editItem;
      setValues({ id, company, position, status });
    }
  }, [editItem]);

  useEffect(() => {
    return () => dispatch(reset());
  }, [dispatch]);

  if (isLoading && !editItem) {
    return <Spinner />;
  }

  if (!editItem || error) {
    return (
      <ErrorContainer className='page'>
        <h5>There was an error, please double check your job SLUG</h5>

        <Link to='/dashboard' className='btn'>
          dasboard
        </Link>
      </ErrorContainer>
    );
  }

  return (
    <Container className='page'>
      <header>
        <Link to='/dashboard' className='btn btn-block back-home'>
          back home
        </Link>
      </header>
      <form className='form' onSubmit={handleSubmit}>
        <p>{editComplete && 'Success! Edit Complete'}</p>
        <h4>Update Job</h4>
        <div className='form-container'>
          <FormRow
            type='name'
            name='position'
            value={position}
            handleChange={handleChange}
          />
          <FormRow
            type='name'
            name='company'
            value={company}
            handleChange={handleChange}
          />
          <div className='form-row'>
            <label htmlFor='status' className='form-label'>
              Status
            </label>
            <select
              name='status'
              value={status}
              onChange={handleChange}
              className='status'
            >
              <option value='pending'>pending</option>
              <option value='interview'>interview</option>
              <option value='declined'>declined</option>
            </select>
          </div>
          <button
            type='submit'
            className='btn btn-block submit-btn'
            disabled={isLoading}
          >
            {isLoading ? 'Editing...' : 'Edit'}
          </button>
        </div>
      </form>
    </Container>
  );
};

const ErrorContainer = styled.section`
  text-align: center;
  padding-top: 6rem; ;
`;

const Container = styled.section`
  header {
    margin-top: 4rem;
  }

  .form {
    max-width: var(--max-width);
    margin-top: 2rem;
  }

  .form h4 {
    text-align: center;
  }

  .form > p {
    text-align: center;
    color: var(--green-dark);
    letter-spacing: var(--letterSpacing);
    margin-top: 0;
  }

  .status {
    background: var(--grey-100);
    border-radius: var(--borderRadius);
    border-color: transparent;
    padding: 0.25rem;
  }

  .status:focus {
    outline: none;
  }

  .back-home {
    text-align: center;
    display: block;
    width: 100%;
    font-size: 1rem;
    line-height: 1.15;
    background: var(--black);
  }

  .back-home:hover {
    background: var(--grey-500);
  }

  @media (min-width: 768px) {
    .back-home {
      width: 200px;
    }

    .form h4 {
      text-align: left;
    }

    .form-container {
      display: grid;
      grid-template-columns: 1fr 1fr 100px auto;
      column-gap: 0.5rem;
      align-items: center;
    }

    .form > p {
      text-align: left;
    }

    .form-row {
      margin-bottom: 0;
    }

    .submit-btn {
      align-self: end;
    }
  }
`;

export default Edit;

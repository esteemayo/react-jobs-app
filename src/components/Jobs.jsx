import styled from 'styled-components';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

import Spinner from './Spinner';
import Job from './Job';
import { fetchJobs, reset } from 'redux/jobs/jobSlice';
import JobColumns from './JobColumns';

const Jobs = () => {
  const dispatch = useDispatch();
  const { jobs, error, isLoading } = useSelector((state) => state.jobs);

  useEffect(() => {
    dispatch(fetchJobs());
    return () => dispatch(reset());
  }, [dispatch]);

  useEffect(() => {
    error && toast.error(error);
  }, [error]);

  if (isLoading) {
    return <Spinner />;
  }

  if (jobs.length < 1) {
    return (
      <EmptyContainer>
        <h5>
          Currently, you have no <span>JOBS </span>
          to display
        </h5>
      </EmptyContainer>
    );
  }

  return (
    <>
      <JobColumns />
      <Container>
        {jobs?.map((job) => {
          const { _id: id } = job;
          return <Job key={id} {...job} />;
        })}
      </Container>
    </>
  );
};

const EmptyContainer = styled.section`
  text-align: center;
  color: ${({ theme }) => theme.text};

  h5 {
    text-transform: none;
  }

  span {
    color: var(--primary-500);
  }
`;

const Container = styled.section`
  .job {
    background-color: ${({ theme }) => theme.bgLighter};
    border-radius: var(--borderRadius);
    margin-bottom: 2rem;
    display: grid;
    padding: 2rem 0;
    justify-content: center;
    text-align: center;
  }

  .icon {
    background-color: var(--primary-500);
    display: block;
    border-radius: var(--borderRadius);
    color: var(--white);
    font-size: 2rem;
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto;
    margin-bottom: 1rem;
  }

  span {
    text-transform: capitalize;
    letter-spacing: var(--letterSpacing);
  }

  .position {
    font-weight: 600;
  }

  .date {
    color: ${({ theme }) => theme.textDate};
  }

  .status {
    border-radius: var(--borderRadius);
    text-transform: capitalize;
    letter-spacing: var(--letterSpacing);
    text-align: center;
    margin: 0.75rem auto;
    width: 100px;
  }

  .edit-btn {
    color: ${({ theme }) => theme.bgEditIcon};
    border-color: transparent;
    background-color: transparent !important;
    outline: transparent;
    border-radius: var(--borderRadius);
    cursor: pointer;
    display: inline-block;
    appearance: none;
  }

  .delete-btn {
    color: ${({ theme }) => theme.bgDeleteIcon};
    border-color: transparent;
    border-radius: var(--borderRadius);
    cursor: pointer;
    background: transparent;
  }

  .edit-btn,
  .delete-btn {
    font-size: 1rem;
    line-height: 1.15;
    margin-bottom: -3px;
  }

  .action-div {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0 0.5rem;
  }

  @media (min-width: 48em) {
    display: grid;
    grid-template-columns: 1fr 1fr;
    column-gap: 1rem;
  }

  @media (min-width: 62em) {
    grid-template-columns: 1fr;

    .icon {
      display: none;
    }

    background: var(--white);
    border-bottom-left-radius: var(--borderRadius);
    border-bottom-right-radius: var(--borderRadius);

    .job {
      border-radius: 0;
      justify-content: left;
      text-align: left;
      color: ${({ theme }) => theme.text};
      border-bottom: 1px solid var(--grey-200);
      border-bottom: 1px solid ${({ theme }) => theme.colorBBtm};
      grid-template-columns: 1fr 1fr 150px 100px 100px;
      align-items: center;
      padding: 1rem 1.5rem;
      column-gap: 1rem;
      margin-bottom: 0;

      &:last-child {
        border-bottom: none;
      }
    }

    span {
      font-size: var(--small-text);
    }

    .company,
    .position {
      font-weight: 400;
      text-transform: capitalize;
    }

    .date {
      font-weight: 400;
      color: ${({ theme }) => theme.textDate};
    }

    .status {
      font-size: var(--smallText);
    }

    .action-div {
      margin-left: 1rem;
      justify-content: left;
    }
  }
`;

export default Jobs;

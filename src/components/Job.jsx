import styled from 'styled-components';
import Moment from 'react-moment';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { useDispatch } from 'react-redux';

import { deleteJob } from 'redux/jobs/jobSlice';

const Job = ({ _id: id, slug, company, position, status, createdAt }) => {
  const dispatch = useDispatch();

  const handleDelete = (id) => {
    if (window.confirm('Are you sure?'))
      dispatch(deleteJob({ jobId: id, toast }));
  };

  return (
    <Container className='job'>
      <span className='icon'>{company.charAt(0)}</span>
      <span className='position'>{position.toLowerCase()}</span>
      <span className='company'>{company}</span>
      <span className='date'>
        <Moment format='MMMM Do, YYYY'>{createdAt}</Moment>
      </span>
      <StatusContainer className='status' status={status}>
        {status}
      </StatusContainer>
      <div className='action-div'>
        <Link to={`/edit/${slug}`} className='edit-btn' type='button'>
          <FaEdit />
        </Link>
        <button
          type='button'
          className=' delete-btn'
          onClick={() => handleDelete(id)}
        >
          <FaTrash />
        </button>
      </div>
    </Container>
  );
};

const Container = styled.div`
  color: ${({ theme }) => theme.text};
  border-bottom: 1px solid ${({ theme }) => theme.colorBBtm} !important;

  .date {
    color: ${({ theme }) => theme.textDate};
  }
`;

const setStatusColor = (status) => {
  if (status === 'interview') return '#0f5132';
  if (status === 'declined') return '#842029';
  return '#927238';
};

const setStatusBackground = (status) => {
  if (status === 'interview') return '#d1e7dd';
  if (status === 'declined') return '#f8d7da';
  return '#f7f3d7';
};

const StatusContainer = styled.span`
  border-radius: var(--borderRadius);
  text-transform: capitalize;
  letter-spacing: var(--letterSpacing);
  text-align: center;
  color: ${({ status, theme }) => status === 'interview' && theme.textInterview};
  color: ${({ status, theme }) => status === 'declined' && theme.textDeclined};
  /* color: ${({ status }) => setStatusColor(status)};
  background: ${({ status }) => setStatusBackground(status)}; */
`;

export default Job;

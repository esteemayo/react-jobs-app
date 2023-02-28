import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
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
    <article className='job'>
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
          className=' delete-btn'
          type='button'
          onClick={() => handleDelete(id)}
        >
          <FaTrash />
        </button>
      </div>
    </article>
  );
};

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
  color: ${(props) => setStatusColor(props.status)};
  background: ${(props) => setStatusBackground(props.status)};
`;

export default Job;

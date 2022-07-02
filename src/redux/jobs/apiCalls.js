import * as jobService from 'services/jobService';
import { updateError, updateStart, updateSuccess } from './jobSlice';

export const editJob = async (jobId, job, dispatch) => {
  dispatch(updateStart());
  try {
    const {
      data: { job: updJob },
    } = await jobService.updateJob(jobId, job);
    dispatch(updateSuccess(updJob));
  } catch (err) {
    dispatch(updateError());
    console.error(err.response);
  }
};

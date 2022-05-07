import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import * as jobService from 'services/jobService';

export const fetchJobsAsync = createAsyncThunk('jobs/fetchJobs', async () => {
  const {
    data: { jobs },
  } = await jobService.getJobs();
  return jobs;
});

export const fetchSingleJobBySlugAsync = createAsyncThunk(
  'jobs/fetchSingleJobBySlug',
  async (slug) => {
    const {
      data: { job },
    } = await jobService.getJobBySlug(slug);
    return job;
  }
);

export const createJobAsync = createAsyncThunk(
  'jobs/createJob',
  async (job) => {
    const {
      data: { job: newJob },
    } = await jobService.createJob(job);
    return newJob;
  }
);

export const updateJobAsync = createAsyncThunk(
  'jobs/updateJob',
  async (jobId, job) => {
    const {
      data: { job: updJob },
    } = await jobService.updateJob(jobId, job);
    return updJob;
  }
);

export const deleteJobAsync = createAsyncThunk(
  'jobs/deleteJob',
  async (jobId) => {
    await jobService.deleteJob(jobId);
  }
);

export const jobSlice = createSlice({
  name: 'jobs',
  initialState: {
    jobs: [],
    isLoading: false,
    showAlert: false,
    editItem: null,
    singleJobError: false,
    editComplete: false,
  },
  reducers: {
    updateStart: (state) => {
      state.isLoading = true;
      state.showAlert = false;
      state.editComplete = false;
    },
    updateSuccess: (state, { payload }) => {
      state.isLoading = false;
      state.editComplete = true;
      state.editItem = payload;
    },
    updateError: (state) => {
      state.isLoading = false;
      state.editComplete = true;
      state.showAlert = true;
    },
  },
  extraReducers: {
    [fetchJobsAsync.pending]: (state) => {
      state.isLoading = true;
      state.showAlert = false;
      state.editComplete = false;
    },
    [fetchJobsAsync.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.jobs = payload;
    },
    [fetchJobsAsync.rejected]: (state) => {
      state.isLoading = false;
    },
    [fetchSingleJobBySlugAsync.pending]: (state) => {
      state.isLoading = true;
      state.showAlert = false;
      state.editComplete = false;
    },
    [fetchSingleJobBySlugAsync.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.editItem = payload;
    },
    [fetchSingleJobBySlugAsync.rejected]: (state) => {
      state.isLoading = false;
      state.editItem = '';
      state.singleJobError = true;
    },
    [createJobAsync.pending]: (state) => {
      state.isLoading = true;
      state.showAlert = false;
      state.editComplete = false;
    },
    [createJobAsync.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.jobs.unshift(payload);
    },
    [createJobAsync.rejected]: (state) => {
      state.isLoading = false;
      state.showAlert = true;
    },
    [updateJobAsync.pending]: (state) => {
      state.isLoading = true;
      state.showAlert = false;
      state.editComplete = false;
    },
    [updateJobAsync.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.editComplete = true;
      state.jobs[state.jobs.findIndex((job) => job._id === payload.id)] =
        payload;
      state.editItem = payload;
    },
    [updateJobAsync.rejected]: (state) => {
      state.isLoading = false;
      state.editComplete = true;
      state.showAlert = true;
    },
    [deleteJobAsync.fulfilled]: (state, { payload }) => {
      state.jobs = state.jobs.filter((job) => job._id !== payload);
    },
  },
});

export const { updateError, updateStart, updateSuccess } = jobSlice.actions;

export default jobSlice.reducer;

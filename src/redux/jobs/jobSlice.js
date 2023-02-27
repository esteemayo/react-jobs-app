import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import * as jobAPI from 'services/jobService';

export const fetchJobs = createAsyncThunk(
  'jobs/fetchJobs',
  async (_, { rejectWithValue }) => {
    try {
      const {
        data: { jobs },
      } = await jobAPI.getJobs();
      return jobs;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const fetchJob = createAsyncThunk(
  'jobs/fetchSingleJobBySlug',
  async (slug, { rejectWithValue }) => {
    try {
      const {
        data: { job },
      } = await jobAPI.getJobBySlug(slug);
      return job;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const createJob = createAsyncThunk(
  'jobs/createJob',
  async ({ newJob, toast }, { rejectWithValue }) => {
    try {
      const {
        data: { job },
      } = await jobAPI.createJob({ ...newJob });
      toast.success('Job successfully created');
      return job;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const updateJob = createAsyncThunk(
  'jobs/updateJob',
  async ({ jobId, job }, { rejectWithValue }) => {
    try {
      const {
        data: { job: updJob },
      } = await jobAPI.updateJob(jobId, job);
      return updJob;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const deleteJobAsync = createAsyncThunk(
  'jobs/deleteJob',
  async ({ jobId, toast }, { rejectWithValue }) => {
    try {
      await jobAPI.deleteJob(jobId);
      toast.success('Job Deleted Successfully');
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

const initialState = {
  jobs: [],
  isLoading: false,
  showAlert: false,
  editItem: null,
  singleJobError: false,
  editComplete: false,
  error: '',
};

export const jobSlice = createSlice({
  name: 'jobs',
  initialState,
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
    [fetchJobs.pending]: (state) => {
      state.isLoading = true;
      state.showAlert = false;
      state.editComplete = false;
    },
    [fetchJobs.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.jobs = payload;
    },
    [fetchJobs.rejected]: (state, { payload }) => {
      state.isLoading = false;
      state.error = payload.message;
    },
    [fetchJob.pending]: (state) => {
      state.isLoading = true;
      state.showAlert = false;
      state.editComplete = false;
    },
    [fetchJob.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.editItem = payload;
    },
    [fetchJob.rejected]: (state, { payload }) => {
      state.isLoading = false;
      state.editItem = '';
      state.singleJobError = true;
      state.error = payload.message;
    },
    [createJob.pending]: (state) => {
      state.isLoading = true;
      state.showAlert = false;
      state.editComplete = false;
    },
    [createJob.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.jobs.unshift(payload);
    },
    [createJob.rejected]: (state, { payload }) => {
      state.isLoading = false;
      state.showAlert = true;
      state.error = payload.message;
    },
    [updateJob.pending]: (state) => {
      state.isLoading = true;
      state.showAlert = false;
      state.editComplete = false;
    },
    [updateJobAsync.fulfilled]: (state, { meta, payload }) => {
      state.isLoading = false;
      state.editComplete = true;

      const {
        arg: { jobId },
      } = meta;

      if (jobId) {
        state.jobs.map((job) => (job._id === payload.id ? payload : job));
      }

      state.editItem = payload;
    },
    [updateJobAsync.rejected]: (state, { payload }) => {
      state.isLoading = false;
      state.editComplete = true;
      state.showAlert = true;
      state.error = payload.message;
    },
    [deleteJobAsync.pending]: (state) => {
      state.isLoading = true;
    },
    [deleteJobAsync.fulfilled]: (state, { meta }) => {
      state.isLoading = false;

      const {
        arg: { jobId },
      } = meta;

      if (jobId) {
        state.jobs = state.jobs.filter((job) => job._id !== jobId);
      }
    },
    [deleteJobAsync.rejected]: (state, { payload }) => {
      state.isLoading = false;
      state.error = payload.message;
    },
  },
});

export const { updateError, updateStart, updateSuccess } = jobSlice.actions;

export default jobSlice.reducer;

import http from './httpService';

const apiEndpoint = '/jobs';

const jobUrl = (jobId) => `${apiEndpoint}/${jobId}`;

export const getJobs = () => http.get(apiEndpoint);

export const getJobById = (jobId) => http.get(jobUrl(jobId));

export const getJobBySlug = (slug) =>
  http.get(`${apiEndpoint}/details/${slug}`);

export const createJob = (job) => http.post(apiEndpoint, job);

export const updateJob = (jobId, job) => http.patch(jobUrl(jobId), job);

export const deleteJob = (jobId) => http.delete(jobUrl(jobId));

import http from './httpService';

const apiEndpoint = '/jobs';

function jobUrl(jobId) {
  return `${apiEndpoint}/${jobId}`;
}

export function getJobs() {
  return http.get(apiEndpoint);
}

export function getJobById(jobId) {
  return http.get(jobUrl(jobId));
}

export function getJobBySlug(slug) {
  return http.get(`${apiEndpoint}/details/${slug}`);
}

export function createJob(job) {
  return http.post(apiEndpoint, job);
}

export function updateJob(jobId, job) {
  return http.patch(jobUrl(jobId), job);
}

export function deleteJob(jobId) {
  return http.delete(jobUrl(jobId));
}

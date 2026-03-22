import axios from "axios";

/**
 * Axios client meant to be used for every internal API call
 *
 * First trying to use `VERCEL_URL` as base URL, ensure works both on client and server when deployed
 * whatever we're on production or a deployment environement
 *
 * Then, if we're on local, this won't be defined, so we have to fallback on our own VITE_BASE_URL
 *
 */

export const axiosClient = axios.create({
  baseURL:
    process.env.VERCEL_PROJECT_PRODUCTION_URL != null
      ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
      : import.meta.env.VITE_BASE_URL,
});

import Axios from "axios";

import { LS_ACCESS_TOKEN } from "../constants/localStorage";

const axiosInstance = Axios.create({
  baseURL: "http://localhost:8000/api/",
});

export default class Request {
  constructor(endpoint) {
    this.api = axiosInstance;
    this.endpoint = endpoint;
  }

  getHeaders = () => {
    const accessToken = localStorage.getItem(LS_ACCESS_TOKEN);
    return {
      Authorization: `Bearer ${accessToken}`,
    };
  };

  get = queryParams => {
    return this.api.get(this.endpoint, {
      params: queryParams,
      headers: this.getHeaders(),
    });
  };

  post = (data, queryParams) => {
    return this.api.post(this.endpoint, data, {
      params: queryParams,
      headers: this.getHeaders(),
    });
  };

  delete = () => {
    return this.api.delete(this.endpoint, {
      headers: this.getHeaders(),
    });
  };
}

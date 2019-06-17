import axios from 'axios'

const login = (params) => {
  return axios.post(`${process.env.REACT_APP_API_URL}/signin`, params);
}

const signup = (params) => {
  return axios.post(`${process.env.REACT_APP_API_URL}/signup`, params);
}

const changepwd = (params) => {
  return axios.post(`${process.env.REACT_APP_API_URL}/changepwd`, params);
}

const forgottenacc = (params) => {
  return axios.post(`${process.env.REACT_APP_API_URL}/forgottenacc`, params);
}

export default {
  login,
  signup,
  changepwd,
  forgottenacc,
}

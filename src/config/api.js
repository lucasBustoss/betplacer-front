import axios from 'axios';

export const backtestApi = axios.create({
  baseURL: process.env.VUE_APP_BACKTEST_API
})
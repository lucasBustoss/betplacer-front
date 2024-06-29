import axios from 'axios';

export const backtestApi = axios.create({
  baseURL: process.env.VUE_APP_BACKTEST_API
})

export const fixturesApi = axios.create({
  baseURL: process.env.VUE_APP_FIXTURES_API
})

export const leaguesApi = axios.create({
  baseURL: process.env.VUE_APP_LEAGUES_API
})

export const punterApi = axios.create({
  baseURL: process.env.VUE_APP_PUNTER_API
})
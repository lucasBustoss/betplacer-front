import axios from 'axios';

export const leaguesApi = axios.create({
  baseURL: process.env.VUE_APP_LEAGUES_API
})

export const syncApi = axios.create({
  baseURL: process.env.VUE_APP_SYNC_API
})

export const fixturesApi = axios.create({
  baseURL: process.env.VUE_APP_FIXTURES_API
})

export const backtestApi = axios.create({
  baseURL: process.env.VUE_APP_BACKTEST_API
})

export const punterApi = axios.create({
  baseURL: `${process.env.VUE_APP_PUNTER_API}`
})
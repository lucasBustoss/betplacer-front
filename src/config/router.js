import Vue from 'vue'
import Router from 'vue-router'

import Home from "@/components/home/Home.vue";
import Backtest from '@/components/backtest/Backtest.vue'
import BacktestDetail from '@/components/backtest/Detail/BacktestDetail.vue'
import FixturesWithoutOdds from '@/components/fixturesWithoutOdds/FixturesWithoutOdds.vue'
import Leagues from '@/components/leagues/Leagues.vue'

Vue.use(Router)

export default new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'home',
            component: Home
        },
        {
            path: '/backtest',
            name: 'backtest',
            component: Backtest
        },
        {
            path: '/backtest/details/:id',
            name: 'BacktestDetails',
            component: BacktestDetail,
            props: true
        },
        {
            path: '/backtest/create',
            name: 'BacktestDetailsCreate',
            component: BacktestDetail,
            props: false
        },
        {
            path: '/fixtures-without-odds',
            name: 'fixturesWithoutOdds',
            component: FixturesWithoutOdds
        },
        {
            path: '/leagues',
            name: 'leagues',
            component: Leagues
        },
    ]
})
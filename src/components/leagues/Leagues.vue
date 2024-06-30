<template>
  <div v-if="!isLoading" class="leagues">
    <div class="leagues-selects">
      <div class="league-select">
        <v-select :items="leagueNames" @change="selectLeague" dark></v-select>
      </div>

      <div v-if="selectedLeague && !isLoadingStrategies" class="league-select">
        <v-select
          v-if="strategies && strategies.length > 0"
          :items="strategyNames"
          @change="selectStrategy"
          dark
        ></v-select>
        <v-btn @click="analyzeLeague" class="league-analyze-button" v-else>
          <template v-if="!isLoadingAnalysis">Analisar liga</template>
          <Loading v-else color="#111" size="30" />
        </v-btn>
      </div>
      <Loading
        v-if="selectedLeague && isLoadingStrategies"
        color="#face3b"
        size="30"
      />
    </div>

    <div class="leagues-content" v-if="selectedStrategy && !isLoadingFilters">
      <LeagueBacktestFilter
        v-for="(interval, i) in selectedStrategy.resultAfterIntervals"
        :key="interval.code"
        :interval="interval"
        :index="i + 1"
        :strategyName="selectedStrategy.name"
        @activeFilter="activeFilter"
      />
    </div>
  </div>
</template>
<script>
import { leaguesApi, punterApi } from "@/config/api";

import LeagueBacktestFilter from "./filters/LeagueBacktestFilter.vue";
import Loading from "@/components/main/Loading/Loading.vue";

export default {
  components: { LeagueBacktestFilter, Loading },
  computed: {
    leagueNames() {
      return this.leagues.map((l) => l.name);
    },
    strategyNames() {
      return this.strategies.map((l) => l.name);
    },
  },
  data() {
    return {
      isLoading: true,
      isLoadingStrategies: true,
      isLoadingFilters: false,
      isLoadingAnalysis: false,
      leagues: [],
      strategies: [],
      selectedLeague: null,
      selectedStrategy: null,
      intervals: [
        {
          code: 1,
          percentMatches: 0.2,
          result: 20.92,
          cv: 0.03,
          inferiorLimit: 3.4,
          active: true,
        },
        {
          code: 2,
          percentMatches: 0.2,
          result: 20.92,
          cv: 0.03,
          inferiorLimit: 3.4,
          active: false,
        },
      ],
    };
  },
  methods: {
    async getLeagues() {
      this.isLoading = true;
      const response = await leaguesApi.get("");

      if (response && response.data && response.data.data) {
        this.leagues = response.data.data;
      }

      this.isLoading = false;
    },
    async getStrategies() {
      this.isLoadingStrategies = true;
      const response = await punterApi.get(
        `?leagueCode=${this.selectedLeague.code}`
      );

      if (response && response.data && response.data.data) {
        this.strategies = response.data.data;
      }

      this.isLoadingStrategies = false;
    },
    async activeFilter(filterCode) {
      const strategyCode = this.selectedStrategy.code;
      await punterApi.post("filter/active", {
        strategyCode: strategyCode,
        filterCode: filterCode,
      });

      for (const filter of this.selectedStrategy.resultAfterIntervals) {
        filter.active = filter.code === filterCode;
      }
    },
    async analyzeLeague() {
      this.isLoadingAnalysis = true;

      await punterApi.post("", {
        leagueCode: this.selectedLeague.code,
      });

      await this.getStrategies();

      this.isLoadingAnalysis = false;
    },
    async selectLeague(item) {
      this.selectedStrategy = null;
      const league = this.leagues.find((l) => l.name === item);

      if (league) {
        this.selectedLeague = league;
        await this.getStrategies();
      }
    },
    selectStrategy(item) {
      const strategy = this.strategies.find((l) => l.name === item);

      if (strategy) {
        this.selectedStrategy = strategy;
      }
    },
  },
  async mounted() {
    await this.getLeagues();
  },
};
</script>

<style>
.leagues {
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
}

.leagues-selects {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
}

.league-select {
  display: flex;
  width: 30%;
  justify-content: center;
  align-items: center;
}

.leagues-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 30px;
  width: 100%;
}

.league-analyze-button {
  background: #face3b !important;
}
</style>
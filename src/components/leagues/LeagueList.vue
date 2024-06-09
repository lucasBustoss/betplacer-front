<template>
  <div class="league-list">
    <div class="league-list-header">
      <v-btn @click="filterFixtures">Filtrar jogos</v-btn>
    </div>

    <hr />

    <div class="league-list-content" v-if="!isLoading">
      <v-expansion-panels multiple>
        <LeagueItem
          v-for="i in fixturesByDate"
          :leagueName="i.leagueName"
          :leagueCountry="i.leagueCountry"
          :leagueFixtures="i.fixtures"
          :key="i.leagueCode"
        />
      </v-expansion-panels>
    </div>
  </div>
</template>

<script>
import { format } from "date-fns";

import { backtestApi, fixturesApi } from "@/config/api";
import LeagueItem from "./LeagueItem.vue";

import { backtestFilterItems } from "@/utils/enums";

export default {
  components: { LeagueItem },
  data() {
    return {
      fixtures: [],
      fixturesByDate: [],
      date: new Date(),
      isLoading: false,
    };
  },
  methods: {
    async filterFixtures() {
      const backtests = await this.getBacktestsWithFilterFixture();
      const backtestFixtures = [];

      for (const backtest of backtests) {
        const filteredFixtures = [];

        for (const filter of backtest.filters) {
          const fullFilter = this.getFullPropName(filter);

          for (const fixtureByDate of this.fixturesByDate) {
            for (const fixture of fixtureByDate.fixtures) {
              if (filter.compareType === 1) {
                if (
                  fixture.stats[fullFilter] > filter.initialValue &&
                  fixture.stats[fullFilter] < filter.finalValue
                ) {
                  filteredFixtures.push(fixture);
                }
              } else {
                if (
                  fixture.stats[fullFilter] >= filter.initialValue &&
                  fixture.stats[fullFilter] <= filter.finalValue
                ) {
                  filteredFixtures.push(fixture);
                }
              }
            }
          }
        }

        if (filteredFixtures.length > 0) {
          for (const filteredFixture of filteredFixtures) {
            backtestFixtures.push({
              backtestCode: backtest.code,
              fixtureCode: filteredFixture.code,
            });
          }
        }
      }

      await backtestApi.post("/fixtures", backtestFixtures);

      await this.getFixtures();
    },
    getFullPropName(filter) {
      let prefix = "";
      let suffix = "";
      const rawProp = backtestFilterItems.find((f) => f.name === filter.name);
      const capitalizeProp = this.capitalizeProp(rawProp.propName);

      if (filter.teamType === 1) {
        prefix = "home";
      } else {
        prefix = "away";
      }

      if (filter.propType === 1) {
        suffix = "Total";
      } else {
        if (filter.teamType === 1) {
          suffix = "AtHome";
        } else {
          suffix = "AtAway";
        }
      }

      return `${prefix}${capitalizeProp}${suffix}`;
    },
    capitalizeProp(prop) {
      return prop.charAt(0).toUpperCase() + prop.slice(1);
    },
    async getFixtures() {
      this.isLoading = true;
      const response = await fixturesApi.get("/date");

      if (response && response.data && response.data.data) {
        this.fixtures = response.data.data;

        const fixturesByDateResponse = response.data.data.find(
          (d) => d.date === format(this.date, "dd/MM/yyyy")
        );

        if (fixturesByDateResponse) {
          this.fixturesByDate = fixturesByDateResponse.leagueFixtures;
        }
      }

      this.isLoading = false;
    },
    async getBacktestsWithFilterFixture() {
      const response = await backtestApi.get("?onlyWithFilterFixture=true");

      if (response && response.data && response.data.data) {
        return response.data.data;
      }

      return [];
    },
  },
  async mounted() {
    await this.getFixtures();
  },
};
</script>

<style>
.league-list {
  display: flex;
  width: 80%;
  flex-direction: column;
}

.league-list-header {
  display: flex;
  width: 100%;
  margin-bottom: 25px;
}

.league-list-content {
  margin-top: 25px;
}
</style>
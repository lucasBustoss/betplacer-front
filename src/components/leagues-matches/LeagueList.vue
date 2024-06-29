<template>
  <div class="league-list">
    <div class="league-list-header">
      <div>
        <v-btn>Filtrar jogos</v-btn>
      </div>
      <div class="league-list-header-date">
        <v-icon
          class="date-pick-icon"
          @click="setPreviousDay"
          size="30"
          dark
          v-if="checkShowDatePrevious()"
          >mdi-chevron-left</v-icon
        >
        <div class="header-date-string">
          {{ getFormattedDate() }}
        </div>
        <v-icon
          class="date-pick-icon"
          @click="setNextDay"
          size="30"
          dark
          v-if="checkShowDateNext()"
          >mdi-chevron-right</v-icon
        >
      </div>
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
          @updateOdds="updateOdds"
        />
      </v-expansion-panels>
    </div>
  </div>
</template>

<script>
import { format, startOfDay, addDays } from "date-fns";

import { fixturesApi } from "@/config/api";
import LeagueItem from "./LeagueItem.vue";

export default {
  components: { LeagueItem },
  data() {
    return {
      fixtures: [],
      fixturesByDate: [],
      date: new Date(),
      isLoading: false,
      filters: [],
    };
  },
  methods: {
    getFormattedDate() {
      return format(this.date, "dd/MM/yyyy");
    },
    checkShowDatePrevious() {
      return startOfDay(this.date) > startOfDay(new Date());
    },
    checkShowDateNext() {
      return startOfDay(this.date) < addDays(startOfDay(new Date()), 2);
    },
    async setPreviousDay() {
      this.date = addDays(this.date, -1);
      await this.getFixtures();
    },
    async setNextDay() {
      this.date = addDays(this.date, 1);
      await this.getFixtures();
    },
    getFullPropName(filter) {
      let prefix = "";
      let suffix = "";
      const rawProp = this.filters.find((f) => f.name === filter.filterName);
      const capitalizeProp = this.capitalizeProp(rawProp.prop);

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
      console.log(prop);
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
    async updateOdds(odds) {
      const oddsToUpdate = {
        fixtureCode: odds.fixtureCode,
        oddHome: odds.homeOdd,
        oddDraw: odds.drawOdd,
        oddAway: odds.awayOdd,
        oddOver25: odds.over25Odd,
        oddUnder25: odds.under25Odd,
        oddBttsYes: odds.bttsYesOdd,
        oddBttsNo: odds.bttsNoOdd,
      };
      await fixturesApi.put("/odds", oddsToUpdate);
      await this.getFixtures();
    },
  },
  async mounted() {
    // await this.getFiltersDb();
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
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-bottom: 25px;
}

.league-list-header-date {
  margin-top: 20px;
  font-size: 1.2rem;
  display: flex;
}

.header-date-string {
  margin-top: 3px;
}

.league-list-content {
  margin-top: 25px;
}

.date-pick-icon {
  cursor: pointer;
}
</style>
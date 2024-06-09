<template>
  <v-expansion-panels multiple>
    <LeagueItem
      v-for="i in fixturesByDate"
      :leagueName="i.leagueName"
      :leagueCountry="i.leagueCountry"
      :leagueFixtures="i.fixtures"
      :key="i.leagueCode"
    />
  </v-expansion-panels>
</template>

<script>
import { format } from "date-fns";

import { fixturesApi } from "@/config/api";
import LeagueItem from "./LeagueItem.vue";

export default {
  components: { LeagueItem },
  data() {
    return {
      fixtures: [],
      fixturesByDate: [],
      date: new Date(),
    };
  },
  methods: {
    async getFixtures() {
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
    },
  },
  async mounted() {
    await this.getFixtures();
  },
};
</script>

<style>
</style>
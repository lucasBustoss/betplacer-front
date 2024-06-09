<template>
  <v-expansion-panel>
    <v-expansion-panel-header class="expansion-panel-header">
      <div class="league-item-content">
        <img
          class="league-item-image"
          :src="`https://flagcdn.com/80x60/${getAlpha2Code(leagueCountry)}.png`"
        />
        <div class="league-item-name">
          <div class="league-item-name-country">{{ leagueCountry }}</div>
          {{ ` - ${leagueName}`.replace(/ /g, "&nbsp;") }}
        </div>
      </div>
    </v-expansion-panel-header>

    <v-expansion-panel-content class="expansion-panel-content">
      <v-data-table
        dense
        :headers="headers"
        :items="leagueFixtures"
        item-key="name"
        dark
        hide-default-footer
        class="elevation-1"
      >
        <template v-slot:item="{ item }">
          <tr class="table-game-item">
            <td class="table-game-item-column column-date">
              {{ item.date }}
            </td>
            <td class="table-game-item-column column-match">
              {{ `${item.homeTeamName} x ${item.awayTeamName}` }}
            </td>
            <td class="table-game-item-column column-odd">
              <div class="item-odd-container">
                {{ item.oddHome.toFixed(2) }}
              </div>
            </td>
            <td class="table-game-item-column column-odd">
              <div class="item-odd-container">
                {{ item.oddDraw.toFixed(2) }}
              </div>
            </td>
            <td class="table-game-item-column column-odd">
              <div class="item-odd-container">
                {{ item.oddAway.toFixed(2) }}
              </div>
            </td>
          </tr>
        </template>
      </v-data-table>
    </v-expansion-panel-content>
  </v-expansion-panel>
</template>

<script>
import { countryList } from "@/utils/countryCodes";

export default {
  props: ["leagueName", "leagueCountry", "leagueFixtures"],
  data() {
    return {
      headers: [
        {
          text: "Data",
          value: "date",
        },
        {
          text: "Jogo",
          value: "game",
        },
        {
          text: "Odd Home",
          class: "table-odd-header",
          value: "odd_home",
        },
        {
          text: "Odd Draw",
          class: "table-odd-header",
          value: "odd_draw",
        },
        {
          text: "Odd Away",
          class: "table-odd-header",
          value: "odd_away",
        },
      ],
      fixtures: [],
      fixturesByDate: [],
    };
  },
  methods: {
    getAlpha2Code(countryName) {
      const alpha2Code = countryList[countryName];
      return alpha2Code ? alpha2Code.toLowerCase() : null;
    },
  },
};
</script>

<style>
.expansion-panel-header {
  display: flex;
  justify-content: space-between;
  padding: 20px !important;
  min-height: 40px !important;
  background: rgba(255, 255, 255, 0.3);
}

.league-item-content {
  display: flex;
  align-items: center;
}

.league-item-image {
  max-width: 25px;
  max-height: 40px;
  /* height: auto; */
}

.league-item-name {
  margin-left: 45px;
  font-size: 0.8rem;
  display: flex;
}

.league-item-name-country {
  font-weight: bold;
}

.expansion-panel-content {
  margin-top: 20px;
}

.table-game-item {
  cursor: pointer;
}

.table-game-item-column {
  padding: 15px 0 !important;
  text-align: center !important;
  margin-right: 150px !important;
}

.column-date {
  width: 15%;
}

.column-match {
  width: 35%;
}

.column-odd {
  width: 10%;
  text-align: center !important;
}

.item-odd-container {
  display: flex;
  justify-content: center;
  margin-right: 20px;
}
</style>
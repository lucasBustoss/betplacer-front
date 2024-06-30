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
            <td class="table-game-item-column column-informed-odds">
              <div
                :class="
                  item.informedOdds
                    ? 'odds-informed-true'
                    : 'odds-informed-false'
                "
                class="item-odd-container"
              >
                <v-icon v-if="item.informedOdds">mdi-check-circle</v-icon>
                <v-icon v-else>mdi-alpha-x-circle</v-icon>
              </div>
            </td>
            <td class="table-game-item-column column-filters">
              <div class="item-odd-container">
                {{
                  item.analyzedFixture ? item.filters : "Partida não analisada"
                }}
              </div>
            </td>
            <td class="table-game-item-column">
              <div class="item-odd-container" v-if="!item.informedOdds">
                <v-btn class="table-odds-btn" @click="setShowModal(item)"
                  >Odds</v-btn
                >
              </div>
            </td>
          </tr>
        </template>
      </v-data-table>
    </v-expansion-panel-content>

    <div>
      <v-dialog persistent dark v-model="showModal" width="800">
        <v-card class="modal-odds" v-if="selectedMatch">
          <v-card-title>
            {{
              selectedMatch
                ? `${selectedMatch.homeTeamName} x ${selectedMatch.awayTeamName}`
                : ""
            }}
          </v-card-title>

          <v-card-text>
            <div class="modal-odd-row">
              <div class="modal-odd-input-3">
                <v-text-field
                  label="Casa"
                  hide-details="auto"
                  v-model="selectedOdds.homeOdd"
                ></v-text-field>
              </div>

              <div class="modal-odd-input-3">
                <v-text-field
                  label="Empate"
                  hide-details="auto"
                  v-model="selectedOdds.drawOdd"
                ></v-text-field>
              </div>

              <div class="modal-odd-input-3">
                <v-text-field
                  label="Fora"
                  hide-details="auto"
                  v-model="selectedOdds.awayOdd"
                ></v-text-field>
              </div>
            </div>

            <div class="modal-odd-row">
              <div class="modal-odd-input-2">
                <v-text-field
                  label="Over 2.5"
                  hide-details="auto"
                  v-model="selectedOdds.over25Odd"
                ></v-text-field>
              </div>

              <div class="modal-odd-input-2">
                <v-text-field
                  label="Under 2.5"
                  hide-details="auto"
                  v-model="selectedOdds.under25Odd"
                ></v-text-field>
              </div>
            </div>

            <div class="modal-odd-row">
              <div class="modal-odd-input-2">
                <v-text-field
                  label="BTTS Sim"
                  hide-details="auto"
                  v-model="selectedOdds.bttsYesOdd"
                ></v-text-field>
              </div>

              <div class="modal-odd-input-2">
                <v-text-field
                  label="BTTS Não"
                  hide-details="auto"
                  v-model="selectedOdds.bttsNoOdd"
                ></v-text-field>
              </div>
            </div>
          </v-card-text>

          <v-divider></v-divider>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn @click="unshowMatchModal" class="return-filter" text>
              Voltar
            </v-btn>
            <v-btn class="pick-filter" @click="saveOdds" text>
              Confirmar
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>
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
          text: "Odds informadas?",
          class: "table-odd-header",
        },
        {
          text: "Filtros",
          class: "table-odd-header",
          value: "backtestFilters",
        },
        {
          text: "Ação",
        },
      ],
      fixtures: [],
      fixturesByDate: [],
      showModal: false,
      selectedMatch: null,
      selectedOdds: null,
    };
  },
  methods: {
    getAlpha2Code(countryName) {
      const alpha2Code = countryList[countryName];
      return alpha2Code ? alpha2Code.toLowerCase() : null;
    },
    setShowModal(item) {
      this.selectedMatch = item;
      this.selectedOdds = this.selectedMatch.fixtureOdds
        ? this.selectedMatch.fixtureOdds
        : {};

      if (this.selectedOdds) {
        if (this.selectedOdds.homeOdd === 0) {
          this.selectedOdds.homeOdd = null;
        }

        if (this.selectedOdds.drawOdd === 0) {
          this.selectedOdds.drawOdd = null;
        }
      }

      this.showModal = true;
    },
    unshowMatchModal() {
      this.selectedMatch = null;
      this.selectedOdds = null;
      this.showModal = false;
    },
    saveOdds() {
      this.$emit("updateOdds", this.selectedOdds);
      this.unshowMatchModal();
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

.column-informed-odds {
  width: 15%;
  text-align: center !important;
}

.column-filters {
  width: 20%;
  text-align: center !important;
}

.column-btn {
  width: 30%;
}

.item-odd-container {
  display: flex;
  justify-content: center;
  margin-right: 20px;
}

.odds-informed-true > i {
  color: rgb(120, 233, 120) !important;
}

.odds-informed-false > i {
  color: rgb(238, 118, 118) !important;
}

.table-odds-btn {
  background: #face3b !important;
  color: #000 !important;
}
</style>
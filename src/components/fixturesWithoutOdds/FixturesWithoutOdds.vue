<template>
  <div class="fixtures-without-odds" v-if="!isLoading">
    <div class="fwo-select">
      <v-select :items="leagueNames" @change="selectLeague" dark></v-select>
    </div>

    <div v-if="selectedLeague">
      <v-data-table
        dense
        :headers="headers"
        :items="itemsPage"
        item-key="name"
        dark
        hide-default-footer
        class="fwo-list-table elevation-1"
      >
        <template v-slot:item="{ item }">
          <tr class="fwo-list-item">
            <td class="fwo-list-item-column column-date">
              {{ getDateFormatted(item.startDate) }}
            </td>
            <td class="fwo-list-item-column">
              <div class="column-name">
                {{ getItemMatch(item) }}
              </div>
            </td>
            <td class="fwo-list-item-column">
              <div class="column-btn">
                <v-btn dark @click="showMatchModal(item)">Odds</v-btn>
              </div>
            </td>
          </tr>
        </template>
      </v-data-table>

      <div>
        <v-pagination
          class="fwo-list-pagination"
          v-model="page"
          dark
          :length="Math.trunc(items.length / 10) + 1"
        ></v-pagination>
      </div>
    </div>

    <div>
      <v-dialog persistent v-model="showModal" dark width="800">
        <v-card class="modal-odds" dark v-if="selectedMatch">
          <v-card-title class="text-h5 white lighten-2">
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
                  v-model="oddHome"
                ></v-text-field>
              </div>

              <div class="modal-odd-input-3">
                <v-text-field
                  label="Empate"
                  hide-details="auto"
                  v-model="oddDraw"
                ></v-text-field>
              </div>

              <div class="modal-odd-input-3">
                <v-text-field
                  label="Fora"
                  hide-details="auto"
                  v-model="oddAway"
                ></v-text-field>
              </div>
            </div>

            <div class="modal-odd-row">
              <div class="modal-odd-input-2">
                <v-text-field
                  label="Over 2.5"
                  hide-details="auto"
                  v-model="oddOver25"
                ></v-text-field>
              </div>

              <div class="modal-odd-input-2">
                <v-text-field
                  label="Under 2.5"
                  hide-details="auto"
                  v-model="oddUnder25"
                ></v-text-field>
              </div>
            </div>

            <div class="modal-odd-row">
              <div class="modal-odd-input-2">
                <v-text-field
                  label="BTTS Sim"
                  hide-details="auto"
                  v-model="oddBttsYes"
                ></v-text-field>
              </div>

              <div class="modal-odd-input-2">
                <v-text-field
                  label="BTTS Não"
                  hide-details="auto"
                  v-model="oddBttsNo"
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
  </div>
</template>
<script>
import { leaguesApi, fixturesApi } from "@/config/api";
import { showError } from "@/global";

import { parseISO, format } from "date-fns";

export default {
  computed: {
    leagueNames() {
      return this.leagues && this.leagues.map((l) => l.name);
    },
  },
  watch: {
    page() {
      this.getItemsPage();
    },
  },
  data() {
    return {
      isLoading: false,
      leagues: [],
      selectedLeague: null,
      items: [],
      itemsPage: [],
      itemsPerPage: 10,
      page: 1,
      selectedMatch: null,
      showModal: false,
      headers: [
        {
          text: "Data",
        },
        {
          text: "Jogo",
        },
        {
          text: "Ações",
          class: "column-btn",
        },
      ],
      oddHome: "",
      oddDraw: "",
      oddAway: "",
      oddOver25: "",
      oddUnder25: "",
      oddBttsYes: "",
      oddBttsNo: "",
    };
  },
  methods: {
    getItemMatch(match) {
      return `${match.homeTeamName} x ${match.awayTeamName}`;
    },
    getItemsPage() {
      const start = (this.page - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;

      this.itemsPage = this.items.slice(start, end);
    },
    async selectLeague(item) {
      const league = this.leagues.find((l) => l.name === item);

      if (league) {
        await this.getFixturesWithoutOdds(league.code);
        this.selectedLeague = league;
      }
    },
    getDateFormatted(item) {
      return format(parseISO(item), "dd/MM/yyyy");
    },
    showMatchModal(item) {
      this.selectedMatch = item;
      this.showModal = true;
    },
    unshowMatchModal() {
      this.selectedMatch = null;
      this.showModal = false;
    },
    async saveOdds() {
      if (
        this.oddHome === "" ||
        this.oddDraw === "" ||
        this.oddAway === "" ||
        this.oddOver25 === "" ||
        this.oddUnder25 === "" ||
        this.oddBttsYes === "" ||
        this.oddBttsNo === ""
      ) {
        showError("É necessário informar todas as odds. ");
        return;
      }

      const odds = {
        fixtureCode: this.selectedMatch.code,
        oddHome: this.oddHome,
        oddDraw: this.oddDraw,
        oddAway: this.oddAway,
        oddOver25: this.oddOver25,
        oddUnder25: this.oddUnder25,
        oddBttsYes: this.oddBttsYes,
        oddBttsNo: this.oddBttsNo,
      };

      await fixturesApi.post("/odds", odds);

      this.oddHome = "";
      this.oddDraw = "";
      this.oddAway = "";
      this.oddOver25 = "";
      this.oddUnder25 = "";
      this.oddBttsYes = "";
      this.oddBttsNo = "";

      const index = this.items.findIndex(
        (item) => item.code === this.selectedMatch.code
      );
      if (index !== -1) {
        this.items.splice(index, 1);

        this.getItemsPage();
      }

      this.showModal = false;
      this.selectedMatch = null;
    },
    async getLeagues() {
      this.isLoading = true;
      const response = await leaguesApi.get("");

      if (response && response.data && response.data.data) {
        this.leagues = response.data.data;
      }

      this.isLoading = false;
    },
    async getFixturesWithoutOdds(code) {
      const response = await fixturesApi.get(`odds/${code}`);

      if (response && response.data && response.data.data) {
        this.items = response.data.data;
        this.getItemsPage();
      }
    },
  },
  async mounted() {
    await this.getLeagues();
  },
};
</script>

<style>
.fixtures-without-odds {
  display: flex;
  flex-direction: column;
  width: 100%;
  justify-content: center !important;
}

.fwo-select {
  display: flex;
  justify-content: center !important;
}

.fwo-list-header {
  text-align: center;
  margin: 10px 0;
}

.fwo-list-table {
  margin-top: 10px;
  height: 560px;
}

.fwo-list-item {
  cursor: default;
}

.fwo-list-item-column {
  padding: 15px 0 !important;
  text-align: center !important;
  margin-right: 150px !important;
}

.column-date {
  width: 20%;
}

.column-ratio {
  width: 55%;
  display: flex;
  justify-content: flex-end;
}

.column-btn {
  width: 25%;
  display: flex;
  justify-content: center !important;
}

.column-btn > button {
  background: #face3b !important;
  color: #333 !important;
  justify-content: center !important;
}

.column-btn > button:hover {
  background: #e5d7a5 !important;
  color: #222 !important;
  transition: 0.2s linear;
}

.fwo-list-pagination {
  margin-top: 150px;
}

.fwo-list-pagination > ul > li > .v-pagination__item,
.fwo-list-pagination > ul > li > .v-pagination__navigation {
  background: #face3b !important;
  color: #222 !important;
}

.fwo-list-pagination > ul > li > .v-pagination__navigation--disabled {
  background: #face3b !important;
}

.fwo-list-pagination > ul > li > .v-pagination__navigation--disabled > i,
.fwo-list-pagination > ul > li > .v-pagination__navigation > i {
  color: #222 !important;
}

.fwo-list-pagination > ul > li > .v-pagination__item:hover {
  background: #e5d7a5 !important;
  color: #222 !important;
}

.fwo-list-pagination > ul > li > .v-pagination__item--active {
  background: #e5d7a5 !important;
  color: #222 !important;
}

/* hide the "scrim", it's pointless */
.v-overlay--active .v-overlay__scrim {
  display: none;
}
/* style the overlay container as required */
.v-overlay--active {
  backdrop-filter: blur(2px);
  background: rgb(0 0 0/ 0.1);
}

@media (prefers-color-scheme: dark) {
  .v-overlay--active {
    background: rgb(255 255 255/ 0.49);
  }
}

.modal-odds {
  padding: 15px !important;
  background: #555 !important;
}

.modal-odd-row {
  display: flex;
  width: 100%;
  justify-content: space-between;
}

.modal-odd-input-3 {
  width: 30% !important;
}

.modal-odd-input-4 {
  width: 22.5% !important;
}

.modal-odd-input-5 {
  width: 15% !important;
}

.modal-odd-input-2 {
  width: 45% !important;
}
</style>
<template>
  <div class="backtest-detail">
    <router-link to="/backtest">
      <div class="backtest-detail-back">Voltar</div>
    </router-link>

    <div class="backtest-detail-header">
      <h2>{{ backtest.name }}</h2>
    </div>
    <hr />

    <div class="backtest-detail-result">
      <div class="backtest-detail-result-item">
        <BacktestResultBullet
          title="Data de criação"
          :value="backtest.creationDate"
          type="date"
        />
      </div>
      <div class="backtest-detail-result-item">
        <BacktestResultBullet
          title="Jogos filtrados"
          :value="backtest.filteredFixtures"
          type="percentage"
        />
      </div>
      <div class="backtest-detail-result-item">
        <BacktestResultBullet
          title="Resultado"
          :value="backtest.matchedFixtures"
          type="percentage"
        />
      </div>
    </div>

    <div class="backtest-detail-form">
      <div class="backtest-detail-filters-header">
        <h3>Parâmetros</h3>
      </div>

      <hr />

      <div class="backtest-detail-form-inputs">
        <div class="backtest-input-field">
          <v-select
            :items="resultTeamTypeItems"
            v-model="selectedResultTeamType"
            :disabled="!!backtest.id"
            filled
            dark
            dense
            label="Time"
          ></v-select>
        </div>
        <div class="backtest-input-field">
          <v-select
            :items="resultTypeItems"
            v-model="selectedResultType"
            :disabled="!!backtest.id"
            filled
            dark
            dense
            label="Resultado"
          ></v-select>
        </div>
      </div>

      <div class="backtest-detail-filters-header">
        <h3>Filtros</h3>
      </div>

      <hr />

      <div class="backtest-detail-form-filters">
        <v-expansion-panels>
          <BacktestFilter
            v-for="(filter, i) in backtest.filters"
            :key="i"
            :filter="filter"
          />
        </v-expansion-panels>
      </div>
    </div>

    <div class="backtest-detail-filters-header">
      <h3>Resultados por listas</h3>
    </div>

    <hr />

    <div class="backtest-detail-lists">
      <div class="backtest-detail-list-item">
        <BacktestList title="Resultado por liga" :items="leagueTableItems" />
      </div>
      <div class="backtest-detail-list-item">
        <BacktestList
          title="Resultado por temporada/liga"
          :items="leagueSeasonTableItems"
        />
      </div>
      <div class="backtest-detail-list-item">
        <BacktestList title="Resultado por equipe" :items="teamTableItems" />
      </div>
    </div>
  </div>
</template>

<script>
import BacktestFilter from "@/components/backtest/Detail/Filters/BacktestFilter.vue";
import BacktestList from "@/components/backtest/Detail/Lists/BacktestList.vue";
import BacktestResultBullet from "@/components/backtest/Detail/Result/BacktestResultBullet.vue";
import { backtestResultType, backtestResultTeamType } from "@/utils/enums";

export default {
  props: ["backtest"],
  components: { BacktestFilter, BacktestList, BacktestResultBullet },
  computed: {
    resultTypeItems() {
      return backtestResultType.map((r) => r.name);
    },
    resultTeamTypeItems() {
      return backtestResultTeamType.map((r) => r.name);
    },
    leagueTableItems() {
      return this.backtest.leagues.map((l) => {
        return {
          name: l.leagueName,
          ratio: l.leagueRatio,
        };
      });
    },
    leagueSeasonTableItems() {
      return this.backtest.leagueSeasons.map((l) => {
        return {
          name: `${l.leagueName} - ${l.leagueSeasonYear}`,
          ratio: l.leagueSeasonRatio,
        };
      });
    },
    teamTableItems() {
      return this.backtest.teams.map((t) => {
        return {
          name: `${t.teamName}`,
          ratio: t.teamRatio,
        };
      });
    },
  },
  data() {
    return {
      currentBacktest: this.backtest,
      selectedResultType: this.backtest
        ? this.getResultType(this.backtest.type)
        : null,
      selectedResultTeamType: this.backtest
        ? this.getResultTeamType(this.backtest.teamType)
        : null,
    };
  },
  methods: {
    getResultType(resultType) {
      console.log(resultType);
      return backtestResultType.find((brt) => brt.id === resultType).name;
    },
    getResultTeamType(resultTeamType) {
      return backtestResultTeamType.find((brt) => brt.id === resultTeamType)
        .name;
    },
  },
};
</script>

<style>
.backtest-detail {
  display: flex;
  flex-direction: column;
  width: 100%;
}

.backtest-detail-back {
  padding: 15px;
  cursor: pointer;
  border: 1px solid #555;
  width: 6%;
  border-radius: 10px;
  text-align: center;
}

.backtest-detail-back:hover {
  background: rgba(255, 255, 255, 0.12);
  transition: 0.15s linear;
}

.backtest-detail-header {
  display: flex;
  width: 100%;
  justify-content: center;
  margin-top: 15px;
}

.backtest-detail-result {
  display: flex;
  width: 100%;
  justify-content: space-between;
  margin: 20px 0;
}

.backtest-detail-result-item {
  width: 32%;
}

.backtest-detail-form-inputs {
  display: flex;
  width: 100%;
  justify-content: space-between;
  margin-top: 10px;
  padding: 15px;
  margin-top: 35px;
}

.backtest-input-field {
  width: 48% !important;
}

.backtest-detail-filters-header {
  display: flex;
  width: 100%;
  justify-content: center;
  margin: 20px 0;
}

.backtest-detail-form-filters {
  padding: 15px;
  border: 1px solid #555;
  border-radius: 10px;
  margin-top: 20px;
}

.backtest-detail-lists {
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
}

.backtest-detail-list-item {
  width: 32%;
  box-sizing: border-box;
}
</style>
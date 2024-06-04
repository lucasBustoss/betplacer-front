<template>
  <div class="backtest-detail">
    <router-link to="/backtest">
      <div class="backtest-detail-back">Voltar</div>
    </router-link>

    <div class="backtest-detail-header">
      <h2>{{ currentBacktest ? currentBacktest.name : "Criar backtest" }}</h2>
    </div>

    <hr />

    <div class="backtest-detail-result" v-if="currentBacktest">
      <div class="backtest-detail-result-item">
        <BacktestResultBullet
          title="Data de criação"
          :value="currentBacktest.creationDate"
          type="date"
        />
      </div>
      <div class="backtest-detail-result-item">
        <BacktestResultBullet
          title="Jogos filtrados"
          :value="currentBacktest.filteredFixtures"
          type="percentage"
        />
      </div>
      <div class="backtest-detail-result-item">
        <BacktestResultBullet
          title="Resultado"
          :value="currentBacktest.matchedFixtures"
          type="percentage"
        />
      </div>
    </div>

    <div class="backtest-detail-form">
      <div class="backtest-detail-filters-header">
        <h3>Parâmetros</h3>
      </div>

      <hr v-if="currentBacktest" />

      <div class="backtest-detail-form-inputs">
        <div class="backtest-input-field">
          <v-text-field
            label="Nome do backtest"
            v-model="name"
            :disabled="!!currentBacktest"
            filled
            dark
            dense
          >
          </v-text-field>
        </div>
        <div class="backtest-input-field">
          <v-select
            :items="resultTeamTypeItems"
            v-model="selectedResultTeamType"
            :disabled="!!currentBacktest"
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
            :disabled="!!currentBacktest"
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
        <v-expansion-panels v-if="filters.length > 0">
          <BacktestFilter
            v-for="(filter, i) in filters"
            :key="i"
            :filter="filter"
            :isCreate="!currentBacktest"
            @updateFilter="updateFilter"
          />
        </v-expansion-panels>

        <div v-if="!currentBacktest" class="backtest-detail-form-filters-add">
          <v-btn @click="addFilter(filters.length + 1)">Adicionar filtro</v-btn>
        </div>
      </div>
    </div>

    <div class="backtest-detail-filters-header" v-if="currentBacktest">
      <h3>Resultados por listas</h3>
    </div>

    <hr :class="!currentBacktest ? 'hr-mg-top' : ''" />

    <div class="backtest-detail-lists" v-if="currentBacktest">
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

    <div class="backtest-create-container" v-if="!currentBacktest">
      <v-btn @click="createBacktest" class="backtest-create-container-button">
        <Loading v-if="isLoading" color="#efefef" size="30" />
        <div v-else>Salvar</div>
      </v-btn>
    </div>
  </div>
</template>

<script>
import Loading from "@/components/main/Loading/Loading.vue";
import BacktestFilter from "@/components/backtest/Detail/Filters/BacktestFilter.vue";
import BacktestList from "@/components/backtest/Detail/Lists/BacktestList.vue";
import BacktestResultBullet from "@/components/backtest/Detail/Result/BacktestResultBullet.vue";
import {
  backtestResultType,
  backtestResultTeamType,
  backtestFilterItems,
  backtestCompareType,
  backtestTeamType,
  backtestPropType,
} from "@/utils/enums";
import { showError } from "@/global";
import { backtestApi } from "@/config/api";

export default {
  props: ["backtest"],
  components: { Loading, BacktestFilter, BacktestList, BacktestResultBullet },
  computed: {
    resultTypeItems() {
      return backtestResultType.map((r) => r.name);
    },
    resultTeamTypeItems() {
      return backtestResultTeamType.map((r) => r.name);
    },
    leagueTableItems() {
      return this.currentBacktest.leagues.map((l) => {
        return {
          name: l.leagueName,
          ratio: l.leagueRatio,
        };
      });
    },
    leagueSeasonTableItems() {
      return this.currentBacktest.leagueSeasons.map((l) => {
        return {
          name: `${l.leagueName} - ${l.leagueSeasonYear}`,
          ratio: l.leagueSeasonRatio,
        };
      });
    },
    teamTableItems() {
      return this.currentBacktest.teams.map((t) => {
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
      name: this.backtest ? this.backtest.name : "",
      selectedResultType: this.backtest
        ? this.getResultTypeName(this.backtest.type)
        : null,
      selectedResultTeamType: this.backtest
        ? this.getResultTeamTypeName(this.backtest.teamType)
        : null,
      filters:
        this.backtest && this.backtest.filters ? this.backtest.filters : [],
      isLoading: false,
    };
  },
  methods: {
    getResultTypeName(resultType) {
      return backtestResultType.find((brt) => brt.id === resultType).name;
    },
    getResultTypeValue(resultType) {
      return backtestResultType.find((brt) => brt.name === resultType).id;
    },
    getResultTeamTypeName(resultTeamType) {
      return backtestResultTeamType.find((brt) => brt.id === resultTeamType)
        .name;
    },
    getResultTeamTypeValue(resultTeamType) {
      return backtestResultTeamType.find((brt) => brt.name === resultTeamType)
        .id;
    },
    getCompareTypeValue(compareType) {
      return backtestCompareType.find((b) => b.name === compareType).id;
    },
    getTeamTypeValue(teamType) {
      return backtestTeamType.find((b) => b.name === teamType).id;
    },
    getPropTypeValue(propType) {
      return backtestPropType.find((b) => b.name === propType).id;
    },
    getFilterValue(filter) {
      return backtestFilterItems.find((bft) => bft.name === filter).propName;
    },
    addFilter(sequence) {
      const lastInsert =
        this.filters.length > 0 ? this.filters[this.filters.length - 1] : null;

      if (
        lastInsert &&
        (!lastInsert.compareType ||
          !lastInsert.teamType ||
          !lastInsert.propType ||
          !lastInsert.initialValue ||
          !lastInsert.finalValue)
      ) {
        showError(
          "É necessário preencher todos os parâmetros do filtro. Verifique o ultimo filtro."
        );
        return;
      }

      const filter = {
        sequence,
        name: "",
        compareType: null,
        teamType: null,
        propType: null,
        initialValue: null,
        finalValue: null,
      };

      this.filters.push(filter);
    },
    updateFilter(filter) {
      const selectedFilterIndex = this.filters.findIndex(
        (f) => f.sequence === filter.sequence
      );

      if (selectedFilterIndex > -1) {
        this.filters[selectedFilterIndex] = filter;
      }
    },
    treatFiltersToInsert() {
      const filters = {};

      for (const filter of this.filters) {
        filter.compareType = this.getCompareTypeValue(filter.compareType);
        filter.teamType = this.getTeamTypeValue(filter.teamType);
        filter.propType = this.getPropTypeValue(filter.propType);

        const propName = this.getFilterValue(filter.name);
        filter.name = undefined;
        filter.sequence = undefined;
        filter.selectedFilter = undefined;
        filters[propName] = filter;
      }

      return filters;
    },
    validation() {
      if (!this.name) {
        showError(
          "É necessário atribuir um nome ao backtest. Verifique e tente novamente"
        );
        return false;
      }

      if (!this.selectedResultTeamType) {
        showError(
          "É necessário selecionar o tipo de time do backtest. Verifique e tente novamente"
        );
        return false;
      }

      if (!this.selectedResultType) {
        showError(
          "É necessário selecionar um resultado para o backtest. Verifique e tente novamente"
        );
        return false;
      }

      if (this.filters.length === 0) {
        showError(
          "É necessário informar pelo menos 1 filtro. Verifique e tente novamente"
        );
        return false;
      }

      for (const filter of this.filters) {
        if (filter.finalValue < filter.initialValue) {
          showError(
            `O valor final deve ser maior que o valor inicial. Verifique o filtro '${filter.name}' e tente novamente`
          );
          return false;
        }
      }

      return true;
    },
    async getBacktestById(id) {
      try {
        const response = await backtestApi.get(`${id}`);

        if (response && response.data && response.data.data) {
          this.currentBacktest = response.data.data;
          this.name = this.currentBacktest.name;
          this.selectedResultType = this.getResultTypeName(
            this.currentBacktest.type
          );
          this.selectedResultTeamType = this.getResultTeamTypeName(
            this.currentBacktest.teamType
          );
          this.filters = this.currentBacktest.filters;
        }
      } catch (err) {
        showError(err);
      }
    },
    async createBacktest() {
      this.isLoading = true;

      if (!this.validation()) {
        return;
      }

      const treatedFilters = this.treatFiltersToInsert(this.filters);

      const backtest = {
        name: this.name,
        resultType: this.getResultTypeValue(this.selectedResultType),
        resultTeamType: this.getResultTeamTypeValue(
          this.selectedResultTeamType
        ),
        filters: treatedFilters,
      };

      try {
        await backtestApi.post("", backtest);
        this.$router.push("/backtest");
      } catch (err) {
        showError(err);
      } finally {
        this.isLoading = false;
      }
    },
  },
  async mounted() {
    if (!this.backtest) {
      const backtestId = this.$route.params.id;

      if (backtestId) {
        await this.getBacktestById(backtestId);
      }
    }
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
  width: 30% !important;
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
  display: flex;
  flex-direction: column;
  justify-content: center !important;
  align-items: center;
}

.backtest-detail-form-filters-add {
  justify-content: center !important;
  margin-top: 25px;
}

.backtest-detail-form-filters-add > button {
  background: #face3b !important;
}

.backtest-detail-form-filters-add > button:hover {
  background: #f3df9d !important;
  transition: 0.15s linear;
}

.backtest-detail-form-filters-add > button:active {
  background: #fdce34 !important;
  transition: 0.15s linear;
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

.hr-mg-top {
  margin-top: 35px !important;
}

.backtest-create-container {
  margin-top: 25px;
  display: flex;
  width: 100%;
  justify-content: center;
}

.backtest-create-container-button {
  background: rgba(13, 243, 13, 0.39) !important;
  color: #fff !important;
  width: 30%;
}
</style>
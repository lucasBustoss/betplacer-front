<template>
  <v-expansion-panel>
    <v-expansion-panel-header class="expansion-panel-header"
      ><b>{{ filter.name }}</b></v-expansion-panel-header
    >
    <v-expansion-panel-content class="expansion-panel-content">
      <div class="backtest-filter">
        <div class="backtest-filter-name">
          <v-select
            :items="filterItems"
            v-model="selectedFilter"
            :disabled="!!filter"
            filled
            dark
            dense
            label="Filtro"
          />
        </div>

        <div class="backtest-filter-content">
          <div class="backtest-filter-types">
            <v-text-field
              label="Comparação"
              v-model="compareType"
              :disabled="!!filter"
              filled
              dark
              dense
            >
            </v-text-field>
          </div>
          <div class="backtest-filter-types">
            <v-text-field
              label="Time"
              v-model="teamType"
              :disabled="!!filter"
              filled
              dark
              dense
            >
            </v-text-field>
          </div>
          <div class="backtest-filter-types">
            <v-text-field
              label="Tipo de propriedade"
              v-model="propType"
              :disabled="!!filter"
              filled
              dark
              dense
            >
            </v-text-field>
          </div>
        </div>

        <div class="backtest-filter-content backtest-filter-values">
          <div class="backtest-filter-value">
            <v-text-field
              label="Valor inicial"
              v-model="initialValue"
              :disabled="!!filter"
              filled
              dark
              dense
            >
            </v-text-field>
          </div>
          <div class="backtest-filter-value">
            <v-text-field
              label="Valor final"
              v-model="finalValue"
              :disabled="!!filter"
              filled
              dark
              dense
            >
            </v-text-field>
          </div>
        </div>
      </div>
    </v-expansion-panel-content>
  </v-expansion-panel>
</template>

<script>
import {
  backtestFilterItems,
  backtestCompareType,
  backtestTeamType,
  backtestPropType,
} from "@/utils/enums";

export default {
  props: ["filter"],
  computed: {
    filterItems() {
      return backtestFilterItems.map((b) => b.name);
    },
  },
  data() {
    return {
      selectedFilter: this.filter ? this.filter.name : null,
      compareType: this.filter
        ? this.getCompareTypeName(this.filter.compareType)
        : null,
      teamType: this.filter ? this.getTeamTypeName(this.filter.teamType) : null,
      propType: this.filter ? this.getPropTypeName(this.filter.propType) : null,
      initialValue: this.filter ? this.filter.initialValue : null,
      finalValue: this.filter ? this.filter.finalValue : null,
    };
  },
  methods: {
    getCompareTypeName(compareType) {
      return backtestCompareType.find((b) => b.id === compareType).name;
    },
    getTeamTypeName(teamType) {
      return backtestTeamType.find((b) => b.id === teamType).name;
    },
    getPropTypeName(propType) {
      return backtestPropType.find((b) => b.id === propType).name;
    },
  },
};
</script>

<style>
.backtest-filter {
  padding: 10px;
  border: 1px solid #777;
  border-radius: 7px;
  margin-top: 15px;
}

.backtest-filter-name {
  font-weight: bold;
}

.backtest-filter-content {
  display: flex;
  width: 100%;
  justify-content: space-between;
}

.backtest-filter-types {
  width: 32%;
}

.backtest-filter-value {
  width: 48%;
}
</style>
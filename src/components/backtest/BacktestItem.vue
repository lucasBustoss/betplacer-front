<template>
  <router-link
    :to="{
      name: 'BacktestDetails',
      params: { id: backtest.code, backtest },
    }"
  >
    <div class="backtest-item">
      <div class="backtest-item-header">
        <div class="backtest-item-header-title">{{ backtest.name }}</div>
        <div>-</div>
        <div class="backtest-item-header-date">
          {{ getFormattedDate(backtest) }}
        </div>
      </div>
      <div class="backtest-item-content">
        <div>Resultado: {{ getFormattedResult(backtest) }}%</div>
        <div>Good run máxima: {{ backtest.maxGoodRun }}</div>
        <div>Bad run máxima: {{ backtest.maxBadRun }}</div>
        <div>
          Filtros usados nas partidas:
          {{ backtest.usesInFixture ? "Sim" : "Não" }}
        </div>
      </div>
    </div>
  </router-link>
</template>

<script>
import { format, parseISO } from "date-fns";

export default {
  props: ["backtest"],
  methods: {
    getFormattedDate(backtest) {
      return format(parseISO(backtest.creationDate), "dd/MM/yyyy HH:mm");
    },
    getFormattedResult(backtest) {
      return (backtest.matchedFixtures * 100).toFixed(2);
    },
  },
};
</script>

<style>
.backtest-item {
  display: flex;
  flex-direction: column;
  padding: 15px;
  border: 1px solid #bbb;
  border-radius: 10px;
  margin-bottom: 15px;
  width: 100%;
  cursor: pointer;
}

.backtest-item:hover {
  background: rgba(255, 255, 255, 0.3);
  transition: 0.2s linear;
}

.backtest-item-header {
  display: flex;
  width: 100%;
  color: #face3b;
  font-weight: bold;
}

.backtest-item-header-title {
  margin-right: 10px;
}

.backtest-item-header-date {
  margin-left: 10px;
}

.backtest-item-content {
  display: flex;
  margin-top: 10px;
  width: 100%;
}

.backtest-item-content > div {
  width: 20%;
}
</style>
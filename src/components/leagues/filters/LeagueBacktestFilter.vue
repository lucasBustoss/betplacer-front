<template>
  <div
    :class="interval.active ? 'filter-background-active' : ''"
    class="league-backtest-filter"
  >
    <div class="lbf-content">
      <div class="lbf-title">
        {{
          `${strategyName} - ${interval.name.split(" - ").length} ${
            interval.name.split(" - ").length === 1 ? "variável" : "variáveis"
          }${interval.active ? " - ATIVO" : ""}`
        }}
      </div>
      <div class="lbf-numbers">
        Total de jogos: <b>{{ (interval.percentMatches * 100).toFixed(2) }}%</b>
      </div>
      <div class="lbf-numbers">
        Resultado: <b>{{ interval.result.toFixed(2) }} un</b>
      </div>
      <div class="lbf-numbers">
        Coeficiente de variação:
        <b>{{ interval.coefficientVariation.toFixed(2) }}</b>
      </div>
      <div class="lbf-numbers">
        Limite inferior: <b>{{ interval.inferiorLimit.toFixed(2) }}</b>
      </div>
    </div>

    <div v-if="!interval.active" class="lbf-button-content">
      <v-btn class="lbf-button" @click="activeFilter">Usar este filtro</v-btn>
    </div>
  </div>
</template>
<script>
export default {
  props: ["interval", "strategyName"],
  methods: {
    activeFilter() {
      this.$emit("activeFilter", this.interval.code);
    },
  },
};
</script>
<style>
.league-backtest-filter {
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 20px;
  border: 1px solid #888;
  width: 30%;
  border-radius: 10px;
  margin-top: 15px;
}

.filter-background-active {
  background: rgba(238, 232, 151, 0.5);
}

.lbf-content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.lbf-title {
  font-weight: bold;
  color: #face3b;
  margin-bottom: 20px;
}

.lbf-button-content {
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 0 105px;
  justify-content: center;
  align-items: center;
}

.lbf-button {
  justify-content: center;
  align-items: center;
  text-align: center;
  margin-top: 10px;
  padding: 10px;
  border-radius: 7px;
  width: 100%;
  background: #fad55c !important;
}

.lbf-button:hover .lbf-button:active {
  background: rgba(255, 255, 255, 0.2);
  cursor: pointer;
}
</style>
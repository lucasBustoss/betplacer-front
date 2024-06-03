<template>
  <div class="backtest-result-bullet">
    <div class="backtest-result-bullet-title">{{ title }}</div>
    <div class="backtest-result-bullet-content">
      {{
        type == "percentage"
          ? treatPercentageProperty(value)
          : treatDateProperty(value)
      }}
    </div>
  </div>
</template>

<script>
import { format, parseISO } from "date-fns";

export default {
  props: ["title", "value", "type"],
  methods: {
    treatDateProperty(value) {
      return format(parseISO(value), "dd/MM/yyyy HH:mm");
    },
    treatPercentageProperty(value) {
      return `${(value * 100).toFixed(2)}%`;
    },
  },
};
</script>

<style>
.backtest-result-bullet {
  padding: 25px;
  border: 1px solid #777;
  border-radius: 10px;
}

.backtest-result-bullet-title {
  font-size: 0.9rem;
  text-align: left;
}

.backtest-result-bullet-content {
  font-size: 1.6rem;
  text-align: right;
}
</style>
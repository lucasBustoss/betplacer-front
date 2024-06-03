<template>
  <div class="backtest" v-if="!isLoading">
    <div class="backtest-content">
      <div class="backtest-content-list">
        <BacktestItem v-for="b in backtest" :backtest="b" :key="b.id" />
      </div>
    </div>
  </div>
</template>

<script>
import { backtestApi } from "@/config/api";
import BacktestItem from "./BacktestItem.vue";

export default {
  components: { BacktestItem },
  data() {
    return {
      backtest: [],
      isLoading: false,
    };
  },
  methods: {
    async getBacktests() {
      const response = await backtestApi.get("");
      console.log(response.data);
    },
    async calculateBacktests() {
      this.isLoading = true;
      const body = {
        name: "teste",
        resultType: 1,
        resultTeamType: 2,
        filters: {
          firstToScorePercent: {
            compareType: 2,
            teamType: 1,
            propType: 1,
            initialValue: 0.7,
            finalValue: 0.9,
          },
          twoZeroPercent: {
            compareType: 2,
            teamType: 1,
            propType: 1,
            initialValue: 0,
            finalValue: 1,
          },
          cleanSheetPercent: {
            compareType: 2,
            teamType: 1,
            propType: 1,
            initialValue: 0,
            finalValue: 1,
          },
          failedToScorePercent: {
            compareType: 2,
            teamType: 1,
            propType: 1,
            initialValue: 0,
            finalValue: 1,
          },
          bothToScorePercent: {
            compareType: 2,
            teamType: 1,
            propType: 1,
            initialValue: 0,
            finalValue: 1,
          },
          avgGoalsScored: {
            compareType: 2,
            teamType: 1,
            propType: 1,
            initialValue: 0,
            finalValue: 999,
          },
          avgGoalsConceded: {
            compareType: 2,
            teamType: 1,
            propType: 1,
            initialValue: 0,
            finalValue: 999,
          },
        },
      };

      const response = await backtestApi.post("", body);
      this.backtest.push(response.data.data);

      console.log(this.backtest);

      this.isLoading = false;
    },
  },
  async mounted() {
    // await this.calculateBacktests();
  },
};
</script>

<style>
.backtest {
  width: 100%;
}

.backtest-content {
  display: flex;
  padding: 25px;
  width: 100%;
  justify-content: center;
}

.backtest-content-list {
  display: flex;
  flex-direction: column !important;
  width: 75% !important;
}
</style>
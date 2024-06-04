<template>
  <div class="backtest" v-if="!isLoading">
    <div class="backtest-content">
      <div class="backtest-content-list">
        <div class="backtest-content-list-create">
          <router-link to="/backtest/create">
            <v-btn>Criar backtest</v-btn>
          </router-link>
        </div>
        <BacktestItem v-for="b in backtests" :backtest="b" :key="b.code" />
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
      backtests: [],
      isLoading: false,
    };
  },
  methods: {
    async getBacktests() {
      this.isLoading = true;
      const response = await backtestApi.get("");

      if (response && response.data && response.data.data) {
        this.backtests = response.data.data;
      }

      this.isLoading = false;
    },
  },
  async mounted() {
    await this.getBacktests();
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

.backtest-content-list-create {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
}

.backtest-content-list-create > a > button {
  background: #face3b !important;
}

.backtest-content-list-create > a > button:hover {
  background: #f3df9d !important;
}

.backtest-content-list-create > a > button:active {
  background: #fdce34 !important;
}
</style>
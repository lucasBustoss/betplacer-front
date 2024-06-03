<template>
  <v-expansion-panels>
    <LeagueItem v-for="i in 5" :key="i" />
  </v-expansion-panels>
</template>

<script>
import LeagueItem from "./LeagueItem.vue";

export default {
  components: { LeagueItem },
};
</script>

<style>
</style>
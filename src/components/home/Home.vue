<template>
  <div class="home">
    <LeagueList />
  </div>
</template>

<script>
import LeagueList from "@/components/leagues-matches/LeagueList";

export default {
  components: { LeagueList },
};
</script>

<style>
.home {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  width: 100%;
}
</style>
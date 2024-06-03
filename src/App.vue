
<template>
  <div class="main-app" data-app>
    <Sidebar />
    <v-divider vertical dark></v-divider>

    <router-view class="body-component" />
  </div>
</template>

<script>
import Sidebar from "@/components/main/sidebar/Sidebar.vue";

export default {
  name: "App",
  components: {
    Sidebar,
  },
};
</script>

<style>
.main-app {
  display: flex;
}

.loading-validate {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
}

.body-component {
  padding: 50px;
}
</style>

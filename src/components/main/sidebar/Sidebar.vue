<template>
  <div class="sidebar">
    <v-navigation-drawer permanent expand-on-hover>
      <v-list>
        <v-list-item class="px-2 sidebar-image">
          <v-list-item-avatar>
            <v-img class="sidebar-image-icon" src="@/assets/logo-sidebar.png">
              ></v-img
            >
          </v-list-item-avatar>
        </v-list-item>
      </v-list>

      <v-divider></v-divider>

      <v-list nav dense>
        <router-link to="/">
          <v-list-item link class="sidebar-item">
            <v-list-item-icon>
              <v-icon class="sidebar-icon">mdi-home</v-icon>
            </v-list-item-icon>
            <v-list-item-title class="sidebar-item-title"
              >Inicio</v-list-item-title
            >
          </v-list-item>
        </router-link>
        <router-link to="/backtest">
          <v-list-item link class="sidebar-item">
            <v-list-item-icon>
              <v-icon class="sidebar-icon"
                >mdi-chart-box-multiple-outline</v-icon
              >
            </v-list-item-icon>
            <v-list-item-title class="sidebar-item-title"
              >Backtest</v-list-item-title
            >
          </v-list-item>
        </router-link>
        <router-link to="/fixtures-without-odds">
          <v-list-item link class="sidebar-item">
            <v-list-item-icon>
              <v-icon class="sidebar-icon"
                >mdi-chart-box-multiple-outline</v-icon
              >
            </v-list-item-icon>
            <v-list-item-title class="sidebar-item-title"
              >Jogos sem odds</v-list-item-title
            >
          </v-list-item>
        </router-link>
        <router-link to="/leagues">
          <v-list-item link class="sidebar-item">
            <v-list-item-icon>
              <v-icon class="sidebar-icon">mdi-format-list-checkbox</v-icon>
            </v-list-item-icon>
            <v-list-item-title class="sidebar-item-title"
              >Ligas</v-list-item-title
            >
          </v-list-item>
        </router-link>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>
<script>
import { userKey } from "@/global";

export default {
  methods: {
    logout() {
      localStorage.removeItem(userKey);
      this.$store.commit("setUser", null);
      this.$router.push({ name: "auth" });
    },
  },
};
</script>

<style>
.sidebar {
  border: none !important;
}

.sidebar-image {
  height: 30px !important;
  width: 30px !important;
  padding: 0 6px !important;
  border: none !important;
}

.sidebar-image-icon {
  background: #fff;
}

.v-navigation-drawer {
  background: inherit !important;
}

.sidebar-item {
  padding: 5px !important;
}

.sidebar-item:hover {
  background: rgba(0, 0, 0, 0.3);
  transition: 130ms linear;
}

.sidebar-icon,
.sidebar-item-title {
  color: rgb(201, 201, 201) !important;
}

.sidebar-icon {
  font-size: 1.7rem !important;
}

.sidebar-item-title {
  margin-left: 10px;
  font-size: 1.1rem !important;
}
</style>
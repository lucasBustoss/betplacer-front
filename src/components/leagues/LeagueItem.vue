<template>
  <v-expansion-panel>
    <v-expansion-panel-header class="expansion-panel-header">
      <div class="league-item-content">
        <img class="league-item-image" src="https://flagcdn.com/80x60/ua.png" />
        <div class="league-item-name">
          <div class="league-item-name-country">Ukraine</div>
          {{ ` - Primeira Liga`.replace(/ /g, "&nbsp;") }}
        </div>
      </div>
    </v-expansion-panel-header>

    <v-expansion-panel-content class="expansion-panel-content">
      <v-data-table
        dense
        :headers="headers"
        :items="items"
        item-key="name"
        dark
        hide-default-footer
        class="elevation-1"
      >
        <template v-slot:item="{ item }">
          <tr class="table-game-item">
            <td class="table-game-item-column column-date">
              {{ item.date }}
            </td>
            <td class="table-game-item-column column-match">
              {{ item.match }}
            </td>
            <td class="table-game-item-column column-odd">
              <div class="item-odd-container">
                {{ item.odd_home.toFixed(2) }}
              </div>
            </td>
            <td class="table-game-item-column column-odd">
              <div class="item-odd-container">
                {{ item.odd_draw.toFixed(2) }}
              </div>
            </td>
            <td class="table-game-item-column column-odd">
              <div class="item-odd-container">
                {{ item.odd_away.toFixed(2) }}
              </div>
            </td>
          </tr>
        </template>
      </v-data-table>
    </v-expansion-panel-content>
  </v-expansion-panel>
</template>

<script>
export default {
  data() {
    return {
      headers: [
        {
          text: "Data",
          value: "date",
        },
        {
          text: "Jogo",
          value: "game",
        },
        {
          text: "Odd Home",
          class: "table-odd-header",
          value: "odd_home",
        },
        {
          text: "Odd Draw",
          class: "table-odd-header",
          value: "odd_draw",
        },
        {
          text: "Odd Away",
          class: "table-odd-header",
          value: "odd_away",
        },
      ],
      items: [
        {
          id: 1,
          date: "30/05/2024 12:00",
          match: "São Paulo x Talleres",
          odd_home: 1.7,
          odd_draw: 3.5,
          odd_away: 4.7,
        },
        {
          id: 2,
          date: "30/05/2024 12:00",
          match: "São Paulo x Talleres",
          odd_home: 1.7,
          odd_draw: 3.5,
          odd_away: 4.7,
        },
        {
          id: 3,
          date: "30/05/2024 12:00",
          match: "São Paulo x Talleres",
          odd_home: 1.7,
          odd_draw: 3.5,
          odd_away: 4.7,
        },
      ],
    };
  },
};
</script>

<style>
.expansion-panel-header {
  display: flex;
  justify-content: space-between;
  padding: 20px !important;
  min-height: 40px !important;
  background: rgba(255, 255, 255, 0.3);
}

.league-item-content {
  display: flex;
  align-items: center;
}

.league-item-image {
  max-width: 25px;
  max-height: 40px;
  /* height: auto; */
}

.league-item-name {
  margin-left: 45px;
  font-size: 0.8rem;
  display: flex;
}

.league-item-name-country {
  font-weight: bold;
}

.expansion-panel-content {
  margin-top: 20px;
}

.table-game-item {
  cursor: pointer;
}

.table-game-item-column {
  padding: 15px 0 !important;
  text-align: center !important;
  margin-right: 150px !important;
}

.column-date {
  width: 15%;
}

.column-match {
  width: 35%;
}

.column-odd {
  width: 10%;
  text-align: center !important;
}

.item-odd-container {
  display: flex;
  justify-content: center;
  margin-right: 20px;
}
</style>
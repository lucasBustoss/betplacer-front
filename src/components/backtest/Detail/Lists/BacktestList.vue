<template>
  <div class="backtest-list">
    <div class="backtest-list-header">
      <h4>{{ title }}</h4>
    </div>

    <hr />

    <v-data-table
      dense
      :headers="headers"
      :items="itemsPage"
      item-key="name"
      dark
      hide-default-footer
      class="backtest-list-table elevation-1"
    >
      <template v-slot:item="{ item }">
        <tr class="backtest-list-item">
          <td class="backtest-list-item-column column-name">
            {{ item.name }}
          </td>
          <td class="backtest-list-item-column">
            <div class="column-ratio">
              {{ (item.ratio * 100).toFixed(2) }}
            </div>
          </td>
        </tr>
      </template>
    </v-data-table>
    <div class="text-center pt-2">
      <v-pagination
        class="backtest-list-pagination"
        v-model="page"
        dark
        :length="Math.trunc(items.length / 10) + 1"
      ></v-pagination>
    </div>
  </div>
</template>

<script>
export default {
  props: ["title", "items"],
  watch: {
    page() {
      this.getItemsPage();
    },
  },
  data() {
    return {
      headers: [
        {
          text: "Nome",
          value: "name",
        },
        {
          text: "Percentual",
          value: "ratio",
        },
      ],
      page: 1,
      pageCount: 0,
      itemsPerPage: 10,
      itemsPage: [],
    };
  },
  methods: {
    getItemsPage() {
      const start = (this.page - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;

      this.itemsPage = this.items.slice(start, end);
    },
  },
  mounted() {
    this.getItemsPage();
  },
};
</script>

<style>
.backtest-list {
  padding: 20px;
  border: 1px solid #777;
  border-radius: 7px;
  box-sizing: border-box;
  height: 700px;
}

.backtest-list-header {
  text-align: center;
  margin: 10px 0;
}

.backtest-list-table {
  margin-top: 10px;
  height: 560px;
}

.backtest-list-item {
  cursor: default;
}

.backtest-list-item-column {
  padding: 15px 0 !important;
  text-align: center !important;
  margin-right: 150px !important;
}

.column-name {
  width: 70%;
}

.column-ratio {
  width: 55%;
  display: flex;
  justify-content: flex-end;
}

.backtest-list-pagination {
  float: bottom !important;
}

.backtest-list-pagination > ul > li > .v-pagination__item,
.backtest-list-pagination > ul > li > .v-pagination__navigation {
  background: #face3b !important;
  color: #222 !important;
}

.backtest-list-pagination > ul > li > .v-pagination__navigation--disabled {
  background: #face3b !important;
}

.backtest-list-pagination > ul > li > .v-pagination__navigation--disabled > i,
.backtest-list-pagination > ul > li > .v-pagination__navigation > i {
  color: #222 !important;
}

.backtest-list-pagination > ul > li > .v-pagination__item:hover {
  background: #e5d7a5 !important;
  color: #222 !important;
}

.backtest-list-pagination > ul > li > .v-pagination__item--active {
  background: #e5d7a5 !important;
  color: #222 !important;
}
</style>
<template>
  <div class="q-pa-md">
    <div class="filter-btn">
      <q-input filled v-model="textToFilter" label="חפש" />
    </div>

    <q-table
      :loading="true"
      :sticky-header="true"
      :rows-per-page-options="[0]"
      flat
      bordered
      :rows="rowsFiltered"
      :columns="columns"
      row-key="name"
    >
      <template
        v-for="(col, index) in columns"
        :key="col.field"
        v-slot:[`body-cell-${col.field}`]="props"
      >
        <q-td :props="props">
          <q-toggle
            v-if="col.label.includes('מבחן') || col.label.includes('בוחן')"
            v-model="props.row[col.field]"
            @click="changePerm(col, props.row, index)"
            :ref="col + index"
            color="var(--main-background-color)"
          />
          <template v-else>
            {{ props.row[col.field] }}
          </template>
        </q-td>
      </template>

      <template v-slot:bottom>
        
      </template>
    </q-table>
  </div>
</template>

<script>
import { LocalStorage } from "quasar";
import { computed } from "@vue/reactivity";
import axios from "axios";
export default {
  name: "permTable",
  data() {
    return {
      columns: [],
      updatedNameColumns: [],
      rows: [],
      textToFilter: "",
    };
  },
  async beforeMount() {
    const examNames = JSON.parse(LocalStorage.getItem("examsName"));
    console.log(examNames);
    const columns = [
      { name: "Title", label: "שם", field: "Title" },
      { name: "userNum", label: "מס' אישי", field: "userNum" },
    ];

    this.updatedNameColumns = await examNames.map((obj) => {
      const { Title, subject } = obj;
      return { name: Title, label: subject, field: Title };
    });
    this.columns = columns.concat(this.updatedNameColumns);
    console.log(this.updatedNameColumns);
    console.log(this.columns);

    this.getRows();
  },
  methods: {
    changePerm(col, row) {
      this.$emit("childEvent", col, row);
      console.log(col);
      console.log(row);
    },

    async getRows() {
      var res = null;
      if (this.$isSharePointUrl) {
        res = await axios.get(
          this.$sharePointUrl + "getByTitle('isPermissionActive')/Items"
        );
      } else {
        res = await axios.get(this.$sharePointUrl + "isPermissionActive");
      }
      this.rows = res.data.value;
      console.log(this.rows);
    },
  },
  computed: {
    rowsFiltered() {
      return this.rows.filter(
        (row) =>
          row.Title.includes(this.textToFilter) ||
          row.userNum.includes(this.textToFilter)
      );
    },
  },
};
</script>

<style scoped>
.q-pa-md {
  width: 50%;
}
.filter-btn {
  display: flex;
  justify-content: center;
}
.q-input {
  direction: rtl;
}
</style>
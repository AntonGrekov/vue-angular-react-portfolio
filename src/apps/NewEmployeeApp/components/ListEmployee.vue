<template>
  <div class="root-container">
    <v-list
      dense
      :dark="dark">
      <v-subheader>Список сотрудников</v-subheader>
      <!-- iterate over employeeList and out full name of each employee -->
      <v-list-item
        v-for="(employee, idx) in eList"
        @click="$emit('selectEmployee', employee.id); toggle(idx);"
        :key='employee.id'
        :class="['list-item', {'v-list-item--active': idx === activeIdx}]">
        <v-icon left :class="{'active-icon': idx === activeIdx}">
          mdi-account-circle
        </v-icon>
        {{ fullFioToFioWithInitials(employee.fio) }}
      </v-list-item>
    </v-list>
  </div>
</template>


<script>
export default {
  name: "",
  props: ["eList", "userIcon", "dark"],
  data() {
    return {
      activeIdx: null,
    };
  },
  methods: {
    fullFioToFioWithInitials(str) {
      // Converts full name to surname with initials
      return str
        .split(/\s+/)
        .map((item, idx) =>
          idx ? item.substr(0, 1).toUpperCase() + "." : item
        )
        .join(" ");
    },
    toggle(idx) {
      this.activeIdx = idx;
    },
  },
};
</script>


<style scoped lang="scss">
.active-icon {
  color: #2196f3 !important;
  transform: scale(1.2);
}

.v-list-item--active {
  color: #2196f3 !important;
}
</style>

<template>
  <div id="app">
    <v-app>
      <EmployeeForm></EmployeeForm>
      <SimpleTodo></SimpleTodo>
    </v-app>
  </div>
</template>

<script>
import EmployeeForm from "./apps/NewEmployeeApp/index.vue";
import SimpleTodo from "./apps/SimpleTodo/index.vue";

export default {
  name: "App",
  components: {
    EmployeeForm,
    SimpleTodo,
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>

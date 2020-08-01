<template>
  <div id="todo-list-example">
    <form v-on:submit.prevent="addNewTodo" class="todo-list__form">
      <label for="new-todo">Добавить задачу</label>
      <input class="todo-list__input" v-model="newTodoText" id="new-todo" placeholder="Например, покормить кота" />
      <v-btn color="info">
        Добавить
        <v-icon right>mdi-account-multiple-plus</v-icon>
      </v-btn>
    </form>
    <ul>
      <li
          is="todo-item"
          v-for="(todo, index) in todos"
          v-bind:key="todo.id"
          v-bind:title="todo.title"
          v-on:remove="todos.splice(index, 1)"
      ></li>
    </ul>
  </div>
</template>

<script>
  import Vue from "vue";

  Vue.component("todo-item", {
    template:
        "\
          <li>\
             {{ title }}\
             <button v-on:click=\"$emit('remove')\">Удалить</button>\
          </li>\
       ",
    props: ["title"],
  });

  export default {
    data: function () {
      return {
        newTodoText: "",
        todos: [
          {
            id: 1,
            title: "Помыть посуду",
          },
          {
            id: 2,
            title: "Вынести мусор",
          },
          {
            id: 3,
            title: "Подстричь газон",
          },
        ],
        nextTodoId: 4,
      };
    },
    methods: {
      addNewTodo: function () {
        this.todos.push({
          id: this.nextTodoId++,
          title: this.newTodoText,
        });
        this.newTodoText = "";
      },
    },
  };
</script>


<style scoped>
  .todo-list__form {
    display: flex;
    justify-content: space-around;
    align-items: center;
  }
  .todo-list__input {
    border: 1.5px solid grey;
    padding: .3rem;
  }
  .todo-list__input::placeholder {
    font-size: .8rem;
  }
</style>

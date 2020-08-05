<template>
  <div id="todo-list-example">
    <form v-on:submit.prevent="addNewTodo" class="todo-list__form">
      <label for="new-todo">Добавить задачу</label>
      <input class="todo-list__input" ref="inpt" v-model="newTodoText" id="new-todo" placeholder="Например, покормить кота" />
      <label>
        <select class="todo-list__task-type" v-model="taskType">
          <option value="pickType" disabled >Выберите тип задачи</option>
          <option value="completed">Выполненная</option>
          <option value="urgent">Срочная</option>
          <option value="regular">Обычная</option>
        </select>
      </label>
      <v-btn color="info" @click="addNewTodo">
        Добавить
        <v-icon right>mdi-account-multiple-plus</v-icon>
      </v-btn>
    </form>
    <ul class="todo-list__list">
      <li
          is="todo-item"
          v-for="(todo, index) in todos"
          :key="todo.id"
          :title="todo.title"
          :type="todo.type"
          @remove="todos.splice(index, 1)"
      ></li>
    </ul>
  </div>
</template>

<script>
  import Vue from "vue";

  Vue.component("todo-item", {
    props: {
      title: {
        required: true
      },
      type: {
        default: 'regular'
      }
    },
    data: () => {
      return {
        buttonStyle: {
          color: 'red',
          float: 'right',
          margin: '0 .5rem'
        },
      }
    },
    template:
      "\
        <li :class='type'>\
           {{ title }} \
           <button :style='buttonStyle'  @click=\"$emit('remove')\">x</button>\
        </li>\
     "
  });

  export default {
    data: function () {
      return {
        newTodoText: "",
        todos: [
          {
            id: 1,
            title: "Помыть посуду",
            type: "completed"
          },
          {
            id: 2,
            title: "Вынести мусор",
            type: "urgent"
          },
          {
            id: 3,
            title: "Подстричь газон",
            type: "regular"
          },
        ],
        nextTodoId: 4,
        taskType: "pickType"
      };
    },
    methods: {
      addNewTodo: function () {
        if (!this.newTodoText.trim()) {
          this.$refs.inpt.placeholder = "Введите текст задачи";
          this.newTodoText = "";
        }
        else {
          this.todos.push({
            id: this.nextTodoId++,
            title: this.newTodoText,
            type: this.taskType === "pickType" ? 'regular' : this.taskType
          });
          this.newTodoText = "";
        }
      },
    },
  };
</script>

<style lang="scss" scoped>
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
  .todo-list__list {
    display: inline-block;
    padding: 1rem 0 0;
  }
  .todo-list__task-type {
    border: 1px solid grey;
    appearance: auto;
    padding: .5rem 0;
  }
  .regular {
    background-color: yellow;
  }
  .urgent {
    background-color: #f4a9c5;
  }
  .completed {
    background-color: #4dffee;
  }

</style>

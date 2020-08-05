<template>
   <v-app>
      <v-card
        @mouseenter="isHovered = true"
        @mouseleave="isHovered = false"
        elevation="4"
        width="800"
        class="mx-auto"
        :dark="isDarkTheme"
      >
         <v-container>
            <h3 class="v-card__h3" :class="{'hovered': isHovered}">
               <span>Add/Edit/Delete Employee Form </span>
            </h3>
            <v-row>
               <v-col class="col-sm-5">
                  <ListEmployee
                    :eList="employeesList"
                    :dark="isDarkTheme"
                    @selectEmployee="selectEmployee"
                  />
               </v-col>
               <v-col>
                  <FormEmployee
                    :lastId="lastId"
                    :emp="selected"
                    :editing="editing"
                    :formTitle="formTitle"
                    @saveNewEmployee="saveNewEmployee"
                    @clearForm="clearForm"
                    @updateEmployee="updateEmployee"
                    @removeEmployee="removeEmployee"
                  />
               </v-col>
            </v-row>
            <v-row class="align-center">
               <v-overlay
                 absolute="absolute"
                 :opacity="1"
                 :value="overlay"
                 :z-index="5"
               >
                  <v-subheader>adadsdsa</v-subheader>
                  <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Culpa neque quas ratione temporibus
                     ullam! Ducimus harum maiores odio perspiciatis repellendus.</p>
                  <v-btn
                    color="primary"
                    @click="overlay = false"
                  >
                     Закрыть
                  </v-btn>
               </v-overlay>
               <v-btn
                 class="ml-2 float-left"
                 color="accent"
                 outlined
                 @click="overlay = !overlay"
               >
                  Описание
               </v-btn>
               <v-btn
                 outlined
                 color="accent"
                 class="ml-2"
                 href="https://bitbucket.org/AntonGrekov/employees-list-nots/commits/"
                 target="_blank">
                  GIT
               </v-btn>
               <v-switch
                 :label="`Theme: ${switch1.toString()}`"
                 v-model="switch1"
                 class="float-right d-inline-flex ml-3"
                 true-value="Dark"
                 false-value="Light"
                 color="orange"
                 inset>
               </v-switch>
            </v-row>
         </v-container>
      </v-card>

      <v-card
        width="800"
        class="mx-auto mt-12"
        @mouseenter="isHovered = !isHovered"
        @mouseleave="isHovered = !isHovered"
      >
         <v-container>
            <h3 class="v-card__h3 v-card__h3--black" :class="{'hovered': isHovered}">
               <span>Simple Todo</span>
            </h3>
            <v-row>
               <v-col>
                  <SimpleTodo/>
               </v-col>
            </v-row>
            <v-row>
               <v-overlay
                 absolute="absolute"
                 :opacity="1"
                 :value="overlay2"
                 :z-index="5"
               >
                  <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Culpa neque quas ratione temporibus
                     ullam! Ducimus harum maiores odio perspiciatis repellendus.</p>
                  <v-btn
                    color="primary"
                    @click="overlay2 = false"

                  >
                     Закрыть
                  </v-btn>
               </v-overlay>
               <v-btn
                 @click="overlay2 = !overlay2"
                 class="ml-2 float-left"
                 color="accent"
                 outlined
               >
                  Описание
               </v-btn>
            </v-row>
         </v-container>
      </v-card>
   </v-app>
</template>


<script>
  import ListEmployee from "./components/ListEmployee.vue";
  import FormEmployee from "./components/FormEmployee";
  import SimpleTodo from "./components/SimpleTodo.vue";

  export default {
    components: {
      FormEmployee,
      ListEmployee,
      SimpleTodo,
    },
    data() {
      return {
        isHovered: false,
        overlay: false,
        overlay2: false,
        switch1: "Light",
        activeClass: "active",
        errorClass: "text-danger",
        employeesList: [
          //date-формат RFC (YYYY-MM-DDThh:mm:ssZ)
          {
            id: 0,
            fio: "Греков Антон Леонидович",
            passSer: "1408",
            passNo: "936235",
            passDt: "2008-06-10",
          },
          {
            id: 1,
            fio: "Петров Сергей Федорович",
            passSer: "1218",
            passNo: "335735",
            passDt: "2010-03-04",
          },
          {
            id: 2,
            fio: "Анастасенко Анна Сергеевна",
            passSer: "1410",
            passNo: "225265",
            passDt: "2009-09-12",
          },
          {
            id: 3,
            fio: "Буркалева Анна Леонидовна",
            passSer: "1210",
            passNo: "335265",
            passDt: "2009-10-03",
          },
          {
            id: 4,
            fio: "Григоренко Анна Сергеевна",
            passSer: "1410",
            passNo: "775132",
            passDt: "2009-03-02",
          },
        ],
        editing: false,
        lastId: 0,
        formTitle: "Новый сотрудник",
        // empty object for adding new employee on app load
        selected: {},
      };
    },

    watch: {
      // Watching employeesList, main data array, for mutations
      // Update ID of last employee on this.employeesList change
      employeesList() {
        if (this.employeesList.length) {
          // update lastId variable only if array is not empty
          // set LocalStorage data either way - empty/not empty
          this.lastId = this.employeesList.slice(-1)[0].id;
        } else {
          // reset index to 0 if all employees has been deleted
          this.lastId = 0;
        }
        localStorage.setItem("employeesList", JSON.stringify(this.employeesList));
      },
    },
    computed: {
      isDarkTheme() {
        return this.switch1 === "Dark";
      },
      isLightTheme() {
        return this.switch1 === "Light";
      }
    },
    mounted() {
      // Update ID of last employee on root component mount
      this.lastId = this.employeesList.slice(-1)[0].id;
      // Load Data from LocalStorage on mount. If LocalStorage data is empty array
      // employeesList default data will be used - defined in this file, data() section
      let clientDataRaw = localStorage.getItem("employeesList");
      let clientDataParsed = JSON.parse(clientDataRaw);
      if (clientDataParsed.length > 0) {
        this.employeesList = clientDataParsed;
      }
    },
    methods: {
      saveNewEmployee(emp) {
        this.employeesList.push(emp);
      },
      selectEmployee(id) {
        this.$set(this, "selected", Object.assign({}, this.getEmpById(id)));
        this.$set(this, "editing", true);

        this.formTitle = "Изменение данных сотрудника";
      },
      clearForm() {
        this.$set(this, "selected", {});
        this.$set(this, "editing", false);

        this.formTitle = "Новый сотрудник";
      },
      updateEmployee(updatedData) {
        let id = updatedData["id"];
        this.$set(this.employeesList, this.getIdxById(id), updatedData);
      },
      removeEmployee(id) {
        this.employeesList.splice(this.getIdxById(id), 1);
      },

      // helper function to get employee object by id
      getEmpById(id) {
        return this.employeesList.find((el) => el.id == id);
      },

      // helper function to get employee array index by id
      getIdxById(id) {
        let el = this.employeesList.find((el) => el.id == id);
        return this.employeesList.indexOf(el);
      },
    },
  };
</script>

<style lang="scss">
   #app {
      font-family: Avenir, Helvetica, Arial, sans-serif;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
      text-align: center;
      color: #2c3e50;
      margin-top: 60px;
   }

   .v-card__h3 {
      color: #000;
      padding: 0.5rem;
      position: relative;
      background: rgb(146, 141, 222);
      background: linear-gradient(
          348deg,
          rgba(0, 212, 255, 1) 0%,
          rgb(255, 245, 238) 54%,
          rgba(146, 141, 222, 1) 100%
      );
      transition: 0.25s;
      cursor: pointer;

      span {
         position: relative;
         z-index: 2;
      }

      &:after {
         content: "";
         position: absolute;
         width: 100%;
         height: 100%;
         opacity: 0;
         top: 0;
         left: 0;
         transition: 1.3s;
         background: linear-gradient(
             348deg,
             rgba(146, 141, 222, 1) 0%,
             rgba(83, 83, 203, 0.7682423311121324) 54%,
             rgba(0, 212, 255, 1) 100%
         );
      }

      &.hovered:after {
         opacity: 1;
      }

      &.hovered {
         box-shadow: 0px 5px 5px 0px #00000054;
      }

      &--black {
         background: #000;
         color: #fff;

         &:after {
            background: #626f6f;
            color: #000;
         }
      }
   }
</style>

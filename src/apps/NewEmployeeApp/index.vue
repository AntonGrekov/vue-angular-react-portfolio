<template>
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
                 opacity="1"
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
</template>


<script>
  import ListEmployee from "./components/ListEmployee.vue";
  import FormEmployee from "./components/FormEmployee";

  export default {
    components: {
      FormEmployee,
      ListEmployee,
    },
    data() {
      return {
        isHovered: false,
        overlay: false,
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
   @import '../../common-styles/cards-layout';
</style>

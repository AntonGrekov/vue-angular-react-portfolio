<template>
  <div class="root-container">
    <h3>{{ formTitle }}</h3>
    <v-container>
      <v-form ref="form" v-model="valid" @submit.prevent="onSubmit">
        <v-row>
          <v-text-field
            v-model="emp.fio"
            :rules="rules"
            @keydown="isDisabled = false"
            :counter="30"
            label="ФИО Сотрудника"
            class="v-col-12"
          />
        </v-row>

        <v-row>
          <v-text-field
            v-model="emp.passSer"
            :rules="rules"
            @keydown="isDisabled = false"
            :counter="4"
            maxlength="4"
            label="Серия паспорта"
          />
        </v-row>

        <v-row>
          <v-text-field
            v-model="emp.passNo"
            :rules="rules"
            @keydown="isDisabled = false"
            :counter="6"
            maxlength="6"
            label="Номер паспорта"
          />
        </v-row>

        <v-row>
          <v-menu
            v-model="menu"
            :close-on-content-click="false"
            :nudge-right="40"
            transition="scale-transition"
            offset-y
            min-width="290px">
            <template #activator="{ on, attrs }">
              <v-text-field
                v-model="emp.passDt"
                v-bind="attrs"
                v-on="on"
                @change="isDisabled = false"
                :rules="rules"
                label="Дата выдачи паспорта"
                hint="DD.MM.YYYY format"
                autocomplete="off"
                readonly
              />
            </template>

            <v-date-picker
                v-model="emp.passDt"
                @input="menu = false"
                @change="isDisabled = false"
            />
          </v-menu>
        </v-row>

        <v-row class="mt-5 justify-space-between">
          <v-btn type="submit" color="success" :disabled="isDisabled">
            Сохранить
            <v-icon dark right>mdi-checkbox-marked-circle</v-icon>
          </v-btn>
          <v-btn color="info" @click="addNew">
            Новый
            <v-icon right>mdi-account-multiple-plus</v-icon>
          </v-btn>
          <v-btn color="error" @click="removeEmployee">
            Удалить
            <v-icon right>mdi-delete</v-icon>
          </v-btn>
        </v-row>
      </v-form>
    </v-container>
  </div>
</template>


<script>
export default {
  name: "FormEmployee",
  props: ["lastId", "emp", "editing", "formTitle"],
  data: function() {
    return {
      valid: false,
      menu: false,
      date: new Date().toISOString().substr(0, 10),
      fio: "",
      passNo: "",
      passDt: "",
      passSer: "",
      isDisabled: true,
      rules: [v => !!v || "Поле обязательно"]
    };
  },

  // неверный путь изменения данных, если через props
  // то всё через props
  //   watch: {
  //     emp() {
  //       this.employee = this.emp;
  //     }
  //   },

  methods: {
    onSubmit() {
      if (this.$refs.form.validate()) {
        if (!this.editing) {
          // Add new employee data
          let newEmployee = {
            id: this.lastId + 1,
            fio: this.emp.fio,
            passSer: this.emp.passSer,
            passNo: this.emp.passNo,
            passDt: this.emp.passDt
          };
          this.$emit("saveNewEmployee", newEmployee);
        } else {
          // Update current employee data via emit event
          this.$emit("updateEmployee", this.emp);
        }

        this.isDisabled = true;
      }
    },
    addNew() {
      this.$emit("clearForm");
      this.$refs.form.resetValidation();
    },
    removeEmployee() {
      // remove only if emp object loaded into component
      // clear form after deleting
      if (this.emp.id >= 0) {
        this.$emit("removeEmployee", this.emp.id);
        this.$emit("clearForm");
        this.$refs.form.resetValidation();
      }
    }
  }
};
</script>

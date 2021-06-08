<template>
  <v-card 
    width="800" 
    class="mx-auto mt-12"
    @mouseenter="isHovered = true"
    @mouseleave="isHovered = false">
    <v-container>
      <h3 class="v-card__h3 v-card__h3--black" :class="{'hovered': isHovered}">
        <span>Simple Todo</span>
      </h3>
      <v-row>
        <v-col>
          <SimpleTodo />
        </v-col>
      </v-row>
      <v-row>
        <v-overlay
          :value="overlay"
          absolute="absolute"
          opacity="1"
          z-index="5">
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Culpa neque quas ratione temporibus
            ullam! Ducimus harum maiores odio perspiciatis repellendus.
          </p>
          <v-btn color="primary" @click="overlay = false">Закрыть</v-btn>
        </v-overlay>
        <v-btn @click="overlay = !overlay" class="ml-2 float-left" color="accent" outlined>Описание</v-btn>
        <v-btn
          outlined
          color="accent"
          class="ml-2"
          href="https://github.com/AntonGrekov/vue-angular-react-portfolio/blob/simple-todo/src/apps/NewEmployeeApp/components/SimpleTodo.vue"
          target="_blank"
        >GIT</v-btn>
      </v-row>
    </v-container>
  </v-card>
</template>

<script>
import SimpleTodo from "./components/SimpleTodo.vue";

export default {
  data: () => {
    return {
      overlay: false,
      isHovered: false,
    };
  },
  components: {
    SimpleTodo,
  },
};
</script>

<style lang="scss">
   @import '../../common-styles/cards-layout';
</style>
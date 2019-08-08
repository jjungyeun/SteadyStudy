<template>
  <div style="margin:10px;">
  <v-card
    max-width="400px"
    color="#50bcdf"
    dark
    outlined
  >
    <v-list-item three-line>
      <v-list-item-content>
        <p class="todayTask-category">{{ category }}</p>
        <v-list-item-title class="headline">{{ title }}</v-list-item-title>
        <v-list-item-subtitle>{{ time }}</v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>
  </v-card>
  </div>
</template>

<script>
export default {
  name: 'todaytask',
  props: {
    category:String,
    title: String,
    time: String,
  },

}
</script>

<style>
.todayTask-category {
  text-align: right;
  color: rgb(202, 202, 202);
}
</style>

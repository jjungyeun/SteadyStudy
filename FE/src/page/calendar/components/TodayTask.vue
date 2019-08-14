<template>
  <div style="margin-top:20px;width:80%;">
  <v-card
    color="#50bcdf"
    dark
    outlined
  >
    <v-list-item three-line>
      <v-list-item-content>
        <p class="todayTask-category">{{ task.category }}</p>
        <v-list-item-title class="headline">{{ task.title }}</v-list-item-title>
        <v-list-item-subtitle>{{ task.startTime + " - " + task.endTime }}</v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>
  </v-card>
  </div>
</template>

<script>
export default {
  name: 'todaytask',
  props: {
    task: {
      category:String,
      title: String,
      startTime: String,
      endTime: String,
    }
  },

}
</script>

<style>
.todayTask-category {
  text-align: right;
  color: rgb(202, 202, 202);
}
</style>

<template>
  <div>
    <h3>어제의 나</h3>

    <cTodayTask 
      style="width:80%;margin-left:10%"
      class="todayTaskList"
      v-for="task in tasks"
      :key="task.taskId"
      :task="task"/>

  </div>
</template>

<script>
import cTodayTask from '../components/TodayTask'
const config = require('../../../../server.config');	// view

export default {
  name: 'yesterday',
  components: {
    cTodayTask
  },
  data(){
    return {
      tasks:[]

    }
  },
  methods: {
    loadTasks(){
      this.tasks = [];
      var date = new Date();
      date.setDate(date.getDate() - 1);
      var today = date.getFullYear() + '-' + (date.getMonth()+1) +'-'+date.getDate();
      this.$http.get(config.serverUrl()+'task/get/'+this.$session.get('id')+'/'+today)
            .then((result)=>{
              var data = result.data;
              for(var d of data){
                this.tasks.push(d);
              }
            })
            .catch((err)=>{
              console.log(err)
              alert(err)
            });
    }
  },
  created(){
    this.loadTasks();
  }
}
</script>

<style>
</style>
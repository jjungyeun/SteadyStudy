<template>
  <div>

    <h2 style="display:inline-block;margin-right:20px;">오늘의 일정</h2>
    <v-btn
      dark
      @click="showAddTaskDialog()"
    >추가
    </v-btn>

    <cTodayTask 
      class="todayTaskList"
      v-for="task in tasks"
      :key="task.taskId"
      :task="task"
      @click.native="viewDetailDialog(task)"/>

    <v-dialog
      v-model="addTaskDialog"
      :persistent="!canClickOutside"
      @click:outside="clickOutside"
      width="500"
    >
    <cAddTask 
      :viewDetail="!isAddMode&&!isEditMode"
      :isEditMode="isEditMode"
      :task="task2Detail"
      @toEditMode="changeToEditMode"
      @reloadList="loadTasks"
      @close="closeDialog" />
    </v-dialog>


  </div>
</template>

<script>
import cAddTask from '../components/AddTask'
import cTodayTask from '../components/TodayTask'
const config = require('../../../../server.config');	// view


export default {
  name: 'tasklist',
  components:{
    cAddTask,cTodayTask
  },
  props: {
  },
  data(){
    return {
      addTaskDialog:false,
      isAddMode: true,
      isEditMode: false,
      canClickOutside: false,
      task2Detail: {
          taskId: 0,
          title: "",
          detail: "",
          category: "",
          startTime: '12:00',
          endTime: '13:00',
          state:"예정"
      },
      tasks:[]
    }
  },
  methods:{
    showAddTaskDialog(){
      this.isAddMode = true;
      this.isEditMode = false;
      this.canClickOutside = false;
      this.clearTask();
      this.addTaskDialog = true;
    },
    changeToEditMode(){
      this.isAddMode = false;
      this.isEditMode = true;
      this.canClickOutside = false;
    },
    clickOutside(){
      if(this.canClickOutside)
        this.closeDialog();
    },
    closeDialog(){
      this.isEditMode = false;
      this.addTaskDialog = false;
      this.clearTask();
    },
    viewDetailDialog(task){
      this.isAddMode = false;
      this.isEditMode = false;
      this.canClickOutside = true;
      this.task2Detail.taskId = task.num;
      this.task2Detail.title = task.title;
      this.task2Detail.detail = task.detail;
      this.task2Detail.category = task.category;
      this.task2Detail.startTime = task.startTime;
      this.task2Detail.endTime = task.endTime;
      this.task2Detail.state = task.state;
      this.addTaskDialog = true;
    },
    clearTask(){
      this.task2Detail.taskId = 0;
      this.task2Detail.title = '';
      this.task2Detail.detail = '';
      this.task2Detail.category = '';
      this.task2Detail.startTime = '12:00';
      this.task2Detail.endTime = '13:00';
      this.task2Detail.state = '예정';
    },
    loadTasks(){
      this.tasks = [];
      var date = new Date();
      var today = date.getFullYear() + '-' + (date.getMonth()+1) +'-'+date.getDate();
      this.$http.get(config.serverUrl()+'task/get/'+this.$session.get('id')+'/'+today+'/today')
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
.todayTaskList {
  cursor: pointer;
}
</style>

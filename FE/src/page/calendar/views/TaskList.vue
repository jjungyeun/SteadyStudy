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
      :key="task.title"
      :task="task"
      @click.native="viewDetailDialog(task)"/>

    <v-dialog
      v-model="addTaskDialog"
      :persistent="isAddMode"
      @click:outside="closeDialog"
      width="500"
    >
    <cAddTask 
      :viewDetail="!isAddMode"
      :isEditMode="false"
      :task="task2Detail"
      @toEditMode="changeToEditMode"
      @close="closeDialog" />
    </v-dialog>


  </div>
</template>

<script>
import cAddTask from '../components/AddTask'
import cTodayTask from '../components/TodayTask'

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
      task2Detail: {
          title: "",
          detail: "",
          category: "",
          startTime: '12:00',
          endTime: '13:00',
          state:"예정"
      },
      tasks:[
        {
          category: "공부",
          title: "DB 공부",
          detail: "공부 시져시져",
          startTime: '10:00',
          endTime: '11:00',
          state:"완료"
        },
        {
          category: "약속",
          title: "아웃백><",
          detail: "맛있겠당><",
          startTime: '12:00',
          endTime: '17:00',
          state:"예정"
        },
      ]
    }
  },
  methods:{
    showAddTaskDialog(){
      this.isAddMode = true;
      this.clearTask();
      this.addTaskDialog = true;
    },
    changeToEditMode(){
      this.isAddMode = false;
    },
    closeDialog(){
      this.addTaskDialog = false;
      this.clearTask();
    },
    viewDetailDialog(task){
      this.isAddMode = false;
      this.task2Detail.title = task.title;
      this.task2Detail.detail = task.detail;
      this.task2Detail.category = task.category;
      this.task2Detail.startTime = task.startTime;
      this.task2Detail.endTime = task.endTime;
      this.task2Detail.state = task.state;
      this.addTaskDialog = true;
    },
    clearTask(){
      this.task2Detail.title = '';
      this.task2Detail.detail = '';
      this.task2Detail.category = '';
      this.task2Detail.startTime = '12:00';
      this.task2Detail.endTime = '13:00';
      this.task2Detail.state = '예정';

    }
  }
}
</script>

<style>
.todayTaskList {
  cursor: pointer;
}
</style>

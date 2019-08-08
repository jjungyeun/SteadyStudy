<template>
  <div>
    <h2 style="display:inline-block;margin-right:20px;">오늘의 일정</h2>
    <v-dialog
      v-model="addTaskDialog"
      persistent 
      width="500"
    >
    <template v-slot:activator="{ on }">
        <v-btn
          dark
          v-on="on"
        >
          추가
        </v-btn>
      </template>
    <cAddTask @close="closeAddTask" />
    </v-dialog>
    <br>
    <cTodayTask v-for="task in tasks"
      :key="task.title"
      :category="task.category"
      :title="task.title"
      :time="task.time" />
  </div>
</template>

<script>
import cAddTask from '../components/AddTask'
import cTaskDetail from '../components/TaskDetail'
import cTodayTask from '../components/TodayTask'

export default {
  name: 'tasklist',
  components:{
    cAddTask,cTaskDetail,cTodayTask
  },
  props: {
  },
  data(){
    return {
      addTaskDialog:false,
      tasks:[
        {
          category: "공부",
          title: "DB 공부",
          time: '10:00-11:00'
        },
        {
          category: "약속",
          title: "아웃백><",
          time: '12:00-17:00'
        },
      ]
    }
  },
  methods:{
    closeAddTask(){
      this.addTaskDialog = false;
    }
  }
}
</script>
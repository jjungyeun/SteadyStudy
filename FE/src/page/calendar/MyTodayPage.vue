<template>
  <div>
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
    <table width="100%">
      <tr>
        <td rowspan="2" bgcolor="skyblue" height="500">
          <vTaskList />
        </td>
        <td bgcolor="skyblue">
          <vStopWatch />
        </td>
      </tr>
      <tr>
        <td bgcolor="skyblue">
          <vDiary />
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
import vTaskList from './views/TaskList'
import vStopWatch from './views/StopWatch'
import vDiary from './views/Diary'
import cAddTask from './components/AddTask'
import cTaskDetail from './components/TaskDetail'
import cTimeStamp from './components/TimeStamp'

export default {
  name: 'mytoday',
  components: {
    vTaskList,vStopWatch,vDiary,cAddTask,cTaskDetail,cTimeStamp
  },
  data(){
    return {
      addTaskDialog:false,
    }
  },
  methods:{
    closeAddTask(){
      this.addTaskDialog = false;
    }
  }
}
</script>
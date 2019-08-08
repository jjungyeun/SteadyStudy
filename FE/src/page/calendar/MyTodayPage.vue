<template>
  <div id="myTodayPage">
    <table width="80%">
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

export default {
  name: 'mytoday',
  components: {
    vTaskList,vStopWatch,vDiary
  },
  data(){
    return {
    }
  },
  methods:{
  }
}
</script>

<style>
#myTodayPage {
}
</style>

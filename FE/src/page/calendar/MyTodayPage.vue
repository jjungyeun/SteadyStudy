<template>
  <div id="myTodayPage">
    <table style="
        border-spacing: 50px;
        border-collapse: separate;">
      <tr style="margin-right">
        <td rowspan="2" style="width:500px;">
          <vTaskList />
        </td>
        <td style="width:500px;">
          <vStopWatch />
        </td>
      </tr>
      <tr>
        <td style="width:500px;">
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
  margin-left: auto;
  margin-right: auto;
}
</style>

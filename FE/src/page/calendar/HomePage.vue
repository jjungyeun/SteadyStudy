<template>
  <div>
    <table id="homeTable">
      <tr height="200">
        <td colspan="3" bgcolor="skyblue">
          <h3>오늘의 내가 내일의 나를 만든다.</h3>
        </td>
      </tr>
      <tr height="500">
        <td bgcolor="yellow">
          <vYesterday />
        </td>
        <td bgcolor="yellow" v-on:click="goMyTodayPage">
          <vToday />
        </td>
        <td bgcolor="yellow">
          <vTomorrow />
        </td>
      </tr>
    </table>

  </div>
</template>

<script>
import vYesterday from './views/Yesterday'
import vToday from './views/Today'
import vTomorrow from './views/Tomorrow'
import cTodayTask from './components/TodayTask'
import cTmrTask from './components/TomorrowTask'

export default {
  name: 'home',
  components: {
    vYesterday, vToday, vTomorrow, cTodayTask, cTmrTask
  },
  methods:{
    goMyTodayPage(){
          this.$router.push('/calendar/today');
      },
  }
}
</script>

<style>
#homeTable {
  width: 100%;
  text-align: center;
}
</style>

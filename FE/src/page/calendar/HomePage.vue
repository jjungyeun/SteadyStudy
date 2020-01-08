<template>
  <div>
    <table id="homeTable">
      <tr height="200">
        <td colspan="3" bgcolor="skyblue">
          <h3>{{ saying }}</h3>
        </td>
      </tr>
      <tr height="500">
        <td class="home-side">
          <vYesterday />
        </td>
        <td bgcolor="yellow" v-on:click="goMyTodayPage">
          <vToday />
        </td>
        <td bgcolor="yellow" class="home-side">
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

const config = require('../../../server.config');

export default {
  name: 'home',
  components: {
    vYesterday, vToday, vTomorrow
  },
  data(){
    return {
      saying: "",
      userID: "",
    }
  },
  methods:{
    goMyTodayPage(){
          this.$router.push('/calendar/today');
      },
    getSaying(){
      this.userID = this.$session.get('id');
      this.$http.get(config.serverUrl()+'profile/get/'+this.userID+'/saying')
        .then((result)=>{
          var data = result.data[0].saying;
          if(data == null){
            this.saying = "오늘의 내가 내일의 나를 만든다.";
          }
          else
            this.saying = data;

          console.log("saying: "+this.saying);
        })
        .catch((err)=>{
          console.log(err)
          alert(err)
        });
    }
    
  },
  created(){
    this.getSaying();
  },
}
</script>

<style>
#homeTable {
  width: 100%;
  text-align: center;
}

.home-side {
  width: 30%;
}
</style>

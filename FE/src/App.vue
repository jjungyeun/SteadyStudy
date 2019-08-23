<template>
  <v-app>
    <Toolbar 
      v-if="logoutVisible"
      :id="userNickname"
      @logout="logout"
      />
    <router-view
      @check="checkSession" />
  </v-app>
</template>

<script>
import Toolbar from './page/Toolbar'
export default {
  name: 'App',
  components: {
    Toolbar
  },
  data(){
    return {
      userID: "",
      userNickname: "",
      logoutVisible: false
    }
  },
  created(){
    this.checkSession();
  },
  methods:{
    checkSession(){
      if(this.$session.exists()){ // 세션 존재
        this.userID = this.$session.get('id');
        this.userNickname = this.$session.get('nickname');
        this.logoutVisible = true;  
      }
    },
    logout(){
      this.userID = '';
      this.logoutVisible = false;
      this.$session.destroy();
      this.$router.push('/register/login');
    }
  }
};
</script>

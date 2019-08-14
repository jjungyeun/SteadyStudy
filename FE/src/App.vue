<template>
  <v-app>
    <h3>{{userID}}</h3>
    <v-btn 
      @click="logout"
      v-if="logoutVisible"
      >logout</v-btn>
    <router-view
      @check="checkSession" />
  </v-app>
</template>

<script>
export default {
  name: 'App',
  components: {
  },
  data(){
    return {
      userID: "",
      logoutVisible: false
    }
  },
  created(){
    if(this.$session.exists()){
      this.userID = this.$session.get('id');
      this.logoutVisible = true;
    }
  },
  methods:{
    checkSession(){

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

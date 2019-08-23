<template>
  <div id="login">
    <img style="width:250px;height:auto;margin-top:150px" :src="require('@/img/ssLogo.png')"/>
    <h5>당신의 오늘을 응원합니다</h5>
    <h2 style="cursor:pointer;" v-on:click="login">Login</h2>
  </div>
</template>

<script>
import firebase from 'firebase';
const config = require('../../../server.config');

export default {
  name: 'login',
  data(){
    return {
      userNickName:""
    }
  },
  methods:{
    goSignupPage(){
      this.$session.start();
      this.$session.set('id', this.email);
      this.$router.push('/register/signup');
    },
    goHomePage(){
      this.$session.start();
      this.$session.set('id', this.email);
      this.$session.set('nickname',this.userNickName);
      this.$emit('check');
      this.$router.push('/calendar');
    },
    checkifmember(){
      var url = config.serverUrl()+'register/check/member/'+this.email;
      this.$http.get(url)
            .then((result)=>{
              var data = result.data;
              console.log("data: "+data);
              if(data == "signup"){
                this.goSignupPage();
              }
              else{
                alert(data[0].nickName+"님 환영합니다");
                this.userNickName = data[0].nickName;
                this.$emit('checkSession');
                this.goHomePage();
              }
            })
            .catch((err)=>{
              console.log(err)
              alert(err)
            });
    },
    login(){
      var obj = this;
      var provider = new firebase.auth.GoogleAuthProvider();
      provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
      firebase.auth().signInWithPopup(provider).then(function(result) {
        // This gives you a Google Access Token. You can use it to access the Google API.
        var token = result.credential.accessToken;
        // The signed-in user info.
        obj.email = result.user.email;
        obj.checkifmember();

      }).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        // ...
      });
    }
  },
  created(){
    if(this.$session.exists()){
      this.$router.push('/calendar');
    }
  }
}
</script>

<style>
#login {
  text-align: center;
}
</style>

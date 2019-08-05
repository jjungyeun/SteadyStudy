<template>
  <div id="login">
    <img style="width:15%;height:auto;margin-top:150px" :src="require('@/img/ssLogo.png')"/>
    <h5>당신의 오늘을 응원합니다</h5>
    <h2 style="cursor:pointer;" v-on:click="goSignupPage">Login</h2>
  </div>
</template>

<script>

export default {
  name: 'login',
  methods:{
    goSignupPage(){
      this.$router.push('/register/signup');
    }
  }
}
</script>

<style>
#login {
  text-align: center;
}
</style>

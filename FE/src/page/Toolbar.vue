<template>
    <div>
        <v-toolbar>

            <div class="flex-grow-1">
                <img style="width:70px;height:60px;cursor:pointer;" :src="require('@/img/ssLogo.png')" @click="goHome()"/>
            </div>
            <h3>{{id}}님, 환영합니다</h3>

            <v-toolbar-items>
                <v-btn text @click="$emit('logout')">LOG OUT</v-btn>
            </v-toolbar-items>
        </v-toolbar>
    </div>
</template>

<script>
export default {
    name: 'toolbar',
    props:{
        id:"",
    },
    methods: {
        goHome(){
            this.$router.push('/calendar');
        }
    }
}
</script>
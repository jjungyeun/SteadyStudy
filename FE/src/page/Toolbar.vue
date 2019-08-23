<template>
    <div>
        <v-toolbar>

            <div class="flex-grow-1"></div>
            <h3>{{id}}</h3>

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
    }
}
</script>
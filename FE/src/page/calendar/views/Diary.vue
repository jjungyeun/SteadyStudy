<template>
  <div>
    <h3 style="display:inline-block;margin-right:20px;margin-bottom:20px;">오늘을 기록하세요</h3>

    <v-btn
      dark
      @click="changeEditMode()"
    >수정
    </v-btn>

    <br>
    
    오늘은 
    "<v-text-field
      :outlined="isEditMode"
      :solo="!isEditMode"
      :flat="!isEditMode"
      :disabled="!isEditMode"
      style="display:inline-block;width:100%;"
      v-model="diary.state"
      :counter="5"
    ></v-text-field>"

    <v-textarea
      v-model="diary.detail"
      style="width:100%;"
      :solo="isEditMode"
      :flat="!isEditMode"
      :disabled="!isEditMode"
      rows="7"
    ></v-textarea>

  </div>
</template>

<script>
const config = require('../../../../server.config');

export default {
  name: 'diary',
  props: {
  },
  data(){
    return {
      today: "",
      isEditMode: false,
      editType: "",
      diary: {
        state: "",
        detail: ""
      }
    }
  },
  methods:{
    changeEditMode(){
      if(this.isEditMode == true){
        // 내용 및 상태 update 쿼리 날리기
        this.$http.post(config.serverUrl()+'diary/edit', {
            id: this.$session.get('id'),
            date: this.today,
            detail: this.diary.detail,
            state: this.diary.state,
            type: this.editType
          })
            .then((result)=>{
              var data = result.data;
              console.log(data);
              if(data == 'update')
                alert('수정되었습니다');
                this.editType = "update";
            })
            .catch((err)=>{
              console.log(err)
              alert(err)
            });

      }
      this.isEditMode = !this.isEditMode;
    }
  },
  created(){
    var d = new Date();
    this.today = d.getFullYear() + '-' + (d.getMonth()+1) + '-' + d.getDate();
    this.$http.get(config.serverUrl()+'diary/get/'+this.$session.get('id')+'/'+this.today)
            .then((result)=>{
              var data = result.data;
              console.log(data);

              if(data == "empty"){
                this.diary.state = "";
                this.diary.detail = "";
                this.editType = "new";
              }
              else {
                this.diary.state = data[0].state;
                this.diary.detail = data[0].detail;
                this.editType = "update";
              }

            })
            .catch((err)=>{
              console.log(err)
              alert(err)
            });

  }
}
</script>
<template>
  <div>
    <h3 style="display:inline-block;margin-right:20px;margin-bottom:20px;">오늘을 기록하세요</h3>

    <v-btn
      dark
      @click="changeEditMode()"
    >수정
    </v-btn>

    <br>
    
    오늘은 "
    <v-text-field
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
export default {
  name: 'diary',
  props: {
  },
  data(){
    return {
      isEditMode: false,
      diary: {
        state: "넘무별로얌",
        detail: "공부 너무 하기시로~~~"
      }
    }
  },
  methods:{
    changeEditMode(){
      if(this.isEditMode == true){
        // 내용 및 상태 update 쿼리 날리기
      }
      this.isEditMode = !this.isEditMode;
    }
  }
}
</script>
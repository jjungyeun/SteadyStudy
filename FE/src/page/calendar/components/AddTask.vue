<template>
  <div id="addTask">
    <h3 class="addTaskTitle" v-if="todayORtmr==0">오늘 일정 추가</h3>
    <h3 class="addTaskTitle" v-if="todayORtmr==1">내일 일정 추가</h3>
    <v-btn 
      style="margin-left:150px;"
       dark color="deep-purple"
       class="addTaskBtn" 
       v-on:click="add"
       >추가</v-btn>
    <v-btn 
      dark color="deep-purple"
      class="addTaskBtn" 
      @click="$emit('close')"
      >취소</v-btn>
    <v-form 
        class="addTaskform"
        lazy-validation
        v-model="valid">
        <v-text-field
          outlined
          label="제목"
          v-model="title"
          :rules="titleRules"
          color="deep-purple"
          :counter="20"
          required
        ></v-text-field>
        <v-textarea
          auto-grow
          outlined
          label="내용"
          rows="3"
          color="deep-purple"
          :counter="200"
          v-model="detail"
        ></v-textarea>
        <v-select
          v-model="category"
          :items="taskCategories"
          label="카테고리"
          outlined
        ></v-select>
        <v-text-field
              class="addTaskform-Time"
              required
              v-model="startTime"
              label="시작 시간"
              type="time"
            ></v-text-field>
        <v-text-field
              class="addTaskform-Time"
              required
              v-model="endTime"
              :rules="endTimeRules"
              label="종료 시간"
              type="time"
            ></v-text-field>
        <v-radio-group v-model="state" row>
          <v-radio label="예정" value="예정" color="primary"></v-radio>
          <v-radio label="완료" value="완료" color="success"></v-radio>
          <v-radio label="취소" value="취소" color="gray"></v-radio>
        </v-radio-group>
      </v-form>
    
  </div>
</template>

<script>
export default {
  name: 'addTask',
  props: {
  },
  data(){
    return {
      todayORtmr: 0,  // 0: today, 1: tmr
      valid: true,
      title: '',  // 20자 이내
      detail: '', // 200자 이내
      startTime: '12:00',
      endTime: '13:00',
      category: '',
      state: '예정',
      taskCategories: ['공부','약속'],
      titleRules: [
          v => !!v || '제목을 입력해주세요',
          v => v.length <= 20 || '20자 이내로 입력해주세요',
      ],
      endTimeRules: [
        v => v >= this.startTime || '시작시간보다 이릅니다'
      ]
    }
  },
  methods:{
    add(){
      if(this.title==''){
        alert("제목을 써주세요.");
      }
      else if(this.category==''){
        alert("카테고리를 설정해주세요.");
      }
      else if(!this.valid){
        alert("형식에 맞게 입력해주세요")
      }
      else {
        // 디비에 전송 후
        // MyTodayPage(parent)의 addTaskDialog를 false로 변경
        alert("일정이 추가되었습니다");
        this.$emit('close');
      }
    },
    cancel(){ //경고창X
      // MyTodayPage(parent)의 addTaskDialog를 false로 변경
    }
  }
}
</script>

<style>
#addTask {
  height: 550px;
  width: 500px;
  border-radius: 15px;
  border: 4px solid blueviolet;
  background: rgb(243, 229, 255);
  padding: 30px;
  /* text-align: center; */
}

.addTaskTitle {
  display: inline-block;
  margin-left: 10px;
}

.addTaskBtn {
  margin-left: 20px;
}

.addTaskform {
  margin-top: 20px;
}

.addTaskform-Time {
  width: 100px;
  display: inline-block;
  margin-right: 10px;
  margin-bottom: 10px;
  text-align: left;
}
</style>

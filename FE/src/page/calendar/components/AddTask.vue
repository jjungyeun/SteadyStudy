<template>
  <div id="addTask">
    <h3 class="addTaskTitle" v-if="todayORtmr==0">오늘 일정</h3>
    <h3 class="addTaskTitle" v-if="todayORtmr==1">내일 일정</h3>
    <v-btn 
      v-show="!viewDetail&&!isEditMode"
      style="margin-left:180px;"
       dark color="deep-purple"
       class="addTaskBtn" 
       v-on:click="addTask"
       >추가</v-btn>
    <v-btn 
      v-show="viewDetail||isEditMode"
      style="margin-left:180px;"
       dark color="deep-purple"
       class="addTaskBtn" 
       v-on:click="editTask"
       >수정</v-btn>
    <v-btn 
      v-show="!viewDetail"
      dark color="deep-purple"
      class="addTaskBtn" 
       v-on:click="cancelAdding"
      >취소</v-btn>
       <v-btn 
      v-show="viewDetail"
       dark color="deep-purple"
       class="addTaskBtn" 
       v-on:click="showDltAlarm"
       >삭제</v-btn>
    <v-form 
        class="addTaskform"
        lazy-validation
        v-model="valid">
        <v-text-field
          outlined
          label="제목"
          v-model="task.title"
          :rules="titleRules"
          color="deep-purple"
          :counter="20"
          :readonly="viewDetail"
          required
        ></v-text-field>
        <v-textarea
          auto-grow
          outlined
          label="내용"
          rows="3"
          color="deep-purple"
          :counter="200"
          v-model="task.detail"
          :readonly="viewDetail"
        ></v-textarea>
        <v-select
          v-model="task.category"
          :items="taskCategories"
          label="카테고리"
          :readonly="viewDetail"
          outlined
        ></v-select>
        <v-text-field
              class="addTaskform-Time"
              required
              v-model="task.startTime"
              label="시작 시간"
              type="time"
              :readonly="viewDetail"
            ></v-text-field>
        <v-text-field
              class="addTaskform-Time"
              required
              v-model="task.endTime"
              :rules="endTimeRules"
              label="종료 시간"
              type="time"
              :readonly="viewDetail"
            ></v-text-field>
        <v-radio-group v-model="task.state" row 
          :disabled="viewDetail">
          <v-radio label="예정" value="예정" color="primary"></v-radio>
          <v-radio label="완료" value="완료" color="success"></v-radio>
          <v-radio label="취소" value="취소" color="gray"></v-radio>
        </v-radio-group>
      </v-form>

      <v-snackbar
      v-model="alertVisible"
      color="error"
      :timeout="alertTime"
      top
    >
      {{ alertMsg }}
      <v-btn
        v-show="!deleteAlert"
        dark
        text
        @click="turnOffAlarm"
      >
        Close
      </v-btn>
      <v-btn
        v-show="deleteAlert"
        dark
        text
        @click="deleteTask"
      >
        YES
      </v-btn>
      <v-btn
        v-show="deleteAlert"
        dark
        text
        @click="turnOffAlarm"
      >
        NO
      </v-btn>
    </v-snackbar>
    
  </div>
</template>

<script>
const config = require('../../../../server.config');

export default {
  name: 'addTask',
  props: {
      viewDetail: {
       type: Boolean,
       default: false
      },
      isEditMode: {
       type: Boolean,
       default: false
      },
      task: {
        taskId: {
          type: Number,
          default: 0
        },
        title: {
          type: String,
          default: ''
        },
        detail: {
          type: String,
          default: ''
        },
        startTime: {
          type: String,
          default: '12:00'
        },
        endTime: {
          type: String,
          default: '13:00'
        },
        category: {
          type: String,
          default: ''
        },
        state: {
          type: String,
          default: '예정'
        },
      },
      
  },
  data(){
    return {
      todayORtmr: 0,  // 0: today, 1: tmr
      // isEditMode: false,
      alertVisible: false, alertMsg:'', alertTime:5000,
      deleteAlert: false,
      valid: true,
      taskCategories: ['공부','약속'],
      titleRules: [
          v => !!v || '제목을 입력해주세요',
          v => v.length <= 20 || '20자 이내로 입력해주세요',
      ],
      endTimeRules: [
        v => v >= this.task.startTime || '시작시간보다 이릅니다'
      ]
    }
  },
  methods:{
    addTask(){
      if(this.task.title==''){
        this.alertMsg = "제목을 써주세요";
        this.alertVisible = true;
      }
      else if(this.task.category==''){
        this.alertMsg = "카테고리를 설정해주세요";
        this.alertVisible = true;
      }
      else if(!this.valid){
        this.alertMsg = "형식에 맞게 입력해주세요";
        this.alertVisible = true;
      }
      else {
        // 디비에 전송 후
        // MyTodayPage(parent)의 addTaskDialog를 false로 변경
        if(!this.isEditMode){  // 추가

          // req.body.(date, id, title, detail, startTime, endTime, category, state)
          this.$http.post(config.serverUrl()+'task/add', {
            date: this.todayORtmr,
            id: this.$session.get('id'),
            title: this.task.title,
            detail: this.task.detail,
            startTime: this.task.startTime,
            endTime: this.task.endTime,
            category: this.task.category,
            state: this.task.state
          })
            .then((result)=>{
              var data = result.data;
              console.log(data);
              if(data == "success"){
                alert("일정이 추가되었습니다");
                this.isEditMode = false;
                this.viewDetail = false;
                this.$emit('reloadList');
              }
              else if(data=="error"){
                alert("추가 실패");
              }
            })
            .catch((err)=>{
              console.log(err)
              alert(err)
            });

        }
        else {  // 수정
          // req.body.(title, detail, startTime, endTime, category, state, )
          this.$http.post(config.serverUrl()+'task/edit', {
            title: this.task.title,
            detail: this.task.detail,
            startTime: this.task.startTime,
            endTime: this.task.endTime,
            category: this.task.category,
            state: this.task.state,
            taskid: this.task.taskId
          })
            .then((result)=>{
              var data = result.data;
              console.log(data);
              if(data == "success"){
                alert("수정되었습니다");
                this.isEditMode = false;
                this.viewDetail = false;
                this.$emit('reloadList');
              }
              else if(data=="error"){
                alert("수정 실패");
              }
            })
            .catch((err)=>{
              console.log(err)
              alert(err)
            })

          this.isEditMode = false;
          this.viewDetail = false;
          alert("수정되었습니다");
        }
        this.$emit('close');
        this.clearAll();
      }
    },
    cancelAdding(){
      this.isEditMode = false;
      this.viewDetail = false;
      this.clearAll();
      this.$emit('close');
    },
    editTask(){
      if(!this.isEditMode){
        this.isEditMode = true;
        this.viewDetail = false;
        this.$emit('toEditMode');
      }
      else {
        this.addTask();
      }
    },
    deleteTask(){
      this.$http.get(config.serverUrl()+'task/delete/'+this.task.taskId)
            .then((result)=>{
              var data = result.data;
              console.log(data);
              if(data == 'success')
                alert('삭제하였습니다.');
              else 
                alert('실패하였습니다.');
              this.$emit('reloadList');
            })
            .catch((err)=>{
              console.log(err)
              alert(err)
            });
      this.$emit('close');
      this.turnOffAlarm();

    },
    showDltAlarm(){
      this.alertTime = 0;
      this.deleteAlert = true;
      this.alertMsg = "정말 삭제할까요?";
      this.alertVisible = true;
    },
    turnOffAlarm(){
      this.alertTime = 5000;
      this.deleteAlert = false;
      this.alertVisible = false;
    },
    clearAll(){
      this.task.taskId = 0;
      this.task.title = '';
      this.task.detail = '';
      this.task.startTime = '12:00';
      this.task.endTime = '13:00';
      this.task.category = '';
      this.task.state = '예정'
      this.valid = true;
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

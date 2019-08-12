<template>
  <div id="signup">

    <h2>회원가입</h2>
    <table id="signupTable">
      <tr>
        <td class="signup_td_colname" >
          <p>* ID</p>
        </td>
        <td>
          <v-text-field
              class="signup_td_detail"
              :value="userID"
              readonly
            ></v-text-field>
        </td>
      </tr>
      <tr>
        <td class="signup_td_colname" >
          <p>* 닉네임</p>
        </td>
        <td>
          <v-form
            lazy-validation 
            class="signup_td_detail"
            v-model="valid.nickName">
            <v-text-field
              v-model="userNickName"
              :rules="nickNameRules"
              :counter="12"
              required
            ></v-text-field>
          <v-btn @click="checkNickName()">중복확인</v-btn>
          </v-form>
        </td>
      </tr>
      <tr>
        <td class="signup_td_colname" >
          <p>* 생년월일</p>
        </td>
        <td>
          <v-form
            class="signup_td_detail"
            lazy-validation
            v-model="valid.birthDay">
          <v-text-field
              required
            v-model="userBirthday"
            :rules="birthDayRules"
            v-mask="mask"
            hint="(ex) 1997-03-25"></v-text-field>
          </v-form>
        </td>
      </tr>
      <tr>
        <td class="signup_td_colname" >
          <p>* 성별</p>
        </td>
        <td class="signup_td_detail" align="left">
          <v-btn-toggle v-model="userGender">
              <v-btn text value="M">
                남
              </v-btn>
              <v-btn text value="F">
                여
              </v-btn>
            </v-btn-toggle>
        </td>
      </tr>
      <tr>
        <td class="signup_td_colname" >
          <p>* 공부분야</p>
        </td>
        <td>
          <v-select
           class="signup_td_detail"
          v-model="userField"
          :items="fields"
          ></v-select>
        </td>
      </tr>
      <tr>
        <td class="signup_td_colname" >
          <p>* 하루 종료시간</p>
        </td>
        <td>
          <v-form
            class="signup_td_detail"
            lazy-validation
            v-model="valid.endTime">
            <v-text-field
              required
              v-model="userChangeDayTime"
              type="time"
              suffix="PST"
              :rules="changeDayTimeRules"
              hint="하루가 바뀌는 시간을 설정해주세요"
              persistent-hint
            ></v-text-field>
          </v-form>
        </td>
      </tr>
      <tr>
        <td class="signup_td_colname" >
          <p>다짐 한마디</p>
        </td>
        <td>
          <v-form
            class="signup_td_detail"
            lazy-validation
            v-model="valid.saying">
            <v-text-field
                v-model="userSaying"
                :rules="sayingRules"
                :counter="50"
              ></v-text-field>
          </v-form>
        </td>
      </tr>
    </table>

    <div>
      <v-btn v-on:click="submit">Sign Up</v-btn>
      <v-btn v-on:click="clickCancel">Cancel</v-btn>
    </div>

    <v-snackbar
      v-model="alertVisible"
      :timeout="alertTimeout"
      :color="alertColor"
      top
    >
      {{ alertMsg }}
      <v-btn
        v-if="alertType=='error'"
        dark
        text
        @click="alertVisible = false"
      >
        Close
      </v-btn>
        <v-btn
        v-if="alertType=='cancel'"
        dark
        text
        @click="cancel"
      >
        YES
      </v-btn>
      <v-btn
        v-if="alertType=='cancel'"
        dark
        text
        @click="alertVisible = false"
      >
        NO
      </v-btn>
    </v-snackbar>
  </div>
</template>

<script>
import { mask } from 'vue-the-mask'

export default {
  name: 'signup',
  components: {
  },
  directives: {
      mask,
  },
  data() {
    return {
      alertVisible: false, alertTimeout:0,
      alertMsg:'', alertColor:'error', alertType: 'error',
      today: new Date(),
      valid: {
        'nickName':false,
        'birthDay':false,
        'endTime':false,
        'saying':false
      },
      mask: 'XXXX-XX-XX',
      userID: 'wjddusdl11@ajou.ac.kr',
      userNickName: '',
      userBirthday: '',
      userGender: '',
      userField: '',
      userChangeDayTime: '02:00',
      userSaying: '',
      fields: ['학교공부','취준','자격증','고시공부','기타'],
      nickNameRules: [
          v => !!v || '닉네임을 입력해주세요',
          v => v.length <= 12 || '1글자 이상 12글자 이하만 가능합니다',
      ],
      birthDayRules: [
        v => v.length == 10 || '생년월일을 입력해주세요',
        v => v.substr(0,4) <= this.today.getFullYear() || '잘못된 날짜입니다',
        v => v.substr(0,4) >= 1900 || '잘못된 날짜입니다',
        v => v.substr(5,2) <= 12 || '잘못된 날짜입니다',
        v => v.substr(8,2) <= 31 || '잘못된 날짜입니다'
      ],
      changeDayTimeRules: [
        v => (v >= '20:00'|| v<='06:00') || '오후 8시에서 오전 6시 사이로 입력해주세요'
      ],
      sayingRules: [
        v => v.length <= 50 || '50글자 이하로 작성해주세요'
      ]

    }
  },
  methods:{
    checkNickName(){
      // 닉네임 중복 체크

      this.alertMsg = "이미 존재하는 닉네임입니다.";
      this.alertColor = "error"; this.alertTimeout = 5000;
      this.alertType = "error";
      this.alertVisible = true; 
    },
    validateForm(){

      // 입력 형식 오류 체크
      var checkVali = true;
      for(var v in this.valid){
        if(this.valid[v] == false)
          checkVali = false;
      }

      // 빈칸 체크
      if(this.userNickName==''||this.userBirthday==''||this.userGender==''||this.userField==''){
        this.alertMsg = "필수 항목(*)을 모두 채워주세요.";
        this.alertColor = "error"; this.alertTimeout = 5000;
        this.alertType = "error";
        this.alertVisible = true;
        return false;
      }
      else if(!checkVali){
        this.alertMsg = "형식에 맞게 입력해주세요.";
        this.alertColor = "error"; this.alertTimeout = 5000;
        this.alertType = "error";
        this.alertVisible = true; 
        return false;
      }
      else 
        return true;
    },
    submit(){
      var checkVali = this.validateForm();
      if(checkVali){
        // 서버로 올리고 /register/login으로 redirects
        // then 써서 가입완료 alert 띄우기
        alert("가입이 완료되었습니다.");
        window.location.href = "http://localhost:8080/register/login"
      }
    },
    clickCancel(){
        this.alertMsg = "회원가입을 취소할까요?";
        this.alertColor = "warning"; this.alertTimeout = 0;
        this.alertType = "cancel";
        this.alertVisible = true;
    },
    cancel(){
      this.alertVisible = false; 
      window.location.href = "http://localhost:8080/register/login"
    }
  }
}
</script>

<style>
#signup {
  text-align: center;
  margin-top: 50px;
}

#signupTable {
  margin-top: 50px;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 30px;
  width: 70%;
}

.signup_td_colname {
  width: 150px;
  text-align: right;
}

.signup_td_detail {
  width:500px;
  padding-left: 50px;
}
</style>

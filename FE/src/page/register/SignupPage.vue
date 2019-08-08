<template>
  <div id="signup">
    <h2>회원가입</h2>
    <p v-show="valid.nickName">valid</p>
    <p v-show="!valid.nickName">not valid</p>
    <p>{{ userField }}</p>
    <table id="signupTable">
      <tr>
        <td class="signup_td_colname" >
          <p>* ID</p>
        </td>
        <td class="signup_td_detail">
          <v-text-field
              :value="userID"
              readonly
            ></v-text-field>
        </td>
      </tr>
      <tr>
        <td class="signup_td_colname" >
          <p>* 닉네임</p>
        </td>
        <td class="signup_td_detail">
          <v-form
            lazy-validation
            v-model="valid.nickName">
            <v-text-field
              v-model="userNickName"
              :rules="nickNameRules"
              :counter="12"
              required
            ></v-text-field>
          </v-form>
        </td>
      </tr>
      <tr>
        <td class="signup_td_colname" >
          <p>* 생년월일</p>
        </td>
        <td class="signup_td_detail">
          <v-form
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
        <td class="signup_td_detail">
          <v-select
          v-model="userField"
          :items="fields"
          ></v-select>
        </td>
      </tr>
      <tr>
        <td class="signup_td_colname" >
          <p>* 하루 종료시간</p>
        </td>
        <td class="signup_td_detail">
          <v-form
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
        <td class="signup_td_detail">
          <v-form
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
      <v-btn>Cancel</v-btn>
    </div>
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
    validateForm(){

      // 입력 형식 오류 체크
      var checkVali = true;
      for(var v in this.valid){
        if(this.valid[v] == false)
          checkVali = false;
      }

      // 빈칸 체크
      if(this.userNickName==''||this.userBirthday==''||this.userGender==''||this.userField==''){
        console.log(this.userNickName);
        console.log(this.userBirthday);
        console.log(this.userGender);
        console.log(this.userField);
        alert("필수 항목(*)을 모두 채워주세요.");
        return false;
      }
      else if(!checkVali){
        alert("형식에 맞게 입력해주세요.");
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
      }
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
  width: 80%;
}

.signup_td_colname {
  width: 150px;
  text-align: right;
}

.signup_td_detail {
  padding-left: 50px;
  padding-right: 50px;
}
</style>

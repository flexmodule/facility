<template>
  <div class="reg">
    <div class="head">
      <h3>账户注册</h3>
    </div>
    <div class="main">
      <mt-field label="手机号码" placeholder="请输入手机号" type="tel" v-model="phone"></mt-field>
      <mt-field label="验证码" placeholder="验证码" v-model="yzm">
        <span class="btn-yzm" @click="btnyzm()" v-if="getyzm">获取验证码</span>
        <span class="btn-yzm1" v-if="!getyzm">重新获取{{num}}s</span>
      </mt-field>
      <mt-field label="输入密码" placeholder="请输入8-20位包含数字和字母的密码" type="password" v-model="password"></mt-field>
      <mt-field label="确认密码" placeholder="请输入确认密码" type="password" v-model="password1"></mt-field>
    </div>
    <div class="foot">
      <div class="dagou">
        <input type="checkbox" :checked="checked" class="check" @click="check()">
        <span>我已阅读并同意的注册协议</span>
      </div>
      <button class="btn" @click="btn()">立即注册</button>
    </div>
    <router-link to='/login' tag='p'>
        已有账号，去登录
    </router-link>
  </div>
</template>

<script>
import { getValidateCode,register } from '@/api/getdata'
import { Toast } from 'mint-ui'
export default {
  data () {
    return {
      phone:'',
      yzm:'',
      password:'',
      password1:'',
      checked:'checked',
      getyzm:true,
      num:''
    }
  },
  methods: {
    btnyzm(){
      this.getyzm = false;
      this.num=60;
      var auth_timetimer =  setInterval(()=>{
          this.num--;
          if(this.num<=0){
              this.getyzm = true;
              clearInterval(auth_timetimer);
          }
      }, 1000);
      console.log(2)
      let params={};
      params = {
        usPhone:this.phone
      }
      getValidateCode(params).then((res) => {

        console.log(res)
      })
    },
    check(){
      this.checked=this.checked=='checked'?'':'checked';
    },
    btn(){
      
    //   var reg = /^[\u4e00-\u9fff\w]{1,16}$/;//要求1-16位由字母、数字、_或汉字组成
    //   if(reg.test(this.username)){

        var mPattern = /^((13[0-9])|(14[5|7])|(15([0-3]|[5-9]))|(18[0,5-9]))\d{8}$/; //手机号
        if(mPattern.test(this.phone)){

          if(this.yzm!=''){//验证码

            var mm=/^(\w){8,20}$/;
            if(mm.test(this.password)){//密码

              if(this.password1===this.password){

                if(this.checked==''){//是否打钩
                  Toast('请同意注册协议!')
                }else{
                  let params={};
                  params = {
                    usPhone:this.phone,
                    usVcode:this.yzm,
                    usPwd:this.password
                  }
                  register(params).then((res) => {
                    console.log(res)

                    if(res.result){
                      this.$router.push('/login')
                    }

                  })
                }
                
              }else{
                Toast('请正确输入确认密码!')
              }

            }else{
              Toast('请正确输入密码!')
            }

          }else{
            Toast('请正确输入验证码!')
          }
          
        }else{
          Toast('请正确输入手机号!')
        }

    //   }else{
    //     Toast('请正确输入用户名!')
    //   }

    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.reg{
  height:100vh;
  background: #fff;
  .head{
    height: 2.4rem;
    text-align: center;
    line-height: 2.4rem;
    margin-bottom: .2rem;
    h3{
      font-size: .45rem;
    }
  }
  .main{
    width: 90%;
    margin: 0 auto;
    .btn-yzm{
      color: #26a2ff;
      padding: .02rem .05rem;
      border: .01rem solid #26a2ff;
    }
    .btn-yzm1{
      color: #94d1ff;
      padding: .02rem .05rem;
      border: .01rem solid #94d1ff;
    }
  }
  .foot{
    width: 90%;
    margin: 0 auto;
    margin-top: .4rem;
    .dagou{
      margin-bottom: .1rem;
      overflow: hidden;
      input{
        height: .32rem;
        width: .32rem;
        float: left;
        margin-right: .05rem;
      }
      span{
        float: left;
      }
    }
    .btn{
        width: 100%;
        height: .91rem;
        background: #26a2ff;
        color: #fff;
        border: 0;
        outline:none;
        margin: .5rem 0;
        border-radius: .09rem;
        font-size: .3rem;
    }
  }
}
.reg>p{
    color: #26a2ff;
    text-align: center;
    font-size: .28rem;
    margin-top: 1rem;
    cursor: pointer;
}
</style>
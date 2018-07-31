<template>
  <div class="zhaopass">
    <div class="head">
      <i @click="tolg()">&lt;</i>
      <h3>找回密码</h3>
    </div>
    <div class="main">
      <p><input placeholder="请输入手机号" type="tel" v-model="phone"></p>
      <p class="yzm">
        <input placeholder="输入手机验证码" v-model="yzm">
        <span class="btn-yzm" @click="btnyzm()" v-if="getyzm">获取验证码</span>
        <span class="btn-yzm1" v-if="!getyzm">重新获取{{num}}s</span>
      </p>
      <p><input placeholder="设置新密码" type="password" v-model="password"></p>
      <p><input placeholder="再次确认新密码" type="password" v-model="password1"></p>
    </div>
    <div class="foot">
      <button class="btn" @click="btn()">确 定</button>
    </div>
  </div>
</template>

<script>
import { getValidateCode,forgetpwd } from '@/api/getdata'
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
    tolg(){
      this.$router.push('/login')
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

                // if(this.checked==''){//是否打钩
                //   Toast('请同意注册协议!')
                // }else{
                  let params={};
                  params = {
                    usPhone:this.phone,
                    usVcode:this.yzm,
                    usPwd:this.password
                  }
                  forgetpwd(params).then((res) => {
                    console.log(res)

                    if(res.result){
                      this.$router.push('/login')
                    }

                  })
                // }
                
              }else{
                Toast('请正确输入确认密码!')
              }

            }else{
              Toast('请正确输入8-20位包含数字和字母的密码!')
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
.zhaopass{
  .head{
    height: .88rem;
    text-align: center;
    line-height: .88rem;
    margin-bottom: .2rem;
    border-bottom: 1px solid #d9d9d9;
    background: #f9f9f9;
    position: relative;
    i{
      position: absolute;
      left: .25rem;
      font-size: .4rem;
    }
    h3{
      font-size: .33rem;
      font-weight: 400;
    }
  }
  .main{
    background: #fff;
    border-top: 1px solid #d9d8d9;
    p{
      height: .88rem;
      border-bottom: 1px solid #d9d8d9;
      input{
        height: .88rem;
        width: 100%;
        border: 0;
        outline: none;
        margin-left: .3rem;
      }
    }
    .yzm{
      position: relative;
    }
    .btn-yzm{
      position: absolute;
      right: .3rem;
      top: .25rem;
      color: #26a2ff;
      padding: .02rem .05rem;
      border: .01rem solid #26a2ff;
    }
    .btn-yzm1{
      position: absolute;
      right: .3rem;
      top: .25rem;
      color: #94d1ff;
      padding: .02rem .05rem;
      border: .01rem solid #94d1ff;
    }
  }
  .foot{
    width: 90%;
    margin: 0 auto;
    margin-top: .4rem;
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
</style>
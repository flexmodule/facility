<template>
  <div class="login">
    <div class="head">
      <h3>账户登录</h3>
    </div>
    <div class="main">
      <mt-field label="手机号" placeholder="请输入手机号" type="tel" v-model="phone"></mt-field>
      <mt-field label="密 码" placeholder="请输入密码" type="password" v-model="password"></mt-field>
    </div>
    <div class="foot">
      <!-- <mt-button type="primary" @click="btn()">登 录</mt-button> -->
      <button class="btn" @click="btn()">登 录</button>
      <p><i @click="reg()">立即注册</i><em @click="pass()">忘记密码？</em></p>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { login } from '@/api/getdata'
import { Toast } from 'mint-ui'
export default {
  data () {
    return {
      phone:'',
      password:''
    }
  },
  methods: {
    btn(){
      console.log(1)
      let params={};
      params = {
        usPhone:this.phone,
        usPwd:this.password
      }
      login(params).then((res) => {
        console.log(res)
        if(res.result){
          localStorage.setItem('userInfo', JSON.stringify(res))
          this.$router.push('/home')
        }else{
          Toast(res.msg)
        }
      })
      // const res = await login(params)
    },
    reg(){
      this.$router.push('/reg')
    },
    pass(){
      this.$router.push('/zhaopass')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.login{
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
  }
  .foot{
    width: 90%;
    margin: 0 auto;
    margin-top: 40px;
    .btn{
        width: 100%;
        height: .91rem;
        background: #26a2ff;
        color: #fff;
        border: 0;
        outline:none;
        margin: .3rem 0;
        border-radius: .09rem;
        font-size: .3rem;
    }
    p{
      margin-top: 15px;
      padding: 0 15px;
      overflow: hidden;
      i{
        float: left;
        color: #26a2ff;
      }
      em{
        float: right;
        color: #999;
      }
    }
  }
}
</style>
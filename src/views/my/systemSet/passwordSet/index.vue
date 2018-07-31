<template>
  <div class="passwordSet">
    <div class="title">
      <i @click="switchMy">&lt;</i>
      <span>修改密码</span>
    </div>
    <div class="passwordSet-b">
      <div class="passwordSet-b-child">
        <p>
          <input type="password" placeholder="原始密码" v-model="initalPass">
        </p>
      </div>
      <div class="passwordSet-b-child">
        <p>
          <input type="password" placeholder="新密码" v-model="newPass">
        </p>
      </div>
      <div class="passwordSet-b-child">
        <p>
          <input type="password" placeholder="确认密码" v-model="surePass">
        </p>
      </div>
    </div>
    <div class="sureSubmit">确定</div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        initalPass: "",
        newPass: "",
        surePass: ""
      };
    },
    methods: {
      switchMy() {
        this.$router.push("/systemSet");
      }
    }
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
  .passwordSet {
    background: #f2f6f8;
    min-height: 100vh;
  }
  .title {
    background: #f9f9f9;
    text-align: center;
    margin-bottom: .1rem;
    i {
      float: left;
      margin-left: .3rem;
      font: 0.4rem/.86rem "";
    }
    span {
      display: inline-block;
      font: .3rem/.86rem "";
    }
  }
  .passwordSet-b {
    border-top: 0.01rem solid #eeeeee;
    border-bottom: 0.01rem solid #eeeeee;
    background: #fff;
    .passwordSet-b-child {
      p {
        
        height: .86rem;
        flex: 1;
        margin-left: .3rem;
        border-bottom: 0.01rem solid #eeeeee;
        input {
          display: block;
          font: 0.26rem/.84rem "";
          border: 0;
          &:focus {
            outline: none;
          }
        }
      }
    }
  }
  .passwordSet-b {
    .systemSet-b-child {
      &:nth-child(2) {
        p {
          border: 0;
        }
      }
    }
  }
  .sureSubmit {
    font: .3rem/.92rem "";
    background: #139ceb;
    text-align: center;
    color: #fff;
    border-radius: .05rem;
    margin: .8rem auto;
    width: 7.02rem;
  }
</style>
<template>
  <div class="mydataSet">
    <div class="title">
      <i @click="switchMy">&lt;</i>
      <span>个人信息</span>
    </div>
    <div class="mydataSet-b">
      <div class="mydataSet-b-child">
        <p class="clearfix">
          <span>手机号</span>
          <b>{{tel}}</b>
        </p>
      </div>
      <div class="mydataSet-b-child">
        <p class="clearfix">
          <span>身份认证</span>
          <b>
            <i>
              <span class="name">{{name}}</span>
              <span class="identify">{{identify}}</span>
            </i>
            <em class="arrow" @click="myIdentify">&gt;</em>
          </b>
        </p>
      </div>
      <div class="mydataSet-b-child">
        <p class="clearfix">
          <span>绑定付款方式</span>
          <b class="arrow" @click="bindPayMoney">&gt;</b>
        </p>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        name: "张三",
        identify: "未认证",
        tel: ""
      };
    },
    methods: {
      switchMy() {
        this.$router.push("/my");
      },
      myIdentify() {

      },
      bindPayMoney() {

      }
    }
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
  .mydataSet {
    background: #f2f6f8;
    min-height: 100vh;
  }
  .title {
    font: .3rem/.86rem "";
    background: #f9f9f9;
    text-align: center;
    margin-bottom: .1rem;
    border-bottom: 0.01rem solid #eeeeee;
    i {
      float: left;
      margin-left: .3rem;
      font: 0.4rem/.86rem "";
    }
  }
  .mydataSet-b {
    border-top: 0.01rem solid #eeeeee;
    border-bottom: 0.01rem solid #eeeeee;
    background: #fff;
    .mydataSet-b-child {
      p {
        height: .86rem;
        font: .3rem/.84rem "";
        flex: 1;
        margin-left: .3rem;
        border-bottom: 0.01rem solid #eeeeee;
        .arrow {
          float: right;
          font: .4rem/.84rem "";
        }
        b {
          float: right;
          margin-right: .3rem;
          i {
            .identify {
              font: .18rem/.24rem "";
              border: .01rem solid #ff424d;
              padding: 0 .01rem;
              color: #ff424d;
              margin: 0 .08rem 0 .12rem;
            }
          }
        }
      }
    }
  }
  .mydataSet-b {
    .mydataSet-b-child {
      &:nth-child(3) {
        p {
          border: 0;
        }
      }
    }
  }
</style>
<template>
  <div class="recharge">
    <header>
      <i @click="switchMy">&lt;</i>
      <span>充值</span>
      <b>充值记录</b>
    </header>
    <section>
      <div class="rechargeMoney">
        <h3>充值金额</h3>
        <div class="inputMoney">
          <input type="number" v-model="money">
          <span>元</span>
        </div>
        <p>
          <input type="button" value="1000" @click.prevent="selectMoney($event)" :class="money==1000?'active':''">
          <input type="button" value="2000" @click.prevent="selectMoney($event)" :class="money==2000?'active':''"> 
          <input type="button" value="5000" @click.prevent="selectMoney($event)" :class="money==5000?'active':''">
          <input type="button" value="10000" @click.prevent="selectMoney($event)" :class="money==10000?'active':''">
        </p>
      </div>
      <div class="payMoney">
        <h3>付款方式</h3>
        <ul>
          <li @click="alipay">
            <i><img src="~@/assets/img/alipay.png" alt=""></i>
            <span>支付宝</span>
            <b :class="payIndex==1?'active':''"></b>
          </li>
          <li @click="wechat">
            <i><img src="~@/assets/img/wechat.png" alt=""></i>
            <span>微信支付</span>
            <b :class="payIndex==2?'active':''"></b>
          </li>
          <li @click="bankpay">
            <i><img src="~@/assets/img/bank.png" alt=""></i>
            <span>银联支付</span>
            <b :class="payIndex==3?'active':''"></b>
          </li>
        </ul>
        <div class="other">
          <i><img src="~@/assets/img/plus.png" alt=""></i>
          <span>其他方式</span>
        </div>
      </div>
    </section>
    <footer @click="rechargeSure">确定</footer>
    <div class="shadow" v-if="rechargeMess">
      <div class="alertBox">
        <i @click="closeMess"><img src="~@/assets/img/close.png" alt=""></i>
        <div class="alertBox-t">
          <img src="~@/assets/img/success.png" alt="" v-if="isSuccess">
          <img src="~@/assets/img/fail.png" alt="" v-else>
        </div>
        <div class="alertBox-c">
          <div v-if="isSuccess">
            <h3>充值成功</h3>
            <p>您已成功充值<span>{{rechargeNum}}元</span>,预计10分钟到账</p>
          </div>
          <div v-else>
            <h3>充值失败</h3>
            <p>充值失败，请返回重新充值</p>
          </div>
        </div>
        <div class="alertBox-b" @click="iKnow">我知道了</div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      money: "",
      payIndex: "",
      isSuccess: true,
      rechargeNum: 100,
      rechargeMess: false
    };
  },
  methods: {
    switchMy() {
      this.$router.push("/my")
    },
    selectMoney(e) {
      this.money=e.target.value
    },
    alipay() {
      this.payIndex=1
    },
    wechat() {
      this.payIndex=2
    },
    bankpay() {
      this.payIndex=3
    },
    rechargeSure() {
      this.rechargeMess=true;
    },
    iKnow() {
      this.rechargeMess=false;
    },
    closeMess() {
      this.rechargeMess=false;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.recharge {
  background: #f2f6f8;
  min-height: 100vh;
  header {
    border-bottom: .01rem solid #dddddd;
    text-align: center;
    background: #f9f9f9;
    span {
      display: inline-block;
      font: .32rem/.86rem "";
    }
    i {
      float: left;
      font: .42rem/.86rem "";
      margin-left: .24rem;
    }
    b {
      float: right;
      margin-right: .28rem;
      color: #606064;
      font: .32rem/.86rem "";
    }
  }
  section {
    .rechargeMoney {
      padding: .28rem .52rem .55rem;
      background: #fff;
      margin: .2rem 0;
      h3 {
        font: .26rem/.26rem "";
      }
      .inputMoney {
        input {
          border: 0;
          font: .24rem/.5rem "";
          padding-left: .04rem;
          &:focus {
            outline: none;
          }
        }
        span {
          float: right;
          font: .24rem/.5rem "";
        }
        border-bottom: .01rem solid #afafaf;
        margin: .23rem 0 .38rem 0;
      }
      p {
        font-size: 0;
        input {
          width: 1.4rem;
          font: .2rem/.56rem "";
          text-align: center;
          border: .01rem solid #9d9d9d;
          background: #fff;
          color: #666;
          border-radius: .06rem;
          margin-right: .15rem;
          &:focus {
            outline: none;
          }
          &:nth-child(1) {
            margin-left: .1rem;
          }
          &:nth-child(4) {
            margin-right: 0;
          }
        }
         .active {
          color: #fff;
          background: #159beb;
          border: 0;
        }
      }
    }
    .payMoney {
      padding: .18rem .38rem .02rem;
      background: #fff;
      h3 {
        font: .26rem/.48rem "";
      }
      ul {
        li {
          border-bottom: .01rem solid #d2d2d2;
          i {
            width: .65rem;
            height: .65rem;
            margin-top: .14rem;
            float: left;
            img {
              width: 100%;
            }
          }
          span {
            display: inline-block;
            margin-left: .16rem;
            font: .26rem/.94rem "";
          }
          b {
            margin-top: .34rem;
            float: right;
            width: .45rem;
            height: .45rem;
          }
          .active {
            background: url("~@/assets/img/selected.png") no-repeat;
            background-size: cover;
          }
        }
      }
      .other {
        i {
          width: .65rem;
          height: .65rem;
          margin-top: .14rem;
          float: left;
          img {
            width: 100%;
          }
        }
        span {
          display: block;
          margin-left: .68rem;
          font: .26rem/.94rem "";
        }
      }
    }
  }
  footer {
    width: 7.02rem;
    font: .32rem/.92rem "";
    background: #139ceb;
    color: #fff;
    text-align: center;
    margin: 1.34rem auto;
    border-radius: .06rem;
  }
  .shadow {
    background: rgba(0,0,0,.1);
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    z-index: 5;
    .alertBox {
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      margin: auto;
      padding: .69rem .66rem .60rem;
      width: 6.02rem;
      height: 6.16rem;
      box-sizing: border-box;
      border-radius: .1rem;
      background: #fff;
      i {
        width: .4rem;
        height: .4rem;
        position: absolute;
        right: .24rem;
        top: .24rem;
        img {
          width: 100%;
        }
      }
      .alertBox-t {
        width: 2rem;
        height: 2rem;
        margin: 0 auto;
        img {
          width: 100%;
        }
      }
      .alertBox-c {
        margin: .32rem 0 .42rem 0; 
        text-align: center;
        h3 {
          font: .34rem/.74rem "";
          color: #5b5b5b;
        }
        p {
          span {
            color: #fa3838;
          }
          font: .26rem/.66rem "";
          color: #878787;
        }
      }
      .alertBox-b {
        width: 3rem;
        font: .28rem/.9rem "";
        color: #fff;
        background: #139ceb;
        text-align: center;
        border-radius: .4rem;
        margin: 0 auto;
      }
    }
  }
  
}
</style>
<template>
  <div class="withdrawCash">
    <header>
      <i @click="switchMy">&lt;</i>
      <span>提现</span>
      <b>提现记录</b>
    </header>
    <section>
      <div class="useMoney">
        <span>账户可用资金：</span>
        <span>{{useMoney}}</span>
      </div>
      <div class="withdrawCashMoney">
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
      <div class="withdrawCashWay">
        <div class="commonBank">到账银行卡</div>
        <div class="commonBank">
          <p class="bankCardActive">{{bankCard}}</p>
          <p>(预计2小时到账)</p>
        </div>
      </div>
    </section>
    <footer @click="withdrawCashSure">确定</footer>
    <div class="shadow" v-if="withdrawCashMess">
      <div class="alertBox">
        <i @click="closeMess"><img src="~@/assets/img/close.png" alt=""></i>
        <div class="alertBox-t">
          <img src="~@/assets/img/success.png" alt="" v-if="isSuccess">
          <img src="~@/assets/img/fail.png" alt="" v-else>
        </div>
        <div class="alertBox-c">
          <div v-if="isSuccess">
            <h3>提现成功</h3>
            <p>您已成功提现<span>{{withdrawCashNum}}元</span>,预计2小时到账</p>
          </div>
          <div v-else>
            <h3>提现失败</h3>
            <p>提现失败，请返回重新提现</p>
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
      withdrawCashNum: 100,
      withdrawCashMess: false,
      useMoney: 100,
      bankCard: "工商银行（12345）"
    };
  },
  methods: {
    switchMy() {
      this.$router.push("/my")
    },
    selectMoney(e) {
      this.money=e.target.value
    },
    withdrawCashSure() {
      this.withdrawCashMess=true;
    },
    iKnow() {
      this.withdrawCashMess=false;
    },
    closeMess() {
      this.withdrawCashMess=false;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.withdrawCash {
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
    .useMoney {
      display: flex;
      justify-content: space-between;
      padding: 0 .2rem;
      margin-bottom: .2rem;
      background: #fff;
      span {
        font: .3rem/.8rem "";
        &:nth-child(2) {
          color: #ff424d;
        }
      }
    }
    .withdrawCashMoney {
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
    .withdrawCashWay {
      display: flex;
      padding: .26rem .24rem;
      background: #fff;
      justify-content: space-between;
      .commonBank {
        font: .26rem/.4rem "";
        .bankCardActive {
          color: #1075b1;
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
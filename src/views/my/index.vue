<template>
  <div class="my">
    <header>
      <div class="my-t">
        <span>我的</span>
        <i class="sysicon" @click="setSwitch"><img src="~@/assets/img/sysset.png" alt=""></i>
      </div>
      <div class="my-c clearfix" @click="switchMySet">
        <i><img src="~@/assets/img/headimage.png" alt=""></i>
        <span>18752782297</span>
        <b>&gt;</b>
      </div>
      <div class="my-b">
        <div class="myfund">
          <span>{{fundDetail.profit}}</span>
          <p>浮动盈亏</p>
        </div>
        <div class="myfund">
          <span>{{fundDetail.balance}}</span>
          <p>可用资产</p>
        </div>
        <div class="myfund">
          <span>{{fundDetail.totalAsset}}</span>
          <p>全部资产</p>
        </div>
      </div>
    </header>
    <section>
      <div class="sec-t">
        <div class="sec-t-child">
          <i><img src="~@/assets/img/money.png" alt=""></i>
          <p @click="recharge">
            <span>充值</span>
            <b>&gt;</b>
          </p>
        </div>
        <div class="sec-t-child" @click="withdrawCash">
          <i><img src="~@/assets/img/cash.png" alt=""></i>
          <p>
            <span>提现</span>
            <b>&gt;</b>
          </p>
        </div>
      </div>
      <div class="sec-b">
        <div class="sec-b-child">
          <i><img src="~@/assets/img/fund.png" alt=""></i>
          <p @click="switchFund">
            <span>资金明细</span>
            <b>&gt;</b>
          </p>
        </div>
        <div class="sec-b-child" @click="messageCenter">
          <i><img src="~@/assets/img/news.png" alt=""></i>
          <p>
            <span>消息中心</span>
            <b>&gt;</b>
          </p>
        </div>
        <div class="sec-b-child">
          <i><img src="~@/assets/img/quit.png" alt=""></i>
          <p>
            <span>退出登录</span>
            <b>&gt;</b>
          </p>
        </div>
      </div>
    </section>
    <footer>
      <router-link to='/home' tag='span'>
          <img src="~@/assets/img/2_01.png">
          <i>首页</i>
      </router-link>
      <router-link to='/deal' tag='span'>
          <img src="~@/assets/img/2_02.png">
          <i>交易</i>
      </router-link>
      <router-link to='/order' tag='span'>
          <img src="~@/assets/img/2_03.png">
          <i>订单</i>
      </router-link>
      <router-link to='/my' tag='span'>
          <img src="~@/assets/img/1_04.png">
          <i>我的</i>
      </router-link>
    </footer>
  </div>
</template>
<script>
import { ceshi,fundTotalList,fundDetail } from "@/api/getdata.js";
export default {
  data () {
    return {
      fundDetail: {},
    }
  },
  mounted() {
    this.getFundDetail();
  },
  methods: {
    getFundDetail() {
      fundDetail({}).then(res=>{
        if(res.result==true) {
          this.fundDetail=res.data;
        }
      })
    },
    setSwitch() {
      this.$router.push("/systemSet")
    },
    switchMySet() {
      this.$router.push("/mydata")
    },
    recharge() {
      this.$router.push("/recharge")
    },
    switchFund() {
      this.$router.push("/fundlist")
    },
    withdrawCash() {
      this.$router.push("/withdrawCash")
    },
    messageCenter() {
      this.$router.push("/messageCenter")
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.my {
  display: flex;
  flex-direction: column;
  height:100vh;
  header {
    position: relative;
    height: 4rem;
    background: -webkit-linear-gradient(left, #01a9ff , #0088ff); 
    background: -o-linear-gradient(left, #01a9ff,#0088ff); 
    background: -moz-linear-gradient(left, #01a9ff, #0088ff); 
    background: linear-gradient(left, #01a9ff , #0088ff); 
    text-align: center;
    .my-t {
      font: .32rem/.32rem "";
      color: #fff;
      padding: .27rem 0;
    }
    .sysicon {
      float: right;
      width: .44rem;
      height: .44rem;
      color: #fff;
      margin-right: .25rem;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .my-c {
      padding: .18rem 0 .31rem 0;
      font-size: 0;
      i {
        width: 1.2rem;
        height: 1.2rem;
        margin-left: .24rem;
        float: left;
        img {
          width: 100%;
          height: 100%;
        }
      }
      span {
        font: .25rem/1.2rem "";
        float: left;
        color: #fff;
        vertical-align: middle;
        margin-left: .32rem;
      }
      b {
        font: 100 .4rem/1.2rem "";
        color: #fff;
        float: right;
        margin-right: .26rem;
      }
    }
    .my-b {
      position: absolute;
      bottom: 0;
      width: 100%;
      display: flex;
      color: #fff;
      padding: .32rem 0 .29rem 0;
      background: rgba(0,0,0,.1);
      .myfund {
        flex: 1;
        border-right: .01rem solid #fff;
        &:nth-child(3) {
          border: 0;
        }
      }
      span {
        display: block;
        font: .3rem/.3rem "";
      }
      p {
        margin-top: .16rem;
        font: .24rem/.24rem ""; 
      }
    }
  }
  section {
    background: #f2f2f2;
    flex: 1;
    overflow: auto;
    .sec-t {
      margin: .2rem 0;
    }
    .sec-t,.sec-b {
      border-top: .01rem solid #eeeeee;
      border-bottom: .01rem solid #eeeeee;
      background: #fff;
      .sec-t-child,.sec-b-child {
        display: flex;
        i {
          font-size: 0;
          margin: 0 .3rem;
          margin-top: .18rem;
          width: .48rem;
          height: .48rem;
          img {
            width: 100%;
          }
        }
        p {
          font: .3rem/.86rem "";
          flex: 1;
          border-bottom: .01rem solid #eeeeee;
          b {
            float: right;
            margin-right: .29rem;
            font: .4rem/.86rem "";
            color: #c7c7cb;
          }
        }
      }
    }
    .sec-t {
      .sec-t-child {
        &:nth-child(2) {
          p {
            border: 0;
          }
        }
      }
    }
    .sec-b {
      .sec-b-child {
        &:nth-child(3) {
          p {
            border: 0;
          }
        }
      }
    }
  }
  footer {
    background: #fff;
    border-top: .01rem solid rgb(173, 173, 173);
    height: .98rem;
    text-align: center;
    overflow: hidden;
    color: rgb(145, 145, 145);
    span {
      float: left;
      width: 25%;
      height: .77rem;
      img {
        display: block;
        margin: .11rem auto 0;
        height: .44rem;
      }
      i {
        display: block;
        font: .24rem/.43rem "";
      }
    }
    span:nth-child(4) {
      i {
          color: #159beb;
      }
    }
  }
}
</style>
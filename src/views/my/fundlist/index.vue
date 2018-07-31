<template>
  <div class="fundList">
    <div class="fundList-child" v-show="detailShow">
      <section>
        <div class="nav clearfix">
          <i @click="switchMy">&lt;</i>
          <mt-button size="small" @click.native.prevent="totalFund" :class="buttonIndex==1?'active':''">全部</mt-button>
          <mt-button size="small" @click.native.prevent="pay" :class="buttonIndex==2?'active':''">支出</mt-button>
          <mt-button size="small" @click.native.prevent="income" :class="buttonIndex==3?'active':''">收入</mt-button>
        </div>
        <div class="page-tab-container">
          <mt-tab-container class="page-tabbar-tab-container">
            <mt-tab-container-item class="totalFund" v-show="buttonIndex==1?fundListShow:!fundListShow">
              <ul v-infinite-scroll="loadMore"
                infinite-scroll-disabled="loading"
                infinite-scroll-distance="40"
                :infinite-scroll-immediate-check="true">
                <li v-for="(item,index) in totalFundListData" :key="index" @click="toDetail(item.blId,item.blOrdertype,item.blOrderAmount,item.blOrderpay,item.blUblanceed,item.blCreatetime)">
                  <div class="li-c">
                    <p>
                      <span class="blueActive">{{item.blOrderAmount>=0?'+'+item.blOrderAmount:item.blOrderAmount}}</span>
                      <span>{{blOrderType(item.blOrdertype)}}</span>
                    </p>
                    <p>
                      <span class="blackActivce">余额:{{item.blUblanceed}}</span>
                      <span>{{item.blCreatetime}}</span>
                    </p>
                  </div>
                </li>
              </ul>
              <div class="loading-box" v-if="isLoading">
                <mt-spinner type="snake" class="loading-more"></mt-spinner>
                <span class="loading-more-txt">加载中...</span>
              </div>
              <div class="no-more" v-if="noMore">没有更多了~</div>
            </mt-tab-container-item>
            <mt-tab-container-item class="pay" v-show="buttonIndex==2?fundListShow:!fundListShow">
              <ul v-infinite-scroll="loadMore"
                infinite-scroll-disabled="loading"
                infinite-scroll-distance="40"
                :infinite-scroll-immediate-check="true">
                <li v-for="(item,index) in payListData" :key="index" @click="toDetail(item.blId,item.blOrdertype,item.blOrderAmount,item.blOrderpay,item.blUblanceed,item.blCreatetime)">
                  <div class="li-c">
                    <p>
                      <span class="blueActive">{{item.blOrderAmount>=0?'+'+item.blOrderAmount:item.blOrderAmount}}</span>
                      <span>{{blOrderType(item.blOrdertype)}}</span>
                    </p>
                    <p>
                      <span class="blackActivce">余额:{{item.blUblanceed}}</span>
                      <span>{{item.blCreatetime}}</span>
                    </p>
                  </div>
                </li>
              </ul>
              <div class="loading-box" v-if="isLoading">
                <mt-spinner type="snake" class="loading-more"></mt-spinner>
                <span class="loading-more-txt">加载中...</span>
              </div>
              <div class="no-more" v-if="noMore">没有更多了~</div>
            </mt-tab-container-item>
            <mt-tab-container-item class="income" v-show="buttonIndex==3?fundListShow:!fundListShow">
              <ul v-infinite-scroll="loadMore"
                infinite-scroll-disabled="loading"
                infinite-scroll-distance="40"
                :infinite-scroll-immediate-check="true">
                <li v-for="(item,index) in incomeListData" :key="index" @click="toDetail(item.blId,item.blOrdertype,item.blOrderAmount,item.blOrderpay,item.blUblanceed,item.blCreatetime)">
                  <div class="li-c">
                    <p>
                      <span class="blueActive">{{item.blOrderAmount>=0?'+'+item.blOrderAmount:item.blOrderAmount}}</span>
                      <span>{{blOrderType(item.blOrdertype)}}</span>
                    </p>
                    <p>
                      <span class="blackActivce">余额:{{item.blUblanceed}}</span>
                      <span>{{item.blCreatetime}}</span>
                    </p>
                  </div>
                </li>
              </ul>
              <div class="loading-box" v-if="isLoading">
                <mt-spinner type="snake" class="loading-more"></mt-spinner>
                <span class="loading-more-txt">加载中...</span>
              </div>
              <div class="no-more" v-if="noMore">没有更多了~</div>
            </mt-tab-container-item>
          </mt-tab-container>
        </div>
      </section>
    </div>
    <div class="fundDetail" v-show="!detailShow">
      <div class="title">
        <i @click="switchFund">&lt;</i>
        <span>详情</span>
      </div>
      <div class="mainDetail">
        <ul>
          <li>
            <span>流水号：</span>
            <span>{{blId}}</span>
          </li>
          <li>
            <span>类型：</span>
            <span>{{blOrderTypeText}}</span>
          </li>
          <li>
            <span>金额：</span>
            <span>{{blOrderAmount}}</span>
          </li>
          <li>
            <span>交易方式：</span>
            <span>{{blOrderpay}}</span>
          </li>
          <li>
            <span>余额：</span>
            <span>{{blUblanceed}}</span>
          </li>
          <li>
            <span>时间：</span>
            <span>{{blCreatetime}}</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
import { ceshi,fundTotalList } from "@/api/getdata.js";
import moment from "moment";
export default {
  data() {
    return {
      fundListShow: true,
      buttonIndex: 1,
      totalFundListData: [],
      payListData: [],
      incomeListData: [],
      loading: false,
      detailShow: true,
      blId: "",
      blOrderTypeText: "",
      blOrderAmount: "",
      blOrderpay: "",
      blUblanceed: "",
      blCreatetime: "",
      totalPage: 1,
      payPage: 1,
      incomePage: 1,
      pageSize: 10,
      isLoading: true,
      noMore: false
    };
  },
  mounted() {
     ceshi({
      "usPhone":13033605667,
      "usPwd":123456
    }).then(res=>{
      console.log(res)
      this.getTotalFundList(-1,this.totalPage,"");
    })
  },
  methods: {
    switchMy() {
      this.$router.push("/my")
    },
    loadMore() {
      this.isLoading = true;
      this.loading = true;
      if(this.buttonIndex==1) {
        this.totalPage++;
        this.getTotalFundList(-1,this.totalPage,"loadmore")
      } else if(this.buttonIndex==2) {
        this.payPage++;
        this.getTotalFundList(0,this.payPage,"loadmore")
      } else if(this.buttonIndex==3) {
        this.incomePage++;
        this.getTotalFundList(1,this.incomePage,"loadmore")
      }
    },
    getTotalFundList(blType,page,load) {
      fundTotalList({
        "blType": blType,
        "page": page,
        "pageSize": this.pageSize
      }).then(res => {
        console.log(res);
        if (res.result == true) {
          if(blType==-1) {
            if(load=="loadmore") {
              if(res.data.length==0) {
                this.isLoading=false;
                this.noMore=true;
              } else {
                this.totalFundListData=this.totalFundListData.concat(res.data);
                this.isLoading=false;
                this.loading=false;
              }
            } else {
              this.totalFundListData=res.data;
              this.isLoading=false;
              this.loading=false;
            } 
          } else if (blType==0) {
            if(load=="loadmore") {
              if(res.data.length==0) {
                this.isLoading=false;
                this.noMore=true;
              } else {
                this.payListData=this.payListData.concat(res.data);
                this.isLoading=false;
                this.loading=false;
              }
            } else {
              this.payListData=res.data;
              this.isLoading=false;
              this.loading=false;
            } 
          } else if (blType==1) {
            if(load=="loadmore") {
              if(res.data.length==0) {
                this.isLoading=false;
                this.noMore=true;
              } else {
                this.incomeListData=this.incomeListData.concat(res.data);
                this.isLoading=false;
                this.loading=false;
              }
            } else {
              this.incomeListData=res.data;
              this.isLoading=false;
              this.loading=false;
            } 
          } 
        }
      });
    },
    blOrderType(type) {
      if(type==1) {
        return "开仓综合费"
      } else if (type==2) {
        return "平仓综合费"
      } else if (type==3) {
        return "充值"
      } else if (type==4) {
        return "提现"
      } else if (type==5) {
        return "冻结保证金"
      } else if (type==6) {
        return "订单结算"
      } else if (type==7) {
        return "扣除递延费"
      }
    },
    totalFund() {
      this.buttonIndex = 1;
      this.active = "totalFund";
      this.totalPage=1;
      this.getTotalFundList(-1,this.totalPage,"");
    },
    pay() {
      this.buttonIndex = 2;
      this.active = "pay";
      this.payPage=1;
      this.getTotalFundList(0,this.payPage,"");
    },
    income() {
      this.buttonIndex = 3;
      this.active = "income";
      this.incomePage=1;
      this.getTotalFundList(1,this.incomePage,"");
    },
    switchFund() {
      this.detailShow=true;
    },
    toDetail(blId,blOrdertype,blOrderAmount,blOrderpay,blUblanceed,blCreatetime) {
      this.detailShow=false;
      this.blId=blId;
      this.blOrderTypeText=this.blOrderType(blOrdertype);
      this.blOrderAmount=blOrderAmount;
      this.blOrderpay=blOrderpay;
      this.blUblanceed=blUblanceed;
      this.blCreatetime=blCreatetime;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.fundList-child {
  display: flex;
  flex-direction: column;
  height: 100vh;
  background: #f9f9f9;
  section {
    background: #f9f9f9;
    flex: 1;
    .nav {
      i {
        float: left;
        font: .42rem/.6rem "";
        margin-left: .24rem;
      }
      position: fixed;
      width: 100%;
      z-index: 100;
      top: 0;
      margin: 0 0 0.34rem 0;
      text-align: center;
      font-size: 0;
      background: #f9f9f9;
      border-bottom: .01rem solid #dddddd;
      padding: .24rem 0 .18rem 0;
      .active {
        color: #fff;
        background: #159beb;
        border: 0.01rem solid #159beb;
      }
      button {
        width: 1.5rem;
        border-radius: 0;
        border: 0.01rem solid #8f8f90;
        box-shadow: none;
        &:nth-child(2) {
          border-right: 0;
          border-top-left-radius: 0.04rem;
          border-bottom-left-radius: 0.04rem;
        }
        &:nth-child(3) {
          border-right: 0;
        }
        &:nth-child(4) {
          border-top-right-radius: 0.04rem;
          border-bottom-right-radius: 0.04rem;
        }
      }
    }
    .mint-tab-container-item {
      height: 100vh;
      overflow: auto;
      padding: 1.2rem 0 .2rem 0;
      box-sizing: border-box;
    }
    .totalFund,
    .pay,
    .income {
      .loading-box {
        display: flex;
        justify-content: center;
        span {
          font: .2rem/.8rem "";
          margin-right: .08rem;
        } 
      }
      .no-more {
        text-align: center;
      }
      ul {  
        li {
          background: #fff;
          color: #373642;
          margin-bottom: 0.2rem;
          .li-c {
            padding: .18rem .24rem;
            p {
              .blueActive {
                color: #499ae5;
              }
              .blackActivce {
                color: #282e35;
              }
              font: 0.28rem/.54rem "";
              display: flex;
              justify-content: space-between;
              color: #6a6a6a;
            }
          }
        }
      }
    }
  }
}
.fundDetail {
  .title {
    text-align: center;
    background: #f9f9f9;
    border-bottom: .01rem solid #dddddd;
    span {
      display: inline-block;
      font: .32rem/.86rem "";
    }
    i {
      float: left;
      font: .42rem/.86rem "";
      margin-left: .24rem;
    }
  }
  ul {
    padding: .08rem .24rem .25rem;
    margin-top: .2rem;
    background: #fff;
    li {
      display: flex;
      justify-content: space-between;
      font: .28rem/.78rem "";
      color: #212025;
      border-bottom: .01rem solid #eaeaea;
      &:nth-last-child(1) {
        border: 0;
      }
      span {
        &:nth-child(1) {
          color: #585861;
        }
      }
    }
  }
}
</style>
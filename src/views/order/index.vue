<template>
  <div class="order">
    <div class="order-child" v-if="datepickerShow">
      <section :class="buttonIndex==3?'backActive':''">
        <div class="nav clearfix">
          <mt-button size="small" @click.native.prevent="holdStore" :class="buttonIndex==1?'active':''">持仓</mt-button>
          <mt-button size="small" @click.native.prevent="handleCal" :class="buttonIndex==2?'active':''">结算</mt-button>
          <mt-button size="small" @click.native.prevent="entrust" :class="buttonIndex==3?'active':''">委托</mt-button>
        </div>
        <div class="page-tab-container">
          <mt-tab-container class="page-tabbar-tab-container" v-model="active">
            <mt-tab-container-item id="holdStore" class="holdStore">
              <ul>
                <li v-for="(item,index) in holdOrderListData" :key="index" @click="toHoldOrder(item.hdhId)">
                  <div class="li-t">
                    <span class="orderName">{{item.ctName}}</span>
                    <span class="orderChange">+15.00</span>
                  </div>
                  <div class="li-c">
                    <p>
                      <span>{{item.hdhNum}}手({{item.hdhType}})</span>
                      <span>保证金：{{item.hdhFixamount}}</span>
                      <span class="orderProfit">止盈价：+{{item.hdhWin}}</span>
                      <span class="orderLoss">止损价：-{{item.hdhWin}}</span>
                    </p>
                    <p>
                      <span>委托ID:{{item.hdhId}}</span>
                      <span>开仓价：{{item.hdhPrice}}</span>
                      <span>当前价：{{item.currentPrice}}</span>
                    </p>
                    <p>
                      <span class="orderDate">{{item.hdhTime}}</span>
                      <span class="orderBtn" @click.stop="closeHoldStore(item.hdhId)">平仓</span>
                    </p>
                  </div>
                </li>
              </ul>
              <div class="orderFooter">
                <span>冻结保证金合计：{{totlaFixAmount}}</span>
                <span>浮亏：+30</span>
              </div>
            </mt-tab-container-item>
            <mt-tab-container-item id="handleCal" class="handleCal">
              <div>
                <div class="dataHead" v-if="newSetTimeShow">
                  <span :class="calIndex==1?'active':''" @click="dataHeadTotal">全部</span>
                  <span :class="calIndex==2?'active':''" @click="dataHeadToday">今天</span>
                  <span :class="calIndex==3?'active':''" @click="dataHeadMonth">近一个月</span>
                  <span :class="calIndex==4?'active':''" @click="dataHeadDe">自定义</span>
                </div>
                <div class="dataHead" v-else>
                  <span>{{startTime}}——{{endTime}}</span>
                  <span class="newSetTime" @click="newSetTimeOpera">重置时间</span>
                </div>
              </div>
              <ul v-infinite-scroll="loadMore"
                infinite-scroll-disabled="loading"
                infinite-scroll-distance="40"
                :infinite-scroll-immediate-check="true">
                <li v-for="(item,index) in calOrderListData" :key="index" @click="toCalDetail(item.hocId)">
                  <div class="li-t">
                    <span class="orderName">{{item.ctName}}</span>
                    <span :class="item.hocGet>=0?'redActive':'greenActive'">{{item.hocGet?(item.hocGet>=0?"+"+`${item.hocGet}`:`${item.hocGet}`):""}}</span>
                  </div>
                  <div class="li-c">
                    <p>
                      <span :class="item.hocType=='买涨'?'redActive':'greenActive'">{{item.hocNum}}手({{item.hocType}})</span>
                      <span>保证金：{{item.hocFixamount}}</span>
                      <span class="orderProfit">止盈价：+{{item.hocWin}}</span>
                      <span class="orderLoss">止损价：-{{item.hocLoss}}</span>
                    </p>
                    <p>
                      <span>委托ID:{{item.hocId}}</span>
                      <span>开仓价：{{item.hocHdprice}}</span>
                      <span>平仓价：{{item.hocPrice}}</span>
                    </p>
                    <p>
                      <span class="orderDate">{{item.hocTime}}</span>
                      <span class="orderBtn">{{calState(item.hocState)}}</span>
                    </p>
                  </div>
                </li>
                <li class="te">
                  <div class="loading-box" v-if="isLoading">
                    <mt-spinner type="snake" class="loading-more"></mt-spinner>
                    <span class="loading-more-txt">加载中...</span>
                  </div>
                  <div class="no-more" v-if="noMore">没有更多了~</div>
                </li>
              </ul>
              <div class="orderFooter">
                <span>结算盈亏合计：</span>
                <span :class="calTotalData>=0?'redActive':'greenActive'">{{calTotalData>=0?'+'+calTotalData:calTotalData}}</span>
              </div>
            </mt-tab-container-item>
            <mt-tab-container-item id="entrust" class="entrust">
              <div class="operaHead">
                <span :class="entrustIndex==1?'active':''" @click="entrustTotal">全部</span>
                <span :class="entrustIndex==2?'active':''" @click="entrustDealTotal">已成交</span>
                <span :class="entrustIndex==3?'active':''" @click="entrustFailTotal">委托失败</span>
              </div>
              <ul v-infinite-scroll="loadMore"
                  infinite-scroll-disabled="loading"
                  infinite-scroll-distance="10"
                  :infinite-scroll-immediate-check="true">
                <li v-for="(item,index) in entrustListData" :key="index">
                  <div class="li-t">
                    <span class="orderName">{{item.ctName}}</span>
                    <span></span>
                  </div>
                  <div class="li-c">
                    <p>
                      <span :class="item.hocType=='买涨'?'redActive':'greenActive'">{{item.hoNum}}手({{item.hoType}})</span>
                      <span class="orderProfit">止盈价：+{{item.hoWin}}</span>
                      <span class="orderLoss">止损价：-{{item.hoLoss}}</span>
                    </p>
                    <p>
                      <span>委托ID:{{item.hoId}}</span>
                      <span>委托价：{{item.hoPrice}}</span>
                    </p>
                    <p>
                      <span class="orderDate">{{item.hoCreatetime}}</span>
                      <span class="orderBtn">{{entrustState(item.hoState)}}</span>
                    </p>
                  </div>
                </li>
                <li class="te">
                  <div class="loading-box" v-if="isLoading">
                    <mt-spinner type="snake" class="loading-more"></mt-spinner>
                    <span class="loading-more-txt">加载中...</span>
                  </div>
                  <div class="no-more" v-if="noMore">没有更多了~</div>
                </li>
              </ul>
            </mt-tab-container-item>
          </mt-tab-container>
        </div>
      </section>
      <footer>
        <router-link to='/home' tag='span'>
          <img src="../../assets/img/2_01.png">
          <i>首页</i>
        </router-link>
        <router-link to='/deal' tag='span'>
          <img src="../../assets/img/2_02.png">
          <i>交易</i>
        </router-link>
        <router-link to='/order' tag='span'>
          <img src="../../assets/img/1_03.png">
          <i>订单</i>
        </router-link>
        <router-link to='/my' tag='span'>
          <img src="../../assets/img/2_04.png">
          <i>我的</i>
        </router-link>
      </footer>
    </div>
    <div class="shadow" v-if="holdStoreDetailShow">
      <div class="alertBox">
        <i @click="closeHoldStoreDetail"><img src="~@/assets/img/calclose.png" alt=""></i>
        <div class="alertBox-t">委托单编号：{{holdStoreDetailData.hdhEtid}}</div>
        <div class="alertBox-c">
          <p>
            <span>订单编号：{{holdStoreDetailData.hdhId}}</span>
            <span>浮动盈亏：{{holdStoreDetailData.hdhWin>0?'+'+holdStoreDetailData.hdhWin:holdStoreDetailData.hdhWin}}</span>
          </p>
          <p>
            <span>持仓价：{{holdStoreDetailData.hdhPrice}}</span>
            <span>当前价：{{holdStoreDetailData.hdhPrice}}</span>
          </p>
          <p>
            <span>保证金档位：{{holdStoreDetailData.hdhFixamount}}</span>
            <span>开仓综合费：{{holdStoreDetailData.hdhPdage}}</span>
          </p>
          <p>
            <span>止赢条数：{{holdStoreDetailData.hdhWin>0?'+'+holdStoreDetailData.hdhWin:holdStoreDetailData.hdhWin}}</span>
            <span>止损条数：{{holdStoreDetailData.hdhLoss>0?'+'+holdStoreDetailData.hdhLoss:holdStoreDetailData.hdhLoss}}</span>
          </p>
          <p>
            <span>成交时间：{{holdStoreDetailData.hdhTime}}</span>
          </p>
         </div>
        <div class="alertBox-b" @click="holdStoreDetailSure">确定</div>
      </div>
    </div>
    <div class="shadow calShadow" v-if="calDetailShow">
      <div class="alertBox">
        <i @click="closeCalDetail"><img src="~@/assets/img/calclose.png" alt=""></i>
        <div class="alertBox-t">结算状态：{{calState(calDetailData.hocState)}}</div>
        <div class="alertBox-c">
          <h3>订单号：{{calDetailData.hocId}}</h3>
          <table>
            <tr>
              <td>合约名称：</td>
              <td>{{calDetailData.ctName}}</td>
              <td>交易数量：</td>
              <td>{{calDetailData.hocNum}}</td>
            </tr>
            <tr>
              <td>方向：</td>
              <td class="active">{{calDetailData.hocType}}</td>
              <td>递延费：</td>
              <td>{{calDetailData.hocDefer}}</td>
            </tr>
            <tr>
              <td>开仓价：</td>
              <td>{{calDetailData.hocHdprice}}</td>
              <td>平仓价：</td>
              <td>{{calDetailData.hocPrice}}</td>
            </tr>
            <tr>
              <td>开仓综合费：</td>
              <td>{{calDetailData.hocHdpdage}}</td>
              <td>平仓综合费：</td>
              <td>{{calDetailData.hocPdage}}</td>
            </tr>
            <tr>
              <td>止损价：</td>
              <td>{{calDetailData.hocLoss}}</td>
              <td>止盈价：</td>
              <td>{{calDetailData.hocWin}}</td>
            </tr>
            <tr>
              <td>开仓时间：</td>
              <td>{{calDetailData.hocHdhtime}}</td>
              <td>平仓时间：</td>
              <td>{{calDetailData.hocTime}}</td>
            </tr>
            <tr>
              <td>冻结保证金：</td>
              <td>{{calDetailData.hocFixamount}}</td>
              <td>清算盈亏：</td>
              <td>{{calDetailData.hocFloat}}</td>
            </tr>
            <tr>
              <td>综合费扣减：</td>
              <td>{{calDetailData.hocGet}}</td>
              <td>返还：</td>
              <td>{{calDetailData.hocReturn}}</td>
            </tr>
          </table>
         </div>
        <div class="alertBox-b" @click="calDetailSure">确定</div>
      </div>
    </div>
    <div class="datepicker" v-else>
      <div class="selectDate clearfix">
        <i @click="switchDate">&lt;</i>
        <span>选择日期</span>
      </div>
      <div class="startEnd">
        <input id='start' type="text" :class="dateIndex==1?'active':''" readonly="" name='start' v-model='startTime' @click='openPicker("start")'>
        <input id='end' type="text" :class="dateIndex==2?'active':''" readonly="" name='end' v-model='endTime' @click='openPicker("end")'>
      </div>
      <div class="dateBody">
        <mt-datetime-picker
          v-model="pickerVisible"
          type="date"
          ref="picker"
          @confirm="handleConfirm"
          year-format="{value} 年"
          month-format="{value} 月"
          date-format="{value} 日">
        </mt-datetime-picker>
      </div>
    </div>
  </div>
</template>
<script>
import {
  ceshi,
  holdOrderList,
  closeHold,
  entrustOrderList,
  calOrderList,
  calOrderTotal,
  holdOrderDetail,
  calDetail
} from "@/api/getdata.js";
import moment from "moment";
export default {
  data() {
    return {
      active: "holdStore",
      buttonIndex: 1,
      holdOrderListData: [],
      calOrderListData: [],
      totlaFixAmount: "",
      holdCurrentPrice: "280",
      hdhPrice: "",
      datepickerShow: true,
      calIndex: 1,
      pickerVisible: "",
      startTime: "开始日期",
      endTime: "结束日期",
      dateIndex: "",
      newSetTimeShow: true,
      calTotalData: "",
      entrustIndex: 1,
      entrustListData: [],
      loading: false,
      pageSize: 10,
      calPage1: 1,
      calPage2: 1,
      calPage3: 1,
      calPage4: 1,
      entrustPage1: 1,
      entrustPage2: 1,
      entrustPage3: 1,
      isLoading: true,
      noMore: false,
      holdStoreDetailShow: false,
      calDetailShow: false,
      calDetailData: {},
      holdStoreDetailData: {},
      codeList: "",
      currentData: []
    };
  },
  mounted() {
    ceshi({
      usPhone: 15990821507,
      usPwd: 456456456
    }).then(res => {
      console.log(res);
      this.getHoldStoreList();
    });
    
  },
  methods: {
    getCurrentPrice(msg) {
      //判断当前浏览器是否支持WebSocket
      var that =this
		     if ('WebSocket' in window) {
		       var websocket = new WebSocket("ws://192.168.1.188:8080/contract/price");
		     }
		    else {
		        alert('当前浏览器 不支持 websocket')
		    }
			
		    //连接发生错误的回调方法
		    websocket.onerror = function () {
		         console.log("WebSocket连接发生错误");
		    }; 
		    //连接成功建立的回调方法
		    websocket.onopen = function () {
            console.log("WebSocket连接成功");
            websocket.send(msg);
		    }
		     //接收到消息的回调方法
		    websocket.onmessage = function (event) {
             console.log(event.data);
            that.currentData=JSON.parse(event.data).data;
           
            that.handlePriceArr();
		     }
		 
		     //连接关闭的回调方法
		     websocket.onclose = function () {
		         console.log("WebSocket连接关闭");
		     }
		 
		     //监听窗口关闭事件，当窗口关闭时，主动去关闭websocket连接，防止连接还没断开就关闭窗口，server端会抛异常。
		     window.onbeforeunload = function () {
		         closeWebSocket();
		    }
		     //关闭WebSocket连接
		     function closeWebSocket() {
		         websocket.close();
		    }
		 
		         

    },
    handlePriceArr() {
      for (let j=0;j<=this.holdOrderListData.length-1;j++) {
        for (let p=0;p<=this.currentData.length-1;p++) {
          if(this.holdOrderListData[j].ctCode==this.currentData[p].ctCode) {
            console.log(1111)
            this.holdOrderListData[j].currentPrice=this.currentData[p].price
            continue
          }
        }
      }
      console.log(this.holdOrderListData)
    },
    toCalDetail(id) {
      calDetail(id,{}).then(res=> {
        if(res.result==true) {
          this.calDetailData=res.data;
          this.calDetailShow=true
        }
      })
    },
    closeCalDetail() {
      this.calDetailShow=false;
    },
    calDetailSure() {
      this.calDetailShow=false;
    },
    toHoldOrder(id) {
      holdOrderDetail(id,{}).then(res=> {
        if(res.result==true) {
          this.holdStoreDetailData=res.data;
          this.holdStoreDetailShow=true
        }
      })
    },
    holdStoreDetailSure() {
      this.holdStoreDetailShow=false;
    },
    closeHoldStoreDetail() {
      this.holdStoreDetailShow=false;
    },
    loadMore() {
      this.isLoading = true;
      this.loading = true;
      if (this.buttonIndex == 1) {
      } else if (this.buttonIndex == 2) {
        if (this.calIndex == 1) {
          this.calPage1++;
          this.getCalData(this.calPage1, this.pageSize, "", "", "loadmore");
        } else if (this.calIndex == 2) {
          this.calPage2++;
          let todayDate = moment(new Date()).format("YYYY-MM-DD");
          this.getCalData(
            this.calPage2,
            this.pageSize,
            todayDate,
            todayDate,
            "loadmore"
          );
        } else if (this.calIndex == 3) {
          this.calPage3++;
          let todayDate = moment(new Date()).format("YYYY-MM-DD");
          let monthBefore = moment(
            new Date() - 30 * 24 * 60 * 60 * 1000
          ).format("YYYY-MM-DD");
          this.getCalData(
            this.calPage3,
            this.pageSize,
            monthBefore,
            todayDate,
            "loadmore"
          );
        } else if (this.calIndex == 4) {
          this.calPage4++;
          this.getCalData(
            this.calPage4,
            this.pageSize,
            this.startTime,
            this.endTime,
            "loadmore"
          );
        }
      } else if (this.buttonIndex == 3) {
        if (this.entrustIndex == 1) {
          this.entrustPage1++;
          this.getEntrustList(this.entrustPage1, this.pageSize, "", "loadmore");
        } else if (this.entrustIndex == 2) {
          this.entrustPage2++;
          this.getEntrustList(this.entrustPage2, this.pageSize, 1, "loadmore");
        } else if (this.entrustIndex == 3) {
          this.entrustPage3++;
          this.getEntrustList(this.entrustPage3, this.pageSize, 2, "loadmore");
        }
      }
    },
    openPicker(data) {
      if (data == "start") {
        this.dateIndex = 1;
        this.$refs.picker.open();
      } else if (data == "end") {
        if (this.startTime != "开始日期") {
          this.dateIndex = 2;
          this.$refs.picker.open();
        } else {
          this.$toast("请选择开始日期后再选择结束日期");
        }
      }
    },
    handleConfirm(data) {
      console.log(data);
      let date = moment(data).format("YYYY-MM-DD");
      this.dateTime = date;
      if (this.dateIndex == 1) {
        this.startTime = date;
      } else if (this.dateIndex == 2) {
        this.endTime = date;
        this.datepickerShow = true;
        this.newSetTimeShow = false;
        this.calPage1 = 1;
        this.calPage2 = 1;
        this.calPage3 = 1;
        this.calPage4 = 1;
        this.calOrderListData = [];
        this.getCalData(
          this.calPage4,
          this.pageSize,
          this.startTime,
          this.endTime,
          ""
        );
        this.historyProfit(this.startTime, this.endTime);
      }
    },
    newSetTimeOpera() {
      this.newSetTimeShow = true;
    },
    getWinLoss() {
      Number(this.holdCurrentPrice) - Number(this.hdhPrice);
    },
    getHoldStoreList() {
      holdOrderList({}).then(res => {
        console.log(res);
        if (res.result == true) {
          this.holdOrderListData = res.data.list;
          this.totlaFixAmount = res.data.totlaFixAmount;
          let arrList=res.data.list
          for (let i=0;i<=arrList.length-1;i++) {
            if(i!=arrList.length-1) {
              this.codeList+=arrList[i].ctCode+',';
            } else {
              this.codeList+=arrList[i].ctCode;
            }   
          }
          this.getCurrentPrice(this.codeList);
        }
      });
    },
    closeHoldStore(id) {
      closeHold(id, {}).then(res => {
        console.log(res);
        if (res.result == true) {
          this.$toast({
            message: "平仓成功",
            duration: 1000
          });
          this.getHoldStoreList();
        }
      });
    },
    calState(dataid) {
      if (dataid == 0) {
        return "止盈结算";
      } else if (dataid == 1) {
        return "止损结算";
      } else if (dataid == 2) {
        return "手动平仓结算";
      }
    },
    holdStore() {
      this.buttonIndex = 1;
      this.active = "holdStore";
      this.getHoldStoreList();
    },
    handleCal() {
      this.buttonIndex = 2;
      this.active = "handleCal";
      this.dataHeadTotal();
    },
    entrust() {
      this.buttonIndex = 3;
      this.active = "entrust";
      this.entrustTotal();
    },
    historyProfit(beginTime, endTime) {
      calOrderTotal({
        beginTime: beginTime,
        endTime: endTime
      }).then(res => {
        if (res.result == true) {
          this.calTotalData = res.data;
        }
      });
    },
    getCalData(page, pageSize, beginTime, endTime, load) {
      calOrderList({
        page: page,
        pageSize: pageSize,
        beginTime: beginTime,
        endTime: endTime
      }).then(res => {
        if (res.result == true) {
          if (load == "loadmore") {
            if (res.data.length == 0) {
              this.isLoading = false;
              this.noMore = true;
            } else {
              this.calOrderListData = this.calOrderListData.concat(res.data);
              this.isLoading = false;
              this.loading = false;
            }
          } else {
            this.calOrderListData = this.calOrderListData.concat(res.data);
            this.isLoading = false;
            this.loading = false;
          }
        }
      });
    },
    dataHeadTotal() {
      this.calIndex = 1;
      this.calPage1 = 1;
      this.calPage2 = 1;
      this.calPage3 = 1;
      this.calPage4 = 1;
      this.calOrderListData = [];
      this.getCalData(this.calPage1, this.pageSize, "", "", "");
      this.historyProfit();
    },
    dataHeadToday() {
      this.calIndex = 2;
      this.calPage1 = 1;
      this.calPage2 = 1;
      this.calPage3 = 1;
      this.calPage4 = 1;
      this.calOrderListData = [];
      let todayDate = moment(new Date()).format("YYYY-MM-DD");
      this.getCalData(this.calPage2, this.pageSize, todayDate, todayDate, "");
      this.historyProfit(todayDate, todayDate);
    },
    dataHeadMonth() {
      this.calIndex = 3;
      this.calPage1 = 1;
      this.calPage2 = 1;
      this.calPage3 = 1;
      this.calPage4 = 1;
      this.calOrderListData = [];
      let todayDate = moment(new Date()).format("YYYY-MM-DD");
      let monthBefore = moment(new Date() - 30 * 24 * 60 * 60 * 1000).format(
        "YYYY-MM-DD"
      );
      this.getCalData(this.calPage3, this.pageSize, monthBefore, todayDate, "");
      this.historyProfit(monthBefore, todayDate);
    },
    dataHeadDe() {
      this.calIndex = 4;
      this.datepickerShow = false;
    },
    switchDate() {
      this.datepickerShow = true;
    },
    entrustTotal() {
      this.entrustIndex = 1;
      this.entrustPage1 = 1;
      this.entrustListData = [];
      this.getEntrustList(this.entrustPage1, this.pageSize, "", "");
    },
    entrustDealTotal() {
      this.entrustIndex = 2;
      this.entrustPage2 = 1;
      this.entrustListData = [];
      this.getEntrustList(this.entrustPage2, this.pageSize, 1, "");
    },
    entrustFailTotal() {
      this.entrustIndex = 3;
      this.entrustPage3 = 1;
      this.entrustListData = [];
      this.getEntrustList(this.entrustPage3, this.pageSize, 2, "");
    },
    getEntrustList(page, pageSize, state, load) {
      entrustOrderList({
        page: page,
        pageSize: pageSize,
        state: state
      }).then(res => {
        if (res.result == true) {
          if (load == "loadmore") {
            if (res.data.length == 0) {
              this.isLoading = false;
              this.noMore = true;
            } else {
              this.entrustListData = this.entrustListData.concat(res.data);
              this.isLoading = false;
              this.loading = false;
            }
          } else {
            this.entrustListData = this.entrustListData.concat(res.data);
            this.isLoading = false;
            this.loading = false;
          }
        }
      });
    },
    entrustState(state) {
      if (state == 0) {
        return "委托中";
      } else if (state == 1) {
        return "委托成功";
      } else if (state == 2) {
        return "委托失败";
      } else if (state == 3) {
        return "撤销委托";
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.order {
  height: 100vh;
  background: #f2f2f2;
  overflow: hidden;
}
.order-child {
  height: 100vh;
  background: #f2f2f2;
  overflow: hidden;
  .backActive {
    margin: 0;
  }
  section {
    height: 100vh;
    background: #f2f2f2;
    overflow: hidden;
    .nav {
      padding: 0.24rem 0 0.34rem 0;
      text-align: center;
      background: #f2f2f2;
      font-size: 0;
      position: fixed;
      width: 100%;
      z-index: 99;
      top: 0;
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
        &:nth-child(1) {
          border-right: 0;
          border-top-left-radius: 0.04rem;
          border-bottom-left-radius: 0.04rem;
        }
        &:nth-child(2) {
          border-right: 0;
        }
        &:nth-child(3) {
          border-top-right-radius: 0.04rem;
          border-bottom-right-radius: 0.04rem;
        }
      }
    }
    .holdStore,
    .handleCal,
    .entrust {
      .loading-box {
        display: flex;
        justify-content: center;
        span {
          font: 0.2rem/0.8rem "";
          margin-right: 0.08rem;
        }
      }
      .no-more {
        text-align: center;
      }
      ul {
        .te {
          background: #f2f2f2;
        }
        li {
          background: #fff;
          color: #373642;
          margin-bottom: 0.2rem;
          .li-t {
            display: flex;
            justify-content: space-between;
            padding: 0 0.27rem;
            border-top: 0.01rem solid #ebebeb;
            border-bottom: 0.01rem solid #ebebeb;
            span {
              display: block;
              font: 0.29rem/0.78rem "";
            }
            .greenActive {
              color: #00d08d;
            }
            .redActive {
              color: #ff424d;
            }
          }
          .li-c {
            padding: 0.37rem 0.23rem 0.13rem;
            p {
              .greenActive {
                color: #00d08d;
              }
              .redActive {
                color: #ff424d;
              }
              font: 0.27rem/0.27rem "";
              &:nth-child(1) {
                display: flex;
                justify-content: space-between;
                .orderProfit,
                .orderLoss {
                  color: #828282;
                }
              }
              &:nth-child(2) {
                display: flex;
                justify-content: space-between;
                margin: 0.38rem 0 0.19rem 0;
              }
              &:nth-child(3) {
                display: flex;
                padding-top: 0.13rem;
                justify-content: space-between;
                border-top: 0.01rem solid #ebebeb;
                .orderDate {
                  font: 0.2rem/0.54rem "";
                  color: #828282;
                }
                .orderBtn {
                  color: #fff;
                  background: #159beb;
                  border-radius: 0.24rem;
                  width: 1.5rem;
                  display: block;
                  font: 0.2rem/0.54rem "";
                  text-align: center;
                }
              }
            }
          }
        }
      }
      .orderFooter {
        display: flex;
        justify-content: space-between;
        background: #fff;
        position: fixed;
        bottom: 0.99rem;
        width: 100%;
        .greenActive {
          color: #00d08d;
        }
        .redActive {
          color: #ff424d;
        }
        span {
          font: 0.29rem/0.79rem "";
          display: block;
          padding: 0 0.27rem;
        }
      }
    }
    .holdStore {
      ul {
        margin: 1.5rem 0 0 0;
        height: 72vh;
        overflow: auto;
        box-sizing: border-box;
      }
    }
    .handleCal,
    .entrust {
      ul {
        margin: 1.96rem 0 0 0;
        height: 72vh;
        overflow: auto;
        box-sizing: border-box;
        li {
          .li-c {
            p {
              &:nth-child(3) {
                .orderBtn {
                  color: #3e4345;
                  background: #fff;
                }
              }
            }
          }
        }
      }
    }
  }
  .handleCal,
  .entrust {
    .dataHead,
    .operaHead {
      position: fixed;
      width: 100%;
      top: 1.1rem;
      background: #fff;
      padding: 0.15rem 0.34rem 0;
      box-sizing: border-box;
      display: flex;
      justify-content: space-between;
      border-bottom: 0.01rem solid #dddddd;
      span {
        font: 0.27rem/0.6rem "";
        padding: 0 0.13rem;
      }
      .newSetTime {
        color: #159beb;
      }
      .active {
        color: #159beb;
        border-bottom: 0.04rem solid #159beb;
      }
    }
  }
  footer {
    background: #fff;
    border-top: 0.01rem solid #e1e1e1;
    height: 0.98rem;
    position: fixed;
    bottom: 0;
    width: 100%;
    text-align: center;
    overflow: hidden;
    color: rgb(145, 145, 145);
    span {
      float: left;
      width: 25%;
      height: 0.77rem;
      img {
        display: block;
        margin: 0.11rem auto 0;
        height: 0.44rem;
      }
      i {
        display: block;
        font: 0.24rem/0.43rem "";
      }
    }
    span:nth-child(3) {
      i {
        color: #159beb;
      }
    }
  }
}
.datepicker {
  .selectDate {
    background: #f2f2f2;
    color: #202020;
    padding-top: 0.3rem;
    i {
      float: left;
      font-style: normal;
      margin-left: 0.25rem;
      display: inline-block;
      font: 0.4rem/0.58rem "";
      padding: 0 0.1rem;
    }
    span {
      float: left;
      display: inline-block;
      font: 0.3rem/0.58rem "";
      margin-left: 2.48rem;
    }
  }
  .startEnd {
    display: flex;
    border-top: 0.01rem solid #ddd;
    color: #159beb;
    input {
      width: 50%;
      font: 0.26rem/0.8rem "";
      text-align: center;
      color: #159beb;
      border: 0;
    }
    .active {
      border-bottom: 0.08rem solid #159beb;
    }
  }
}
.shadow {
  background: rgba(0, 0, 0, 0.1);
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  z-index: 100;
  .alertBox {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
    width: 7.06rem;
    height: 5.56rem;
    box-sizing: border-box;
    border-radius: 0.05rem;
    background: #fff;
    i {
      width: 0.4rem;
      height: 0.4rem;
      position: absolute;
      right: 0.15rem;
      top: 0.15rem;
      img {
        width: 100%;
      }
    }
    .alertBox-t {
      padding: 0 .28rem;
      font: .28rem/.70rem "";
      background: #139ceb;
      color: #fff;
    }
    .alertBox-c {
      padding: 0 .28rem;
      font: .28rem/.6rem "";
      margin-top: .1rem;
      color: #585861;
      h3 {
        font: .26rem/.64rem "";
      }
      p {
        display: flex;
        justify-content: space-between;
      }
      table {
        width: 100%;
        border-collapse:collapse;
        td {
          border: .01rem solid #d7d7d7;
          text-align: center;
          font: .26rem/.6rem "";
          width: 25%;
        }
        .active {
          color: #ff3341;
        }
      }
    }
    .alertBox-b {
      width: 3rem;
      font: 0.32rem/0.8rem "";
      color: #fff;
      background: #139ceb;
      text-align: center;
      border-radius: 0.02rem;
      margin: 0.52rem auto 0;
    }
  }
}
.calShadow {
  .alertBox {
    height: 9rem;
    .alertBox-b {
      margin: 0.42rem auto 0;
    }
  }
}
</style>
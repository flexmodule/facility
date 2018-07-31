<template>
  <div class="messageCenter">
    <div class="title">
      <i @click="switchMy">&lt;</i>
      <span>消息中心</span>
    </div>
    <div class="messageInfo">
      <ul v-infinite-scroll="loadMore"
          infinite-scroll-disabled="loading"
          infinite-scroll-distance="40"
          :infinite-scroll-immediate-check="true">
        <li v-for="(item,index) in messList" :key="index">
          <div class="headInfo">
            <h3>
              <i>公告</i>
              <span>系统公告</span>
              <b v-if="item?(item.tmState==1?newShow:!newShow):''">新</b>
            </h3>
            <p>
              <span>{{item?item.tmCreateTime:''}}</span>
            </p>
          </div>
          <div class="mainInfo">{{item?item.tmContent:''}}</div>
        </li>
      </ul>
      <div class="loading-box" v-if="isLoading">
        <mt-spinner type="snake" class="loading-more"></mt-spinner>
        <span class="loading-more-txt">加载中...</span>
      </div>
      <div class="no-more" v-if="noMore">没有更多了~</div>
    </div>
  </div>
</template>
<script>
import { ceshi,messageList,modifyMessState } from "@/api/getdata.js";
export default {
  data() {
    return {
      messList: [],
      page: 1,
      pageSize: 20,
      isLoading: true,
      noMore: false,
      loading: false,
      newShow: true
    };
  },
  mounted() {
     ceshi({
      "usPhone":15756000780,
      "usPwd":123123
    }).then(res=>{
      console.log(res)
      this.getMessList(1,this.pageSize,"");
    })
  },
  methods: {
    loadMore() {
      this.isLoading = true;
      this.loading = true;
      this.page++;
      this.getMessList(this.page,this.pageSize,"loadmore");
    },
    switchMy() {
      this.modifyMessListState();
      this.$router.push("/my");
    }, 
    modifyMessListState() {
      modifyMessState({}).then(res=>{

      })
    },
    getMessList(page,pageSize,load) {
      messageList({
        page: page,
        pageSize: pageSize
      }).then(res=>{
        if(load=="loadmore") {
          if(res.data.length==0) {
            this.isLoading=false;
            this.noMore=true;
          } else {
            this.messList=this.messList.concat(res.data);
            this.isLoading=false;
            this.loading=false;
          }
        } else {
          this.messList=this.messList.concat(res.data);
          this.isLoading=false;
          this.loading=false;
        } 
      })
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.messageCenter {
  background: #f2f6f8;
  min-height: 100vh;
}
.title {
  font: 0.3rem/0.86rem "";
  background: #f9f9f9;
  text-align: center;
  margin-bottom: 0.1rem;
  border-bottom: 0.01rem solid #eeeeee;
  i {
    float: left;
    margin-left: 0.3rem;
    font: 0.4rem/0.86rem "";
  }
}
.messageInfo {
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
      padding: .14rem .24rem;
      margin-bottom: .1rem;
      .headInfo {
        display: flex;
        justify-content: space-between;
        margin-bottom: .1rem;
        h3 {
          display: flex;
          position: relative;
          i {
            padding: 0 .05rem;
            color: #fff;
            font: .24rem/.34rem "";
            background: #ff845e;
            border-radius: .02rem;
          }
          span {
            font: .3rem/.34rem "";
            margin: 0 .06rem;
          }
          b {
            position: absolute;
            right: -.26rem;
            top: -.06rem;
            color: #ff3644;
          }
        }
        p {
          display: flex;
          span {
            font: .22rem/.22rem "";
            color: #58585c;
          }
        }
      }
      .mainInfo {
        font: .24rem/.32rem "";
        color: #58585c;
      }
    }
  }
}
</style>
<template>
  <div>
    <div class="home" v-show="'home'==tab">
      <header>
        <i>下午好，用户</i>
        交易中心
        <em>
          <img src="../../assets/img/首页_04.png">
          <b>消息</b>
        </em>
      </header>
      <section>

        <div class="tabimg">
          <mt-swipe>
            <mt-swipe-item><img src="http://192.168.1.188:8080/img/1_01.png" alt=""></mt-swipe-item>
            <mt-swipe-item><img src="http://192.168.1.188:8080/img/1_02.png" alt=""></mt-swipe-item>
            <mt-swipe-item><img src="http://192.168.1.188:8080/img/1_03.png" alt=""></mt-swipe-item>
          </mt-swipe>
        </div>

        <div class="gonggao">
          <i><img src="../../assets/img/sy1_03.png"></i>
          <ul>
            <li>阿三大厦发达省份速度来看回复v拉萨的发生了返回拉萨菲拉斯乏力分</li>
            <li>阿三大厦发达省份</li>
          </ul>
          <em>&gt;</em>
        </div>

        <div class="heyuelist">

          <ul class="heyue" v-for="(item, index) in hylist" :key="index" @click="detailsbtn(item)">
            <li class="hytop">
              <i>{{item.ctName}}</i>
              <em>
                <img src="../../assets/img/首页_03.png" v-if="item.gdState==1">
                <img src="../../assets/img/首页_10.png" v-if="item.gdState==0">
              </em>
            </li>
            <li class="hycent">
              <i style="color:#00d08d">1341.0</i>
              <em style="color:#ff424d">+0.04%</em>
            </li>
            <li class="hybot">
              <i>最新价</i>
              <em>涨跌幅</em>
            </li>
          </ul>

        </div>

      </section>
      <footer>

        <router-link to='/home' tag='span'>
          <img src="../../assets/img/1_01.png">
          <i>首页</i>
        </router-link>
        <router-link to='/deal' tag='span'>
          <img src="../../assets/img/2_02.png">
          <i>交易</i>
        </router-link>
        <router-link to='/order' tag='span'>
          <img src="../../assets/img/2_03.png">
          <i>订单</i>
        </router-link>
        <router-link to='/my' tag='span'>
          <img src="../../assets/img/2_04.png">
          <i>我的</i>
        </router-link>

      </footer>
    </div>

    <Hydetails :hydetail="hydetail" v-show="'details'==tab" @showtab="getshowtab"></Hydetails>
    <Xiadan :num="hylist" v-if="'xiadan'==tab" @showtab="getshowtab"></Xiadan>
  </div>
</template>

<script>
import { tabimg,contract,openData,detail } from '@/api/getdata'
import Hydetails from '@/components/Hydetails'
import Xiadan from '@/components/Xiadan'
export default {
  data () {
    return {
      tab:'home',
      hylist:{},
      hydetail:{}
    }
  },
  mounted () {
    let params={};
    tabimg(params).then((res) => {
      console.log(res)
    })
    let params1={};
    params1={
      page:1,
      pageSize:10,
      type:1
    }
    contract(params1).then((res) => {
      console.log(res)
      this.hylist=res.data
    })
    let params2={};
    let data2=3
    openData(data2,params2).then((res) => {
      console.log(res)
    })
  },
  components:{
    Hydetails,
    Xiadan
  },
  methods: {
    detailsbtn(item){
      console.log(item)
      let params={id:item.ctId};
      detail(params).then((res) => {
        console.log(res)
        this.hydetail=res.data
        this.tab='details'
      })
    },
    getshowtab(dt){
      this.tab=dt
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.home{
  display: flex;
  flex-direction: column;
  height:100vh;
  
  header{
    line-height: .85rem;
    height: .85rem;
    text-align: center;
    overflow: hidden;
    color: #fff;
    font-size: .32rem;
    position: absolute;
    top: 0;
    z-index: 13;
    width: 100%;
    border-bottom: 1px solid rgba(255, 255, 255,0.2);
    i{
      display: inline-block;
      position: absolute;
      left: .24rem;
      font-size: .24rem;
      line-height: .85rem;
      height: .85rem;
    }
    em{
      display: inline-block;
      position: absolute;
      right: .24rem;
      height: .85rem;
      img{
        height: .4rem;
        display: block;
        margin-top: .1rem;
      }
      b{
        display: block;
        font-size: .2rem;
        line-height: .26rem;
      }
    }
  }

  section{
    background: #f2f2f2;
    flex: 1;
    overflow: auto;
    .tabimg{
      height: 4.08rem;
      img{
        display: block;
        width: 100%;
      }
    }
    .gonggao{
      height: .96rem;
      background: #fff;
      display: flex;
      margin-bottom: .2rem;
      i{
        display: block;
        width: 1.68rem;
        padding-top: .28rem;
        img{
          display: block;
          width: 1.3rem;
          margin: 0 auto;
        }
      }
      em{
        font-size: .38rem;
        height: .96rem;
        width: .65rem;
        line-height: .96rem;
        text-align: center;
      }
      ul{
        flex: 1;
        padding-top: .14rem;
        li{
          height: .34rem;
          line-height: .34rem;
          font-size: .24rem;
          display: inline-block; 
          white-space: nowrap;
          width: 5rem; 
          overflow: hidden; 
          text-overflow:ellipsis;
        }
      }
    }
    .heyue{
      background: #fff;
      border-bottom: 1px solid #e0e6e9;
    }
    .hytop{
      height: .64rem;
      i{
        float: left;
        margin-left: .25rem;
        height: .64rem;
        font-size: .3rem;
        line-height: .64rem;
        color: #373642;
      }
      em{
        float: right;
        height: .41rem;
        margin-top: .01rem;
        img{
          display: block;
          height: 100%;
        }
      }
    }
    .hycent{
      height: .8rem;
      i{
        float: left;
        margin-left: .25rem;
        height: .8rem;
        font-size: .6rem;
        line-height: .8rem;
      }
      em{
        float: right;
        margin-right: .25rem;
        height: .8rem;
        font-size: .6rem;
        line-height: .8rem;
      }
    }
    .hybot{
      height: .46rem;
      color: #a7a7a7;
      i{
        float: left;
        margin-left: .25rem;
        height: .34rem;
        font-size: .25rem;
        line-height: .34rem;
      }
      em{
        float: right;
        margin-right: .25rem;
        height: .34rem;
        font-size: .25rem;
        line-height: .34rem;
      }
    }
  }

  footer{
    background: #fff;
    border-top: .01rem solid rgb(173, 173, 173);
    height: .98rem;
    text-align: center;
    overflow: hidden;
    color: rgb(145, 145, 145);
    span{
      float: left;
      width: 25%;
      height: .77rem;
      img{
        display: block;
        margin: .11rem auto 0;
        height: .44rem;
      }
      i{
        display: block;
        font: .24rem/.43rem "";
      }
    }
    span:nth-child(1){
        i{
            color: #159beb;
        }
    }
  }
}

</style>
<template>
  <div class="deal">
    <header>
      交易列表
      <i>玩法</i>
    </header>
    <section>

      <div class="heyue" v-for="(item, index) in hylist" :key="index">
        <p>
          <i>{{item.ctName}}</i>
          <em>手续费：{{item.gdOnPdage}}元/手</em>
        </p>
        <ul>
          <li class="hylef">
            <i style="color:#00d08d">1731.0</i>
            <em>最新价</em>
          </li>
          <li class="hycen"></li>
          <li class="hyrig">
            <i style="color:#ff424d">+0.12%</i>
            <em>涨跌幅</em>
          </li>
        </ul>
      </div>

    </section>
    <footer>

        <router-link to='/home' tag='span'>
            <img src="../../assets/img/2_01.png">
            <i>首页</i>
        </router-link>
        <router-link to='/deal' tag='span'>
            <img src="../../assets/img/1_02.png">
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
</template>

<script>
import { contract } from '@/api/getdata'
export default {
  data () {
    return {
      hylist:{}
    }
  },
  mounted () {
    let params={};
    params={
      page:1,
      pageSize:10
    }
    contract(params).then((res) => {
      console.log(res)
      this.hylist=res.data
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.deal{
  display: flex;
  flex-direction: column;
  height:100vh;
  
  header{
    line-height: .85rem;
    height: .85rem;
    font-size: .32rem;
    text-align: center;
    overflow: hidden;
    background: #f9f9f9;
    border-bottom: 1px solid #dddddd;
    position: relative;
    i{
      position: absolute;
      color: #606064;
      right: .24rem;
      font-size: .24rem;
      line-height: .85rem;
      height: .85rem;
    }
  }

  section{
    background: #f2f2f2;
    flex: 1;
    overflow: auto;
    .heyue{
      margin-top: .15rem;
      p{
        height: .58rem;
        border-bottom: 1px solid #ebebeb;
        border-top: 1px solid #ebebeb;
        background: #fafafa;
        i{
          height: .58rem;
          font-size: .3rem;
          line-height: .58rem;
          float: left;
          margin-left: .25rem;
        }
        em{
          height: .58rem;
          font-size: .24rem;
          line-height: .58rem;
          float: right;
          margin-right: .25rem;
          color: #606064;
        }
      }
      ul{
        height: 1.48rem;
        background: #fff;
        position: relative;
        .hylef{
          float: left;
          margin-left: .25rem;
          i{
            display: block;
            height: .86rem;
            line-height: .86rem;
            font-size: .6rem;
            margin-top: .13rem;
          }
          em{
            color: #a7a7a7;
          }
        }
        .hyrig{
          float: right;
          margin-right: 1rem;
          i{
            display: block;
            height: .86rem;
            line-height: .86rem;
            font-size: .6rem;
            margin-top: .13rem;
          }
          em{
            color: #a7a7a7;
          }
        }
        .hycen{
          position: absolute;
          left: 50%;
          top: .37rem;
          height: .86rem;
          border-left: 1px solid #dddddd;
        }
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
    span:nth-child(2){
        i{
            color: #159beb;
        }
    }
  }
}

</style>
<template>
  <div class="xiadan">
    <header>
      <em @click="showtab('fanhui')">&lt;</em>
      {{msg.xduse.ctName}}{{xianshi}}
      <i>规则说明</i>
    </header>
    <section>

      <div class="xdtop">
        <p>
          <i>合约名称</i>
          <em>{{msg.xduse.ctName}}</em>
        </p>
        <p>
          <i>合约编码</i>
          <em>{{msg.xduse.ctCode}}</em>
        </p>
      </div>

      <div class="xdcen">
        <p>
          <i style="color:#00d08d;">{{msg.xdmai}}</i>
          <em>
            <b @click="jian(1)">-</b>
            <span>{{shoushu}}手</span>
            <strong @click="jia(1)">+</strong>
          </em>
        </p>
        <p>
          <i>履约保证金<img src="../assets/img/jingao.png" alt=""></i>
          <em>
            <span :class="{tab:index==num}" @click="tab(index)" v-for="(item, index) in msg.xdsj.bonds" :key="index">{{item.bdAmount}}</span>
            <!-- <span :class="{tab:1==aaa}" @click="tab(1)">500</span>
            <span :class="{tab:2==aaa}" @click="tab(2)">1000</span>
            <span :class="{tab:3==aaa}" @click="tab(3)">2000</span> -->
          </em>
        </p>
        <p>
          <i>止盈跳数<img src="../assets/img/jingao.png" alt=""></i>
          <em>
            <b @click="jian(2)">-</b>
            <span>{{zhiyin}}</span>
            <strong @click="jia(2)">+</strong>
          </em>
        </p>
        <p>
          <i>止损跳数<img src="../assets/img/jingao.png" alt=""></i>
          <em>
            <b @click="jian(3)">-</b>
            <span>{{zhicun}}</span>
            <strong @click="jia(3)">+</strong>
          </em>
        </p>
      </div>

      <div class="xdbot">
        <p>
          <i>
            <b>交易综合费</b>
            <strong>（开仓当天不收取递延费）</strong>
          </i>
          <em>{{msg.xdsj.gdOnpdage}}元/手</em>
        </p>
        <p>
          <i>
            <b>递延费</b>
            <strong>（开仓当天不收取递延费，持仓过夜之后按天收取）</strong>
          </i>
          <em>0元</em>
        </p>
      </div>

    </section>
    <footer>
      
      <i>
        <b>合计:</b>
        <strong>￥{{heji}}</strong>
        <span>可用资金:{{(msg.xdsj.usBalance).toFixed(2)}}</span>
      </i>
      <em @click="btn()">确定</em>

    </footer>
  </div>
</template>

<script>
import { open } from '@/api/getdata'
export default {
  data () {
    return {
      msg:{},
      num:0,
      shoushu:1,
      zhiyin:0,
      zhicun:0,
      heji:0
    }
  },
  created () {
    var that=this
    this.$root.Bus.$on('send',function(val){
      that.msg=val
      console.log(that.msg)
    })
  },
  computed: {
    xianshi(){
      this.zhiyin=this.msg.xdsj.bonds[this.num].bdWin
      this.zhicun=this.msg.xdsj.bonds[this.num].bdLoss
      this.heji=((this.msg.xdsj.bonds[this.num].bdAmount+this.msg.xdsj.gdOnpdage)*this.shoushu).toFixed(2); 
    }
  },
  mounted () {
  },
  methods: {
    showtab(val){
      if(val=='fanhui'){
        this.$emit('showtab','details')
      }
    },
    jian(num){
      if(num==1){
        if(this.shoushu>1){
          this.shoushu--
        }
      }else if(num==2){
        if(this.zhiyin>this.msg.xdsj.bonds[this.num].bdWin){
          this.zhiyin=this.zhiyin-this.msg.xdsj.gdValue
        }
      }else if(num==3){
        if(this.zhicun>1){
          this.zhicun=this.zhicun-this.msg.xdsj.gdValue
        }
      }
    },
    jia(num){
      if(num==1){
        this.shoushu++
      }else if(num==2){
        this.zhiyin=this.zhiyin+this.msg.xdsj.gdValue
      }else if(num==3){
        if(this.zhicun<this.msg.xdsj.bonds[this.num].bdLoss){
          this.zhicun=this.zhicun+this.msg.xdsj.gdValue
        }
      }
    },
    tab(index){
      this.num=index
    },
    btn(){
      let params={};
      params={
        hoCtid: this.msg.xduse.ctId,
        hoType: this.msg.xdmai,
        hoNum: this.shoushu,
        bdWin: this.zhiyin,
        bdLoss: this.zhicun,
        hoFixamount: this.msg.xdsj.bonds[this.num].bdAmount,
        hoDevice: '小米'
      }
      open(params).then((res) => {
        console.log(res)
        if(res.result){
          alert('下单成功')
          this.$router.push('/order')
        }
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.xiadan{
  display: flex;
  flex-direction: column;
  height:100vh;
  
  header{
    line-height: .85rem;
    height: .85rem;
    font-size: .32rem;
    color: #202020;
    text-align: center;
    overflow: hidden;
    background: #f9f9f9;
    border-bottom: 1px solid #dddddd;
    position: relative;
    em{
      position: absolute;
      left: .24rem;
      font-size: .4rem;
      color: #8f8f91;
    }
    i{
      position: absolute;
      color: #8f8f91;
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
    .xdtop{
      background: #fff;
      margin-bottom: .2rem;
      p{
        height: .8rem;
        margin: 0 .25rem;
        line-height: .8rem;
        border-bottom: 1px solid #e4e4e4;
        i{
          color: #605f6e;
        }
        em{
          float: right;
          font-weight: 700;
          color: #373642;
        }
      }
      p:last-child{
        border: 0;
      }
    }
    .xdcen{
      background: #fff;
      margin-bottom: .2rem;
      p{
        height: .8rem;
        margin: 0 .25rem;
        line-height: .8rem;
        border-bottom: 1px solid #e4e4e4;
        i{
          color: #605f6e;
          float: left;
          img{
            float: right;
            height: .28rem;
            margin-left: .1rem;
            margin-top: .26rem;
          }
        }
        em{
          float: right;
          line-height: .58rem;
          text-align: center;
          margin-top: .12rem;
          b{
            float: left;
            width: .58rem;
            line-height: .5rem;
            height: .58rem;
            color: #dddddd;
            border: 1px solid #dddddd;
            font-size: .6rem;
          }
          span{
            float: left;
            width: 1.58rem;
            height: .58rem;
            border-top: 1px solid #dddddd;
            border-bottom: 1px solid #dddddd;
          }
          strong{
            float: left;
            width: .58rem;
            line-height: .5rem;
            height: .58rem;
            color: #dddddd;
            border: 1px solid #dddddd;
            font-size: .5rem;
          }
        }
      }
      p:nth-child(2){
        em{
          margin-top: .15rem;
          span{
            width: 1.1rem;
            height: .48rem;
            line-height: .48rem;
            border: 1px solid #a7a7a8;
            border-radius: .03rem;
            margin-left: .15rem;
          }
          .tab{
            background: #159beb;
            border: 1px solid #159beb;
            color: #fff;
          }
        }
      }
      p:last-child{
        border: 0;
      }
    }
    .xdbot{
      background: #fff;
      margin-bottom: .2rem;
      p{
        height: .8rem;
        margin: 0 .25rem;
        line-height: .8rem;
        border-bottom: 1px solid #e4e4e4;
        i{
          color: #605f6e;
          float: left;
          line-height: .38rem;
          b{
            display: block;
          }
          strong{
            display: block;
            color: #a2a2a3;
            text-indent: -.1rem;
          }
        }
        em{
          float: right;
          font-weight: 700;
          color: #373642;
        }
      }
      p:last-child{
        border: 0;
      }
    }
  }

  footer{
    background: #fff;
    border-top: .01rem solid rgb(173, 173, 173);
    height: .98rem;
    text-align: center;
    overflow: hidden;
    i{
      float: left;
      height: .98rem;
      line-height: .98rem;
      b{
        margin-left: .2rem;
        font-size: .3rem;
        font-weight: 700;
      }
      strong{
        color: #ff424d;
        font-size: .3rem;
        font-weight: 700;
      }
      span{
        color: #6d6d6d;
        margin-left: .1rem;
      }
    }
    em{
      height: .98rem;
      line-height: .98rem; 
      float: right;
      width: 2.5rem;
      background: #159beb;
      color: #fff;
      font-size: .29rem;
    }
  }
}
</style>

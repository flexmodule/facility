<template>
  <div class="hydetails">
    <header>
      <em @click="showtab('fanhui')">&lt;</em>
      {{hydetail.ctName}}{{watchsj}}
      <i>规则说明</i>
    </header>
    <section>

      <ul class="hyxq">
        <li>
          <i style="color:red;">
            <b>最新价</b>
            <strong>{{hydetail.price}}</strong>
          </i>
          <em>
            <b>成交量</b>
            <strong>{{hydetail.dealAmount}}</strong>
          </em>
        </li>
        <li>
          <i>
            <b>涨跌</b>
            <strong>{{hydetail.gainPrice}}</strong>
          </i>
          <em>
            <b>涨幅</b>
            <strong>{{hydetail.gainRate}}%</strong>
          </em>
        </li>
        <li>
          <i>
            <b>最高</b>
            <strong>{{hydetail.highPrice}}</strong>
          </i>
          <em>
            <b>最低</b>
            <strong>{{hydetail.lowPrice}}</strong>
          </em>
        </li>
        <li>
          <i>
            <b>开盘</b>
            <strong>{{hydetail.openPrice}}</strong>
          </i>
          <em>
            <b>昨收</b>
            <strong>{{hydetail.preInPrice}}</strong>
          </em>
        </li>
        <li>
          <i>
            <b>持仓量</b>
            <strong>{{hydetail.holdAmount}}</strong>
          </i>
          <em>
            <b>昨结</b>
            <strong>{{hydetail.preSettlementPrice}}</strong>
          </em>
        </li>
      </ul>

    </section>
    <footer>
      
      <div class="foott">
        <i>账户可用资金：</i>
        <em style="color:red;">9000.00</em>
      </div>
      <div class="footb">
        <i @click="showtab('zhang')">
          <b>{{hydetail.buyPrice}}</b>
          <strong>买涨</strong>
        </i>
        <em @click="showtab('die')">
          <b>{{hydetail.sellPrice}}</b>
          <strong>买跌</strong>
        </em>
      </div>

    </footer>
  </div>
</template>

<script>
import { openData } from '@/api/getdata'
export default {
  props: ["hydetail"],
  data () {
    return {
      detail:{},
      tab:''
    }
  },
  computed: {
    watchsj(){
      this.detail=this.hydetail
      console.log(this.detail)
    }
  },
  mounted () {
  },
  methods: {
    showtab(val){
      if(val=='fanhui'){
        this.$emit('showtab','home')
      }else if(val=='zhang'){
        let params={};
        let data=this.hydetail.ctId
        openData(data,params).then((res) => {
          console.log(res)
          this.$root.Bus.$emit('send',{xduse:this.hydetail,xdsj:res.data,xdmai:'买涨'})
        })
        this.$emit('showtab','xiadan')
      }else if(val=='die'){
        let params={};
        let data=this.hydetail.ctId
        openData(data,params).then((res) => {
          console.log(res)
          this.$root.Bus.$emit('send',{xduse:this.hydetail,xdsj:res.data,xdmai:'买跌'})
        })
        this.$emit('showtab','xiadan')
      }
      
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.hydetails{
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
    .hyxq{
      li{
        height: .72rem;
        background: #fff;
        border-bottom: 1px solid #eceef4;
        i{
          float: left;
          height: .72rem;
          width: 50%;
          line-height: .72rem;
          b{
            float: left;
            height: .72rem;
            line-height: .72rem;
            padding-left: .27rem;
          }
          strong{
            float: right;
            height: .72rem;
            line-height: .72rem;
            padding-right: .27rem;
          }
        }
        em{
          float: left;
          height: .72rem;
          width: 50%;
          line-height: .72rem;
          b{
            float: left;
            height: .72rem;
            line-height: .72rem;
            border-left: 1px solid #eceef4;
            padding-left: .27rem;
          }
          strong{
            float: right;
            height: .72rem;
            line-height: .72rem;
            padding-right: .27rem;
          }
        }
      }
    }
  }

  footer{
    background: #f2f6f8;
    border-top: .01rem solid rgb(173, 173, 173);
    height: 1.95rem;
    text-align: center;
    overflow: hidden;
    .foott{
      height: .8rem;
      background: #fff;
      margin-bottom: .18rem;
      i{
        float: left;
        margin-left: .23rem;
        height: .8rem;
        line-height: .8rem;
      }
      em{
        float: right;
        margin-right: .23rem;
        height: .8rem;
        line-height: .8rem;
      }
    }
    .footb{
      height: .98rem;
      color: #fff;
      font-size: .27rem;
      i{
        float: left;
        width: 50%;
        height: .98rem;
        background: #ff424d;
      }
      em{
        float: left;
        width: 50%;
        height: .98rem;
        background: #00d08d;
      }
      b{
        display: block;
        margin-top: .15rem;
      }
    }
  }
}
</style>

<template>
  <div class="systemSet">
    <div class="title"><i @click="switchMy">&lt;</i><span>系统设置</span></div>
    <div class="systemSet-t">
      <div class="systemSet-t-child">
        <p @click="passwordSet">
          <span>密码设置</span>
          <b>&gt;</b>
        </p>
      </div>
      <div class="systemSet-t-child">
        <p>
          <span>通用</span>
          <b>&gt;</b>
        </p>
      </div>
    </div>
    <div class="systemSet-b">
      <div class="systemSet-b-child">
        <p>
          <span>求助反馈</span>
          <b>&gt;</b>
        </p>
      </div>
      <div class="systemSet-b-child">
        <p>
          <span>关于我们</span>
          <b>&gt;</b>
        </p>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  methods: {
    switchMy() {
      this.$router.push("/my");
    },
    passwordSet() {
      this.$router.push("/passwordSet");
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.systemSet {
  background: #f2f6f8;
  min-height: 100vh;
}
.title {
  font: .3rem/.86rem "";
  background: #f9f9f9;
  text-align: center;
  border-bottom: 0.01rem solid #eeeeee;
  i {
    float: left;
    margin-left: .3rem;
    font: 0.4rem/.86rem "";
  }
}
.systemSet-t {
  margin: 0.2rem 0;
}
.systemSet-t,
.systemSet-b {
  border-top: 0.01rem solid #eeeeee;
  border-bottom: 0.01rem solid #eeeeee;
  background: #fff;
  .systemSet-t-child,
  .systemSet-b-child {
    display: flex;
    i {
      font-size: 0;
      margin: 0 0.3rem;
      margin-top: 0.18rem;
      width: 0.48rem;
      height: 0.48rem;
      img {
        width: 100%;
      }
    }
    p {
      font: 0.3rem/.86rem "";
      flex: 1;
      margin-left: .3rem;
      border-bottom: 0.01rem solid #eeeeee;
      b {
        float: right;
        margin-right: 0.29rem;
        font: 0.4rem/.86rem "";
        color: #c7c7cb;
      }
    }
  }
}
.systemSet-t {
  .systemSet-t-child {
    &:nth-child(2) {
      p {
        border: 0;
      }
    }
  }
}
.systemSet-b {
  .systemSet-b-child {
    &:nth-child(2) {
      p {
        border: 0;
      }
    }
  }
}
</style>
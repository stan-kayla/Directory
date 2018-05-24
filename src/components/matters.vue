<template>
  <section id="matters" class="matters">
    <div class="matters-container">
      <p v-for="(message,index) in messages" :key="index"><i>*</i>{{ message | trim }}</p>
    </div>
  </section>
</template>
<script>
  export default {
    name: 'Matters',
    props: {
      messages: {
        type: Array,
        default () { // 默认值设为arr或obj时要用function返回默认值
          return [
            '请保证以上信息的准确性',
            '3个工作日内我们会对已提交的资料进行审核，请保持电话的畅通',
            '如果有疑问请致电 400-1919-119'
          ]
        }
      }
    },
    filters: {
      trim (value) {
        if (typeof value !== 'string') {
          return ''
        } else {
          return value.trim()
        }
      }
    }
  }
</script>
<style lang="scss" scoped>
  .matters {
    text-align: center;
    .matters-container {
      display: inline-block;
    }
    p {
      text-align: left;
      font-size: 14px;
      color: #929292;
      margin: 0 0;
      i {
        font-family: 'simsun';
        color: #FD0000;
        font-style: normal;
        padding-right: 4px;
      }
    }
  }
</style>

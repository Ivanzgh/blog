# UI 库

## Ant Design of Vue

### 表单

校验时隐藏 label 前面的红色星号 `:hide-required-mark="true"`

#### 表单校验

```vue
<template>
  <a-form :form="form">
    <a-form-item label="姓名">
      <a-input
        size="large"
        placeholder="联系人姓名"
        v-decorator="['username', personalRegister.username]"
      ></a-input>
    </a-form-item>
  </a-form>
</template>
<script>
import { personalRegister } from '@/utils/validator'
</script>
```

在validator.js中封装校验规则

```js
/**
 * 手机号自定义校验
 * @param {*} rule
 * @param {*} value
 * @param {*} callback
 */
function validatePhone(rule, value, callback) {
  const phone = value.replace(/\s/g, '')
  const regs = /^((13[0-9])|(17[0-1,6-8])|(15[^4,\\D])|(18[0-9]))\d{8}$/
  if (!regs.test(phone)) {
    callback('请输入正确的手机号')
  }
  callback()
}

const personalRegister = {
  username: { rules: [{ required: true, message: '请输入姓名' }] },
  password: {
    rules: [
      { required: true, message: '请输入登录密码', whitespace: true },
      { min: 6, max: 16, message: '密码长度为6-16位' }
    ]
  },
  email: {
    rules: [
      { type: 'email', message: '邮箱格式不正确!' },
      { required: true, message: '请输入邮箱地址!' }
    ]
  }
  phone: { rules: [{ required: true, message: '请输入手机号' }, { validator: validatePhone }] },
  authCode: { rules: [{ required: true, message: '请输入验证码' }] },
  residence: { rules: [{ type: 'array', required: true, message: '请选择所属地区!' }] }
}

module.exports = { personalRegister }
```

#### 气泡卡片

注册时填写密码，给出气泡卡片提示，根据输入位数更改进度条颜色和标题

```vue
<template>
  <a-form
    :form="form"
    :label-col="{ span: 6 }"
    :wrapper-col="{ span: 18 }"
    @submit="handleSubmit"
  >
    <a-form-item label="登录密码">
      <a-popover trigger="focus" placement="right">
        <template slot="title">
          <span :style="passwordLength < 8 ? 'color:#f00' : 'color:#0f0'"
            >强度: {{ passPower }}</span
          >
          <a-progress
            :percent="percent"
            size="small"
            :showInfo="false"
            status="active"
            :strokeColor="passwordLength < 8 ? '#f00' : '#0f0'"
          />
        </template>
        <template slot="content">
          <p>请至少输入6个字符。请不要使用容易</p>
          <p>被猜到的密码。</p>
        </template>
        <a-input
          size="large"
          placeholder="6-16位密码，区分大小写"
          @change="showTip"
          type="password"
          v-decorator="['password', validator]"
        ></a-input>
      </a-popover>
    </a-form-item>
  </a-form>
</template>

<script>
export default {
  data() {
    return {
      percent: 0,
      passPower: "0",
      passwordLength: 0,
      form: this.$form.createForm(this, { name: "register" }),
      validator: {
        rules: [
          { required: true, message: "请输入登录密码", whitespace: true },
          { min: 6, max: 16, message: "密码长度为6-16位" },
        ],
      },
    };
  },
  methods: {
    showTip() {
      this.$nextTick(() => {
        let val = this.form.getFieldValue("password");
        this.passwordLength = val.length;
        this.percent = (val.length / 16) * 100;
        if (val.length >= 6 && val.length < 8) {
          this.passPower = "太短";
        }
        if (val.length >= 8) {
          this.passPower = "安全";
        }
      });
    },
    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (!err) {
          console.log(values);
        }
      });
    },
  },
};
</script>

<style scoped lang="less"></style>
```

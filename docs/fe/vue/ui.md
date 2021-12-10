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

在 validator.js 中封装校验规则

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

#### 踩坑

1、表单赋值报错

场景：点击编辑按钮，弹出模态框，给模态框中的表单赋值

错误提示： `Warning: You cannot set a form field before rendering a field associated with the value.`

原因： 在表单还没渲染完成，就给表单赋值。使用了`setFieldsValue`方法，例如：`this.form.setFieldsValue({ name: 'zgh', age: 23 })`

解决：

1）、表单需要什么字段就传什么，可少传，不能多传

2）、使用`nextTick()`

```js
this.$nextTick(() => {
  this.form.setFieldsValue({ name: 'zgh', age: 23 })
})
```

如果还不行就加一个`setTimeout()`

```js
this.$nextTick(() => {
  setTimeout(() => {
    this.form.setFieldsValue({ name: 'zgh', age: 23 })
  })
})
```

2、表单回填数据

- 下拉框类型，如果显示数字即 value 值，可将回填的字段值改为 `string` 类型，即`toString()`

#### 气泡卡片

注册时填写密码，给出气泡卡片提示，根据输入位数更改进度条颜色和标题

```vue
<template>
  <a-form :form="form" :label-col="{ span: 6 }" :wrapper-col="{ span: 18 }" @submit="handleSubmit">
    <a-form-item label="登录密码">
      <a-popover trigger="focus" placement="right">
        <template slot="title">
          <span :style="passwordLength < 8 ? 'color:#f00' : 'color:#0f0'">
            强度: {{ passPower }}
          </span>
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
      passPower: '0',
      passwordLength: 0,
      form: this.$form.createForm(this, { name: 'register' }),
      validator: {
        rules: [
          { required: true, message: '请输入登录密码', whitespace: true },
          { min: 6, max: 16, message: '密码长度为6-16位' }
        ]
      }
    }
  },
  methods: {
    showTip() {
      this.$nextTick(() => {
        let val = this.form.getFieldValue('password')
        this.passwordLength = val.length
        this.percent = (val.length / 16) * 100
        if (val.length >= 6 && val.length < 8) {
          this.passPower = '太短'
        }
        if (val.length >= 8) {
          this.passPower = '安全'
        }
      })
    },
    handleSubmit(e) {
      e.preventDefault()
      this.form.validateFields((err, values) => {
        if (!err) {
          console.log(values)
        }
      })
    }
  }
}
</script>

<style scoped lang="less"></style>
```

### 表格

#### 设置表格序号

实现表格序号自增

```js
{
  "title": "序号",
  "dataIndex": "index",
  "key": "index",
  "width": "20%",
  "customRender": (text, record, index) => `${index + 1}`
}
```

使用`customRender`函数来渲染序号的数据，在`customRender`函数中：

- `text` 表示是序号一列默认显示的数据
- `record` 表示是一行的所有数据
- `index` 表示 Table 表格数据的下标，也就是数组的下标

因为数组的下标是从 0 开始的，所以需要 +1

#### columns 配置

```js
{
  title: '名称',
  dataIndex: 'name',  // 数据字段
  key: 'name',
  ellipsis: true,   // 文字超出显示省略
  width: '12%',
  scopedSlots: { customRender: 'verifyStatus' },    // 插槽
  sorter: (a, b) => a.name.length - b.name.length   // 排序
}
```

#### 表格行点击事件

```js
<a-table :columns="colMain" :data-source="colMainData" :rowKey="row => row.id" :pagination="false" :customRow="clickRow"></a-table>

 /**
  * 点击表格的某一行
  */
  clickRow(record, index) {
    return {
      on: {
        click: () => {
          console.log(record, index)
        }
      }
    }
  }
```

### 分割线

```js
<a-divider orientation="left">请求信息</a-divider>
<a-card :bordered="false" class="showContent"></a-card>
```

```css
/deep/ .ant-divider-horizontal {
  margin: 16px 0 0 0;
  font-weight: 600;
}
/deep/ .ant-divider-horizontal.ant-divider-with-text-left::before {
  width: 0;
}
```

### 折叠面板

折叠面板内容在被隐藏时默认是不会渲染 DOM 结构，设置`:forceRender='true'`即可。
例如面板内容是表单时，不打开时是无法获取数据的

### 日期选择器

#### 年度选择器

```vue
<template>
  <a-date-picker
    mode="year"
    placeholder="请选择年份"
    format="YYYY"
    :open="isopen"
    @openChange="openChange"
    @panelChange="panelChange"
    v-decorator="['date']"
  />
</template>

<script>
export default {
  data() {
    return {
      isOpen: false
    }
  },
  methods: {
    // 年份选择器
    openChange(e) {
      this.isOpen = e ? true : false
    },
    panelChange(e) {
      this.form.setFieldsValue({ date: e })
      this.isOpen = false
    }
  }
}
</script>
```

#### 设置范围

例如设置当天以前的 30 天可选，结束时间要大于开始时间

```vue
<template>
  <div>
    <a-date-picker
      show-time
      v-model="value"
      :disabled-date="disabledDate"
      format="YYYY-MM-DD HH:mm:ss"
      @change="onChange"
    />

    <div>
      <a-date-picker
        v-model="startValue"
        :disabled-date="disabledStartDate"
        show-time
        format="YYYY-MM-DD HH:mm:ss"
        placeholder="开始时间"
        @openChange="handleStartOpenChange"
      />
      <span style="padding: 0 7px;">-</span>
      <a-date-picker
        v-model="endValue"
        :disabled-date="disabledEndDate"
        show-time
        format="YYYY-MM-DD HH:mm:ss"
        placeholder="结束时间"
        :open="endOpen"
        @openChange="handleEndOpenChange"
      />
    </div>
  </div>
</template>

<script>
import moment from 'moment'

export default {
  data() {
    return {
      moment,
      value: null,
      startValue: null,
      endValue: null,
      endOpen: false
    }
  },
  methods: {
    disabledDate(current) {
      // 获取本月开始结束时间
      // const monthStart = this.moment().startOf('month')
      // const monthEnd = this.moment().endOf('month')
      // 设置区间之外的日期不可选
      return current > this.moment() || current < this.moment().subtract(30, 'days')
    },

    // 设置日期范围
    disabledStartDate(current) {
      return current > this.moment() || current < this.moment().subtract(30, 'days')
    },
    disabledEndDate(current) {
      return current > this.moment() || current < this.startValue
    },
    handleStartOpenChange(open) {
      if (!open) {
        this.endOpen = true
      }
    },
    handleEndOpenChange(open) {
      this.endOpen = open
    }
  }
}
</script>
```

### 描述

当描述信息太多需要独占一行时，可以单独使用描述组件。
若使用一个组件，可以使用一个空的`<a-descriptions-item />`占位，但是不会占满一行

```vue
<template>
  <a-descriptions :column="1">
    <a-descriptions-item label="泊位中文名称">{{ berthInfo.berthCnName }}</a-descriptions-item>
  </a-descriptions>
  <a-descriptions :column="2">
    <a-descriptions-item label="泊位英文名称">{{ berthInfo.berthEnName }}</a-descriptions-item>
    <a-descriptions-item label="泊位缩写">{{ berthInfo.berthSimpleName }}</a-descriptions-item>
    <a-descriptions-item label="泊位长度(米)">{{ berthInfo.berthLength }}</a-descriptions-item>
    <a-descriptions-item label="泊位结构">{{ berthInfo.berthStructure }}</a-descriptions-item>
  </a-descriptions>
</template>
```

# ProComponents

## ProForm

### ProFormText.Password 警告没有唯一 id

```tsx
<ProFormText.Password name="password" label="密码" />
```

如果使用了密码输入框，可能会在控制台出现类似警告信息：`[DOM] Found 2 elements with non-unique id #username`，出现了两个 id 相同的 dom 元素

解决方式：给 ProForm 添加一个 name 属性，名称唯一

```tsx
<ProForm name="modalForm"></ProForm>
```

### ProFormDigit

金额保留 6 位小数

```tsx
<ProFormDigit
  name="money"
  label="金额"
  rules={[{ required: true, message: '请输入' }]}
  min={0}
  max={detailData.money}
  fieldProps={{
    onChange: (e: any) => {
      if (e) {
        let amountString = e.toString();
        if (amountString.includes('.')) {
          let decimalPlaces = amountString.split('.')[1].length;
          if (decimalPlaces > 6) {
            let res = parseFloat(e).toFixed(6);
            form.setFieldValue('money', res);
          }
        }
      }
    }
  }}
/>
```

## 日期时间

### 设置默认值

```tsx
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
dayjs.extend(customParseFormat);

form.setFieldsValue({
  auditTime: values.auditTime || dayjs(dayjs().format('YYYY-MM-DD'), 'YYYY-MM-DD')
});

const onFinish = async (values: any) => {
  if (!form.getFieldValue('auditTime')) {
    values.auditTime = dayjs().format('YYYY-MM-DD');
  } else {
    values.auditTime = dayjs(form.getFieldValue('auditTime')).format('YYYY-MM-DD');
  }
};

<ProFormDatePicker
  name="auditTime"
  label="受理日期"
  rules={[{ required: true, message: '请选择' }]}
  fieldProps={{ format: 'YYYY-MM-DD' }}
/>;
```

## ProTable

<https://procomponents.ant.design/components/table>

## 常用列配置

| 属性         | 描述                   | 类型    | 默认值 |
| ------------ | ---------------------- | ------- | ------ |
| hideInTable  | 在 Table 中不展示此列  | boolean |        |
| hideInSearch | 在查询表单中不展示此项 | boolean |        |

### 重置刷新表格

`actionRef`，初始化的参数，可以操作 table

重新刷新表格：`actionRef.current?.reload();`
重置表格：`actionRef.current?.reset();`

```tsx
import { useRef } from 'react';
import { ActionType, ProTable } from '@ant-design/pro-components';

const actionRef = useRef<ActionType>();

<ProTable<API.ApplicationProp> actionRef={actionRef} rowKey="appId" />;
```

### 添加序号

```tsx
    {
      title: '序号',
      width: 50,
      hideInSearch: true,
      fixed: 'left',
      render: (text, record, index) => `${index + 1}`
    }
```

## 可展开表格设置默认展开

antd 文档：<https://ant.design/components/table-cn#expandable>

`defaultExpandAllRows` 表示初始时是否展开所有行。但是该属性只在第一次 render 的时候生效，所以异步加载的数据无法实现默认展开

> defaultExpandAll 在异步加载数据时为何不生效？
>
> default 前缀属性只有在初始化时生效，因而异步加载数据时 defaultExpandAll 已经执行完成。你可以通过受控 expandedKeys 或者在数据加载完成后渲染 Tree 来实现全部展开

如果使用的是 antd，则在有数据后再渲染

```tsx
{
  treeData && <Table dataSource={treeData} />;
}
```

如果使用的是 ProTable，现在 useEffect 中获取表格数据，有了数据之后再渲染表格，处理数据拿到需要展开的 keys，赋值给 `defaultExpandedRowKeys`即可

这种方案存在两个问题：

1. 调了两遍接口，浪费服务器资源
2. 在获取需要默认展开的 keys 时，expandedKeys 存在多余的数据。比如理想数据是 [1, 3]，但是实际上打印出来的是 [1, 3, 1, 3]

```tsx
import { useState, useEffect } from 'react';
import { PageContainer, ProTable } from '@ant-design/pro-components';
import { getAllPower } from '@/services/system/powertype';

const PowerTypeTableList = () => {
  const [defaultExpandedRowKeys, setDefaultExpandedRowKeys] = useState<number[]>([]);

  const getDefaultExpandedKeys = async () => {
    const msg = await getAllPower();
    let expandedKeys: number[] = [];
    const render = (data: System.PowerTypeListItem) => {
      if (Array.isArray(data)) {
        data.forEach((item) => {
          if (Array.isArray(item.children)) {
            expandedKeys.push(item.powerId);
            render(item.children);
          }
        });
      }
      return expandedKeys;
    };

    setDefaultExpandedRowKeys(render(msg.data));
  };

  useEffect(() => {
    getDefaultExpandedKeys();
  }, []);

  return (
    <PageContainer>
      {defaultExpandedRowKeys.length > 0 && (
        <ProTable<System.PowerTypeListItem>
          rowKey="powerId"
          expandable={{ defaultExpandedRowKeys: defaultExpandedRowKeys }}
          request={async (params) => {
            const msg = await getAllPower({ ...params });
            return {
              data: msg.data,
              success: msg.code === 0
            };
          }}
        />
      )}
    </PageContainer>
  );
};

export default PowerTypeTableList;
```

## 表格翻页后记住之前选择的数据

1. `const [selectedRowIds, setSelectedRowIds] = useState<number[]>([]);`
2. 设置 ProTable 的`rowKey`属性，唯一值，一般为 id。此处设置 `rowKey="roleId"`
3. 设置 `rowSelection={rowSelection}`
4. rowSelection 的配置项：
   `preserveSelectedRowKeys`表示当数据被删除时仍然保留选项的 key

配合 onChange 使用，设置选中项

```tsx
const rowSelection = {
  selectedRowKeys: selectedRowIds,
  preserveSelectedRowKeys: true,
  onChange: (selectedRowKeys: any) => {
    setSelectedRowIds(selectedRowKeys);
  }
};
```

示例代码表示在一个对话框中显示表格，勾选后给账户绑定角色，完整代码如下：

```tsx
import { FormattedMessage, useIntl } from '@umijs/max';
import { Modal } from 'antd';
import type { ProColumns } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import { Space } from 'antd';
import { getRoleTypeList } from '@/services/system/roletype';
import { useEffect, useState } from 'react';
import { getAccountDetail } from '@/services/system/account';

const columns: ProColumns<System.RoleTypeListItem>[] = [
  {
    title: <FormattedMessage id="roletype.roleId" />,
    dataIndex: 'roleId',
    width: 80
  },
  {
    title: <FormattedMessage id="roletype.roleName" />,
    dataIndex: 'roleName'
  },
  {
    title: <FormattedMessage id="roletype.roleCode" />,
    dataIndex: 'roleCode'
  },
  {
    title: <FormattedMessage id="roletype.roleNote" />,
    dataIndex: 'roleNote',
    hideInSearch: true,
    ellipsis: true
  }
];

export type AuthRoleFormProps = {
  onCancel: (flag?: boolean, formVals?: any) => void;
  onSubmit: (values: any) => Promise<void>;
  open: boolean;
  values: Partial<System.RoleTypeListItem>;
};

const AuthRoleForm = (props: AuthRoleFormProps) => {
  const intl = useIntl();
  const [selectedRowIds, setSelectedRowIds] = useState<number[]>([]);

  const getDetail = async () => {
    if (!props.values.accountId) return;
    const res = await getAccountDetail('edit', props.values.accountId);
    const { roleType } = res.data;
    if (roleType) {
      const ids = roleType.map((e: any) => e.roleId);
      if (ids) {
        setSelectedRowIds(ids);
      }
    }
  };

  useEffect(() => {
    getDetail();
  }, [props.values.accountId]);

  const rowSelection = {
    selectedRowKeys: selectedRowIds,
    preserveSelectedRowKeys: true,
    onChange: (selectedRowKeys: any) => {
      console.log(selectedRowKeys);
      setSelectedRowIds(selectedRowKeys);
    }
  };

  const handleOk = () => {
    props.onSubmit(selectedRowIds);
  };
  const handleCancel = () => {
    props.onCancel();
  };

  return (
    <Modal
      width={900}
      title={intl.formatMessage({ id: 'system.account.auth.role' })}
      open={props.open}
      destroyOnClose
      forceRender
      onOk={handleOk}
      onCancel={handleCancel}
    >
      <ProTable<System.RoleTypeListItem>
        rowKey="roleId"
        columns={columns}
        rowSelection={rowSelection}
        tableAlertRender={({ selectedRowKeys, selectedRows }) => {
          return (
            <Space size={24}>
              <span>已选 {selectedRowKeys.length} 项</span>
              <span>{`角色名称: ${selectedRows?.map((row) => row?.roleName).join('、')}`}</span>
            </Space>
          );
        }}
        options={false}
        search={false}
        request={async (params) => {
          const msg = await getRoleTypeList({ page: params.current, size: params.pageSize }, { ...params });
          return {
            data: msg.data.list,
            success: msg.code === 0,
            total: msg.data.count
          };
        }}
        pagination={{ pageSize: 5 }}
      />
    </Modal>
  );
};

export default AuthRoleForm;
```

# Ant Design

## 全家桶

- [Ant Design of React](https://ant.design/docs/react/introduce-cn)
- [Umi](https://umijs.org)
- [Ant Design Pro](https://pro.ant.design/zh-CN)
- [ProComponents](https://procomponents.ant.design)
- [ProLayout](https://prolayout.ant.design)
- [ahooks](https://ahooks.js.org/zh-CN)
- [dvajs](https://dvajs.com)

## 如何使用主题变量

[定制主题](https://ant.design/docs/react/customize-theme-cn)

在 `ConfigProvider` 中传入 `theme` 属性，可以配置主题

### 修改主题变量

通过 theme 中的 token 属性，可以修改主题变量

```tsx
import { Button, ConfigProvider } from 'antd';

const App = () => {
  return (
    <>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: '#00b96b',
            borderRadius: 2
          }
        }}
      >
        <Button type="primary">btn</Button>
      </ConfigProvider>
    </>
  );
};

export default App;
```

### 修改组件变量

除了整体的 Design Token，各个组件也会开放自己的 Component Token 来实现针对组件的样式定制能力。

例如修改表格组件的默认样式：

```tsx
import { Table, ConfigProvider } from 'antd';

const App = () => {
  return (
    <>
      <ConfigProvider
        theme={{
          components: {
            Table: {
              headerBg: 'transport',
              headerColor: '#fff',
              borderColor: '#004670',
              rowHoverBg: '#00b96b'
            }
          }
        }}
      >
        <Table bordered columns={columns} dataSource={Data} />
      </ConfigProvider>
    </>
  );
};

export default App;
```

## Button 组件的 hidden 属性

在做按钮权限时，发现 Button 组件有一个 hideen 属性可以控制显示隐藏，这个属性没有在文档上体现

```tsx
<Button
  type="primary"
  key="new"
  hidden={!access.hasPerms('system:user:new')}
  onClick={() => {
    history.push('/client/new');
  }}
>
  <PlusOutlined /> <FormattedMessage id="pages.searchTable.new" />
</Button>
```

在控制台调试按钮元素发现有一个 `display: none` 样式，但是并未生效，被覆盖了

解决方法：在`app.tsx`引入 `import 'antd/dist/reset.css';`

参考地址：<https://github.com/ant-design/ant-design/issues/38732>

## Tree 树形组件

### 默认展开全部

如果直接设置`defaultExpandAll`为 true，并不会出现默认展开全部的效果。这是因为数据一般是由服务端获取的，初始时节点还没生成，需要等数据回来再设置

### 选中回显

使用`checkedKeys`属性，在 useEffect 里获取需要回显的数据

`defaultCheckedKeys`一般用于直接给定的数据，实际上很多情况都是服务端返回的数据

配合 onCheck 事件设置选中的值。注意`checkStrictly`属性表示父子节点是否关联，在 onCheck 里获取数据的形式不一样

```tsx
import { useIntl } from '@umijs/max';
import { Modal, Tree } from 'antd';
import type { TreeProps } from 'antd/es/tree';
import { useEffect, useState } from 'react';
import { getOrgTree } from '@/services/system/organization';
import { getOrgIdsByAppId } from '@/services/api/appStore';

export type RoleTypeFormData = Record<string, unknown> & Partial<System.RoleTypeListItem>;

export type RoleTypeFormProps = {
  onCancel: (flag?: boolean, formVals?: RoleTypeFormData) => void;
  onSubmit: (values: number[]) => Promise<void>;
  open: boolean;
  values: Partial<System.RoleTypeListItem>;
  lastUpdatedBy: string;
};

const AuthOrg = (props: RoleTypeFormProps) => {
  const intl = useIntl();
  const [treeData, setTreeData] = useState<any[]>([]);
  const [checkedKeyList, setCheckedKeyList] = useState<any[]>([]);

  const init = async () => {
    try {
      const tree = await getOrgTree();
      setTreeData(tree.data);
      const orgs = await getOrgIdsByAppId(props.values.appId);
      setCheckedKeyList(orgs.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!props.values.appId) return;
    if (props.lastUpdatedBy === 'org') {
      init();
    }
  }, [props.values.appId, props.lastUpdatedBy]);

  const handleOk = () => {
    props.onSubmit(checkedKeyList);
  };
  const handleCancel = () => {
    props.onCancel();
  };

  const onCheck: TreeProps['onCheck'] = (checkedKeys) => {
    if (!Array.isArray(checkedKeys)) {
      setCheckedKeyList(checkedKeys.checked);
    }
  };

  return (
    <Modal
      width={600}
      title={intl.formatMessage({ id: 'application.authOrg' })}
      open={props.open}
      destroyOnClose
      onOk={handleOk}
      onCancel={handleCancel}
    >
      {treeData.length > 0 && (
        <Tree
          checkable
          blockNode
          multiple={true}
          checkStrictly={true}
          defaultExpandAll={true}
          fieldNames={{ title: 'orgName', key: 'orgId' }}
          treeData={treeData}
          onCheck={onCheck}
          checkedKeys={checkedKeyList}
        />
      )}
    </Modal>
  );
};

export default AuthOrg;
```

### 获取所有父节点

需求是在无用户交互的情况下，根据服务端返回的叶子节点的 id 数组来获取所有父级节点的 id。需要遍历这个数组，针对每个叶子节点，找到其对应的所有父节点

```tsx
import { useEffect } from 'react';
import { Tree } from 'antd';

const MyComponent = () => {
  // 树的数据
  const treeData = [];

  // 假设是服务端返回的叶子节点的 id 数组
  const leafNodeIds = ['leafNodeId1', 'leafNodeId2', 'leafNodeId3'];

  const filterParentNodes = () => {
    const findParentNodes = (nodes, targetId) => {
      let parentNodes = [];
      for (let node of nodes) {
        if (node.children) {
          const childNodes = findParentNodes(node.children, targetId);
          if (childNodes.length > 0) {
            parentNodes = [...parentNodes, node.key, ...childNodes];
          }
        }
        if (targetId.includes(node.key)) {
          parentNodes.push(node.key);
        }
      }
      return parentNodes;
    };

    let parentNodes = [];
    for (let leafNodeId of leafNodeIds) {
      parentNodes = [...parentNodes, ...findParentNodes(treeData, leafNodeId)];
    }
    parentNodes = Array.from(new Set(parentNodes)); // 去重

    // 过滤掉 leafNodeIds 中的叶子节点
    // parentNodes = parentNodes.filter((nodeId) => !leafNodeIds.includes(nodeId));

    console.log('父节点的 id:', parentNodes);
  };

  useEffect(() => {
    filterParentNodes();
  }, [treeData, leafNodeIds]);

  return (
    <div>
      <Tree checkable treeData={treeData} />
    </div>
  );
};

export default MyComponent;
```

## 自定义面包屑

业务场景：

多层级表格，点击下一级按钮进入下一级页面，但是表头不变，只是内容变化了。这个时候就需要显示层级路径，如：`a / a-1 / a-2 / a-3`，点击每一个面包屑节点还需要切换表格数据，并改变面包屑

```tsx
import { useState, useRef } from 'react';

const TableList = () => {
  const actionRef = useRef<ActionType>();
  const [parentId, setParentId] = useState<number>(0);
  const [breadcrumbData, setBreadcrumbData] = useState<any[]>([]);

  const onClickBreadcrumb = (pid: number) => {
    const lastNode = breadcrumbData[breadcrumbData.length - 1];

    if (pid === 0) {
      setBreadcrumbData([]);
    } else {
      if (lastNode.key === pid) return;
      setBreadcrumbData((sb) => {
        let key = sb.findIndex((idx: any) => idx.key === pid);
        let res = sb.slice(0, key + 1);
        return res;
      });
    }

    setParentId(pid);
    actionRef.current?.reloadAndRest?.();
  };

  // 列配置
  const columns = [
    {
      title: '操作列',
      dataIndex: 'option',
      width: 90,
      fixed: 'right',
      align: 'center',
      valueType: 'option',
      render: (_, record) => [
        <a
          key="cluster"
          onClick={async () => {
            const hasTop = breadcrumbData.find((b) => b.key === 0);
            if (hasTop) {
              setBreadcrumbData((item: any) => [
                ...item,
                {
                  title: record.name,
                  key: record.id,
                  onClick: () => onClickBreadcrumb(record.id as number)
                }
              ]);
            } else {
              setBreadcrumbData([
                {
                  title: '全部',
                  key: 0,
                  onClick: () => onClickBreadcrumb(0)
                },
                {
                  title: record.name,
                  key: record.id,
                  onClick: () => onClickBreadcrumb(record.id as number)
                }
              ]);
            }

            setParentId(record.id as number);
            actionRef.current?.reloadAndRest?.();
          }}
        >
          下级管理
        </a>
      ]
    }
  ];

  const BreadcrumbLink = () => {
    return (
      <>
        {breadcrumbData.map((item, index) => (
          <>
            <span
              style={{ color: 'rgba(0, 0, 0, 0.45)', fontSize: '14px', cursor: 'pointer' }}
              key={item.key}
              onClick={() => onClickBreadcrumb(item.key as number)}
            >
              {item.title}
            </span>
            {index !== breadcrumbData.length - 1 && (
              <span style={{ marginInline: '8px', color: 'rgba(0, 0, 0, 0.45)' }}>/</span>
            )}
          </>
        ))}
      </>
    );
  };

  return (
    <PageContainer>
      <ProTable headerTitle={<BreadcrumbLink />} actionRef={actionRef} />
    </PageContainer>
  );
};
```

## 两个独立的日期时间选择框限制范围

```tsx
import { useState } from 'react';
import { DatePicker } from 'antd';
import dayjs from 'dayjs';

function DateRangePicker() {
  const defaultStartDate = dayjs('2023-09-05 14:58:20', 'YYYY-MM-DD HH:mm:ss');
  const defaultEndDate = dayjs('2023-09-06 18:28:10', 'YYYY-MM-DD HH:mm:ss');

  const [startDate, setStartDate] = useState(defaultStartDate);
  const [endDate, setEndDate] = useState(defaultEndDate);

  const disabledStartDate = (current) => {
    // 限制只能选择当前月份
    // const minDate = dayjs('2023-09-01', 'YYYY-MM-DD');
    // const maxDate = dayjs('2023-09-30', 'YYYY-MM-DD');
    // return current && (current.isBefore(minDate) || current.isAfter(maxDate) || current.isAfter(endDate));
    return current && current.isAfter(endDate);
  };

  const disabledEndDate = (current) => {
    // const minDate = dayjs('2023-09-01', 'YYYY-MM-DD');
    // const maxDate = dayjs('2023-09-30', 'YYYY-MM-DD');
    // return current && (current.isBefore(minDate) || current.isAfter(maxDate) || current.isBefore(startDate));
    return current && current.isBefore(startDate);
  };

  const disabledStartTime = (_, type) => {
    if (type === 'start') {
      return {
        disabledHours: () => [],
        disabledMinutes: () => [],
        disabledSeconds: () => []
      };
    }
    return {};
  };

  const disabledEndTime = (_, type) => {
    if (type === 'end') {
      return {
        disabledHours: () => [],
        disabledMinutes: () => [],
        disabledSeconds: () => []
      };
    }
    return {};
  };

  const handleStartDateChange = (date) => {
    setStartDate(date);
    if (date && endDate && date.isAfter(endDate)) {
      setEndDate(date);
    }
  };

  const handleEndDateChange = (date) => {
    setEndDate(date);
    if (date && startDate && date.isBefore(startDate)) {
      setStartDate(date);
    }
  };

  return (
    <div>
      <DatePicker
        format="YYYY-MM-DD HH:mm:ss"
        showTime={{ format: 'HH:mm:ss' }}
        value={startDate}
        onChange={handleStartDateChange}
        disabledDate={disabledStartDate}
        disabledTime={disabledStartTime}
      />
      <DatePicker
        format="YYYY-MM-DD HH:mm:ss"
        showTime={{ format: 'HH:mm:ss' }}
        value={endDate}
        onChange={handleEndDateChange}
        disabledDate={disabledEndDate}
        disabledTime={disabledEndTime}
      />
    </div>
  );
}

export default DateRangePicker;
```

## 走马灯自定义箭头，点击预览

走马灯增加前进、后退的箭头，点击图片后可以放大预览

```tsx
<Carousel arrows prevArrow={<LeftOutlined />} nextArrow={<RightOutlined />}>
  {listData.map((e: any, i: number) => (
    <div className="w-full h-[500px]" key={i}>
      <Image style={{ width: '100%', height: '100%' }} src={e.url} preview={{ src: e.url, mask: '' }} />
    </div>
  ))}
</Carousel>
```

```less
.ant-image {
  width: 100%;
  height: 100%;
}

.ant-carousel .slick-prev,
.ant-carousel .slick-prev:hover,
.ant-carousel .slick-prev:focus {
  font-size: 30px;
  left: 10px;
  z-index: 2;
  color: #fff;
}

.ant-carousel .slick-next,
.ant-carousel .slick-next:hover,
.ant-carousel .slick-next:focus {
  font-size: 30px;
  right: 20px;
  z-index: 2;
  color: #fff;
}
```

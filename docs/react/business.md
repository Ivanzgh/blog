# 业务

## 组件共享数据，如何避免相互影响

场景：在父组件中有 A 和 B 组件，且有 A 和 B 两个按钮，希望在点击 A 按钮时更新 data 并触发 A 组件的方法，但不触发 B 组件的方法；在点击 B 按钮时更新 data 并触发 B 组件的方法，但不触发 A 组件的方法

如果 A 和 B 组件共享同一个 data 数据，那么无论哪个组件的 useEffect 监听 values（即 data）的变化，都会触发相应的方法

一个可行的方案：在父组件中为 A 和 B 组件创建一个状态，用于标识当前是 A 按钮触发的数据更新还是 B 按钮触发的数据更新。然后，在 useEffect 中根据这个状态来决定是否执行方法。

```tsx
import React, { useState, useEffect } from 'react';

const ParentComponent = () => {
  const [data, setData] = useState(/* 初始的 data 值 */);
  const [lastUpdatedBy, setLastUpdatedBy] = useState(null); // 记录最后更新的按钮

  const handleAButtonClick = () => {
    const newData = /* 计算新的 data 值 */;
    setData(newData);
    setLastUpdatedBy('A');
  };

  const handleBButtonClick = () => {
    const newData = /* 计算新的 data 值 */;
    setData(newData);
    setLastUpdatedBy('B');
  };

  return (
    <div>
      <button onClick={handleAButtonClick}>Click A</button>
      <button onClick={handleBButtonClick}>Click B</button>
      <A values={data} lastUpdatedBy={lastUpdatedBy} />
      <B values={data} lastUpdatedBy={lastUpdatedBy} />
    </div>
  );
};

const A = ({ values, lastUpdatedBy }) => {
  useEffect(() => {
    if (lastUpdatedBy === 'A') {
      // 在 A 组件的 useEffect 中执行 A 组件的方法
    }
  }, [values, lastUpdatedBy]);

  // A 组件的其它代码

  return (
    // A 组件的 JSX
  );
};

const B = ({ values, lastUpdatedBy }) => {
  useEffect(() => {
    if (lastUpdatedBy === 'B') {
      // 在 B 组件的 useEffect 中执行 B 组件的方法
    }
  }, [values, lastUpdatedBy]);

  // B 组件的其它代码

  return (
    // B 组件的 JSX
  );
};

export default ParentComponent;

```

## 后端返回二进制流展示图片

```ts
// 根据uuid预览照片
export async function getImgByUUID(params: { uuid: string; module: string }, options?: { [key: string]: any }) {
  return request<Global.API_RESPONSE_RESULT>('/icon/upload/download', {
    method: 'GET',
    params: { ...params },
    responseType: 'blob',
    ...(options || {})
  });
}
```

```tsx
import React, { useEffect, useState } from 'react';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import type { UploadChangeParam } from 'antd/es/upload';
import { message, Upload } from 'antd';
import styles from './BaseView.less';
import type { RcFile, UploadFile, UploadProps } from 'antd/es/upload/interface';
import { iconUpload, getImgByUUID } from '@/services/api/iconUpload';

const beforeUpload = (file: RcFile) => {
  const isPng = file.type === 'image/png';
  if (!isPng) {
    message.error('只能上传 PNG 格式!');
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error('图片必须小于 2MB!');
  }
  return isPng && isLt2M;
};

const AvatarView = ({ uuid, avatar }: { uuid: string; avatar: string }) => {
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState<string>(avatar);

  const getAvatar = async () => {
    const url = await getImgByUUID({ uuid, module: 'avatar' });

    const blob = new Blob([url]);
    const href = window.URL.createObjectURL(blob);
    setImageUrl(href);
  };

  const handleChange: UploadProps['onChange'] = (info: UploadChangeParam<UploadFile>) => {
    if (info.file.status === 'uploading') {
      setLoading(true);
      return;
    }
    if (info.file.status === 'done') {
      setLoading(false);
    }
  };

  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>上传头像</div>
    </div>
  );

  const customRequest = async ({ file }) => {
    const formData = new FormData();
    formData.append('file', file);
    const res = await iconUpload({ uuid, module: 'avatar' }, formData);

    if (res.code === 0) {
      getAvatar();
    }
  };

  useEffect(() => {
    getAvatar();
  }, []);

  return (
    <>
      <div style={{ textAlign: 'center', width: '144px', height: '144px' }}>
        <Upload
          name="avatar"
          listType="picture-circle"
          className={styles.avatar_uploader}
          showUploadList={false}
          beforeUpload={beforeUpload}
          onChange={handleChange}
          customRequest={customRequest}
        >
          {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%', height: '100%' }} /> : uploadButton}
        </Upload>
      </div>
    </>
  );
};

export default AvatarView;
```

## 输入框搜索做防抖功能

```tsx
import { useRef, useState } from 'react';
import { Input } from 'antd';

const Search = () => {
  const [seachResult, setSeachResult] = useState<any[]>([]);
  const searchInputEl = useRef(null);

  const getData = async (value: string) => {
    if (value === '') {
      setSeachResult([]);
      return;
    }
    const res: any = await getSearchInfo();
    setSeachResult(res.data);
  };

  const debounce = (fn: (key: string) => void, delay: number) => {
    let timer: any = null;
    return function (value: string) {
      clearTimeout(timer);
      timer = setTimeout(() => {
        fn(value);
      }, delay);
    };
  };

  const taskChange = debounce((value) => {
    getData(value);
  }, 500);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value: inputValue } = e.target;
    taskChange(inputValue);
  };

  return (
    <>
      <Input ref={searchInputEl} placeholder="请输入" allowClear onChange={handleChange} />
    </>
  );
};
export default Search;
```

## 树形结构搜索过滤

基于 antd 的 Tree 组件，实现树形结构搜索过滤功能。效果是搜索匹配到的节点数据，要把该节点所有的父节点和子节点全部返回。

关键就在给 treeData 赋值过程中

::: code-group

```tsx [AssetTree.tsx]
import { useEffect, useMemo, useState } from 'react';
import { Input, Tree } from 'antd';
import type { TreeProps } from 'antd/es/tree';
import Icon from '@ant-design/icons';
import { getZBTree } from '@/services/asset';
import searchIcon from '@/assets/images/search_icon.png';

type Props = {
  onSelectedValue: (key: any) => void;
};

const AssetTree = (props: Props) => {
  const [defaultData, setDefaultData] = useState<any[]>([]);
  const [selectedKey, setSelectedKey] = useState<number[]>([]);
  const [expandedKeys, setExpandedKeys] = useState<React.Key[]>([]);
  const [searchValue, setSearchValue] = useState<string>('');
  const [autoExpandParent, setAutoExpandParent] = useState<boolean>(true);
  const [dataList, setDataList] = useState<{ id: number; label: string }[]>([]);

  const arr: { id: number; label: string }[] = [];
  const generateList = (data: any[]) => {
    for (let i = 0; i < data.length; i++) {
      const node = data[i];
      arr.push({ id: node.id, label: node.label });
      if (node.children) {
        generateList(node.children);
      }
    }
    setDataList(arr);
  };

  // const initExpandedKeys = (data: any[]) => {
  //   const arr: number[] = [];
  //   const f = (data: any[]) => {
  //     for (let i = 0; i < data.length; i++) {
  //       const node = data[i];
  //       if (node.children) {
  //         arr.push(node.id);
  //         f(node.children);
  //       }
  //     }
  //   };
  //   f(data);
  //   setExpandedKeys(arr);
  // };

  function addDistrictLabel(data: any, item: { id: string; label: string }) {
    if (!data) return;
    for (let i = 0; i < data.length; i++) {
      data[i].district = { id: item.id, label: item.label };
      if (data[i].children) {
        addDistrictLabel(data[i].children, item);
      }
    }
  }

  const getData = async () => {
    try {
      const tree: any = await getZBTree();

      for (let i = 0; i < tree.data.length; i++) {
        tree.data[i].district = { id: tree.data[i].id, label: tree.data[i].label };
        addDistrictLabel(tree.data[i].children, tree.data[i]);
      }

      setDefaultData(tree.data);
      generateList(tree.data);
      // initExpandedKeys(tree.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const findOrgs = (arr: any[], key: string[]) => {
    const res: any[] = [];
    arr.forEach((obj) => {
      if (key.includes(obj.id)) {
        const info: any = {
          id: obj.id,
          label: obj.label,
          landType: obj.landType,
          landTypeId: obj.landTypeId,
          district: { id: obj.district.id, label: obj.district.label }
        };
        if (obj.gisLongitude && obj.gisLatitude) {
          info.coordinates = [obj.gisLongitude, obj.gisLatitude];
        }
        res.push(info);
      }
      if (obj.children && obj.children.length > 0) {
        const childRes = findOrgs(obj.children, key);
        res.push(...childRes);
      }
    });
    return res;
  };

  const onSelect: TreeProps['onSelect'] = (selectedKeys) => {
    const result = findOrgs(defaultData, selectedKeys as string[]);
    props.onSelectedValue(result);
    setSelectedKey(selectedKeys as number[]);
  };

  const getParentKey = (id: number, tree: any[]): React.Key => {
    let parentKey: React.Key;
    for (let i = 0; i < tree.length; i++) {
      const node = tree[i];
      if (node.children) {
        if (node.children.some((item: any) => item.id === id)) {
          parentKey = node.id;
        } else if (getParentKey(id, node.children)) {
          parentKey = getParentKey(id, node.children);
        }
      }
    }
    return parentKey!;
  };

  const onExpand = (newExpandedKeys: React.Key[]) => {
    setExpandedKeys(newExpandedKeys);
    setAutoExpandParent(false);
  };

  const onSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    const newExpandedKeys = dataList
      .map((item) => {
        if (item.label.indexOf(value) > -1) {
          return getParentKey(item.id, defaultData);
        }
        return null;
      })
      .filter((item, i, self): item is React.Key => !!(item && self.indexOf(item) === i));

    setExpandedKeys(() => (value ? newExpandedKeys : []));
    setSearchValue(value);
    setAutoExpandParent(true);
  };

  const treeData = useMemo(() => {
    const filterTree = (tree: any[], search: string) => {
      return tree.reduce((acc, node) => {
        // 检查节点标签是否包含搜索值
        const index = node.label.indexOf(search);
        const isMatched = index !== -1;

        // 递归筛选子项
        const filteredChildren = node.children ? filterTree(node.children, search) : [];

        // 如果节点匹配或其任何子节点匹配，那么将其包含在结果中
        if (isMatched || filteredChildren.length > 0) {
          // 高亮显示标签的匹配部分
          const label = isMatched ? (
            <span>
              {node.label.substring(0, index)}
              <span style={{ color: '#02C6FF' }}>{search}</span>
              {node.label.substring(index + search.length)}
            </span>
          ) : (
            node.label
          );

          // 1. 不返回匹配项的子节点
          // acc.push({ ...node, label, children: filteredChildren });

          // 2. 返回匹配项的子节点
          const newNode = { ...node, label };
          if (filteredChildren.length > 0) {
            newNode.children = filteredChildren;
          }
          acc.push(newNode);
        }

        return acc;
      }, []);
    };

    return filterTree(defaultData, searchValue);
  }, [defaultData, searchValue]);

  return (
    <>
      <Input
        prefix={<Icon component={() => <img src={searchIcon} width="18px" />} />}
        placeholder="请输入"
        allowClear
        onChange={onSearchChange}
      />

      {defaultData.length > 0 && (
        <Tree
          onExpand={onExpand}
          expandedKeys={expandedKeys}
          autoExpandParent={autoExpandParent}
          blockNode
          treeData={treeData}
          onSelect={onSelect}
          selectedKeys={selectedKey}
          fieldNames={{ title: 'label', key: 'id' }}
        />
      )}
    </>
  );
};

export default AssetTree;
```

```js [defaultData.js]
export const defaultData = [
  {
    id: '100',
    label: '东城区',
    children: [
      {
        id: 'a7bcc888-f0ae-4cf0-b7be-2c7d78863fbd',
        label: 'ZD0006 东城区东单北大街68号',
        children: null
      },
      {
        id: '8a6250ab-0e77-4529-a85a-26aed2bdcfdf',
        label: 'ZD0048 东城区金宝街金宝酒店',
        children: [
          {
            id: '8d5955ee-40a0-40ea-9366-6e9f42801143',
            label: 'ZD0048-DW-1 东城区遂安伯胡同21号',
            children: null
          }
        ]
      },
      {
        id: '6849d61b-6823-4fdb-8d28-3da2e38be2d8',
        label: 'ZD0181 东城区西打磨厂街怡莱酒店',
        children: [
          {
            id: '229ab090-f7df-4f98-9149-14f0feaf9e1e',
            label: 'ZD0181-DW-1 崇文区西打磨厂155号',
            children: null
          },
          {
            id: 'e39d9cc1-15cc-4f56-a70b-a10eaa3c939d',
            label: 'ZD0181-DW-2 崇文区西打磨厂155号南侧',
            children: null
          }
        ]
      }
    ]
  },
  {
    id: '200',
    label: '西城区',
    children: [
      {
        id: '5b52f281-7351-41c3-9528-ebc232b96d1a',
        label: 'ZD0018 西城区西四供电所变电七站',
        children: null
      },
      {
        id: 'f7dc540b-7e57-4f99-9c34-5c01d12bc390',
        label: 'ZD0083 宝产寺站',
        children: [
          {
            id: '207eb067-213f-47fc-92b0-7d1d9411aff6',
            label: 'ZD0083-DW-1 西城区宝产胡同36号',
            children: null
          },
          {
            id: '0fe0b438-bda9-47b5-acae-0fc5bfd65c88',
            label: 'ZD0083-DW-2 西城区宝产胡同36号',
            children: null
          }
        ]
      }
    ]
  }
];
```

:::

如果在搜索时要保留展示其余的节点，匹配到的节点要展开并且高亮，可以参考以下代码：

```tsx
const treeData = useMemo(() => {
  const filterTree = (data: any[]): any[] =>
    data.map((item) => {
      const strTitle = item.label as string;
      const index = strTitle.indexOf(searchValue);
      const beforeStr = strTitle.substring(0, index);
      const afterStr = strTitle.slice(index + searchValue.length);
      const label =
        index > -1 ? (
          <span>
            {beforeStr}
            <span style={{ color: '#02C6FF' }}>{searchValue}</span>
            {afterStr}
          </span>
        ) : (
          <span>{strTitle}</span>
        );
      if (item.children) {
        return { label, id: item.id, children: filterTree(item.children) };
      }
      return { label, id: item.id };
    });

  return filterTree(defaultData);
}, [searchValue, defaultData]);
```

## 使用本地字体

1. 将字体包放到项目的 `src/assets/fonts` 目录下，若没有 fonts 目录就新建一个。
2. 在`src/index.css` 全局样式中引入字体包：

```css
@font-face {
  font-family: 'YouSheBiaoTiHei';
  src: url(@/assets/font/YouSheBiaoTiHei.ttf);
}
```

3. 使用字体：

```css
.box {
  font-family: YouSheBiaoTiHei;
}
```

还有一种方式是在 fonts 目录下新建 font.css，内容同第 2 步，然后在 main.js 中引入：

```tsx
import '@/assets/font/font.css';
```

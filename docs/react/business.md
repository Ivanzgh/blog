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

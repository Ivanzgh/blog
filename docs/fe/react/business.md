# 业务

## 后端返回二进制流展示图片

````ts
// 根据uuid预览照片
export async function getImgByUUID(params: { uuid: string; module: string }, options?: { [key: string]: any }) {
  return request<Global.API_RESPONSE_RESULT>('/icon/upload/download', {
    method: 'GET',
    params: { ...params },
    responseType: 'blob',
    ...(options || {})
  });
}```

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
````

import React, { useEffect, useState } from 'react';
import { Table } from 'antd';
import { File } from '../../../types/file';
import { getAllFile } from '../../../http/file/file';

function FilePage() {
  const [categories, setCategories] = useState<File[]>([]);

  useEffect(() => {
    const doGetAllFile = async () => {
      const data = await getAllFile();
      setCategories(data);
    };
    doGetAllFile();
  }, []);

  const columns = [
    {
      key: 'id',
      title: 'ID',
      dataIndex: 'id',
    },
    {
      key: 'id',
      title: '文件路径',
      dataIndex: 'path',
    },
    {
      key: 'id',
      title: '文件名称',
      dataIndex: 'fileName',
    },
    {
      key: 'id',
      title: '文件大小',
      dataIndex: 'fileSize',
    },
  ];

  return (
    <div>
      <div
        style={{
          margin: '5px',
          padding: '5px 5px 200px 5px',
        }}
      >
        <Table columns={columns} dataSource={categories} rowKey="id" />
      </div>
    </div>
  );
}

export default FilePage;

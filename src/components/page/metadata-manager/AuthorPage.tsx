import React, { useEffect, useState } from 'react';
import { Author } from '../../../types/author';
import { getAllAuthor } from '../../../http/author/author';
import { Modal, Table } from 'antd';
import { EditOutlined } from '@ant-design/icons';

function AuthorPage() {
  const [authors, setAuthors] = useState<Author[]>([]);

  const [editingAuthor, setEditingAuthor] = useState<Author>();

  const [visible, setVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);

  const showModal = () => {
    setVisible(true);
  };

  const handleOk = () => {
    setConfirmLoading(true);
    setTimeout(() => {
      setVisible(false);
      setConfirmLoading(false);
    }, 2000);
  };

  const handleCancel = () => {
    console.log('Clicked cancel button');
    setVisible(false);
  };

  useEffect(() => {
    const doGetAllAuthor = async () => {
      const data = await getAllAuthor();
      setAuthors(data);
    };
    doGetAllAuthor();
  }, []);

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
    },
    {
      title: '名字',
      dataIndex: 'authorFirstName',
    },
    {
      title: '姓氏',
      dataIndex: 'authorLastName',
    },
    {
      title: '信息',
      dataIndex: 'authorInformations',
    },
    {
      title: '国籍',
      dataIndex: 'authorNation',
    },
    {
      title: '操作',
      render: () => (
        <EditOutlined
          onClick={() => {
            showModal();
            console.log('author:');
          }}
        />
      ),
    },
  ];

  return (
    <div>
      <div
        style={{
          margin: '5px',
          padding: '5px 5px 200px 5px',
          border: '1px solid #ccc',
        }}
      >
        <div className="text-center">
          <h4>所有作者列表</h4>
          <Table columns={columns} dataSource={authors} rowKey="id" />
        </div>
      </div>
      <Modal
        title="修改作者信息"
        visible={visible}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        作者信息：
      </Modal>
      editingAuthor: {editingAuthor}
    </div>
  );
}

export default AuthorPage;

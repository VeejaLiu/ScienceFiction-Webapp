import React, { useEffect, useState } from 'react';
import { Author } from '../../../types/author';
import { getAllAuthor, updateAuthor } from '../../../http/author/author';
import { Form, Input, Modal, Table } from 'antd';
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
    updateAuthor(editingAuthor).then((result) => {
      if (result === 'success') {
        setVisible(false);
        setConfirmLoading(false);
      }
    });
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
      key: 'id',
      title: 'ID',
      dataIndex: 'id',
    },
    {
      key: 'id',
      title: '名字',
      dataIndex: 'authorFirstName',
    },
    {
      key: 'id',
      title: '姓氏',
      dataIndex: 'authorLastName',
    },
    {
      key: 'id',
      title: '信息',
      dataIndex: 'authorInformations',
    },
    {
      key: 'id',
      title: '国籍',
      dataIndex: 'authorNation',
    },
    {
      key: 'id',
      title: '操作',
      render: (text: any, record: Author, index: any) => (
        <EditOutlined
          onClick={() => {
            setEditingAuthor(record);
            showModal();
            console.log('editingAuthor: ', editingAuthor);
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
        cancelText={'取消'}
        okText={'确认'}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        <Form name="basic" labelCol={{ span: 8 }} wrapperCol={{ span: 16 }} autoComplete="off">
          <Form.Item
            label="作者名字/全名"
            name="firstName"
            rules={[
              { required: true, message: '请输入作者的 名字 / 全名 / First Name / Full Name' },
            ]}
          >
            <Input
              defaultValue={editingAuthor?.authorFirstName}
              onChange={(event) => {
                const newAuthor: any = { ...editingAuthor };
                newAuthor.authorFirstName = event.target.value;
                setEditingAuthor(newAuthor);
              }}
            />
          </Form.Item>
          <Form.Item
            label="作者姓氏"
            name="lastName"
            rules={[{ message: '作者的 姓氏 / Last Name' }]}
          >
            <Input
              defaultValue={editingAuthor?.authorLastName || ''}
              onChange={(event) => {
                const newAuthor: any = { ...editingAuthor };
                newAuthor.authorLastName = event.target.value;
                setEditingAuthor(newAuthor);
              }}
            />
          </Form.Item>
          <Form.Item label="作者信息" name="information" rules={[{ message: '作者的简介/信息' }]}>
            <Input
              defaultValue={editingAuthor?.authorInformations || ''}
              onChange={(event) => {
                const newAuthor: any = { ...editingAuthor };
                newAuthor.authorInformations = event.target.value;
                setEditingAuthor(newAuthor);
              }}
            />
          </Form.Item>
          <Form.Item label="作者国籍" name="nation" rules={[{ message: '作者的国籍' }]}>
            <Input
              defaultValue={editingAuthor?.authorNation || ''}
              onChange={(event) => {
                const newAuthor: any = { ...editingAuthor };
                newAuthor.authorNation = event.target.value;
                setEditingAuthor(newAuthor);
              }}
            />
          </Form.Item>
        </Form>
      </Modal>
      editingAuthor.id: {editingAuthor?.id}
      <br />
      editingAuthor.authorFirstName: {editingAuthor?.authorFirstName}
      <br />
      editingAuthor.authorLastName: {editingAuthor?.authorLastName}
      <br />
      editingAuthor.authorInformations: {editingAuthor?.authorInformations}
      <br />
      editingAuthor.authorNation: {editingAuthor?.authorNation}
      <br />
    </div>
  );
}

export default AuthorPage;
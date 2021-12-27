import React, { useEffect, useState } from 'react';
import { Author } from '../../../types/author';
import { getAllAuthor, updateAuthor } from '../../../http/author/author';
import { Form, FormInstance, Input, Modal, Table } from 'antd';
import { EditOutlined } from '@ant-design/icons';

function AuthorPage() {
  const [authors, setAuthors] = useState<Author[]>([]);

  const [editingAuthor, setEditingAuthor] = useState<Author>();

  const form = React.createRef<FormInstance>();

  const [visible, setVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);

  const showModal = () => {
    setVisible(true);
  };

  const doGetAllAuthor = async () => {
    const data = await getAllAuthor();
    setAuthors(data);
  };

  const handleOk = async () => {
    setConfirmLoading(true);
    const result = await updateAuthor(editingAuthor);
    if (result === 'success') {
      setVisible(false);
      setConfirmLoading(false);
      await doGetAllAuthor();
    }
  };

  const handleCancel = () => {
    setVisible(false);
  };

  useEffect(() => {
    doGetAllAuthor().then();
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
      render: (text: any, record: Author) => (
        <EditOutlined
          onClick={() => {
            setEditingAuthor({ ...record });
            form.current?.setFieldsValue({ ...record });
            showModal();
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
        }}
      >
        <h4 className="text-center">所有作者列表</h4>
        <Table columns={columns} dataSource={authors} rowKey="id" />
      </div>
      <Modal
        title="修改作者信息"
        visible={visible}
        onOk={handleOk}
        cancelText={'取消'}
        okText={'确认'}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
        forceRender={true}
      >
        <Form
          name="basic"
          ref={form}
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          autoComplete="off"
          initialValues={editingAuthor}
        >
          <Form.Item
            label="作者名字/全名"
            name="authorFirstName"
            rules={[
              { required: true, message: '请输入作者的 名字 / 全名 / First Name / Full Name' },
            ]}
          >
            <Input
              placeholder={'名字 / 全名 / First Name / Full Name'}
              onChange={(event) => {
                const newAuthor: any = { ...editingAuthor };
                newAuthor.authorFirstName = event.target.value;
                setEditingAuthor(newAuthor);
              }}
            />
          </Form.Item>
          <Form.Item
            label="作者姓氏"
            name="authorLastName"
            rules={[{ message: '请输入作者的 姓氏 / Last Name' }]}
          >
            <Input
              placeholder={'姓氏 / Last Name'}
              onChange={(event) => {
                const newAuthor: any = { ...editingAuthor };
                newAuthor.authorLastName = event.target.value;
                setEditingAuthor(newAuthor);
              }}
            />
          </Form.Item>
          <Form.Item
            label="作者信息"
            name="authorInformations"
            rules={[{ message: '作者的简介/信息' }]}
          >
            <Input
              placeholder={'简介 / 信息'}
              onChange={(event) => {
                const newAuthor: any = { ...editingAuthor };
                newAuthor.authorInformations = event.target.value;
                setEditingAuthor(newAuthor);
              }}
            />
          </Form.Item>
          <Form.Item label="作者国籍" name="authorNation" rules={[{ message: '作者的国籍' }]}>
            <Input
              placeholder={'国籍'}
              onChange={(event) => {
                const newAuthor: any = { ...editingAuthor };
                newAuthor.authorNation = event.target.value;
                setEditingAuthor(newAuthor);
              }}
            />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

export default AuthorPage;

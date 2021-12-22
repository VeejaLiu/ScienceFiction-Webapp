import React, { useEffect, useState } from 'react';
import { getAllUser } from '../../../http/user/user';
import { User } from '../../../types/user';
import { Table } from 'antd';

function UserPage() {
  const [users, setUsers] = useState<User[]>([]);

  const columns = [
    {
      key: 'id',
      title: 'ID',
      dataIndex: 'id',
    },
    {
      key: 'id',
      title: '用户名',
      dataIndex: 'name',
    },
    {
      key: 'id',
      title: '昵称',
      dataIndex: 'nickname',
    },
    {
      key: 'id',
      title: '邮箱',
      dataIndex: 'email',
    },
  ];

  useEffect(() => {
    const doGetAllUser = async () => {
      const data = await getAllUser();
      console.log('data:', data);
      setUsers(data);
    };
    doGetAllUser();
  }, []);
  return (
    <div className="px-3" style={{ marginTop: '10px' }}>
      <div className="text-center">
        <h4>所有用户列表</h4>
        <Table columns={columns} dataSource={users} rowKey="id" />
      </div>
    </div>
  );
}

export default UserPage;

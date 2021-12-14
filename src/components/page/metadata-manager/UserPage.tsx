import React, { useEffect, useState } from 'react';
import { Spinner, Table } from 'reactstrap';
import { getAllUser } from '../../../http/user/user';
import { User } from '../../../types/user';

function UserPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const doGetAllUser = async () => {
      setIsLoading(true);
      const data = await getAllUser();
      console.log('data:', data);
      setUsers(data);
      setIsLoading(false);
    };
    doGetAllUser();
  }, []);
  return (
    <div className="px-3" style={{ marginTop: '10px' }}>
      <div className="text-center">
        <h4>所有用户列表</h4>
      </div>
      <div className="mb-3" style={{ margin: 'auto', width: '60%' }}>
        {isLoading ? (
          <div style={{ width: '3rem', height: '3rem', margin: '20px auto' }}>
            <Spinner style={{ width: '3rem', height: '3rem', color: '#355ca9' }} />
          </div>
        ) : users?.length ? (
          <Table style={{ marginTop: '10px' }}>
            <thead style={{ fontStyle: 'bold', backgroundColor: '#999' }}>
              <tr>
                <th>ID</th>
                <th>用户名</th>
                <th>昵称</th>
                <th>邮箱</th>
              </tr>
            </thead>
            <tbody>
              {users?.map((user) => (
                <tr>
                  <td>{user?.id}</td>
                  <td>{user?.name}</td>
                  <td>{user?.nickname}</td>
                  <td>{user?.email}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          <div style={{ color: '#AAA', textAlign: 'center', marginTop: '33vh' }}>
            未找到任何用户
          </div>
        )}
      </div>
    </div>
  );
}

export default UserPage;

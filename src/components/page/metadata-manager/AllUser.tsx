import React, { useEffect, useState } from 'react';
import { Spinner, Table } from 'reactstrap';
import { getAllUser } from '../../../http/user/user';
import { User } from '../../../types/user';

function AllUser() {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const doGetAllUser = async () => {
      setIsLoading(true);
      const data = await getAllUser();
      setUsers(data);
      setIsLoading(false);
    };
    doGetAllUser();
  }, []);
  return (
    <div className="px-3" style={{ fontFamily: 'Arial Black', marginTop: '10px' }}>
      <div className="text-center">
        <h3>Users</h3>
      </div>
      <div className="mb-3" style={{ margin: 'auto', width: '60%', fontFamily: 'Lucida' }}>
        {isLoading ? (
          <div style={{ width: '3rem', height: '3rem', margin: '20px auto' }}>
            <Spinner style={{ width: '3rem', height: '3rem', color: '#355ca9' }} />
          </div>
        ) : users?.length ? (
          <Table style={{ marginTop: '10px' }}>
            <thead style={{ fontSize: '20px', fontStyle: 'bold', backgroundColor: '#999' }}>
              <tr>
                <th>id</th>
                <th>Name</th>
                <th>NickName</th>
                <th>Email</th>
              </tr>
            </thead>
            <tbody>
              {users?.map((user) => (
                <tr>
                  <td>{user?.id}</td>
                  <td>{user?.name}</td>
                  <td>{user?.nickName}</td>
                  <td>{user?.email}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          <div style={{ textAlign: 'center', marginTop: '33vh', fontSize: 25 }}>
            No Result Found
          </div>
        )}
      </div>
    </div>
  );
}

export default AllUser;

import React, { useEffect, useState } from 'react';
import { getAllBook } from '../../../http/book/book';
import { Spinner, Table } from 'reactstrap';
import { Book } from '../../../types/book';

function BookPage() {
  const [books, setBooks] = useState<Book[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const doGetAllBook = async () => {
      setIsLoading(true);
      const data = await getAllBook();
      setBooks(data);
      setIsLoading(false);
    };
    doGetAllBook();
  }, []);

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
          <h4>所有书籍列表</h4>
        </div>
        <div className="mb-3" style={{ margin: 'auto', width: '60%' }}>
          {isLoading ? (
            <div style={{ width: '3rem', height: '3rem', margin: '20px auto' }}>
              <Spinner style={{ width: '3rem', height: '3rem', color: '#355ca9' }} />
            </div>
          ) : books?.length ? (
            <Table style={{ marginTop: '10px' }}>
              <thead style={{ fontStyle: 'bold', backgroundColor: '#999' }}>
                <tr>
                  <th>ID</th>
                  <th>名称</th>
                  <th>系列</th>
                  <th>作者</th>
                  <th>标签</th>
                  <th>图片</th>
                  <th>文件路径</th>
                </tr>
              </thead>
              <tbody>
                {books?.map((book) => (
                  <tr>
                    <td>{book?.id}</td>
                    <td>{book?.bookName}</td>
                    <td>{book?.bookCategory}</td>
                    <td>{book?.bookAuthor}</td>
                    <td>{book?.bookTags}</td>
                    <td>{book?.bookImages}</td>
                    <td>{book?.bookFilePath}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          ) : (
            <div style={{ color: '#AAA', textAlign: 'center', marginTop: '33vh' }}>
              未找到任何书籍
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default BookPage;

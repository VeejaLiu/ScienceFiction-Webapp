import React, { useEffect, useState } from 'react';
import { getAllBook } from '../../../http/book/book';
import { Book } from '../../../types/book';
import { Table } from 'antd';

function BookPage() {
  const [books, setBooks] = useState<Book[]>([]);

  useEffect(() => {
    const doGetAllBook = async () => {
      const data = await getAllBook();
      setBooks(data);
    };
    doGetAllBook();
  }, []);

  const columns = [
    {
      key: 'id',
      title: '书籍名字',
      dataIndex: 'bookName',
    },
    {
      key: 'id',
      title: '所属系列',
      dataIndex: 'bookCategory',
    },
    {
      key: 'id',
      title: '书籍作者',
      dataIndex: 'bookAuthor',
    },
    {
      key: 'id',
      title: '书籍标签',
      dataIndex: 'bookTags',
    },
    {
      key: 'id',
      title: '书籍图像',
      dataIndex: 'bookImages',
    },
    {
      key: 'id',
      title: '书籍文件路径',
      dataIndex: 'bookFilePath',
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
        <h4 className="text-center">所有书籍列表</h4>
        <Table columns={columns} dataSource={books} rowKey="id" />
      </div>
    </div>
  );
}

export default BookPage;

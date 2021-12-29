import React, { useEffect, useState } from 'react';
import { downloadBook, getAllBook } from '../../../http/book/book';
import { Book } from '../../../types/book';
import { Table } from 'antd';
import { DownloadOutlined } from '@ant-design/icons';

function BookPage() {
  const [books, setBooks] = useState<Book[]>([]);

  const doDownloadBook = async (id: number): Promise<any> => {
    return await downloadBook(id);
  };

  const openDownloadDialog = (url: any, fileName: any) => {
    if (typeof url === 'object' && url instanceof Blob) {
      url = URL.createObjectURL(url); // 创建blob地址
    }
    const aLink = document.createElement('a');
    aLink.href = url;
    aLink.download = fileName;
    aLink.click();
  };

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
      title: 'ID',
      dataIndex: 'id',
    },
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
    {
      key: 'id',
      title: '操作',
      render: (record: Book) => (
        <DownloadOutlined
          // download="测试.txt"
          onClick={async () => {
            console.log('record: ', record);
            const content = await doDownloadBook(record.id);
            var blob = new Blob(['\ufeff' + content], { type: 'text/txt,charset=UTF-8' });
            openDownloadDialog(blob, record.bookName + '.txt');
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
        <Table columns={columns} dataSource={books} rowKey="id" />
      </div>
    </div>
  );
}

export default BookPage;

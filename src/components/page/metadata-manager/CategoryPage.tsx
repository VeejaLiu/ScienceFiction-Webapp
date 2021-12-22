import React, { useEffect, useState } from 'react';
import { Table } from 'antd';
import { Category } from '../../../types/category';
import { getAllCategory } from '../../../http/category/category';

function CategoryPage() {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const doGetAllCategory = async () => {
      const data = await getAllCategory();
      setCategories(data);
    };
    doGetAllCategory();
  }, []);

  const columns = [
    {
      key: 'id',
      title: 'ID',
      dataIndex: 'id',
    },
    {
      key: 'id',
      title: '名称',
      dataIndex: 'categoryName',
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
        <h4 className="text-center">所有系列列表</h4>
        <Table columns={columns} dataSource={categories} rowKey="id" />
      </div>
    </div>
  );
}

export default CategoryPage;

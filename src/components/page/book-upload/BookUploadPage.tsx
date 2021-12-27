import React from 'react';
import { Button, Form, FormInstance, Input, Upload } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import { uploadBook } from '../../../http/book/book';

function BookUploadPage() {
  const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 14 },
  };

  const form = React.createRef<FormInstance>();

  const formData = new FormData();
  const normFile = (e: any) => {
    // 如果"书籍名称"为空，将上传文件的名字赋值给它
    const result = e.file?.name;
    form.current?.setFieldsValue({ book_name: result.replace('.txt', '') });
    formData.set('file', e.file);
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };

  const onFinish = async () => {
    formData.set('book_name', form.current?.getFieldValue('book_name'));
    formData.set('book_author', form.current?.getFieldValue('book_author'));
    await uploadBook(formData);
  };

  return (
    <div>
      <div style={{ margin: '5px', padding: '5px' }}>
        <Form ref={form} {...formItemLayout} onFinish={onFinish} encType={'multipart/form-data'}>
          <Form.Item label="书籍文件">
            <Form.Item name="dragger" valuePropName="fileList" getValueFromEvent={normFile} noStyle>
              <Upload.Dragger
                accept=".txt" // 只接受txt
                maxCount={1} // 最大上传数量为1
                name="files"
                beforeUpload={() => {
                  return false;
                }}
              >
                <p className="ant-upload-drag-icon">
                  <InboxOutlined />
                </p>
                <p className="ant-upload-text">单击或拖动文件到此区域以上传</p>
                <p className="ant-upload-hint">仅支持单个上传,仅支持.txt格式文件。</p>
              </Upload.Dragger>
            </Form.Item>
          </Form.Item>
          <Form.Item
            label="书籍名称"
            name="book_name"
            rules={[{ required: true, message: '请输入书籍名称!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="作者姓名"
            name="book_author"
            rules={[{ required: true, message: '请输入作者姓名!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item wrapperCol={{ span: 12, offset: 6 }}>
            <Button type="primary" htmlType="submit">
              提交
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}

export default BookUploadPage;

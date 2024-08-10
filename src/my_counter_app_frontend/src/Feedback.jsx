import React, { useState } from 'react';
import { Button, Form, Input, Result } from 'antd';

const Feedback = ({ setFeedbackData }) => {
  const [form] = Form.useForm();
  const [success, setSuccess] = useState(false);

  const onFinish = (values) => {
    console.log('Success:', values);
    setFeedbackData(values);
    setSuccess(true);
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div>
      {success ? ( // Show Result if success is true
        <Result
          status="success"
          title="Success!"
          subTitle="Thank you for filling out the form!"
          style={{ marginTop: 20 }}
        />
      ) : ( // Show the form if success is false
        <Form
          form={form}
          name="basic"
          layout="vertical"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          labelCol={{ style: { color: '#1890ff', fontWeight: 'bold', fontSize: 16 } }}
        >
          <Form.Item
            label="Name"
            name="name"
            rules={[{ required: true, message: 'Please fill this out!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Company"
            name="company"
            rules={[{ required: true, message: 'Please fill this out!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Occupation"
            name="occupation"
            rules={[{ required: true, message: 'Please fill this out!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Industry"
            name="industry"
            rules={[{ required: true, message: 'Please fill this out!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Comments"
            name="comments"
            rules={[{ required: true, message: 'Please fill this out!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      )}
    </div>
  );
};

export default Feedback;

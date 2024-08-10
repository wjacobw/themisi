import React, { useState, useEffect } from 'react';
import { Steps, Button, Form, Input, message } from 'antd';
import CSVUploader from './CSVUploader';
import Summary from './Summary';
import Feedback from './Feedback';

const { Step } = Steps;

const App = () => {
  const [current, setCurrent] = useState(0);
  const [form] = Form.useForm();
  const [informationData, setInformationData] = useState({});
  const [CSVData, setCSVData] = useState();
  const [feedbackData, setFeedbackData] = useState()


  const submitForm = () => {
    form.submit();
  }

  const onFinish = (values) => {
    console.log('Success:', values);
    setInformationData(values);
    setCurrent(current + 1);
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  const steps = [
    {
      title: 'Information',
      content: (
        <div style={{ display: 'flex', flexDirection: 'column', padding: 30 }}>
          <Form
            name="basic"
            layout="vertical"
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
            labelCol={{ style: { color: '#1890ff', fontWeight: 'bold', fontSize: 16 } }}
          >
            <Form.Item
              label="LLM"
              name="llm"
              rules={[{ required: true, message: 'Please fill this out!' }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Hyperparameters"
              name="hyperparameters"
              rules={[{ required: true, message: 'Please fill this out!' }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="No of epochs"
              name="epochs"
              rules={[{ required: true, message: 'Please fill this out!' }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Model evaluation"
              name="evaluation"
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
        </div>
      ),
    },
    {
      title: 'Upload',
      content: <CSVUploader setCSVData={setCSVData} />,
    },
    {
      title: 'Summary',
      content: <Summary/>
    },
    {
      title: 'Feedback',
      content: <Feedback setFeedbackData={setFeedbackData}/>
    }
  ];

  const next = () => {
    if (current == 1) {
      console.log("Submitting CSV file: ", CSVData);
    }
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  useEffect(() => {
    console.log("information data", informationData);
    console.log("csv data", CSVData);
  }, [informationData, CSVData])

  return (
    <div style={{padding: 30}}>
      <Steps current={current}>
        {steps.map((item) => (
          <Step key={item.title} title={item.title} />
        ))}
      </Steps>
      <div className="steps-content" style={{ marginTop: 20 }}>
        {steps[current].content}
      </div>
      <div className="steps-action" style={{ marginTop: 20 }}>
        {(current != 0 && current != steps.length-1) && (
          <Button type="primary" onClick={next}>
            Next
          </Button>
        )}
        {/* {current > 0 && (
          <Button style={{ margin: '0 8px' }} onClick={prev}>
            Previous
          </Button>
        )} */}
      </div>
    </div>
  );
};

export default App;

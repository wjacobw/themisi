import React, { useState } from 'react';
import { Upload, Button, Table, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import Papa from 'papaparse';

const CSVUploader = ({setCSVData}) => {
  const [data, setData] = useState([]);
  const [columns, setColumns] = useState([]);

  const handleFileUpload = (file) => {
    // Use PapaParse to parse the CSV file
    console.log(file);
    setCSVData(file);
    Papa.parse(file, {
      header: true, // Set to false if your CSV doesn't have headers
      skipEmptyLines: true,
      complete: (results) => {
        console.log('Parsed CSV Data:', results.data);
        // Update columns and data state
        if (results.data.length > 0) {
          const cols = Object.keys(results.data[0]).map((key) => ({
            title: key,
            dataIndex: key,
            key,
          }));
          setColumns(cols);
          setData(results.data);
        } else {
          message.error('No data found in the CSV file');
        }
      },
      error: (error) => {
        console.error('Error parsing CSV:', error);
        message.error('Error parsing CSV file');
      },
    });
    return false; // Prevent automatic upload
  };

  return (
    <div style={{padding: 30}}>
      <Upload
        beforeUpload={handleFileUpload}
        accept=".csv"
        showUploadList={false}
      >
        <Button icon={<UploadOutlined />}>Upload CSV</Button>
      </Upload>

      <Table
        dataSource={data}
        columns={columns}
        rowKey={(record) => record.id || Math.random()} // Add a unique key to each row
        style={{ marginTop: 20 }}
        pagination={{ pageSize: 5 }}
      />
    </div>
  );
};

export default CSVUploader;

import React, { useState } from "react";
import {
  Table,
  Input,
  InputNumber,
  Form,
  Row,
  Col,
  Button,
  DatePicker,
  Tag,
} from "antd";
import Search from "antd/es/input/Search";
import { useNavigate } from "react-router-dom";

const { RangePicker } = DatePicker;

const EditableCell = ({
  editing,
  dataIndex,
  title,
  inputType,
  record,
  index,
  children,
  ...restProps
}) => {
  const inputNode = inputType === "number" ? <InputNumber /> : <Input />;
  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{ margin: 0 }}
          rules={[
            {
              required: true,
              message: `Please Input ${title}!`,
            },
          ]}
        >
          {inputNode}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};

const PRList = () => {
  const [form] = Form.useForm();
  const [data, setData] = useState([
    {
      key: 1,
      number: "PR1001",
      created_date: "2023-10-20",
      plant: 1001,
      current_status: "open",
      level: "Procurement",
    },
    {
      key: 2,
      number: "PR1002",
      created_date: "2023-10-21",
      plant: 1002,
      current_status: "closed",
      level: "Finance",
    },
    {
      key: 3,
      number: "PR1003",
      created_date: "2023-10-22",
      plant: 1003,
      current_status: "re-open",
      level: "Stores",
    },
  ]);

  const navigation = useNavigate();

  const navigateToUrl = () => {
    navigation("/update");
  };

  const columns = [
    {
      title: "",
      dataIndex: "key",
      editable: false,
    },
    {
      title: "PR No.",
      dataIndex: "number",
      editable: false,
    },
    {
      title: "Created Date",
      dataIndex: "created_date",
      editable: true,
    },
    {
      title: "Plant",
      dataIndex: "plant",
      editable: true,
    },
    {
      title: "Current Status",
      dataIndex: "current_status",

      render: (_, record) => {
        switch (record.current_status) {
          case "open":
            return <Tag color="blue">Open</Tag>;
          case "closed":
            return <Tag color="green">Closed</Tag>;
          case "re-open":
            return <Tag color="purple">Re-Open</Tag>;
        }
      },
    },
    {
      title: "Level",
      dataIndex: "level",
      editable: true,
    },
    {
      title: "Action",
      dataIndex: "action",
      render: () => {
        return (
          <div>
            <Button type="primary">View</Button>
            <Button style={{ marginLeft: "1rem" }} onClick={navigateToUrl}>
              Update
            </Button>
          </div>
        );
      },
    },
  ];

  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }

    return {
      ...col,
      onCell: (record) => ({
        record,
        inputType: col.dataIndex === "age" ? "number" : "text",
        dataIndex: col.dataIndex,
        title: col.title,
      }),
    };
  });

  return (
    <>
      <Row gutter={[0, 24]}>
        <Col span={24}>
          <div
            style={{
              justifyContent: "right",
              display: "flex",
            }}
          >
            <div style={{ marginRight: "3rem" }}>
              <Search placeholder="Search" style={{ width: 200 }} />
            </div>

            <div>
              Filter By Date: {"\u00A0"}
              <RangePicker />
            </div>
          </div>
        </Col>

        <Col span={24}>
          <Form form={form} component={false}>
            <Table
              components={{
                body: {
                  cell: EditableCell,
                },
              }}
              bordered
              dataSource={data}
              columns={mergedColumns}
              rowClassName="editable-row"
              pagination={false}
            />
          </Form>
        </Col>
      </Row>
    </>
  );
};

export default PRList;

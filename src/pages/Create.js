import React, { useState } from "react";
import {
  Table,
  Input,
  InputNumber,
  Popconfirm,
  Form,
  Row,
  Col,
  Button,
  Select,
  Tooltip,
  Space,
} from "antd";
import { PlusOutlined } from "@ant-design/icons";

const { Option } = Select;

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

const EditableTable = () => {
  const [form] = Form.useForm();
  const [data, setData] = useState([
    {
      key: 1,
      number: 1,
      material_code: 3,
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
      quantity: 2,
    },
    {
      key: 2,
      number: 2,
      material_code: 4,
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
      quantity: 2,
    },
    {
      key: 3,
      number: 3,
      material_code: 32,
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
      quantity: 12,
    },
    {
      key: null,
      number: null,
      material_code: null,
      description: null,
      quantity: null,
    },
  ]);
  const [editingKey, setEditingKey] = useState("");

  const isEditing = (record) => record.key === editingKey;

  const edit = (record) => {
    form.setFieldsValue({ ...record });
    setEditingKey(record.key);
  };

  const cancel = () => {
    setEditingKey("");
  };

  const addNewMaterial = () => {
    const lastMaterialId = data[data.length - 2].key;

    const emptyMaterialObj = data[data.length - 1];

    let newMaterialId = lastMaterialId + 1;

    let newArrayWithoutEmptyObj = data.slice(0, -1);

    const newMaterial = {
      key: newMaterialId,
      number: newMaterialId,
      material_code: null,
      description: null,
      quantity: 0,
    };

    newArrayWithoutEmptyObj.push(newMaterial);
    newArrayWithoutEmptyObj.push(emptyMaterialObj);

    setData(newArrayWithoutEmptyObj);
  };

  const save = async (key) => {
    try {
      const row = await form.validateFields();
      const newData = [...data];
      const index = newData.findIndex((item) => key === item.key);

      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, { ...item, ...row });
        setData(newData);
        setEditingKey("");
      } else {
        newData.push(row);
        setData(newData);
        setEditingKey("");
      }
    } catch (errInfo) {
      console.log("Validate Failed:", errInfo);
    }
  };

  //comment

  const columns = [
    {
      title: "No",
      dataIndex: "number",
      width: "10%",
      editable: false,
    },
    {
      title: "Material Code",
      dataIndex: "material_code",
      width: "10%",
      editable: true,
    },
    {
      title: "Description",
      dataIndex: "description",
      width: "30%",
      editable: true,
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      width: "5%",
      editable: true,
    },
    {
      title: "Action",
      dataIndex: "action",
      width: "15%",
      render: (_, record) => {
        const editable = isEditing(record);
        return record.key === null ? (
          <span>
            <Tooltip title="  Add New Material">
              <Button
                type="primary"
                shape="circle"
                icon={<PlusOutlined />}
                onClick={addNewMaterial}
              />
            </Tooltip>
          </span>
        ) : editable ? (
          <span>
            <Button onClick={() => save(record.key)} style={{ marginRight: 8 }}>
              Save
            </Button>

            <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
              <Button onClick={cancel}>Cancel</Button>
            </Popconfirm>
          </span>
        ) : (
          <>
            <Button disabled={editingKey !== ""} onClick={() => edit(record)}>
              Edit
            </Button>
            <Popconfirm title="Sure to delete?" onConfirm={cancel}>
              <Button
                danger
                disabled={editingKey !== ""}
                style={{ marginLeft: "0.5rem" }}
              >
                Delete
              </Button>
            </Popconfirm>
          </>
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
        editing: isEditing(record),
      }),
    };
  });

  const onGenderChange = (value) => {
    switch (value) {
      case "male":
        form.setFieldsValue({
          note: "Hi, man!",
        });
        break;
      case "female":
        form.setFieldsValue({
          note: "Hi, lady!",
        });
        break;
      case "other":
        form.setFieldsValue({
          note: "Hi there!",
        });
        break;
      default:
    }
  };

  return (
    <>
      <Row gutter={[0, 16]}>
        <Col span={24}>
          <Row>
            <Col>
              <Form
                name="basic"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                style={{ maxWidth: 600 }}
                initialValues={{ remember: true }}
                autoComplete="off"
              >
                <Form.Item
                  label="PR Number"
                  name="pr_number"
                  rules={[{ message: "Please input your username!" }]}
                >
                  <Input />
                </Form.Item>
              </Form>
            </Col>
            <Col span={6} offset={2}>
              <Form.Item name="plant" label="Plant" rules={[{}]}>
                <Select
                  placeholder="Select Plant"
                  onChange={onGenderChange}
                  allowClear
                >
                  <Option value="0001">0001</Option>
                  <Option value="0002">0002</Option>
                  <Option value="0003">0003</Option>
                </Select>
              </Form.Item>
              <Form.Item
                noStyle
                shouldUpdate={(prevValues, currentValues) =>
                  prevValues.gender !== currentValues.gender
                }
              >
                {({ getFieldValue }) =>
                  getFieldValue("gender") === "other" ? (
                    <Form.Item
                      name="customizeGender"
                      label="Customize Gender"
                      rules={[
                        {
                          required: true,
                        },
                      ]}
                    >
                      <Input />
                    </Form.Item>
                  ) : null
                }
              </Form.Item>
            </Col>
          </Row>
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

        <Col span={24}>
          <div style={{ textAlign: "right" }}>
            <Space direction="vertical">
              <Space wrap>
                <Button type="primary">Create</Button>
                <Button>Update</Button>
                <Button>Cancel</Button>
              </Space>
            </Space>
          </div>
        </Col>
      </Row>
    </>
  );
};

export default EditableTable;

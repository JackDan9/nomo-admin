import React, { ReactElement, useEffect, useState } from 'react';
import StandardTable from '@/components/StandardTable';

import style from './index.less';
import { Button, DatePicker, Form, Grid, Input, Modal, Popconfirm, Select, Tag } from 'antd';
import RECURITE_API from '@/services/recurite';
import { default as dayjs } from 'dayjs';
import RECURITE_CONSTANT from './constant';

interface RecuriteProps {

}

function Recurite({props: RecuriteProps}): ReactElement {
  const [isRecuriteModalVisible, setIsRecuriteModalVisible] = useState<boolean>(false);
  const [initialFormValues, setInitialFormValues] = useState<any>({});
  const [formMode, setFormMode] = useState<string>("edit");
  const [modalTitle, setModalTitle] = useState<string>("编辑属性");
  const [recuriteForm] = Form.useForm();
  const [recuriteColumns, setRecuriteColumns] = useState<any>([
    {
      title: "序号",
      key: 'id',
      dataIndex: 'id'
    },
    {
      title: "排序",
      key: 'order',
      dataIndex: 'order',
      render: (text, record) => {
        return record.order === 0 ? "一级" : "二级"
      }     
    },
    {
      title: "公司名称",
      key: "title",
      dataIndex: "title"
    },
    {
      title: "描述",
      key: "summary",
      dataIndex: "summary"
    },
    {
      title: "描述富文本",
      key: "summary_html",
      dataIndex: "summary_html"
    },
    {
      title: "来源类型",
      key: "source_type",
      dataIndex: "source_type",
      render: (text, record) => (
        record.source_type === 0 ? <Tag color="#87d068">父级</Tag> : <Tag color="#2db7f5">子级</Tag>
      )
    },
    {
      title: "来源",
      key: "source_name",
      dataIndex: "source_name",
      render: (text, record) => (
        <Tag color="#108ee9">{record.source_name}</Tag>
      )
    },
    {
      title: "提交时间",
      key: "publish_at",
      dataIndex: "publish_at",
      render: (text, record) => {
        return dayjs(text).format("YYYY/MM/DD");
      }
    },
    {
      title: "创建时间",
      key: "created_at",
      dataIndex: "created_at",
      render: (text, record) => {
        return dayjs(text).format("YYYY/MM/DD");
      }
    },
    {
      title: "更新时间",
      key: "updated_at",
      dataIndex: "updated_at",
      render: (text, record) => {
        return dayjs(text).format("YYYY/MM/DD");
      },
    },
    {
      title: "操作",
      key: "operator",
      dataIndex: "operator",
      render: (text, record, rowIndex) => (
        <>
          <Button 
            className={style.editBtn} 
            type="primary" 
            onClick={() => handleEditRecurite(record)}>
            编辑
          </Button>
          <Popconfirm 
            title="确定删除？"
            okText="确定"
            cancelText="取消"
            onConfirm={() => handleDeleteRecurite(record)}>
            <Button 
              className={style.deleteBtn} 
              type="primary">
              删除
            </Button>
          </Popconfirm>
        </>
      )
    }
  ]);

  const [recuriteDataSource, setReccuriteDataSource] = useState<any>([]);

  const getRecuriteList = async () => {
    const params = {};
    const data:any = await RECURITE_API.getRecuriteList(params);
    console.log("data:", data);
    setReccuriteDataSource(data && data.rows);
  }

  useEffect(() => {
    getRecuriteList();
  }, [])

  /**  */
  const handleEditRecurite = (record:any) => {
    setFormMode("edit");
    setModalTitle("编辑招聘信息");
    setInitialFormValues(record);
    setIsRecuriteModalVisible(true);
  }

  const handleRecurite = async (formMode:string) => {
    const formData = await recuriteForm.validateFields();
    if(formMode === "create") {
      const params = {
        ...formData
      };
      const respData = await RECURITE_API.saveOrUpdateRecurite(params);
      if(respData) {
        setIsRecuriteModalVisible(false);
        getRecuriteList();
      }
    } else {
      const params = {
        ...formData,
        id: initialFormValues.id
      };
      const respData = await RECURITE_API.editRecurite(params);
      if(respData) {
        setIsRecuriteModalVisible(false);
        getRecuriteList();
      }
    }
  };

  /**
   * 创建信息
   */
  const handleCreateRecurit = async () => {
    setFormMode("create");
    setModalTitle("创建招聘信息");
    setInitialFormValues({});
    setIsRecuriteModalVisible(true);
  };
  /**
   * 
   * @param record 
   */
  const handleDeleteRecurite = async (record:any) => {
    const respData = await RECURITE_API.deleteRecurite({id: record.id});
    if(respData) {
      getRecuriteList();
    }
  };
  
  return (
    <div className={style.recuriteContainer}>
      <Modal
        title={modalTitle}
        visible={isRecuriteModalVisible}
        onCancel={() => setIsRecuriteModalVisible(false) }
        onOk={() => handleRecurite(formMode)}>
        <Form 
          name="wrap"
          labelCol={{ flex: "90px" }}
          labelAlign="right"
          wrapperCol={{ flex: 1 }}
          colon={false}
          form={recuriteForm}
          initialValues={initialFormValues}>
          <Form.Item label="排序" name="order" rules={[{required: true, message: "请选择排序"}]}>
            <Select
              placeholder="请选择排序">
              {
                RECURITE_CONSTANT["ORDER_LIST"].map((opt:any) => (
                  <Select.Option key={opt.key} value={opt.key}>{opt.label}</Select.Option>
                ))
              }
            </Select>
          </Form.Item>
          <Form.Item label="公司名称" name="title" rules={[{required: true, message: "请选择公司"}]}>
            <Select placeholder="请选择公司名称">
              {
                RECURITE_CONSTANT["COMPANY_LIST"].map((opt:any) => (
                  <Select.Option key={opt.key} value={opt.key}>
                    {opt.label}
                  </Select.Option>
                ))
              }
            </Select>
          </Form.Item>
          <Form.Item label="描述" name="summary" rules={[{required: true, message: "请填写描述"}]}>
            <Input.TextArea placeholder="请填写描述" />
          </Form.Item>
          <Form.Item label="描述富文本" name="summary_html" rules={[{required: true, message: "请填写描述富文本"}]}>
            <Input.TextArea placeholder="请填写描述" />
          </Form.Item>
          <Form.Item label="来源类型" name="source_type" rules={[{required: true, message: "请选择来源类型"}]}>
            <Select placeholder="请选择来源类型">
              {
                RECURITE_CONSTANT["SOURCE_TYPE"].map((opt: any) => (
                  <Select.Option key={opt.key} value={opt.key}>
                    {opt.label}
                  </Select.Option>
                ))
              }
            </Select>
          </Form.Item>
          <Form.Item label="来源" name="source_name" rules={[{required: true, message: "请填写来源"}]}>
            <Input placeholder="请填写来源" />
          </Form.Item>
          <Form.Item label="提交时间" name="publish_at" rules={[{required: true, message: "请选择提交时间"}]}>
            <DatePicker style={{width: '100%'}}></DatePicker>
          </Form.Item>
        </Form>
      </Modal>
      <div className={style.operatorContainer}>
        <Button className={style.createBtn} type="primary" onClick={() => handleCreateRecurit()}>
          创建
        </Button>
      </div>
      
      <StandardTable 
        key="id"
        border={true}
        columns={recuriteColumns}
        dataSource={recuriteDataSource}>
      </StandardTable>
    </div>
  )
} 

export default Recurite;

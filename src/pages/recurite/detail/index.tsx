import React, { ReactElement, useEffect, useState } from 'react';
import StandardTable from '@/components/StandardTable';

import style from './index.less';
import { Button, Form, Grid, Input, InputNumber, Modal, Popconfirm, Select, Tag, Tooltip } from 'antd';
import RECURITE_API from '@/services/recurite';
import { default as dayjs } from 'dayjs';
import RECURITE_DETAIL_CONSTANT from './constant';

interface RecuriteDetailListProps {

}

function RecuriteDetailList({props: RecuriteDetailListProps}): ReactElement {
  const [isRecuriteDetailsModalVisible, setIsRecuriteDetailsModalVisible] = useState<boolean>(false);
  const [initialFormValues, setInitialFormValues] = useState<any>({});
  const [formMode, setFormMode] = useState<string>("edit");
  const [modalTitle, setModalTitle] = useState<string>("编辑属性");
  const [recuriteDetailsForm] = Form.useForm();
  const [recuriteDetailsColumns, setRecuriteDetailsColumns] = useState<any>([
    {
      title: "序号",
      key: 'id',
      dataIndex: 'id',
      fixed: 'left',
      width: 64,
    },
    {
      title: "父ID",
      key: 'parent_id',
      dataIndex: 'parent_id',
      fixed: 'left',
      width: 64,
    },
    // {
    //   title: "排序",
    //   key: 'order',
    //   dataIndex: 'order',
    //   fixed: 'left',
    //   width: 64,
    //   render: (text, record) => {
    //     return record.order === 0 ? "一级" : "二级"
    //   }     
    // },
    {
      title: "标题",
      key: "title",
      dataIndex: "title",
      fixed: 'left',
      width: 132,
      ellipsis: true,
      render: (text, record) => (
        <Tooltip placement="topLeft" title={record.title || "-"}>
          <span>{record.title || "-"}</span>
        </Tooltip>
      )
    },
    {
      title: "作者",
      key: "author_name",
      dataIndex: "author_name",
      fixed: 'left',
      render: (text, record) => (
        record.author_name || "-"
      )
    },
    {
      title: "语言",
      key: "language",
      dataIndex: "language",
      fixed: 'left',
      render: (text, record) => (
        record.language || "-"
      )
    },
    {
      title: "描述",
      key: "summary",
      dataIndex: "summary",
      render: (text, record) => (
        record.summary || "-"
      )
    },
    {
      title: "描述富文本",
      key: "summary_html",
      dataIndex: "summary_html",
      render: (text, record) => (
        record.summary_html || "-"
      )
    },
    {
      title: "网站名称",
      key: "site_name",
      dataIndex: "site_name",
      render: (text, record) => (
        record.site_name || "-"
      )
    },
    {
      title: "网站URL",
      key: "url",
      dataIndex: "url",
      render: (text, record) => (
        record.url ? <a href={record.url} target="_blank">{record.url}</a> : "-"
      )
    },
    {
      title: "",
      key: "mobile_url",
      dataIndex: "mobile_url",
      render: (text, record) => (
        record.mobile_url ? <a href={record.url} target="_blank">{record.url}</a> : "-"
      )
    },
    {
      title: "是否有附件",
      key: "is_attachment",
      dataIndex: "is_attachment",
      render: (text, record) => (
        record.is_attachment ? <Tag>有</Tag> : <Tag>无</Tag>
      )
    },
    {
      title: "附件名称",
      key: "attachment_name",
      dataIndex: "attachment_name",
      render: (text, record) => (
        record.attachment_name || '-'
      )
    },
    {
      title: "附件链接",
      key: "is_attachment",
      dataIndex: "is_attachment",
      render: (text, record) => (
        record.is_attachment ? <Tag>有</Tag> : <Tag>无</Tag>
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
      fixed: 'right',
      width: 172,
      render: (text, record, rowIndex) => (
        <>
          <Button 
            className={style.editBtn} 
            type="primary" 
            onClick={() => handleEditRecuriteDetails(record)}>
            编辑
          </Button>
          <Popconfirm 
            title="确定删除？"
            okText="确定"
            cancelText="取消"
            onConfirm={() => handleDeleteRecuriteDetails(record)}>
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

  const [recuriteDetailsDataSource, setRecuriteDetailsDataSource] = useState<any>([]);

  const getRecuriteDetailsList = async () => {
    const params = {};
    const data:any = await RECURITE_API.getRecuriteDetailsList(params);
    console.log("data:", data);
    setRecuriteDetailsDataSource(data && data.rows);
  }

  useEffect(() => {
    getRecuriteDetailsList();
  }, [])

  /**  */
  const handleEditRecuriteDetails = (record:any) => {
    setFormMode("edit");
    setModalTitle("编辑招聘信息");
    setInitialFormValues(record);
    setIsRecuriteDetailsModalVisible(true);
  }

  const handleRecuriteDetail = async (formMode:string) => {
    const formData = await recuriteDetailsForm.validateFields();
    if(formMode === "create") {
      const params = {
        ...formData
      };
      const respData = await RECURITE_API.saveOrUpdateRecuriteDetails(params);
      if(respData) {
        setIsRecuriteDetailsModalVisible(false);
        getRecuriteDetailsList();
      }
    } else {
      const params = {
        ...formData,
        id: initialFormValues.id
      };
      const respData = await RECURITE_API.editRecuriteDetails(params);
      if(respData) {
        setIsRecuriteDetailsModalVisible(false);
        getRecuriteDetailsList();
      }
    }
  };

  /**
   * 创建信息
   */
  const handleCreateRecuriteDetail = async () => {
    setFormMode("create");
    setModalTitle("创建招聘信息");
    setInitialFormValues({});
    setIsRecuriteDetailsModalVisible(true);
  };
  /**
   * 
   * @param record 
   */
  const handleDeleteRecuriteDetails = async (record:any) => {
    const respData = await RECURITE_API.deleteRecuriteDetails({id: record.id});
    if(respData) {
      getRecuriteDetailsList();
    }
  };
  
  return (
    <div className={style.recuriteDetailContainer}>
      <Modal
        title={modalTitle}
        visible={isRecuriteDetailsModalVisible}
        onCancel={() => setIsRecuriteDetailsModalVisible(false) }
        onOk={() => handleRecuriteDetail(formMode)}>
        <Form 
          name="wrap"
          labelCol={{ flex: "90px" }}
          labelAlign="right"
          wrapperCol={{ flex: 1 }}
          colon={false}
          form={recuriteDetailsForm}
          initialValues={initialFormValues}>
          <Form.Item label="父ID" name="parent_id" rules={[{required: true, message: "填写父亲ID序号"}]}>
            <InputNumber min={1} step={1} className={style.inputNumber} style={{width: "100%"}} />
          </Form.Item>
          <Form.Item label="公司名称" name="title" rules={[{required: true, message: "请选择公司"}]}>
            <Select placeholder="请选择公司名称">
              {
                RECURITE_DETAIL_CONSTANT["COMPANY_LIST"].map((opt:any) => (
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
          <Form.Item label="网站名称" name="site_name" rules={[{required: true, message: "请填写网站名称"}]}>
            <Input placeholder="请填写网站名称" />
          </Form.Item>
          <Form.Item label="网站URL" name="url" rules={[{required: true, message: "请填写网站URL"}]}>
            <Input placeholder="请填写网站URL" />
          </Form.Item>
          {/* <Form.Item label="来源类型" name="source_type" rules={[{required: true, message: "请选择来源类型"}]}>
            <Select placeholder="请选择来源类型">
              {
                RECURITE_DETAIL_CONSTANT["SOURCE_TYPE"].map((opt: any) => (
                  <Select.Option key={opt.key} value={opt.key}>
                    {opt.label}
                  </Select.Option>
                ))
              }
            </Select>
          </Form.Item>
          <Form.Item label="来源" name="source_name" rules={[{required: true, message: "请填写来源"}]}>
            <Input placeholder="请填写来源" />
          </Form.Item> */}
        </Form>
      </Modal>
      <div className={style.operatorContainer}>
        <Button className={style.createBtn} type="primary" onClick={() => handleCreateRecuriteDetail()}>
          创建
        </Button>
      </div>
      
      <StandardTable 
        key="id"
        border={true}
        columns={recuriteDetailsColumns}
        dataSource={recuriteDetailsDataSource}
        scroll={{x: 1500}}>
      </StandardTable>
    </div>
  )
} 

export default RecuriteDetailList;

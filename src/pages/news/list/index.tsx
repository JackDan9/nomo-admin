import React, { ReactElement, useEffect, useState } from 'react';
import StandardTable from '@/components/StandardTable';

import style from './index.less';
import { Button, Form, Grid, Input, Modal, Popconfirm, Select, Tag, Tooltip } from 'antd';
import NEWS_API from '@/services/news';
import { default as dayjs } from 'dayjs';
import NEWS_CONSTANT from './constant';

interface NewsProps {

}

function News({props: NewsProps}): ReactElement {
  const [isNewsModalVisible, setIsNewsModalVisible] = useState<boolean>(false);
  const [initialFormValues, setInitialFormValues] = useState<any>({});
  const [formMode, setFormMode] = useState<string>("edit");
  const [modalTitle, setModalTitle] = useState<string>("编辑属性");
  const [newsForm] = Form.useForm();
  const [newsColumns, setNewsColumns] = useState<any>([
    {
      title: "序号",
      key: 'id',
      dataIndex: 'id',
      fixed: "left",
      width: 64
    },
    {
      title: "排序",
      key: 'order',
      dataIndex: 'order',
      fixed: "left",
      width: 64,
      render: (text, record) => {
        return record.order === 0 ? "一级" : "二级"
      }     
    },
    {
      title: "公司名称",
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
      title: "描述",
      key: "summary",
      dataIndex: "summary",
      width: 132,
      ellipsis: true,
      render: (text, record) => (
        <Tooltip placement="topLeft" title={record.summary || "-"}>
          <span>{record.summary || "-"}</span>
        </Tooltip>
      )
    },
    {
      title: "描述富文本",
      key: "summary_html",
      dataIndex: "summary_html",
      width: 132,
      ellipsis: true,
      render: (text, record) => (
        <Tooltip placement="topLeft" title={record.summary_html || "-"}>
          <span>{record.summary_html || "-"}</span>
        </Tooltip>
      )
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
      title: "提交时间",
      key: "publish_at",
      dataIndex: "publish_at",
      sort: true,
      render: (text, record) => {
        return dayjs(text).format("YYYY/MM/DD");
      },
    },
    {
      title: "操作",
      key: "operator",
      dataIndex: "operator",
      width: 172,
      fixed: 'right',
      render: (text, record, rowIndex) => (
        <>
          <Button 
            className={style.editBtn} 
            type="primary" 
            onClick={() => handleEditNews(record)}>
            编辑
          </Button>
          <Popconfirm 
            title="确定删除？"
            okText="确定"
            cancelText="取消"
            onConfirm={() => handleDeleteNews(record)}>
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

  const [newsDataSource, setNewsDataSource] = useState<any>([]);
  const [newsCount, setNewsCount] = useState<number>(0);

  const getNewsList = async (pageNumber?:number, pageSize?:number) => {
    const params = {
      pageNumber: pageNumber, 
      pageSize: pageSize
    };
    const data:any = await NEWS_API.getNewsList(params);
    console.log("data:", data);
    setNewsDataSource(data && data.rows);
    setNewsCount(data && data.count);
  }

  useEffect(() => {
    getNewsList();
  }, [])

  /**  */
  const handleEditNews = (record:any) => {
    setFormMode("edit");
    setModalTitle("编辑招聘信息");
    setInitialFormValues(record);
    setIsNewsModalVisible(true);
  }

  const handleNews = async (formMode:string) => {
    const formData = await newsForm.validateFields();
    if(formMode === "create") {
      const params = {
        ...formData
      };
      const respData = await NEWS_API.saveOrUpdateNews(params);
      if(respData) {
        setIsNewsModalVisible(false);
        getNewsList();
      }
    } else {
      const params = {
        ...formData,
        id: initialFormValues.id
      };
      const respData = await NEWS_API.editNews(params);
      if(respData) {
        setIsNewsModalVisible(false);
        getNewsList();
      }
    }
  };

  /**
   * 创建信息
   */
  const handleCreateNews = async () => {
    setFormMode("create");
    setModalTitle("创建招聘信息");
    setInitialFormValues({});
    setIsNewsModalVisible(true);
  };
  /**
   * 
   * @param record 
   */
  const handleDeleteNews = async (record:any) => {
    const respData = await NEWS_API.deleteNews({id: record.id});
    if(respData) {
      getNewsList();
    }
  };

  const handlePageSizeChange = async(p, f) => {
    const pageNumber = p.current;
    const pageSize = p.pageSize;  
    getNewsList(pageNumber, pageSize)
    console.log(p);
    console.log(f);
  };
  
  return (
    <div className={style.newsContainer}>
      <Modal
        title={modalTitle}
        visible={isNewsModalVisible}
        onCancel={() => setIsNewsModalVisible(false) }
        onOk={() => handleNews(formMode)}>
        <Form 
          name="wrap"
          labelCol={{ flex: "90px" }}
          labelAlign="right"
          wrapperCol={{ flex: 1 }}
          colon={false}
          form={newsForm}
          initialValues={initialFormValues}>
          <Form.Item label="排序" name="order" rules={[{required: true, message: "请选择排序"}]}>
            <Select
              placeholder="请选择排序">
              {
                NEWS_CONSTANT["ORDER_LIST"].map((opt:any) => (
                  <Select.Option key={opt.key} value={opt.key}>{opt.label}</Select.Option>
                ))
              }
            </Select>
          </Form.Item>
          <Form.Item label="公司名称" name="title" rules={[{required: true, message: "请选择公司"}]}>
            <Select placeholder="请选择公司名称">
              {
                NEWS_CONSTANT["COMPANY_LIST"].map((opt:any) => (
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
                NEWS_CONSTANT["SOURCE_TYPE"].map((opt: any) => (
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
        </Form>
      </Modal>
      <div className={style.operatorContainer}>
        <Button className={style.createBtn} type="primary" onClick={() => handleCreateNews()}>
          创建
        </Button>
      </div>
      
      <StandardTable 
        key="id"
        border={true}
        columns={newsColumns}
        dataSource={newsDataSource}
        scroll={{x: 1500}}
        total={newsCount}
        handlePageSizeChange={handlePageSizeChange}>
      </StandardTable>
    </div>
  )
} 

export default News;

import React, { ReactElement, useEffect, useState } from 'react';
import StandardTable from '@/components/StandardTable';

import style from './index.less';
import { Button, Form, Grid, Input, Modal, Popconfirm, Select, Tag, Tooltip } from 'antd';
import Cities_API from '@/services/cities';
import { default as dayjs } from 'dayjs';
// import Cities_CONSTANT from './constant';

interface CitiesProps {

}

function Cities({props: CitiesProps}): ReactElement {
  const [isCitiesModalVisible, setIsCitiesModalVisible] = useState<boolean>(false);
  const [initialFormValues, setInitialFormValues] = useState<any>({});
  const [formMode, setFormMode] = useState<string>("edit");
  const [modalTitle, setModalTitle] = useState<string>("编辑属性");
  const [citiesForm] = Form.useForm();
  const [citiesColumns, setCitiesColumns] = useState<any>([
    {
      title: "序号",
      key: 'id',
      dataIndex: 'id',
      fixed: "left",
      width: 64
    },
    {
      title: "地区/城市ID",
      key: 'location_id',
      dataIndex: 'location_id',
      fixed: "left",
      width: 120 
    },
    {
      title: "地区/城市中文名称",
      key: "location_name_zh",
      dataIndex: "location_name_zh",
      fixed: 'left',
      width: 200,
      ellipsis: true,
    },
    {
      title: "地区/城市介绍",
      key: "location_introduction",
      dataIndex: "location_introduction",
      width: 132,
      ellipsis: true,
      render: (text, record) => (
        <Tooltip placement="topLeft" title={record.location_introduction || "-"}>
          <span>{record.location_introduction || "-"}</span>
        </Tooltip>
      )
    },
    {
      title: "地区/城市景点",
      key: "location_palatable_dishes",
      dataIndex: "location_palatable_dishes",
      width: 132,
      ellipsis: true,
      render: (text, record) => (
        <Tooltip placement="topLeft" title={record.location_palatable_dishes || "-"}>
          <span>{record.location_palatable_dishes || "-"}</span>
        </Tooltip>
      )
    },
    {
      title: "地区/城市景点",
      key: "location_sight",
      dataIndex: "location_sight",
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
      width: 172,
      fixed: 'right',
      render: (text, record, rowIndex) => (
        <>
          <Button 
            className={style.editBtn} 
            type="primary" 
            onClick={() => handleEditCities(record)}>
            编辑
          </Button>
          <Popconfirm 
            title="确定删除？"
            okText="确定"
            cancelText="取消"
            onConfirm={() => handleDeleteCities(record)}>
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

  const [citiesDataSource, setCitiesDataSource] = useState<any>([]);
  const [citiesCount, setCitiesCount] = useState<number>(0);

  const getCitiesList = async (pageNumber?:number, pageSize?:number) => {
    const params = {
      pageNumber: pageNumber, 
      pageSize: pageSize
    };
    const data:any = await Cities_API.getCitiesList(params);
    setCitiesDataSource(data && data.rows);
    setCitiesCount(data && data.count);
  }

  useEffect(() => {
    getCitiesList();
  }, [])

  /**
   * 
   * @param record 
   */
  const handleEditCities = (record:any) => {
    setFormMode("edit");
    setModalTitle("编辑城市信息信息");
    console.log("record: ", record);
    setInitialFormValues(record);
    setIsCitiesModalVisible(true);
  }

  const handleCities = async (formMode:string) => {
    const formData = await citiesForm.validateFields();
    delete formData.location_id;
    delete formData.location_name_zh;
    formData.created_at = dayjs(new Date()).format("YYYY-MM-DD HH:mm:ss");
    const params = {
      ...formData,
      id: initialFormValues.id
    };
    
    const respData = await Cities_API.editCities(params);
    if(respData) {
      setIsCitiesModalVisible(false);
      getCitiesList();
    }
  };

  /**
   * 创建信息
   */
  const handleCreateCities = async () => {
    setFormMode("create");
    setModalTitle("创建招聘信息");
    setInitialFormValues({});
    setIsCitiesModalVisible(true);
  };
  /**
   * 
   * @param record 
   */
  const handleDeleteCities = async (record:any) => {
    const respData = await Cities_API.deleteCities({id: record.id});
    if(respData) {
      getCitiesList();
    }
  };

  const handlePageSizeChange = async(p, f) => {
    const pageNumber = p.current || -1;
    const pageSize = p.pageSize;  
    getCitiesList(pageNumber, pageSize)
  };

  /**
   * 
   * @param value 搜索内容
   */
  const handleSearch = async (value: string) => {
     if (value) {
      const data = await Cities_API.getCityByLocationName({locationNameZh: value});
      setCitiesDataSource(data && data.rows);
      setCitiesCount(data && data.count);
     } else {
      getCitiesList();
     }
  }
  
  return (
    <div className={style.citiesContainer}>
      <Modal
        title={modalTitle}
        visible={isCitiesModalVisible}
        onCancel={() => setIsCitiesModalVisible(false) }
        onOk={() => handleCities(formMode)}
        width={666}>
        <Form 
          name="wrap"
          labelCol={{ flex: "130px" }}
          labelAlign="right"
          wrapperCol={{ flex: 1 }}
          colon={false}
          form={citiesForm}
          initialValues={initialFormValues}>
            <Form.Item label="序号" name="id">
              <Input />
            </Form.Item>
            <Form.Item label="地区/城市序号" name="location_id">
              <Input />
            </Form.Item>
            <Form.Item label="地区/城市ID中文名称" name="location_name_zh">
              <Input />
            </Form.Item>
            <Form.Item label="地区/城市介绍" name="location_introduction" rules={[{required: true, message: "请填写地区/城市介绍"}]}>
              <Input.TextArea showCount={true} rows={8} placeholder="请填写地区/城市介绍" />
            </Form.Item>
            <Form.Item label="地区/城市美食" name="location_palatable_dishes" rules={[{required: true, message: "请填写地区/城市美食"}]}>
              <Input.TextArea showCount={true} rows={4} placeholder="请填写地区/城市美食" />
            </Form.Item>
            <Form.Item label="地区/城市景点" name="location_sight" rules={[{required: true, message: "请填写地区/城市景点"}]}>
              <Input.TextArea showCount={true} rows={4} placeholder="请填写地区/城市景点" />
            </Form.Item>
        </Form>
      </Modal>
      <div className={style.operatorContainer}>
        <Input.Search placeholder='请输入城市名' className={style.searchInp} onSearch={handleSearch} />
        <Button className={style.createBtn} type="primary" onClick={() => handleCreateCities()}>
          创建
        </Button>
      </div>
      
      <StandardTable 
        key="id"
        border={true}
        columns={citiesColumns}
        dataSource={citiesDataSource}
        scroll={{x: 1500}}
        total={citiesCount}
        pagination={
          {total: citiesCount}
        }
        handlePageSizeChange={handlePageSizeChange}>
      </StandardTable>
    </div>
  )
} 

export default Cities;

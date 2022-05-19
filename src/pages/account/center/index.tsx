import StandardTable from "@/components/StandardTable";
import ACCOUNT_API from "@/services/account";
import { CheckCircleOutlined, StopOutlined } from "@ant-design/icons";
import { Tag } from "antd";
import React, { Component, ReactElement, useEffect, useState } from "react";
import "./index.less";

interface CenterProps {

}

function Center({props: CenterProps}): ReactElement {
  const [centerColumns, setCenterColumns] = useState<any>([
    {
      title: "序号",
      key: "id",
      dataIndex: "id",
      fixed: "left",
      width: 64,
    },
    {
      title: "用户编号",
      key: "uid",
      dataIndex: "uid",
      fixed: "left",
      width: 120
    },
    {
      title: "用户名",
      key: "name",
      dataIndex: "name",
    },
    {
      title: "状态",
      key: "status",
      dataIndex: "status",
      render: (text, record) => (
        record.status === "1" ? <Tag icon={<CheckCircleOutlined />} color="#55acee">正常状态</Tag> : <Tag icon={<StopOutlined />} color="#cd201f">异常状态</Tag>
      )
    },
    {
      title: "头像",
      key: "avatar",
      dataIndex: "avatar",
      render: (text, record) => (
        record.avatar ? <img src={record.avatar} /> : '-'
      )
    }
  ]);
  const [centerDataSource, setCenterDataSource] = useState<any>([]);
  
  const getCenterList = async () => {
    const params = {};
    const data:any = await ACCOUNT_API.getUserList(params);
    setCenterDataSource(data && data.rows);
  }

  useEffect(() => {
    getCenterList();
  }, []);
  return (
    <div>
      <StandardTable
        key="id"
        border={true}
        columns={centerColumns}
        dataSource={centerDataSource}
      ></StandardTable>
    </div>
  )
}

export default Center;
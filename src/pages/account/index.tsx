/**
 * @Author Shanjunjun
 * @Date 2022-05-09
 * @LastEditor 
 * @LastEditDate
 * 
 */
import StandardTable from "@/components/StandardTable";
import ACCOUNT_API from "@/services/account";
import React, { Component, ReactElement, useEffect, useState } from "react";
import "./index.less";

interface AccountProps {
  
}

function Account({props: AccountProps}): ReactElement {
  const [accountColumns, setAccountColumns] = useState<any>([
    {
      title: "序号",
      key: "id",
      dataIndex: "id",
      fixed: "left",
      width: 64,
    }
  ]);
  const [accountDataSource, setAccountDataSource] = useState<any>([]);
  
  const getAccountList = async () => {
    const params = {};
    const data:any = await ACCOUNT_API.getUserList(params);
    setAccountDataSource(data && data.rows);
  }

  useEffect(() => {
    getAccountList();
  }, []);
  return (
    <div>
      <StandardTable
        key="id"
        border={true}
        columns={accountColumns}
        dataSource={accountDataSource}
        scroll={{x: 1500}}
      ></StandardTable>
    </div>
  )
}

export default Account;
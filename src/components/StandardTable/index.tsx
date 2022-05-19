/**
 * 🏆 为了标准的二维表组件
 * 
 */
import React from 'react';
import { Button, Tooltip, Dropdown, Menu, Input, Table } from 'antd';
import { EllipsisOutlined, QuestionCircleOutlined, SearchOutlined } from '@ant-design/icons';
import ProTable, { ProColumns, TableDropdown } from '@ant-design/pro-table';
import styles from './index.less';


interface StandardTableProps {
  key: string,
  border: boolean,
  columns: [],
  dataSource: [],
  scroll?: any,
  total?: number,
  handlePageSizeChange?: any,
  pagination?: any
}

export interface TableListItem {
  key: number;
  name: string;
  containers: number;
  creator: string;
  status: string;
  createdAt: number;
  progress: number;
  money: number;
  memo: string;
};

const StandardTable: React.FC<StandardTableProps> = (props) => {
  const { border, columns, dataSource, key, scroll, total, handlePageSizeChange, pagination } = props;

  return (
    <Table 
      key={key}
      bordered={border}
      columns={columns} 
      dataSource={dataSource}
      scroll={scroll}
      pagination={
        pagination
      }
      onChange={(pagination, filters) => handlePageSizeChange(pagination, filters)}>
    </Table>
  );
};

export default StandardTable;
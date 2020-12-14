import React, { useEffect, useState } from 'react'
import { Button, Divider, Input, Row, Col, Modal, Popconfirm, Table } from 'antd'
import { message } from 'antd';
import { PlusOutlined, MinusOutlined } from '@ant-design/icons'
import constantMng from '@/utils/constant'
import Edit from './components/Edit';
import { Ticket } from './model'
// import , { IParams } from './'
// import './style.less'
import styles from './index.less';

const { Column } = Table

interface TicketParams {
  keyword?: string
  pageNumber: number
  pageSize: number
}

const Ticket = () => {
  // 查询参数
  const [params, setParams] = useState<TicketParams>({
    pageNumber: 1,
    pageSize: 10
  })
  // 表格当前页显示的数据
  const [list, setList] = useState<Ticket[]>([])
  // 数据总数
  const [total, setTotal] = useState(0)
  // 表格loading状态
  const [loading, setLoading] = useState(false)
  // 编辑模态窗是否显示
  const [editVisible, setEditVisible] = useState(false)
  // 多选的表格行
  const [selectedRows, setSelectedRows] = useState<Ticket[]>([])
  // 当前正在编辑的用户的id
  const [userId, setUserId] = useState<number>(0)

  // 获取用户列表
  useEffect(() => {
    getUserList()
  }, [params])

  const getUserList = async () => {
    setLoading(true)
    // const res = await service.getUserList(params)
    const res = {
      list: [
        {
          id: 1,
          name: 'England',
          price: 100
        },
        {
          id: 2,
          name: 'England',
          price: 100
        },
        {
          id: 3,
          name: 'England',
          price: 100
        },
        {
          id: 4,
          name: 'England',
          price: 100
        },
        {
          id: 5,
          name: 'England',
          price: 100
        },
        {
          id: 6,
          name: 'England',
          price: 100
        },
        {
          id: 7,
          name: 'England',
          price: 100
        },
        {
          id: 8,
          name: 'England',
          price: 100
        },
        {
          id: 9,
          name: 'England',
          price: 100
        },
        {
          id: 10,
          name: 'England',
          price: 100
        },
        {
          id: 11,
          name: 'England',
          price: 100
        },
        {
          id: 12,
          name: 'England',
          price: 100
        },
        {
          id: 13,
          name: 'England',
          price: 100
        },
        {
          id: 14,
          name: 'England',
          price: 100
        },
        {
          id: 15,
          name: 'England',
          price: 100
        },
        {
          id: 16,
          name: 'England',
          price: 100
        },
      ],
      total: 16
    }
    setLoading(false)
    setList(res.list)
    setTotal(res.total)
  }

  // 搜索
  const handleSearch = (keyword: string) => {
    setParams((state) => ({ ...state, keyword }))
  }

  // 翻页
  const handlePagination = (pageNumber: number, pageSize?: number) => {
    setParams((state) => ({ ...state, pageNumber, pageSize: pageSize! }))
  }

  // 新增或编辑
  const handleEdit = (id: number) => {
    setEditVisible(true)
    setUserId(id)
  }

  // 单个删除
  const handleDeleteSingle = async (record: Ticket) => {
    const { id, name } = record
    // await service.deleteUser(id)
    // await getUserList()
    message.success(`成功删除用户“${name}”！`)
  }

  // 批量删除
  const handleDeleteBatch = () => {
    if (selectedRows.length > 0) {
      const ids = selectedRows.map((row) => row.id)
      const names = selectedRows.map((row) => row.name).join('，')
      Modal.confirm({
        title: '确认删除以下用户吗?',
        content: names,
        onOk: async () => {
          // await service.deleteUser(ids)
          // await getUserList()
          message.success(`成功删除用户“${names}”！`)
        }
      })
    } else {
      message.warning('请选择要删除的用户')
    }
  }

  // 多选
  const handleChangeRows = (selectedRowKeys: React.ReactText[], selectedRows: Ticket[]) => {
    setSelectedRows(selectedRows)
  }

  // 取消
  const handleClose = () => {
    setEditVisible(false)
  }

  return (
    <div className={styles.pageUser}>
      <Row justify="space-between" className={styles.sectionContent}>
        <Col>
          <div className={styles.sectionTitle}>
            <span className={styles.sectionTitleTag}></span>
            <span className={styles.sectionTitleName}>航空票列表</span>
          </div>

          <Button.Group>
            <Button type="primary" icon={<PlusOutlined />} onClick={handleEdit.bind(null, 0)}>
              新增机票
            </Button>
            <Button danger={true} icon={<MinusOutlined />} onClick={handleDeleteBatch}>
              批量删除
            </Button>
          </Button.Group>
        </Col>

        <Col>
          <Input.Search placeholder="请输入查询关键词" onSearch={handleSearch} enterButton={true} />
        </Col>
      </Row>

      <Table<Ticket>
        dataSource={list}
        rowKey="id"
        rowSelection={{ onChange: handleChangeRows }}
        loading={loading}
        pagination={{
          total,
          showQuickJumper: true,
          showSizeChanger: true,
          showTotal: (total) => `共${total}个票`,
          onChange: handlePagination
        }}
      >
        <Column
          title="序号"
          dataIndex="number"
          width={80}
          render={(value, record, index) => (params.pageNumber - 1) * params.pageSize + index + 1}
        />
        <Column title="票名" dataIndex="name" />
        <Column title="票价" dataIndex="price" />
        {/* <Column
          title="性别"
          dataIndex="gender"
          render={(value, record, index) => constantMng.getNameById('gender', value)}
        />
        <Column<Ticket>
          title="操作"
          dataIndex="operate"
          width={140}
          render={(value, record, index) => (
            <div>
              <Button type="link" size="small" onClick={handleEdit.bind(null, record.id)}>
                编辑
              </Button>
              <Divider type="vertical" />
              <Popconfirm
                title="确定删除这条数据吗？"
                onConfirm={handleDeleteSingle.bind(null, record)}
              >
                <Button type="link" size="small" danger={true}>
                  删除
                </Button>
              </Popconfirm>
            </div>
          )}
        /> */}
      </Table>

      <Edit visible={editVisible} id={userId} onClose={handleClose} />
    </div>
  )
}

export default Ticket;

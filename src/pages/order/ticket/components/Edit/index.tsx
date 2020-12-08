import React, { useEffect, useState } from 'react'
import { Drawer, Form, Input, Radio, Checkbox, InputNumber, Button } from 'antd'
import { message } from 'antd';
// import service from '../service'
import constant from '@/utils/constant'

const genderList = constant.getGroup('gender')
const roleList: any = constant.formatGroup('role', 'value', 'label')

const formItemLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 }
}

interface TicketProps {
  visible: boolean
  id: number
  onClose: () => void
}

const Edit: React.FC<TicketProps> = (props) => {
  const { id, visible, onClose } = props
  // 提交时的loading状态
  const [loading, setLoading] = useState(false)
  const [detail, setDetail] = useState({
    name: '',
    price: ''
  })

  // 获取机票详情
  useEffect(() => {
    if (!id) return
    // service.getUserDetail(id).then((res) => {
    //   setDetail(res)
    // })
    
  }, [id])

  const handleSubmit = (e: any) => {
    if (id) {
      message.success('修改成功')
    } else {
      message.success('新增成功')
    }
    onClose()
  }

  const handleFinishFailed = () => {
    message.warning('请按照正确格式填写信息！')
  }

  return (
    <Drawer
      title={`${id ? '修改' : '新增'}机票`}
      width={400}
      visible={visible}
      onClose={onClose}
      footer={null}
      destroyOnClose={true}
    >
      <Form
        layout="horizontal"
        colon
        labelAlign="left"
        {...formItemLayout}
        onFinish={handleSubmit}
        onFinishFailed={handleFinishFailed}
      >
        <Form.Item
          label="票名"
          name="name"
          initialValue={detail.name}
          rules={[
            {
              required: true,
              message: '请输入航空机票名称!'
            }
          ]}
        >
          <Input placeholder="请输入名称" />
        </Form.Item>

        <Form.Item
          label="票价"
          name="price"
          initialValue={detail.price}
          rules={[
            {
              required: true,
              message: '请输入航空机票价格!'
            }
          ]}
        >
          <Input placeholder="请输入价格" />
        </Form.Item>

        {/* <Form.Item
          label="性别"
          name="gender"
          initialValue={detail.gender}
          rules={[
            {
              required: true,
              message: '请选择用户性别!'
            }
          ]}
        >
          <Radio.Group>
            {genderList.map((item) => (
              <Radio key={item.id} value={item.id}>
                {item.name}
              </Radio>
            ))}
          </Radio.Group>
        </Form.Item>

        <Form.Item
          label="角色"
          name="role"
          initialValue={detail.role}
          rules={[
            {
              required: true,
              message: '请至少选择一个用户角色!'
            }
          ]}
        >
          <Checkbox.Group options={roleList} />
        </Form.Item> */}

        <Form.Item wrapperCol={{ offset: 8 }}>
          <Button onClick={onClose}>取消</Button>
          <Button type="primary" htmlType="submit" style={{ marginLeft: '20px' }}>
            确认
          </Button>
        </Form.Item>
      </Form>
    </Drawer>
  )
}

export default Edit

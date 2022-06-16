/**
 * @Description 首页
 * @Author JackDan
 * @Date 2022-05-19 
 */
import React, { Component, Suspense } from 'react';
import StandardTable from '@/components/StandardTable';

import styles from "./index.less";
import { GridContent } from '@ant-design/pro-layout';
import { Card, Row, Tabs, Col, Tree, Input, Button, Table } from 'antd';
import Bar from '@/components/Charts/Bar';
import Pie from '@/components/Charts/Pie';
import Line from '@/components/Charts/Line';
import { MenuFoldOutlined, MenuUnfoldOutlined, SearchOutlined } from '@ant-design/icons';
import DASHBOARD_CONSTANT from './constant';

const { TabPane } = Tabs

const barData = {
  title: {
    show: false,
    text: '真实数据标题',
    subtext: '真实数据副标题'
  },
  legend: {
    show: true,
    data: [
      {
        name: '最新成交'
      },
      {
        name: '预购队列'
      }
    ]
  },
  tooltip: {
    show: true,
    trigger: 'axis',
    axisPointer: {
      type: 'cross',
      label: {
        backgroundColor: '#283b56'
      }
    }
  },
  toolbox: {
    show: true,
    feature: {
      dataView: { readOnly: true },
      restore: {},
      saveAsImage: {}
    },
  },
  dataZoom: {
    show: false,
    start: 0,
    end: 10000,
  },
  xAxis: [
    {
      type: 'category',
      boundaryGap: true,
      data: (function () {
        let now: any = new Date();
        let res: any = [];
        let len = 10;
        while (len--) {
          res.unshift(now.toLocaleTimeString().replace(/^\D*/, ''));
          now = new Date(now - 2000);
        }
        return res;
      })()
    },
    {
      type: 'category',
      boundaryGap: true,
      data: (function () {
        let res: any = [];
        let len: any = 10;
        while (len--) {
          res.push(10 - len - 1);
        }
        return res;
      })()
    }
  ],
  yAxis: [
    {
      type: 'value',
      scale: true,
      name: '价格',
      max: 30,
      min: 0,
      boundaryGap: [0.2, 0.2]
    },
    {
      type: 'value',
      scale: true,
      name: '预购量',
      max: 1200,
      min: 0,
      boundaryGap: [0.2, 0.2]
    }
  ],
  series: [
    {
      name: '预购队列',
      type: 'bar',
      xAxisIndex: 1,
      yAxisIndex: 1,
      color: 'rgba(24, 144, 255, 0.85)',
      data: (function () {
        let res: any = [];
        let len: any = 10;
        while (len--) {
          res.push(Math.round(Math.random() * 1000));
        }
        return res;
      })()
    },
    {
      name: '最新成交',
      type: 'line',
      color: 'blue',
      data: (function () {
        let res: any = [];
        let len: any = 0;
        while (len < 10) {
          res.push((Math.random() * 10 + 5).toFixed(1));
          len++;
        }
        return res;
      })()
    }
  ],
}

class Dashboard extends Component<any, any> {
  constructor(props) {
    super(props);
    this.state = {
      collapsed: false,
      columns: [],
      dataSource: [],
      dashboardTreeData: [
        {
          title: "GMV",
          key: 'gmv',
          children: [{
            title: "UV",
            key: 'uv',
            disabled: true
          }, {
            title: "APRU",
            key: 'apru',
            children: [{
              title: "TC",
              key: "tc",
              children: [{
                title: "CVR",
                key: "cvr",
                disabled: true,
              }, {
                title: "Freq.",
                key: "freq.",
                disabled: true,
              }]
            }, {
              title: "TA",
              key: "ta",
              children: [{
                title: "PPS",
                key: "pps",
                disabled: true,
              }, {
                title: "Party Size",
                key: "party_size",
                disabled: true,
              }]
            }]
          }]
        }
      ],
      complexColumns: [],
      complexDataSource: []
    }
  }

  componentDidMount() {
    this.setState({
      columns: [{
        title: "实验名称",
        key: "name",
        dataIndex: "name",
        fixed: "left",
        width: 120
      }, {
        title: "GMV",
        key: "gmv",
        dataIndex: "gmv",
      }, {
        title: "UV",
        key: "uv",
        dataIndex: "uv"
      }, {
        title: "ARPU",
        key: "arpu",
        dataIndex: "arpu"
      }],
      dataSource: [
        {
          name: "基线",
          gmv: 120,
          uv: 20,
          arpu: 6,
          id: 9,
        },
        {
          name: "本实验",
          gmv: 160,
          uv: 10,
          arpu: 16,
          id: 10
        }
      ],
      complexColumns: DASHBOARD_CONSTANT["complexDashboardColumns"],
      complexDataSource: DASHBOARD_CONSTANT["complexDashboardDataSource"],
    })
  }

  toggleCollapsed = () => {
    this.setState({
      collapse: !this.state.collapse
    })
  }

  handleSelectNode = (selectedKeys, e) => {
    const selectedKey = selectedKeys && selectedKeys[0];
    const isChildren = e && e.selectedNodes && e.selectedNodes[0].children && e.selectedNodes[0].children.length > 0;
    if(selectedKey && isChildren) {
  
      this.setState({
        columns: DASHBOARD_CONSTANT[selectedKey + 'DashboardColumns'],
        dataSource: DASHBOARD_CONSTANT[selectedKey + 'DashboardDataSource'],
      })

    }
  }

  handleChangeTab = () => {
    
  }

  render() {
    return (
      <div className={styles.dashboardContainer}>
        <GridContent>
          <Tabs defaultActiveKey='tree' onChange={this.handleChangeTab}>
            <TabPane tab="树形式" key="tree">
            <Card>
            <Row gutter={24}>
              <div className={styles.treeMenu} style={{display: this.state.collapse ? "none" : "block"}}>
                <Input className={styles.searchContainer} placeholder='请输入内容' prefix={<SearchOutlined />} />
                <Tree
                  showIcon
                  showLine
                  defaultExpandAll={false}
                  onSelect={(selectedKeys, e) => this.handleSelectNode(selectedKeys, e)}
                  treeData={this.state.dashboardTreeData}
                  defaultExpandedKeys={["gmv"]}
                  multiple={false}
                />
              </div>
              <div className={styles.tableContainer}>
                <div>
                  <StandardTable
                    columns={this.state.columns}
                    dataSource={this.state.dataSource}
                    border={this.state.collapse}
                    key="id"
                    scroll={{x: 1000}}
                    pagination={false}
                  />
                </div>
                <Button 
                  className={styles.collapse} 
                  type="primary" 
                  onClick={this.toggleCollapsed}
                  style={{left: this.state.collapse ? 0 : -19, transform: this.state.collapse ? "rotate(180deg)" : "unset"}}>
                  {this.state.collapse ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                </Button>
              </div>
            </Row>
          </Card>
            </TabPane>
            <TabPane tab="表头形式" key="column">
            <Card>
              <Row gutter={24}>
                <StandardTable
                  columns={this.state.complexColumns}
                  dataSource={this.state.complexDataSource}
                  border={true}
                  pagination={false}
                  key="id"
                  scroll={{ x: 'calc(700px + 50%)', y: 240 }}
                />
              </Row>
            </Card>
            </TabPane>
          </Tabs>
          <React.Fragment>
            <Row
              gutter={24}
              style={{
                marginTop: 24
              }}
            >
              <Col xl={12} lg={24} md={24} sm={24} xs={24}>
                <Suspense fallback={null}>
                  {/* 这一部分可以单独抽离出来 */}
                  <Card
                    bordered={false}
                    title={<h4>饼图</h4>}
                    style={{ height: '100%' }}
                  >
                    <Pie height={400} />
                  </Card>
                </Suspense>
              </Col>
              <Col xl={12} lg={24} md={24} sm={24} xs={24}>
                <Suspense fallback={null}>
                  {/* 这一部分可以单独抽离出来 */}
                  <Card
                    bordered={false}
                    title={<h4>柱状图</h4>}
                    style={{ height: '100%' }}
                  >
                    <Bar height={400} id='chart-bar' chartOptionData={barData} />
                  </Card>
                </Suspense>
              </Col>
            </Row>
            <Suspense fallback={null}>
              <Card title={<h4>多功能折线图</h4>} bordered={false} style={{marginTop: 32}}>
                <div style={{ padding: '0 24px' }}>
                  <Line height={400} id='chart-line-1' />
                </div>
              </Card>
            </Suspense>
          </React.Fragment>
        </GridContent>
      </div>
    )
  }
}

export default Dashboard;

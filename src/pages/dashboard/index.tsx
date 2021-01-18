import React, { Component, Suspense } from 'react';
import StandardTable from '@/components/StandardTable';


import styles from "./index.less";
import { GridContent } from '@ant-design/pro-layout';
import { Card, Row, Tabs, Col } from 'antd';
import Bar from '@/components/Charts/Bar';
import Pie from '@/components/Charts/Pie';
import Line from '@/components/Charts/Line';

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

class Dashboard extends Component {
  render() {
    return (
      <div className={styles.dashboardContainer}>
        <GridContent>
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

import React, { Component, Suspense } from 'react';
import StandardTable from '@/components/StandardTable';
import Bar from '@/components/Charts/Bar';

import styles from "./index.less";
import { GridContent } from '@ant-design/pro-layout';
import { Card, Row, Tabs, Col } from 'antd';
import Pie from '@/components/Charts/Pie';
import Line from '@/components/Charts/Line';

const { TabPane } = Tabs

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
                    <Bar height={400} id='chart-bar' />
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

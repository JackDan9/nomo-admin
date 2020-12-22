import React, { Component } from 'react';
import StandardTable from '@/components/StandardTable';
import Bar from '@/components/Charts/Bar';

import styles from "./index.less";
import { GridContent } from '@ant-design/pro-layout';
import { Card, Row, Tabs, Col } from 'antd';

const { TabPane } = Tabs

class Dashboard extends Component {
  render() {
    return (
      <GridContent>
        <Card bordered={false} bodyStyle={{ paddingTop: 30 }}>
          <Row typeof="flex">
            <Col xl={16} lg={12} md={12} sm={24} xs={24}>
              <div className={styles.dashboardBar}>
                <Bar height={400} />
              </div>
            </Col>
          </Row>
        </Card>
      </GridContent>
    )
  }
}

export default Dashboard;

import React, { Component } from 'react';
import StandardTable from '@/components/StandardTable';

import "./index.less";

class Dashboard extends Component {
  
  render() {
    return (
      <div style={{ backgroundColor: '#f0f2f5' }}>
        {/* Dashboard */}
        <StandardTable title="机票信息" />
      </div>
    )
  }
}

export default Dashboard;

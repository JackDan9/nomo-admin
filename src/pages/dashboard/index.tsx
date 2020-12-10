import React, { Component } from 'react';
import StandardTable from '@/components/StandardTable';

import "./index.less";

class Dashboard extends Component {
  render() {
    return (
      <div style={{ backgroundColor: '#fff' }}>
        {/* Dashboard */}
        <StandardTable />
      </div>
    )
  }
}

export default Dashboard;

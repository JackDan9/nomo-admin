import React, { PureComponent } from 'react';

import { GridContent } from '@ant-design/pro-layout';
import { RouteChildrenProps } from 'react-router';

interface CenterProps extends RouteChildrenProps {
  currentUser: any;
  currentUserLoading: boolean;
}

class Center extends PureComponent<CenterProps> {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <GridContent>
        <div>Center</div>
      </GridContent>
    )
  }
}

export default Center;
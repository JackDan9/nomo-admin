import React, { PureComponent } from 'react';

import { GridContent } from '@ant-design/pro-layout';

import style from './index.less';


class Level extends PureComponent<{}> {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <GridContent>
        <div>Level</div>
      </GridContent>
    )
  }
}

export default Level;
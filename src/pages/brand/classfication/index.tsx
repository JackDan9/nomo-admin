import React, { PureComponent } from 'react';

import { GridContent } from '@ant-design/pro-layout';

import style from './index.less';


class Classfication extends PureComponent<{}> {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <GridContent>
        <div>Classfication</div>
      </GridContent>
    )
  }
}

export default Classfication;
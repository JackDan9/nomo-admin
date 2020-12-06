/**
 * 
 */
import React, { Component } from 'react';

import { GridContent } from '@ant-design/pro-layout';
import { Menu } from 'antd';

import styles from './index.less';

const { Item } = Menu;

interface SettingsProps  {
  currentUser: any;
}

class Settings extends Component<SettingsProps> {
  constructor(props: SettingsProps) {
    super(props);

  }

  render() {
    const { currentUser } = this.props;

    return (
      <GridContent>
        <div>
          Settings
        </div>
      </GridContent>
    )
  }
};

export default Settings;
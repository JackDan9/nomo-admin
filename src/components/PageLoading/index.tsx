import React from 'react';
import { Spin } from 'antd';

import styles from './index.less';


const PageLoading: React.FC = () => {
    return (
        <div className={styles.loadingContainer}>
            <Spin />
        </div>
    )
}

export default PageLoading;
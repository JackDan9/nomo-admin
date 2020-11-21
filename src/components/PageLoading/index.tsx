import React from 'react';
import { Spin } from 'antd';

import './index.less';


const PageLoading: React.FC = () => {
    return (
        <div className="loadingContainer">
            <Spin />
        </div>
    )
}

export default PageLoading;
import { observable, action } from 'mobx';
import { TabInfo } from '@/store/model/tab-info';

class Tab {
    @observable splitKey:string = '';
    @observable tabListKey:[] = [];
    // tab-info || 标签信息
    @observable tabList: TabInfo[] = [];
    @observable tabListArr:any[] = [];
    @observable routerKey:string = '';
    
    @action
    public setSplitKey(value) {
        this.splitKey = value;
    }
    @action
    public setTabListKey(value) {
        this.tabListKey = value;
    }
    // 
    @action
    public setTabList(value: TabInfo[]) {
        this.tabList = value;
    }
    
    @action
    public setTabListArr(value) {
        this.tabListArr = value;
    }

    @action
    public setRouterKey(value) {
        this.routerKey = value;
    }
}

export default new Tab();

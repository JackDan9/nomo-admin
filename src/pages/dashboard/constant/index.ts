import { Button } from 'antd';
const DASHBOARD_CONSTANT = {
gmvDashboardColumns: [{
  title: "实验名称",
  key: "name",
  dataIndex: "name",
  fixed: "left",
  width: 120
}, {
  title: "GMV",
  key: "gmv",
  dataIndex: "gmv",
}, {
  title: "UV",
  key: "uv",
  dataIndex: "uv"
}, {
  title: "ARPU",
  key: "arpu",
  dataIndex: "arpu"
},],
apruDashboardColumns: [
  {
    title: "实验名称",
    key: "name",
    dataIndex: "name",
    fixed: "left",
    width: 120
  }, {
    title: "ARPU",
    key: "arpu",
    dataIndex: "arpu"
  }, {
    title: "TC",
    key: "tc",
    dataIndex: "tc"
  }, {
    title: "TA",
    key: "ta",
    dataIndex: "ta"
  }
],
gmvDashboardDataSource: [
  {
    name: "基线",
    gmv: 120,
    uv: 20,
    arpu: 6
  },
  {
    name: "本实验",
    gmv: 160,
    uv: 10,
    arpu: 16
  }
],
apruDashboardDataSource: [
  {
    name: "基线",
    arpu: 6,
    tc: 2,
    ta: 3
  },
  {
    name: "本实验",
    arpu: 16,
    tc: 4,
    ta: 4
  }
],
tcDashboardColumns: [
  {
    title: "实验名称",
    key: "name",
    dataIndex: "name",
    fixed: "left",
    width: 120
  },
  {
    title: "TC",
    key: "tc",
    dataIndex: "tc"
  },
  {
    title: "CVR(%)",
    key: "cvr",
    dataIndex: "cvr"
  },
  {
    title: "Freq.",
    key: "freq",
    dataIndex: "freq"
  }
],
tcDashboardDataSource: [
  {
    name: "基线",
    tc: 2,
    cvr: 40,
    freq: 5
  },
  {
    name: "本实验",
    tc: 4,
    cvr: 50,
    freq: 8
  }
],
taDashboardColumns: [
  {
    title: "实验名称",
    key: "name",
    dataIndex: "name",
    fixed: "left",
    width: 120
  },
  {
    title: "TA",
    key: "ta",
    dataIndex: "ta"
  },
  {
    title: "PPS",
    key: "pps",
    dataIndex: "pps"
  },
  {
    title: "Party Size",
    key: "party_size",
    dataIndex: "party_size"
  }
],
taDashboardDataSource: [
  {
    name: "基线",
    ta: 3,
    pps: 40,
    party_size: 5
  },
  {
    name: "本实验",
    ta: 4,
    pps: 50,
    party_size: 8
  }
],
complexDashboardColumns: [
  {
    title: '实验名称',
    dataIndex: 'name',
    key: 'name',
    width: 120,
    fixed: 'left',
    // filters: [
    //   {
    //     text: '基线',
    //     value: 'Joe',
    //   },
    //   {
    //     text: '本实验',
    //     value: 'John',
    //   },
    // ],
    // onFilter: (value, record) => record.name.indexOf(value) === 0,
  },
  {
    title: "GMV",
    dataIndex: 'gmv',
    key: 'gmv',
    width: 150,
  },
  {
    title: 'GMV=UV * ARPU',
    children: [
      {
        title: 'UV',
        dataIndex: 'uv',
        key: 'uv',
        width: 150,
        // sorter: (a, b) => a.age - b.age,
      },
      {
        title: "ARPU",
        dataIndex: "arpu",
        key: "arpu",
        width: 150,
      },
      {
        title: 'ARPU=TC * TA',
        children: [
          {
            title: 'TC',
            dataIndex: 'tc',
            key: 'tc',
            width: 150,
          },
          {
            title: "TC=CVR(%) * Freq.",
            children: [
              {
                title: "CVR(%)",
                dataIndex: "cvr",
                key: "cvr",
                width: 100,
              },
              {
                title: "Freq.",
                dataIndex:"freq",
                key: "freq",
                width: 100,
              }
            ],
          },
          {
            title: "TA",
            dataIndex: "ta",
            key: "ta",
            width: 150,
          },
          {
            title: 'TA=PPS * Party Size',
            children: [
              {
                title: 'PPS',
                dataIndex: 'pps',
                key: 'pss',
                width: 100,
              },
              {
                title: 'Party Size',
                dataIndex: 'party_size',
                key: 'party_size',
                width: 100,
              },
            ],
          },
        ],
      },
    ],
  },
  // {
  //   title: 'Company',
  //   children: [
  //     {
  //       title: 'Company Address',
  //       dataIndex: 'companyAddress',
  //       key: 'companyAddress',
  //       width: 200,
  //     },
  //     {
  //       title: 'Company Name',
  //       dataIndex: 'companyName',
  //       key: 'companyName',
  //     },
  //   ],
  // }
],
  complexDashboardDataSource: [{
    name:'基线',
    gmv: 240,
    uv: 20,
    arpu: 12,
    ta: 3,
    tc: 4,
    cvr: 5,
    freq: 60,
    pps: 600,
    party_size: 1000,
  },{
    name: '本实验',
    gmv: 300,
    uv: 10,
    arpu: 30,
    ta: 5,
    tc: 8000000,
    cvr: 50,
    freq: 60000,
    pps: 800,
    party_size: 1000,
  }]
}


export default DASHBOARD_CONSTANT;
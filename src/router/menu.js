


const menu = [
    
    
    {
      path: '/',
      name: '活动管理',
      level: 0,
      icon: 'ios-analytics',
      fixed: false,
      children: [
        {
          level: 1,
          path: '/activeList',
          children: [],
          fixed: false,
          name: '活动管理列表'
        },
        {
          level: 1,
          path: '/activeAdd',
          children: [],
          fixed: false,
          name: '活动管理添加'
        },
        
      ]
    },
    {
      path: '/',
      name: '规则组合管理',
      level: 0,
      icon: 'social-vimeo',
      fixed: false,
      children: [
        {
          level: 1,
          path: '/ruleList',
          children: [],
          fixed: false,
          name: '规则组合列表'
        },
        {
          level: 1,
          path: '/ruleAdd',
          children: [],
          fixed: false,
          name: '规则组合添加'
        },
        
      ]
    },
    {
      path: '/',
      name: '触发功能管理',
      level: 0,
      icon: 'social-buffer',
      fixed: false,
      children: [
        {
          level: 1,
          path: '/funList',
          children: [],
          fixed: false,
          name: '触发功能列表'
        },
        {
          level: 1,
          path: '/funAdd',
          children: [],
          fixed: false,
          name: '触发功能添加'
        },
        
      ]
    },
    {
      path: '/',
      name: '奖励明细管理',
      level: 0,
      icon: 'social-usd',
      fixed: false,
      children: [
        {
          level: 1,
          path: '/awardList',
          children: [],
          fixed: false,
          name: '奖励明细列表'
        },
        {
          level: 1,
          path: '/awardAdd',
          children: [],
          fixed: false,
          name: '奖励明细添加'
        },
        
      ]
    },
    {
      path: '/record',
      name: '奖励发放记录',
      icon: 'ios-reverse-camera',
      level: 1,
      fixed: false,
      children:[]
      
    },
  
  ]
  
  export default menu
  
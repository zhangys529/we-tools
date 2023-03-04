export const components = [
  { path: '/system/menu', component: () => import('@/views/system/menu/index') },
  { path: '/system/role', component: () => import('@/views/system/role/index') },
]

export const cacheEnums = [
  { key: 0, title: '不缓存', type: 'info' },
  { key: 1, title: '缓存', type: 'primary' }
]

export const hiddenEnums = [
  { key: 0, title: '不隐藏', type: 'info' },
  { key: 1, title: '隐藏', type: 'primary' }
]

export const userStatuses = [
  { key: 0, title: '封禁', type: 'info' },
  { key: 1, title: '正常', type: 'success' }
]

export const userTypes = [
  { key: 1, title: '用户', type: 'info' },
  { key: 999, title: '管理员', type: 'danger' }
]

export const provinces = [
  { title: '全国' },
  { title: '安徽' },
  { title: '北京' },
  { title: '福建' },
  { title: '甘肃' },
  { title: '广东' },
  { title: '广西' },
  { title: '贵州' },
  { title: '海南' },
  { title: '河北' },
  { title: '河南' },
  { title: '黑龙江' },
  { title: '湖北' },
  { title: '湖南' },
  { title: '吉林' },
  { title: '江苏' },
  { title: '江西' },
  { title: '辽宁' },
  { title: '内蒙古' },
  { title: '宁夏' },
  { title: '青海' },
  { title: '山东' },
  { title: '山西' },
  { title: '陕西' },
  { title: '上海' },
  { title: '四川' },
  { title: '天津' },
  { title: '西藏' },
  { title: '新疆' },
  { title: '云南' },
  { title: '浙江' },
  { title: '重庆' }
]

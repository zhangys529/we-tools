import request from '@/utils/request'

export function getAllMenu(roleId = null) {
  return request({
    url: '/sysMenu/all',
    method: 'get',
    params: { roleId }
  })
}

export function loadMenus() {
  return request({
    url: '/sysMenu/load',
    method: 'get'
  })
}

export function insert(data) {
  return request({
    url: '/sysMenu/insert',
    method: 'post',
    data
  })
}

export function update(data) {
  return request({
    url: '/sysMenu/update',
    method: 'post',
    data
  })
}

export function remove(data) {
  return request({
    url: '/sysMenu',
    method: 'delete',
    params: data
  })
}

import request from '@/utils/request'

export function page(data) {
  return request({
    url: '/sysRole/page',
    method: 'post',
    data
  })
}

export function insert(data) {
  return request({
    url: '/sysRole/insert',
    method: 'post',
    data
  })
}

export function update(data) {
  return request({
    url: '/sysRole/update',
    method: 'post',
    data
  })
}

export function remove(data) {
  return request({
    url: '/sysRole',
    method: 'delete',
    params: data
  })
}

export function bindMenu(data) {
  return request({
    url: '/sysRole/bindMenu',
    method: 'post',
    data
  })
}

export function bindUser(data) {
  return request({
    url: '/sysRole/bindUser',
    method: 'post',
    data
  })
}

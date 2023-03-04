import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/login',
    method: 'post',
    params: data
  })
}

export function getInfo() {
  return request({
    url: '/user/self',
    method: 'get'
  })
}

export function getAllUser(roleId = null) {
  return request({
    url: '/user/all',
    method: 'get',
    params: { roleId }
  })
}

export function page(data) {
  return request({
    url: '/user/page',
    method: 'post',
    data: data
  })
}

export function insert(data) {
  return request({
    url: '/user/insert',
    method: 'post',
    data
  })
}

export function update(data) {
  return request({
    url: '/user/update',
    method: 'post',
    data
  })
}

export function getLoginRecords(userId) {
  return request({
    url: '/user/login/records/' + userId,
    method: 'get'
  })
}

export function password(data) {
  return request({
    url: '/user/password',
    method: 'post',
    params: data
  })
}

export function changePassword(userId, password) {
  return request({
    url: '/user/password/' + userId,
    method: 'post',
    params: { password }
  })
}

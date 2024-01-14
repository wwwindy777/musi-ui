import request from "/@/utils/request"

export function fetchList(query?: Object) {
  return request({
    url: '/pswdmanager/accountInfo/page',
    method: 'get',
    params: query
  })
}

export function addObj(obj?: Object) {
  return request({
    url: '/pswdmanager/accountInfo',
    method: 'post',
    data: obj
  })
}

export function getObj(id?: string) {
  return request({
    url: '/pswdmanager/accountInfo/' + id,
    method: 'get'
  })
}

export function delObjs(ids?: Object) {
  return request({
    url: '/pswdmanager/accountInfo',
    method: 'delete',
    data: ids
  })
}

export function putObj(obj?: Object) {
  return request({
    url: '/pswdmanager/accountInfo',
    method: 'put',
    data: obj
  })
}


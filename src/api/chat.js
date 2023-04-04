import request from '@/utils/request'

export function chat(messages) {
  return request({
    url: 'http://44.214.106.123:8000/chat/v1/chat/completions',
    method: 'post',
    data: {
      'model': 'gpt-3.5-turbo',
      'temperature': 0.7,
      'messages': messages
    }
  })
}

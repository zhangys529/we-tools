import request from '@/utils/request'

export function chat(content) {
  return request({
    url: 'http://44.214.106.123:8000/chat/v1/chat/completions',
    method: 'post',
    // headers: {
    //   'Authorization': 'Bearer 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'
    // },
    data: {
      'model': 'gpt-3.5-turbo',
      'temperature': 0.7,
      'messages': [{ 'role': 'user', 'content': content }]
    }
  })
}

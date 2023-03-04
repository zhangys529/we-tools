export const dateOptions = {
  // disabledDate(time) {
  //   const todayBegin = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate())
  //   return time.getTime() < todayBegin
  // },
  shortcuts: [{
    text: '今天',
    onClick(picker) {
      const todayEnd = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate(), 23, 59, 59, 999)
      picker.$emit('pick', todayEnd)
    }
  }, {
    text: '明天',
    onClick(picker) {
      const todayEnd = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate(), 23, 59, 59, 999)
      picker.$emit('pick', new Date(todayEnd.getTime() + 24 * 3600 * 1000))
    }
  }, {
    text: '7天后',
    onClick(picker) {
      const todayEnd = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate(), 23, 59, 59, 999)
      picker.$emit('pick', new Date(todayEnd.getTime() + 7 * 24 * 3600 * 1000))
    }
  }, {
    text: '30天后',
    onClick(picker) {
      const todayEnd = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate(), 23, 59, 59, 999)
      picker.$emit('pick', new Date(todayEnd.getTime() + 30 * 24 * 3600 * 1000))
    }
  }]
}

export const pickerOptions = {
  disabledDate(time) {
    const todayEnd = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate(), 23, 59, 59, 999)
    return time.getTime() > todayEnd.getTime()
  },
  shortcuts: [{
    text: '今天',
    onClick(picker) {
      const todayBegin = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate())
      const todayEnd = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate(), 23, 59, 59, 999)
      picker.$emit('pick', [todayBegin, todayEnd])
    }
  }, {
    text: '昨天',
    onClick(picker) {
      const todayBegin = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate())
      const todayEnd = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate(), 23, 59, 59, 999)
      picker.$emit('pick', [new Date(todayBegin.getTime() - 24 * 3600 * 1000), new Date(todayEnd.getTime() - 24 * 3600 * 1000)])
    }
  }, {
    text: '最近7天',
    onClick(picker) {
      const todayBegin = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate())
      const todayEnd = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate(), 23, 59, 59, 999)
      picker.$emit('pick', [new Date(todayBegin.getTime() - 6 * 24 * 3600 * 1000), todayEnd])
    }
  }, {
    text: '最近30天',
    onClick(picker) {
      const todayBegin = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate())
      const todayEnd = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate(), 23, 59, 59, 999)
      picker.$emit('pick', [new Date(todayBegin.getTime() - 29 * 24 * 3600 * 1000), todayEnd])
    }
  }]
}

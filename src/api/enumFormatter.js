import * as enums from '@/api/enums'
import moment from 'moment'

export function componentFormatter(path) {
  const componentMap = new Map(enums.components.map(component => [component.path, component.component]))
  return componentMap.get(path)
}

export function enumTitleFormatter(enums, key) {
  const enumMap = new Map(enums.map(item => [item.key, item.title]))
  return enumMap.get(key)
}

export function enumColorFormatter(enums, key) {
  const enumMap = new Map(enums.map(item => [item.key, item.type]))
  return enumMap.get(key)
}

export function currencyFormatter(row, column) {
  return (row[column.property] / 100).toFixed(2)
}

export function percentFormatter(row, column) {
  return (row[column.property] / 100).toFixed(2) + ' %'
}

export function timeFormatter(row, column) {
  return timeFormatter2(row[column.property])
}

export function timeFormatter2(time) {
  if (time === undefined || time === null) {
    return ''
  }
  return moment(Number(time)).format('yyyy-MM-DD HH:mm:ss.SSS')
}

export function dateFormatter(row, column) {
  return moment(Number(row[column.property])).format('yyyy-MM-DD')
}

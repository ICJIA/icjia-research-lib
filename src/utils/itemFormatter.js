export { format }

const format = item => ({
  ...item,
  categories: applyIfExists(formatCategories, item.categories),
  date: applyIfExists(formatDate, item.date),
  timeperiod: applyIfExists(formatTimeperiod, item.timeperiod)
})

const applyIfExists = (f, v) => (v ? f(v) : undefined)

const formatCategories = arr =>
  arr.map(category => capitalize(category)).join(', ')

const formatDate = date => (date ? date.slice(0, 10) : '')

const formatTimeperiod = ({ yearmin, yearmax, yeartype }) =>
  `${yearmin}-${yearmax} (${yeartype})`

const capitalize = str => `${str[0].toUpperCase()}${str.slice(1)}`

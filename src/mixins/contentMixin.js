export const allContentMixin = {
  filters: {
    formatDate(date) {
      return date ? date.slice(0, 10) : ''
    },
    capitalize(str) {
      return str[0].toUpperCase() + str.slice(1)
    },
    path(slug, type) {
      return `/${type}/${slug}`
    }
  }
}

export const datasetMixin = {
  filters: {
    formatTimeperiod(timeperiod) {
      return (
        timeperiod.yearmin +
        '-' +
        timeperiod.yearmax +
        ' (' +
        timeperiod.yeartype +
        ')'
      )
    }
  }
}

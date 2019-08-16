export const baseFilters = {
  filters: {
    capitalize(str) {
      return `${str[0].toUpperCase()}${str.slice(1)}`
    },
    formatDate(date) {
      return date ? date.slice(0, 10) : ''
    }
  }
}

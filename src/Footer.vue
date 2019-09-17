<template>
  <v-footer id="footer" app height="auto">
    <div class="footer-content">
      <template>{{ '© ' + year + ' ' }}</template>
      <a :href="agency.url" target="_blank" rel="noreferrer">
        <template>{{ agency.name }}</template>
      </a>
      <template>{{ ' | ' }}</template>
      <a :href="github.url" target="_blank" rel="noreferrer">
        <template>{{ github.version + ' ' }}</template>
        <v-icon>{{ mdiGithubCircle }}</v-icon>
      </a>
    </div>
  </v-footer>
</template>

<script>
import { mdiGithubCircle } from '@mdi/js'

export default {
  props: {
    agency: Object,
    github: Object
  },
  data() {
    return {
      mdiGithubCircle,
      year: new Date().getFullYear(),
      fullname: 'Illinois Criminal Justice Information Authority'
    }
  }
}
</script>

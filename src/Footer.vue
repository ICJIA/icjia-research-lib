<template>
  <v-footer height="auto">
    <div class="footer-content">
      <template>{{ '© ' + year + ' ' }}</template>
      <a :href="agency.url" target="_blank" rel="noreferrer">
        <template>{{ agency.name }}</template>
      </a>
      <template>{{ ' | ' }}</template>
      <a :href="github.url" target="_blank" rel="noreferrer">
        <template>{{ github.version + ' ' }}</template>
        <v-icon>mdi-github-circle</v-icon>
      </a>
    </div>
  </v-footer>
</template>

<script>
export default {
  props: {
    agency: Object,
    github: Object
  },
  data() {
    return {
      year: new Date().getFullYear(),
      fullname: 'Illinois Criminal Justice Information Authority'
    }
  }
}
</script>

<style scoped>
footer {
  position: absolute;
  bottom: 0;
  width: 100%;
}

.footer-content {
  width: 100% !important;
  text-align: center !important;
}
</style>

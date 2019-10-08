<template>
  <v-footer id="footer" app height="auto">
    <div class="footer-content">
      <template>{{ '© ' + new Date().getFullYear() + ' ' }}</template>
      <a :href="agency.url" target="_blank" rel="noreferrer">{{
        agency.name
      }}</a>
      <template v-if="github">
        <span class="mx-1">|</span>
        <a v-if="github" :href="github" target="_blank" rel="noreferrer">
          <v-icon>$vuetify.icons.githubCircle</v-icon>
        </a>
      </template>
    </div>
  </v-footer>
</template>

<script>
export default {
  props: {
    agency: {
      type: Object,
      default: () => ({
        name: 'Illinois Criminal Justice Information Authority',
        url: 'https://icjia.illinois.gov/'
      })
    },
    github: {
      type: String,
      url: ''
    }
  }
}
</script>

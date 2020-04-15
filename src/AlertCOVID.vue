<template>
  <v-alert v-model="alert" text dismissible color="info" class="mb-0 font-lato">
    <v-progress-circular
      v-if="loading"
      indeterminate
      color="primary"
      size="16"
      width="2"
    />
    <v-row v-else align="center" no-gutters>
      <v-icon class="mr-4" small color="red">$vuetify.icons.plusCircle</v-icon>

      <!-- eslint-disable-next-line vue/no-v-html -->
      <span v-if="success" v-html="html"></span>
      <span v-else>
        Please reload the page to view the latest COVID-19 information.
      </span>
    </v-row>
  </v-alert>
</template>

<script>
export default {
  data() {
    return {
      alert: true,
      html: '',
      loading: true,
      success: false
    }
  },
  async created() {
    try {
      const res = await fetch('https://coronavirus.icjia-api.cloud/v2/')
      const { html } = await res.json()
      this.html = html
        .replace(/<(div|i).*>|<\/(div|i)>|\n/g, '')
        .replace(/\s+/g, ' ')
        .replace('. ', '.<br>')
        .trim()

      this.success = true
    } catch {
      this.success = false
    }

    this.loading = false
  },
  methods: {
    reset() {
      this.alert = true
    }
  }
}
</script>

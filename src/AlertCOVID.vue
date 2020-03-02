<template>
  <v-alert v-model="alert" text dismissible color="info" class="mb-0 font-lato">
    <v-icon small color="red">$vuetify.icons.plusCircle</v-icon>
    View up to date information on how Illinois is handling the Coronavirus
    Disease 2019 (COVID-19) from the
    <a
      href="http://www.dph.illinois.gov/topics-services/diseases-and-conditions/diseases-a-z-list/coronavirus"
      target="_blank"
      rel="noreferrer"
      style="text-decoration: underline;"
      >Illinois Department of Public Health
      <v-icon>$vuetify.icons.openInNew</v-icon></a
    >
  </v-alert>
</template>

<script>
export default {
  data() {
    return {
      alert: true
    }
  },
  methods: {
    reset() {
      this.alert = true
    }
  }
}
</script>

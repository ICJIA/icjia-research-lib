<template>
  <v-footer height="auto">
    <v-layout justify-center row wrap>
      <v-flex text-xs-center>
        <template>{{ '© ' + year + ' ' }}</template>
        <a :href="agency.url" target="_blank" rel="noreferrer">
          <template>{{ agency.name }}</template>
        </a>
        <template>{{ ' | ' }}</template>
        <a :href="github.url" target="_blank" rel="noreferrer">
          <template>{{ github.version + ' ' }}</template>
          <v-icon>fa fa-github</v-icon>
        </a>
      </v-flex>
    </v-layout>
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
</style>

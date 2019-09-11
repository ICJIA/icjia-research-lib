<template>
  <div id="article-toc">
    <h3 class="text-uppercase font-oswald mb-2">Table of contents</h3>

    <v-divider></v-divider>

    <v-list>
      <v-list-item
        v-for="heading in headings"
        :key="heading.id"
        class="pa-0"
        dense
      >
        <router-link
          :to="`#${heading.id}`"
          class="large font-lato toc-item py-2 pl-6"
          :class="{ 'toc-item-active': heading.id === activeHeading }"
        >
          <template>{{ heading.innerText }}</template>
        </router-link>
      </v-list-item>
    </v-list>
  </div>
</template>

<script>
export default {
  props: {
    headings: NodeList,
    activeHeading: String
  }
}
</script>

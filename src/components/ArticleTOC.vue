<template>
  <div id="article-toc">
    <h3 class="uppercase font-oswald mb-2">Table of contents</h3>

    <v-divider></v-divider>

    <v-list>
      <template v-for="heading in headings">
        <router-link :key="heading.id" :to="`#${heading.id}`">
          <div
            class="large font-lato toc-item py-2 pl-6"
            :class="{ 'toc-item-active': heading.id === activeHeading }"
          >
            <template>{{ heading.innerText }}</template>
          </div>
        </router-link>
      </template>
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

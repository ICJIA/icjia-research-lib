<template>
  <div id="toc">
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

<style scoped>
#toc .v-list {
  background: none;
}
.toc-item {
  font-size: 1.1em;
  color: #333;
}
.toc-item:hover {
  background: rgba(0, 0, 0, 0.04);
  color: #1976d2;
  border-left: 1px solid #1976d2;
}
.toc-item-active {
  color: #1976d2;
  border-left: 1px solid #1976d2;
}
</style>

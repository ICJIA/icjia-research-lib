<template>
  <div>
    <v-toolbar id="toolbar" :height="hpixel" fixed scroll-off-screen>
      <a
        class="hidden-xs-only"
        href="http://www.icjia.state.il.us"
        target="_blank"
        rel="noreferrer"
      >
        <img :src="logoSrc" :height="logoHpixel" alt="logo" />
      </a>

      <router-link to="/">
        <v-toolbar-title>
          <template>{{ 'RESEARCH HUB' }}</template>
          <slot name="titleExtra"></slot>
        </v-toolbar-title>
      </router-link>

      <v-spacer></v-spacer>

      <v-toolbar-items class="hidden-sm-and-down">
        <slot name="toolbarItems"></slot>
      </v-toolbar-items>

      <v-btn
        v-if="menu"
        class="hidden-md-and-up"
        flat
        icon
        @click="drawer = !drawer"
      >
        <v-icon>menu</v-icon>
      </v-btn>
    </v-toolbar>

    <div :style="{ height: hpixel, backgroundColor: '#466c8c' }"></div>

    <v-navigation-drawer v-model="drawer" temporary right app width="175">
      <v-list class="slot">
        <slot name="toolbarDrawerItems"></slot>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script>
export default {
  props: {
    menu: Boolean,
    logoPath: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      height: 60,
      drawer: null
    }
  },
  computed: {
    hpixel() {
      return `${this.height}px`
    },
    logoHpixel() {
      return `${this.height * 0.6}px`
    },
    logoSrc() {
      return this.logoPath ? this.logoPath : process.env.VUE_APP_LOGO_URL
    }
  }
}
</script>

<style scoped>
a {
  text-decoration: none;
  line-height: 1;
  color: rgba(0, 0, 0, 0.87);
}
img {
  margin-right: 10px;
}
#toolbar {
  font-family: 'Lato';
  box-shadow: 0 2px rgba(0, 0, 0, 0.2);
}
.slot {
  font-family: 'Lato';
  font-size: 0.8em;
  text-transform: uppercase;
  text-align: center;
}
</style>

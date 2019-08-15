<template>
  <div>
    <v-app-bar id="toolbar" :height="hpixel" fixed hide-on-scroll>
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
          <span style="letter-spacing: 0.03em;">RESEARCH HUB</span>
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
        text
        icon
        @click="drawer = !drawer"
      >
        <v-icon>mdi-menu</v-icon>
      </v-btn>
    </v-app-bar>

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
    menu: {
      type: Boolean,
      default: true
    },
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

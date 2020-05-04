<template>
  <BaseCardLayout
    :external="app.external"
    :horizontal="horizontal"
    :image="app.image"
    :preview="preview"
  >
    <template #title>
      <BaseTitleDisplay :to="preview ? '' : `/apps/${app.slug}`">
        <template>{{ app.title }}</template>
      </BaseTitleDisplay>

      <div v-if="app.tags">
        <BasePropChip
          v-for="tag in app.tags"
          :key="tag"
          @chip-click="$emit('tag-click', $event)"
        >
          <template>{{ tag }}</template>
        </BasePropChip>
      </div>
    </template>

    <template #props>
      <BasePropDisplay name="Contributors">
        <template v-if="app.contributors">
          <span v-for="(contributor, i) in app.contributors" :key="i">
            <template v-if="i > 1">{{
              app.contributors.length > i + 1 ? ', ' : ' and '
            }}</template>

            <a
              v-if="contributor.url"
              :href="contributor.url"
              target="_blank"
              rel="noreferrer"
            >
              <template>{{ contributor.title }}</template>
            </a>
            <template v-else>{{ contributor.title }}</template>
          </span>
        </template>

        <template v-else>{{ 'ICJIA R&A staff' }}</template>
      </BasePropDisplay>

      <BasePropDisplay v-if="app.categories" name="Categories">
        <span>{{ app.categories }}</span>
      </BasePropDisplay>
    </template>

    <template #buttons>
      <BaseButton
        label="More"
        :small="true"
        :to="preview ? null : `/apps/${app.slug}`"
        icon="$vuetify.icons.dotsHorizontal"
      >
        <template>{{ 'more' }}</template>
      </BaseButton>
    </template>
  </BaseCardLayout>
</template>

<script>
import { format } from './utils/itemFormatter'
import BaseButton from './components/BaseButton'
import BaseCardLayout from './components/BaseCardLayout'
import BasePropChip from './components/BasePropChip'
import BasePropDisplay from './components/BasePropDisplay'
import BaseTitleDisplay from './components/BaseTitleDisplay'

export default {
  components: {
    BaseButton,
    BaseCardLayout,
    BasePropChip,
    BasePropDisplay,
    BaseTitleDisplay
  },
  props: {
    horizontal: {
      type: Boolean,
      default: false
    },
    item: {
      type: Object,
      default() {
        return {
          contributors: null,
          categories: null,
          date: null,
          description: null,
          external: null,
          image: null,
          tags: null,
          title: null
        }
      }
    },
    preview: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    app() {
      return format(this.item)
    }
  }
}
</script>

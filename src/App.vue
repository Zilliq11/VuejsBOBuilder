<template>
  <div class="h-100">
    <div
      v-if="loading"
      class="d-flex flex-column align-items-center justify-content-center h-100"
    >
      <small>{{ $t('app.loading') }}</small>
      <b-spinner variant="secondary" />
    </div>

    <template v-else>
      <component :is="!isConnected ? 'AnonymousTemplate' : 'ConnectedTemplate'" />
    </template>
  </div>
</template>

<script>
import { mapActions, mapState, mapGetters } from 'vuex'
import registerEntity from '@/store/modules/entities'
import SidebarMenu from '@/components/SidebarMenu'
import Realtime from '@/components/Realtime'
import { AnonymousTemplate, ConnectedTemplate } from '@/templates'

export default {
  components: { Realtime, SidebarMenu, AnonymousTemplate, ConnectedTemplate },
  data () {
    return {
      loading: true,
    }
  },
  computed: {
    ...mapState('config', ['entities']),
    ...mapGetters('auth', ['isConnected']),
  },
  async mounted () {
    await this.registerApplication()
    const store = this.$store
    this.entities.map(({ name, api }) => {
      return store.registerModule(
        [name],
        registerEntity(name, api),
      )
    })
    this.loading = false
  },
  methods: {
    ...mapActions('config', ['registerApplication']),
  },
}
</script>

<style lang="sass">
  @import './assets/scss/_variables.scss'
  @import '~bootstrap/scss/bootstrap.scss'
  @import '~bootstrap-vue/src/index.scss'
  @import './assets/scss/index.scss'
</style>

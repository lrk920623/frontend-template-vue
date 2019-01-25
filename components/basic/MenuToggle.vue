<template>
  <a-icon
    class="trigger"
    :type="menuCollapsed ? 'menu-unfold' : 'menu-fold'"
    @click="toggle(!menuCollapsed)"></a-icon>
</template>

<script>
import { mapMutations, mapState } from 'vuex'
import { CHANGE_MENU_COLLAPSED } from '../../types/mutation-types'
export default {
  name: 'VToggleMenu',

  computed: {
    ...mapState(['menuCollapsed'])
  },

  methods: {
    ...mapMutations({
      toggle: CHANGE_MENU_COLLAPSED
    })
  }
}
</script>

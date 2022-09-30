<template>
  <v-app>
    <v-app-bar
      v-if="isAuth"
      elevation="0"
      app
    >
      <div class="logo--wrpa">
        <nuxt-link to="/">
          <img
            src="/logo/logo.png"
            alt="logo"
          >
        </nuxt-link>
      </div>
      <v-spacer />
      <nuxt-link
        v-if="$auth.user.is_admin"
        to="/admin"
      >
        <v-btn
          outlined
          color="primary"
        >
          Admin panel
        </v-btn>
      </nuxt-link>
      <v-btn
        outlined
        color="primary"
        @click="$nuxt.$emit('open-add-user')"
      >
        add User
      </v-btn>
      <v-btn
        color="red"
        class="exit"
        @click="$auth.logout()"
      >
        Exit
      </v-btn>
    </v-app-bar>
    <v-main>
      <Nuxt />
    </v-main>
    <dialog-add-user />
  </v-app>
</template>

<script>
export default {
  name: 'DefaultLayout',
  data() {
    return {
    }
  },
  computed: {
    isAuth() {
      return this.$auth.loggedIn
    },
  }
}
</script>

<style lang="scss" scoped>
:deep() {
  .v-toolbar__content {
    gap: 20px
  }
}

.logo--wrpa {
  height: 36px;
}

.exit {
  color: $white;
}
</style>
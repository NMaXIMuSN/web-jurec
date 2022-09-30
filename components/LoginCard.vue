<template>
  <div class="login-card">
    <div class="login-card__img-wrap">
      <img src="/logo/logoX2.png" />
    </div>
    <div class="login-card__title">Login</div>
    <div
      v-if="countError > 0"
      class="login-card__error"
    >
      <div>
        {{ errorMesage }}
      </div>
      <div v-if="countError < 3">
        Try: {{ 3 - countError }}
      </div>
      <div v-else>
        Too many attempts. Wait {{ secontWait }} seconds to continue
      </div>
    </div>
    <div class="login-card__row">
      <div>Username</div>
      <v-text-field v-model="form.email" :disabled="disable" outlined />
    </div>
    <div class="login-card__row">
      <div>Password</div>
      <v-text-field
        v-model="form.password"
        :disabled="disable"
        outlined
        type="password"
      />
    </div>
    <v-btn
      color="primary"
      :disabled="disable"
      @click="login"
    >
      Войти
    </v-btn>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        email: '',
        password: '',
      },
      errorMesage: '',
      countError: 0,
      disable: false,
      secontWait: 10,
    }
  },
  watch: {
    countError(newValue) {
      if (newValue === 3) {
        this.disable = true
        
        const timer = setInterval(() => {
          this.secontWait--
        }, 1000);

        setTimeout(() => {
          this.disable = false
          this.errorMesage = ''
          this.countError = 0
          this.secontWait = 10
          clearInterval(timer)
        }, 10000)
      }
    },
  },
  methods: {
    login() {
        this.$auth.loginWith('local', { data: this.form })
          .then(() => {
            if (this.$auth.user.is_admin) {
              this.$router.push('/admin')
            }
            else {
              this.$router.push('/')
            }
          })
          .catch(({response}) => {
            this.errorMesage = response.data.msg
            this.countError++
          })
      },
    logout() {
      this.$auth.logout()
    },
  },
}
</script>

<style lang="scss" scoped>
.login-card {
  max-width: 600px;
  padding: 24px;
  border-radius: 12px;
  background: $white;
  display: flex;
  flex-direction: column;
  align-items: center;

  &__img {
    &-wrap {
      max-width: 350px;
      padding: 0 25px;
      margin-bottom: 24px;
    }
  }

  &__title {
    font-size: 24px;
    line-height: 120%;
    font-weight: 700;
    margin-bottom: 24px;
  }

  &__error {
    color: #FF6A55;
    font-size: 14px;
    line-height: 140%;
    margin-bottom: 12px;
  }

  &__row {
    width: 100%;
  }
}
</style>

<template>
  <div class="login-page">
    <div class="login-container">
      <div class="login-card shadow-lg border-0 rounded-4 overflow-hidden">
        <div class="row g-0">
          <!-- Left Side: Welcome Info -->
          <div class="col-lg-6 bg-primary d-none d-lg-flex align-items-center justify-content-center text-white p-5">
            <div class="text-center">
              <div class="brand-logo-large mb-4 mx-auto">
                <i class="bi bi-check2-circle display-1"></i>
              </div>
              <h2 class="fw-bold mb-3">ប្រព័ន្ធគ្រប់គ្រងផ្ទះជួល</h2>
              <p class="lead opacity-75">គ្រប់គ្រងបន្ទប់ អ្នកជួល និងវិក្កយបត្រដោយងាយស្រួល ក្នុងកន្លែងតែមួយ។</p>
            </div>
          </div>

          <!-- Right Side: Login Form -->
          <div class="col-lg-6 p-4 p-md-5 bg-white">
            <div class="form-header mb-5">
              <h3 class="fw-bold text-dark">ចូលប្រើប្រាស់</h3>
              <p class="text-muted small">សូមបញ្ចូលអ៊ីមែល និងពាក្យសម្ងាត់របស់អ្នកដើម្បីបន្ត</p>
            </div>

            <div v-if="authStore.error" class="alert alert-danger border-0 rounded-3 mb-4 small d-flex align-items-center">
              <i class="bi bi-exclamation-triangle-fill me-2"></i>
              {{ authStore.error }}
            </div>

            <form @submit.prevent="handleLogin">
              <div class="mb-4">
                <BaseInput 
                  label="អ៊ីមែល" 
                  type="email" 
                  v-model="authStore.email" 
                  placeholder="name@example.com"
                  required
                />
              </div>

              <div class="mb-4">
                <BaseInput 
                  label="ពាក្យសម្ងាត់" 
                  type="password" 
                  v-model="authStore.password" 
                  placeholder="••••••••"
                  required
                />
              </div>

              <div class="d-flex justify-content-between align-items-center mb-5">
                <div class="form-check">
                  <input class="form-check-input" type="checkbox" id="rememberMe" v-model="authStore.rememberMe">
                  <label class="form-check-label small text-muted" for="rememberMe">
                    ចងចាំខ្ញុំ
                  </label>
                </div>
                <a href="#" class="small text-primary text-decoration-none fw-bold">ភ្លេចពាក្យសម្ងាត់?</a>
              </div>

              <BaseButton 
                variant="primary" 
                size="lg" 
                fullWidth 
                type="submit" 
                :loading="authStore.loading"
                loadingText="កំពុងផ្ទៀងផ្ទាត់..."
              >
                ចូលប្រើប្រាស់
              </BaseButton>
            </form>

            <div class="mt-5 text-center">
              <p class="small text-muted">មិនទាន់មានគណនី? <a href="#" class="text-primary text-decoration-none fw-bold">ចុះឈ្មោះឥឡូវនេះ</a></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/authentication';
import BaseInput from '@/components/ui/BaseInput.vue';
import BaseButton from '@/components/ui/BaseButton.vue';

const authStore = useAuthStore();
const router = useRouter();

const handleLogin = async () => {
  const success = await authStore.login();
  if (success) {
    router.push('/dashboard');
  }
};
</script>

<style scoped>
.login-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f8fafc;
  padding: 20px;
}

.login-container {
  width: 100%;
  max-width: 1000px;
}

.login-card {
  min-height: 600px;
}

.bg-primary {
  background: linear-gradient(135deg, #0d9488, #0f766e) !important;
}

.brand-logo-large {
  width: 120px;
  height: 120px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.3);
}

.form-check-input:checked {
  background-color: #0d9488;
  border-color: #0d9488;
}

@media (max-width: 991.98px) {
  .login-container {
    max-width: 500px;
  }
}
</style>

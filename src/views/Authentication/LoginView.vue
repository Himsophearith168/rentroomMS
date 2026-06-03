<template>
  <div class="login-page">
    <!-- Background Shapes -->
    <div class="bg-shape shape-1"></div>
    <div class="bg-shape shape-2"></div>
    <div class="bg-shape shape-3"></div>

    <div class="login-container">
      <div class="login-card shadow-xl border-0 rounded-5 overflow-hidden">
        <div class="row g-0">
          <!-- Left Side: Welcome Info -->
          <div class="col-lg-6 bg-primary d-none d-lg-flex align-items-center justify-content-center text-white p-5 position-relative overflow-hidden">
            <!-- Floating Decorative Elements -->
            <div class="decor-circle c-1"></div>
            <div class="decor-circle c-2"></div>
            <div class="decor-circle c-3"></div>
            <div class="decor-dots"></div>

            <div class="text-center position-relative" style="z-index: 2;">
              <div class="brand-logo-large mb-4 mx-auto shadow-lg">
                <i class="bi bi-buildings display-4"></i> <!-- Changed to a building icon -->
              </div>
              <h2 class="fw-bold mb-3 ls-tight">ប្រព័ន្ធគ្រប់គ្រងផ្ទះជួល</h2>
              <p class="lead opacity-80 px-4" style="font-size: 1.05rem; line-height: 1.7;">
                គ្រប់គ្រងបន្ទប់ អ្នកជួល និងវិក្កយបត្រដោយងាយស្រួល ក្នុងកន្លែងតែមួយ។
              </p>
              
              <!-- Added visual trust indicator -->
              <div class="mt-5 d-flex justify-content-center gap-3 opacity-50">
                <i class="bi bi-shield-check fs-4"></i>
                <i class="bi bi-cloud-check fs-4"></i>
                <i class="bi bi-graph-up fs-4"></i>
              </div>
            </div>
          </div>

          <!-- Right Side: Login Form -->
          <div class="col-lg-6 p-4 p-md-5 bg-white d-flex flex-column justify-content-center">
            <div class="form-header mb-5">
              <div class="mb-4 d-lg-none text-center">
                <i class="bi bi-buildings display-4 text-primary"></i>
              </div>
              <h3 class="fw-bold text-dark mb-2" style="font-size: 1.75rem;">ចូលប្រើប្រាស់</h3>
              <p class="text-muted small mb-0">សូមបញ្ចូលអ៊ីមែល និងពាក្យសម្ងាត់របស់អ្នកដើម្បីបន្ត</p>
            </div>

            <div v-if="authStore.error" class="alert alert-danger border-0 rounded-4 mb-4 small d-flex align-items-center alert-dismissible fade show" role="alert">
              <i class="bi bi-exclamation-triangle-fill me-2 fs-6"></i>
              <div>{{ authStore.error }}</div>
              <button type="button" class="btn-close btn-close-white ms-auto" style="font-size: 0.6em;" @click="authStore.error = ''"></button>
            </div>

            <form @submit.prevent="handleLogin" class="form-animated">
              <div class="mb-4">
                <BaseInput 
                  label="អ៊ីមែល ឬ ឈ្មោះអ្នកប្រើ" 
                  type="text" 
                  v-model="authStore.email" 
                  placeholder="admin@gmail.com ឬ admin"
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
                <a href="#" class="small text-decoration-none fw-bold btn-forgot">ភ្លេចពាក្យសម្ងាត់?</a>
              </div>

              <BaseButton 
                variant="primary" 
                size="lg" 
                fullWidth 
                type="submit" 
                :loading="authStore.loading"
                loadingText="កំពុងផ្ទៀងផ្ទាត់..."
                class="btn-login"
              >
                ចូលប្រើប្រាស់
              </BaseButton>
            </form>

            <div class="mt-5 text-center">
              <p class="small text-muted mb-0">មិនទាន់មានគណនី? <a href="#" class="text-decoration-none fw-bold btn-signup">ចុះឈ្មោះឥឡូវនេះ</a></p>
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
/* --- Page & Background --- */
.login-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f0fdfa; /* Very light teal tint */
  padding: 20px;
  position: relative;
  overflow: hidden;
  z-index: 0;
}

.bg-shape {
  position: absolute;
  border-radius: 50%;
  filter: blur(80px);
  opacity: 0.5;
  z-index: -1;
}

.shape-1 {
  width: 500px;
  height: 500px;
  background: rgba(13, 148, 136, 0.2);
  top: -150px;
  left: -150px;
}

.shape-2 {
  width: 400px;
  height: 400px;
  background: rgba(110, 231, 183, 0.2);
  bottom: -100px;
  right: -100px;
}

.shape-3 {
  width: 300px;
  height: 300px;
  background: rgba(255, 255, 255, 0.8);
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

/* --- Card Styling --- */
.login-container {
  width: 100%;
  max-width: 1050px;
  z-index: 1;
}

.login-card {
  min-height: 80vh;
  max-height: 750px;
  border-radius: 2rem !important; /* Extra rounded */
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.08);
  animation: fadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.5);
}

/* --- Left Panel --- */
.bg-primary {
  background: linear-gradient(160deg, #0d9488, #064e3b) !important; /* Richer gradient */
  position: relative;
}

.brand-logo-large {
  width: 110px;
  height: 110px;
  background: rgba(255, 255, 255, 0.15);
  border-radius: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.25);
  transition: transform 0.3s ease;
}

.brand-logo-large:hover {
  transform: scale(1.05) rotate(-5deg);
}

/* Floating decorative elements */
.decor-circle {
  position: absolute;
  border-radius: 50%;
  border: 1px solid rgba(255, 255, 255, 0.1);
  background: rgba(255, 255, 255, 0.05);
}

.c-1 {
  width: 300px;
  height: 300px;
  top: -80px;
  right: -80px;
  animation: float 8s infinite ease-in-out;
}

.c-2 {
  width: 150px;
  height: 150px;
  bottom: 30px;
  left: -40px;
  animation: float 6s infinite ease-in-out reverse;
}

.c-3 {
  width: 80px;
  height: 80px;
  top: 40%;
  left: 10%;
  background: rgba(255, 255, 255, 0.1);
  animation: float 10s infinite ease-in-out 2s;
}

.decor-dots {
  position: absolute;
  bottom: 40px;
  right: 40px;
  width: 80px;
  height: 80px;
  background-image: radial-gradient(rgba(255, 255, 255, 0.3) 1px, transparent 1px);
  background-size: 10px 10px;
  opacity: 0.6;
}

/* --- Right Panel & Form --- */
.form-header h3 {
  letter-spacing: -0.02em;
}

/* Deep styling for BaseInput (assuming it renders a .form-control inside a wrapper) */
:deep(.form-control) {
  border: 1.5px solid #e2e8f0;
  border-radius: 0.75rem;
  padding: 0.75rem 1rem;
  font-size: 0.95rem;
  transition: all 0.2s ease-in-out;
  background-color: #f8fafc;
}

:deep(.form-control:focus) {
  background-color: #ffffff;
  border-color: #0d9488;
  box-shadow: 0 0 0 4px rgba(13, 148, 136, 0.1);
}

:deep(label) {
  font-weight: 600;
  color: #334155;
  font-size: 0.875rem;
  margin-bottom: 0.5rem;
}

/* Checkbox */
.form-check-input:checked {
  background-color: #0d9488;
  border-color: #0d9488;
}

.form-check-input {
  border-radius: 0.4em;
  border: 1.5px solid #cbd5e1;
  cursor: pointer;
}

.form-check-input:focus {
  box-shadow: 0 0 0 0.2rem rgba(13, 148, 136, 0.15);
  border-color: #0d9488;
}

/* Links */
.btn-forgot, .btn-signup {
  color: #0d9488;
  transition: color 0.2s ease;
}

.btn-forgot:hover, .btn-signup:hover {
  color: #064e3b;
}

/* Deep styling for BaseButton */
:deep(.btn-login) {
  border-radius: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.025em;
  background: linear-gradient(135deg, #0d9488, #0f766e);
  border: none;
  box-shadow: 0 8px 20px -4px rgba(13, 148, 136, 0.4);
  transition: all 0.3s ease;
  padding: 0.85rem;
}

:deep(.btn-login:hover:not(:disabled)) {
  transform: translateY(-2px);
  box-shadow: 0 12px 28px -4px rgba(13, 148, 136, 0.5);
  background: linear-gradient(135deg, #0f766e, #064e3b);
}

:deep(.btn-login:active:not(:disabled)) {
  transform: translateY(0);
}

/* Alert Error */
.alert-danger {
  background-color: #fff1f2;
  color: #be123c;
  border-left: 4px solid #be123c;
  border-radius: 0.5rem;
}

/* --- Animations --- */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px) scale(0.98);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

@keyframes float {
  0% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(-20px) rotate(2deg); }
  100% { transform: translateY(0px) rotate(0deg); }
}

/* --- Responsive --- */
@media (max-width: 991.98px) {
  .login-container {
    max-width: 480px;
  }
  .login-card {
    min-height: auto;
  }
}
</style>
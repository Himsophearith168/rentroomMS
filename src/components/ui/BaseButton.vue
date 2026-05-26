<template>
  <button :type="type" :disabled="disabled || loading" @click="onClick" :class="[
    'btn d-flex align-items-center justify-content-center px-4 global-style',
    btnClass,
    { disabled: disabled || loading },
  ]">
    <!-- Loading -->
    <template v-if="loading">
      <span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
      {{ loadingText }}
    </template>

    <!-- Normal -->
    <template v-else>
      <slot>Button</slot>
    </template>
  </button>
</template>

<script setup>
defineProps({
  type: {
    type: String,
    default: "button",
  },
  loading: {
    type: Boolean,
    default: false,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  loadingText: {
    type: String,
    default: "Loading...",
  },
  btnClass: {
    type: String,
    default: "w-fit",
  },
});

const emit = defineEmits(["click"]);

const onClick = (e) => {
  emit("click", e);
};
</script>

<style scoped>
.global-style {
  font-family: var(--font-khmer);
  gap: 10px;
  padding: 15px 16px;
  font-size: 18px;
  font-weight: var(--font-weight-medium);
  border-radius: var(--radius-md);
  background: #003262 !important;
  color: var(--color-bg-light);
  transition: background 0.2s ease, opacity 0.2s ease;
  border: none;
}


.global-style:hover:not(:disabled) {
  background:#314158 !important;
  color: var(--color-bg-light);
}


.global-style:active:not(:disabled) {
  background: #314158 !important;
  color: var(--color-bg-light);
}

.global-style:disabled,
.global-style.disabled {
  opacity: 0.6;
  cursor: not-allowed;
  background: var(--primary-color);
  pointer-events: none;
}

.btn-primary {
  background: #1a6fdb;
  color: #fff;
}

.btn-primary:hover:not(:disabled) {
  background: #155fc0;
}

.btn-success {
  background: #1D9E75;
  color: #fff;
}

.btn-success:hover:not(:disabled) {
  background: #168a65;
}

.btn-danger {
  background: #E24B4A;
  color: #fff;
}

.btn-danger:hover:not(:disabled) {
  background: #cc3a39;
}

.btn-soft-primary {
  background: #E6F1FB;
  color: #185FA5;
}

.btn-soft-primary:hover:not(:disabled) {
  background: #B5D4F4;
}

.btn-soft-success {
  background: #E1F5EE;
  color: #0F6E56;
}

.btn-soft-success:hover:not(:disabled) {
  background: #9FE1CB;
}

.btn-soft-danger {
  background: #FCEBEB;
  color: #A32D2D;
}

.btn-soft-danger:hover:not(:disabled) {
  background: #F7C1C1;
}

.btn-outline {
  background: transparent;
  border: 1.5px solid var(--color-border-secondary);
  color: var(--color-text-secondary);
  font-family: var(--font-khmer);
  font-size: 13px;
  font-weight: 700;
  padding: 6px 14px;
  border-radius: 7px;
  transition: background 0.13s, border-color 0.13s, color 0.13s, transform 0.1s;
}

.btn-outline:hover:not(:disabled) {
  background: var(--color-background-secondary);
  border-color: var(--color-border-primary);
  color: var(--color-text-primary);
}

.btn-outline:active:not(:disabled) {
  transform: scale(0.95);
}

.btn-outline:disabled {
  opacity: 0.42;
  cursor: not-allowed;
}

.btn-cancel {
  background: var(--color-background-primary);
  color: var(--color-text-secondary);
  border: 0.5px solid var(--color-border-secondary);
}

.btn-cancel:hover:not(:disabled) {
  background: var(--color-background-secondary);
  color: var(--color-text-primary);
}
</style>
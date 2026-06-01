<template>
  <button
    :type="type"
    :disabled="disabled || loading"
    @click="onClick"
    :class="[
      'base-button',
      `variant-${variant}`,
      `size-${size}`,
      { 'is-loading': loading, 'is-disabled': disabled || loading, 'is-full-width': fullWidth }
    ]"
  >
    <!-- Loading Spinner -->
    <span v-if="loading" class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
    
    <span class="button-content" :class="{ 'invisible': loading }">
      <slot name="icon-left"></slot>
      <slot>{{ loading ? loadingText : 'Button' }}</slot>
      <slot name="icon-right"></slot>
    </span>
  </button>
</template>

<script setup>
defineProps({
  type: {
    type: String,
    default: "button",
  },
  variant: {
    type: String,
    default: "primary",
  },
  size: {
    type: String,
    default: "md", 
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
    default: "កំពុងដំណើរការ...",
  },
  fullWidth: {
    type: Boolean,
    default: false,
  }
});

const emit = defineEmits(["click"]);

const onClick = (e) => {
  emit("click", e);
};
</script>

<style scoped>
.base-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  border: none;
  border-radius: var(--radius-md);
  font-weight: 600;
  transition: var(--transition);
  cursor: pointer;
  position: relative;
  font-family: inherit;
  white-space: nowrap;
  outline: none;
}

.base-button:active {
  transform: scale(0.98);
}

.button-content {
  display: flex;
  align-items: center;
  gap: 8px;
}

/* Variants */
.variant-primary {
  background: var(--primary);
  color: white;
  box-shadow: 0 4px 14px 0 rgba(13, 148, 136, 0.39);
}

.variant-primary:hover:not(.is-disabled) {
  background: var(--primary-hover);
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(13, 148, 136, 0.23);
}

.variant-secondary {
  background: var(--surface-alt);
  color: var(--text-main);
  border: 1px solid var(--border-color);
}

.variant-secondary:hover:not(.is-disabled) {
  background: var(--border-color);
  transform: translateY(-1px);
}

.variant-outline {
  background: transparent;
  border: 1.5px solid var(--border-color);
  color: var(--text-muted);
}

.variant-outline:hover:not(.is-disabled) {
  border-color: var(--primary);
  color: var(--primary);
  background: var(--primary-soft);
  transform: translateY(-1px);
}

.variant-danger {
  background: var(--danger-soft);
  color: var(--danger);
}

.variant-danger:hover:not(.is-disabled) {
  background: var(--danger);
  color: white;
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(239, 68, 68, 0.2);
}

/* Sizes */
.size-sm {
  padding: 8px 16px;
  font-size: 0.875rem;
  border-radius: var(--radius-sm);
}

.size-md {
  padding: 12px 24px;
  font-size: 1rem;
}

.size-lg {
  padding: 16px 32px;
  font-size: 1.125rem;
  border-radius: var(--radius-lg);
}

/* States */
.is-full-width {
  width: 100%;
}

.is-disabled {
  opacity: 0.5;
  cursor: not-allowed;
  filter: grayscale(0.5);
}

.invisible {
  visibility: hidden;
}

.spinner-border {
  position: absolute;
  width: 1.2rem;
  height: 1.2rem;
  border: 2px solid currentColor;
  border-right-color: transparent;
  border-radius: 50%;
  animation: spinner .75s linear infinite;
}

@keyframes spinner {
  to { transform: rotate(360deg); }
}
</style>

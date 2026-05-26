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
    default: "primary", // primary, secondary, outline, danger, ghost
  },
  size: {
    type: String,
    default: "md", // sm, md, lg
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
  gap: 8px;
  border: none;
  border-radius: 12px;
  font-weight: 600;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;
  position: relative;
  font-family: inherit;
  white-space: nowrap;
}

.button-content {
  display: flex;
  align-items: center;
  gap: 8px;
}

/* Variants */
.variant-primary {
  background: linear-gradient(135deg, #0d9488, #0f766e);
  color: white;
  box-shadow: 0 4px 12px rgba(13, 148, 136, 0.2);
}

.variant-primary:hover:not(.is-disabled) {
  transform: translateY(-1px);
  box-shadow: 0 6px 15px rgba(13, 148, 136, 0.3);
  background: linear-gradient(135deg, #0f766e, #115e59);
}

.variant-secondary {
  background: #f1f5f9;
  color: #475569;
}

.variant-secondary:hover:not(.is-disabled) {
  background: #e2e8f0;
  color: #1e293b;
}

.variant-outline {
  background: transparent;
  border: 1.5px solid #e2e8f0;
  color: #64748b;
}

.variant-outline:hover:not(.is-disabled) {
  border-color: #0d9488;
  color: #0d9488;
  background: rgba(13, 148, 136, 0.05);
}

.variant-danger {
  background: #fee2e2;
  color: #dc2626;
}

.variant-danger:hover:not(.is-disabled) {
  background: #fecaca;
  color: #b91c1c;
}

/* Sizes */
.size-sm {
  padding: 8px 16px;
  font-size: 14px;
  border-radius: 10px;
}

.size-md {
  padding: 12px 24px;
  font-size: 16px;
}

.size-lg {
  padding: 16px 32px;
  font-size: 18px;
}

/* States */
.is-full-width {
  width: 100%;
}

.is-disabled {
  opacity: 0.6;
  cursor: not-allowed;
  pointer-events: none;
}

.invisible {
  visibility: hidden;
}

.spinner-border {
  position: absolute;
}
</style>

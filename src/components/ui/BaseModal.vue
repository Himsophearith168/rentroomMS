<template>
  <Teleport to="body">
    <div class="base-modal-container">
      <Transition name="fade">
        <div v-if="show" class="modal-backdrop" @click="emit('close')" />
      </Transition>

      <Transition name="zoom">
        <div v-if="show" class="modal-wrapper" @click.self="emit('close')">
          <div :class="['modal-content-custom', sizeClass]">
            <!-- Header -->
            <div class="modal-header-custom">
              <slot name="header">
                <h5 class="modal-title-custom">{{ title }}</h5>
              </slot>
              <button type="button" class="close-btn" @click="emit('close')">
                <i class="bi bi-x"></i>
              </button>
            </div>

            <!-- Body -->
            <div class="modal-body-custom">
              <slot></slot>
            </div>

            <!-- Footer -->
            <div v-if="$slots.footer" class="modal-footer-custom">
              <slot name="footer"></slot>
            </div>
          </div>
        </div>
      </Transition>
    </div>
  </Teleport>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  show: { type: Boolean, default: false },
  title: { type: String, default: '' },
  size: { type: String, default: 'md' } // sm, md, lg, xl
});

const emit = defineEmits(['close']);

const sizeClass = computed(() => {
  return `modal-${props.size}`;
});
</script>

<style scoped>
.base-modal-container {
  position: relative;
  z-index: 2000;
}

.modal-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(15, 23, 42, 0.4);
  backdrop-filter: blur(4px);
  z-index: 2001;
}

.modal-wrapper {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2002;
  padding: 20px;
  pointer-events: none;
}

.modal-content-custom {
  background: white;
  border-radius: var(--radius-lg);
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  display: flex;
  flex-direction: column;
  max-height: 90vh;
  width: 100%;
  pointer-events: auto;
  overflow: hidden;
}

.modal-sm { max-width: 400px; }
.modal-md { max-width: 600px; }
.modal-lg { max-width: 800px; }
.modal-xl { max-width: 1140px; }

.modal-header-custom {
  padding: 20px 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid var(--border-color);
  background: var(--surface-alt);
}

.modal-title-custom {
  margin: 0;
  font-weight: 700;
  font-size: 1.25rem;
  color: var(--text-main);
}

.close-btn {
  background: transparent;
  border: none;
  font-size: 1.5rem;
  color: var(--text-muted);
  cursor: pointer;
  padding: 4px;
  line-height: 1;
  border-radius: var(--radius-sm);
  transition: var(--transition);
  display: flex;
  align-items: center;
  justify-content: center;
}

.close-btn:hover {
  background: var(--danger-soft);
  color: var(--danger);
}

.modal-body-custom {
  padding: 24px;
  overflow-y: auto;
  flex: 1;
}

.modal-footer-custom {
  padding: 16px 24px;
  border-top: 1px solid var(--border-color);
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 12px;
  background: var(--surface-alt);
}

/* Transitions */
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}

.zoom-enter-active, .zoom-leave-active {
  transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
}
.zoom-enter-from {
  opacity: 0;
  transform: scale(0.9) translateY(20px);
}
.zoom-leave-to {
  opacity: 0;
  transform: scale(0.95);
}
</style>

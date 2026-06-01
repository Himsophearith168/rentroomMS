<template>
  <div class="card-modern p-4 d-flex flex-row justify-content-between align-items-start h-100 select-none">
    <div class="d-flex flex-column justify-content-between h-100 flex-grow-1">
      <div>
        <span class="label-text">
          {{ label }}
        </span>

        <h3 class="value-text mt-1">
          {{ value }}
        </h3>
      </div>

      <div class="trend-container mt-3">
        <span class="trend-badge">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M12.577 4.878a.75.75 0 01.574.853l-.5 4.125a.75.75 0 01-1.48-.18l.346-2.858L6.57 11.77a.75.75 0 01-1.06-1.06l5.053-5.053-2.858.346a.75.75 0 01-.18-1.48l4.125-.5a.75.75 0 01.853.574z" clip-rule="evenodd" />
          </svg>
          {{ trendValue }}
        </span>
        <span class="trend-label">
          {{ trendLabel }}
        </span>
      </div>
    </div>

    <div :class="['icon-wrapper', `variant-${variant}`]">
      <slot name="icon">
        <i class="bi bi-graph-up"></i>
      </slot>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  label: { type: String, required: true },
  value: { type: [String, Number], required: true },
  trendValue: { type: String, required: true },
  trendLabel: { type: String, default: 'ពីម្សិលមិញ' },
  variant: {
    type: String,
    default: 'blue',
    validator: (value) => ['blue', 'yellow', 'green', 'orange'].includes(value)
  }
});
</script>

<style scoped>
.select-none {
  user-select: none;
}

.label-text {
  display: block;
  color: var(--text-muted);
  font-size: 0.875rem;
  font-weight: 500;
  letter-spacing: 0.025em;
}

.value-text {
  display: block;
  font-weight: 700;
  color: var(--text-main);
  font-size: 1.75rem;
  letter-spacing: -0.025em;
  line-height: 1.2;
}

.trend-container {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 0.8125rem;
}

.trend-badge {
  font-weight: 600;
  display: inline-flex;
  align-items: center;
  gap: 2px;
  color: var(--success);
  background: var(--success-soft);
  padding: 2px 8px;
  border-radius: var(--radius-full);
}

.trend-badge svg {
  width: 14px;
  height: 14px;
}

.trend-label {
  color: var(--text-light);
  white-space: nowrap;
}

.icon-wrapper {
  width: 48px;
  height: 48px;
  border-radius: var(--radius-md);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.25rem;
  transition: var(--transition);
}

.icon-wrapper:hover {
  transform: scale(1.05) rotate(-5deg);
}

.variant-blue { background-color: var(--info-soft); color: var(--info); }
.variant-yellow { background-color: var(--accent-soft); color: var(--accent); }
.variant-green { background-color: var(--success-soft); color: var(--success); }
.variant-orange { background-color: var(--danger-soft); color: var(--danger); }
</style>
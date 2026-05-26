<template>
  <div class="stat-card">
    <div class="stat-content">
      <div class="stat-info">
        <h3 class="stat-title">{{ title }}</h3>
        <p class="stat-value">{{ value }}</p>
      </div>
      <div class="stat-icon-container" :style="{ backgroundColor: iconBg }">
        <slot name="icon">
          <span :style="{ color: iconColor }"></span>
        </slot>
      </div>
    </div>

    <div class="stat-footer">
      <span
        :class="['trend-value', trend === 'up' ? 'trend-up' : 'trend-down']"
      >
        <svg
          class="trend-icon"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2.5"
        >
          <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline>
          <polyline points="17 6 23 6 23 12"></polyline>
        </svg>
        {{ percentage }}
      </span>
      <span class="trend-label">Up from yesterday</span>
    </div>
  </div>
</template>

<script setup>
defineProps({
  title: String,
  value: [String, Number],
  percentage: String,
  trend: { type: String, default: "up" },
  iconBg: { type: String, default: "#f1f5f9" },
  iconColor: { type: String, default: "#000000" },
});
</script>

<style scoped>
.stat-card {
  background: #fff;
  padding: 20px;
  border-radius: 16px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.03);
  min-width: 240px;
  flex: 1;
  border: 1px solid #f0f0f0;
  font-family: var(--font-khmer);
}
.stat-content {
  display: flex;
  justify-content: space-between;
  margin-bottom: 12px;
}
.stat-title {
  color: #718096;
  font-size: 0.95rem;
  margin: 0;
}
.stat-value {
  color: #1a202c;
  font-size: 1.8rem;
  font-weight: 700;
  margin: 4px 0 0 0;
}
.stat-icon-container {
  width: 48px;
  height: 48px;
  border-radius: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
}
.stat-footer {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 0.85rem;
}
.trend-value {
  display: flex;
  align-items: center;
  font-weight: 600;
  color: #10b981;
}
.trend-icon {
  width: 14px;
  height: 14px;
  margin-right: 2px;
}
.trend-label {
  color: #a0aec0;
}
</style>

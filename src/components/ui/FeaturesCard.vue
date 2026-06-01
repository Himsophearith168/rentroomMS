<template>
  <div class="feature-card">
    <div class="icon-wrapper" :style="{ backgroundColor: iconColor }">
      <slot name="icon"></slot>
    </div>
    
    <div class="text-content">
      <h3 class="title">{{ title }}</h3>
      <p class="description">{{ description }}</p>
    </div>
  </div>
</template>

<script setup>
defineProps({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  iconColor: {
    type: String,
    default: '#3B82F6' // ពណ៌ខៀវជា Default
  }
})
</script>

<style scoped>
.feature-card {
  background: var(--bg-card);
  border-radius: var(--radius-lg);
  padding: 24px;
  box-shadow: var(--shadow-soft);
  transition: var(--transition);
  display: flex;
  flex-direction: column;
  gap: 20px;
  height: 100%;
  border: 1px solid var(--border-color);
  cursor: pointer;
}

.feature-card:hover {
  transform: translateY(-5px);
  box-shadow: var(--shadow-lg);
  border-color: var(--primary-light);
}

.icon-wrapper {
  width: 52px;
  height: 52px;
  border-radius: var(--radius-md);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ffffff;
  transition: var(--transition);
}

.feature-card:hover .icon-wrapper {
  transform: scale(1.1) rotate(5deg);
}

.text-content {
  display: flex;
  flex-direction: column;
  text-align: left;
  gap: 8px;
}

.title {
  font-size: 1.125rem;
  font-weight: 700;
  color: var(--text-main);
  margin: 0;
  line-height: 1.4;
}

.description {
  font-size: 0.8125rem;
  color: var(--text-muted);
  margin: 0;
  line-height: 1.6;
}
</style>
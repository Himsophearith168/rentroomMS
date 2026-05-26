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
  background-color: #ffffff;
  border-radius: 16px;
  padding: 20px;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.04);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  display: flex;
  flex-direction: column;
  gap: 20px;
  height: 100%;
  border: 1px solid transparent;
}

.feature-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.08);
}

.icon-wrapper {
  width: 52px;
  height: 52px;
  border-radius: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ffffff;
}

.text-content {
  display: flex;
  flex-direction: column;
  text-align: left;
  gap: 8px;
}

.title {
  font-family: var(--font-khmer);
  font-size: 18px;
  font-weight: 700;
  color: #1A365D; /* ពណ៌ខៀវចាស់ដូចក្នុងរូប */
  margin: 0;
  line-height: 1.4;
}

.description {
  font-family: var(--font-khmer);
  font-size: 12px;
  color: #718096;
  margin: 0;
  line-height: 1.6;
}
</style>
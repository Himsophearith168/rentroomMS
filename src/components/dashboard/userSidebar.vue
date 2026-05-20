<template>
  <div class="user-box">
    <div class="avatar">
      H
    </div>

    <div class="user-info">
      <h4>Him Sophearith</h4>
      <p>Frontend Developer</p>
    </div>
  </div>
</template>

<script setup>
</script>

<style scoped>
.user-box {
  display: flex;
  align-items: center;

  gap: 12px;

  background: #f8fafc;

  padding: 8px 14px;

  border-radius: 18px;
}

.avatar {
  width: 44px;
  height: 44px;

  border-radius: 50%;

  background:
    linear-gradient(
      135deg,
      #14b8a6,
      #0f766e
    );

  display: flex;
  align-items: center;
  justify-content: center;

  color: white;

  font-weight: 800;
}

.user-info h4 {
  margin: 0;

  font-size: 14px;
  font-weight: 800;

  color: #0f172a;
}

.user-info p {
  margin: 2px 0 0;

  font-size: 12px;

  color: #64748b;
}

@media (max-width: 576px) {
  .user-info {
    display: none;
  }
}
</style>
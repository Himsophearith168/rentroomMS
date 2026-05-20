<template>
  <div class="dashboard-view">
    <!-- Welcome Section -->
    <div class="welcome-card">
      <div class="welcome-content">
        <h1>Welcome Back 👋</h1>

        <p>
          Your dashboard starter project is ready.
        </p>
      </div>

      <button class="create-btn">
        Create Task
      </button>
    </div>

    <!-- Statistics -->
    <div class="stats-grid">
      <!-- Card -->
      <div class="stats-card">
        <div class="card-top">
          <h3>Total Tasks</h3>

          <div class="icon-box teal">
            <i class="bi bi-list-check"></i>
          </div>
        </div>

        <span>24</span>
      </div>

      <!-- Card -->
      <div class="stats-card">
        <div class="card-top">
          <h3>Completed</h3>

          <div class="icon-box green">
            <i class="bi bi-check-circle-fill"></i>
          </div>
        </div>

        <span>18</span>
      </div>

      <!-- Card -->
      <div class="stats-card">
        <div class="card-top">
          <h3>Pending</h3>

          <div class="icon-box orange">
            <i class="bi bi-clock-history"></i>
          </div>
        </div>

        <span>6</span>
      </div>
    </div>
  </div>
</template>

<script setup>
</script>

<style scoped>
.dashboard-view {
    padding-top: 70px;
  width: 100%; 
}

/* =========================
   WELCOME CARD
========================= */
.welcome-card {
  width: 100%;
  background: white;

  border-radius: 24px;

  padding: 28px;

  display: flex;
  align-items: center;
  justify-content: space-between;

  gap: 20px;

  margin-bottom: 24px;

  box-shadow:
    0 10px 30px rgba(15, 23, 42, 0.05);
}

.welcome-content h1 {
  margin: 0 0 10px;

  font-size: 42px;
  font-weight: 900;

  color: #0f172a;
}

.welcome-content p {
  margin: 0;

  color: #64748b;

  font-size: 17px;
}

/* =========================
   BUTTON
========================= */
.create-btn {
  border: none;

  height: 56px;

  padding: 0 24px;

  border-radius: 16px;

  background:
    linear-gradient(
      135deg,
      #14b8a6,
      #0f766e
    );

  color: white;

  font-weight: 800;

  cursor: pointer;
}

/* =========================
   GRID
========================= */
.stats-grid {
  width: 100%;

  display: grid;

  grid-template-columns:
    repeat(auto-fit, minmax(240px, 1fr));

  gap: 20px;
}

/* =========================
   CARD
========================= */
.stats-card {
  background: white;

  border-radius: 24px;

  padding: 28px;

  min-height: 200px;

  box-shadow:
    0 10px 25px rgba(15, 23, 42, 0.04);
}

.card-top {
  display: flex;
  align-items: center;
  justify-content: space-between;

  margin-bottom: 30px;
}

.stats-card h3 {
  margin: 0;

  font-size: 22px;

  color: #64748b;
}

.stats-card span {
  font-size: 58px;
  font-weight: 900;

  color: #0f172a;
}

/* =========================
   ICON
========================= */
.icon-box {
  width: 60px;
  height: 60px;

  border-radius: 18px;

  display: flex;
  align-items: center;
  justify-content: center;

  font-size: 24px;
}

.teal {
  background: rgba(20, 184, 166, 0.1);
  color: #14b8a6;
}

.green {
  background: rgba(34, 197, 94, 0.1);
  color: #22c55e;
}

.orange {
  background: rgba(249, 115, 22, 0.1);
  color: #f97316;
}

/* =========================
   TABLET
========================= */
@media (max-width: 768px) {
  .welcome-card {
    flex-direction: column;
    align-items: flex-start;
  }

  .welcome-content h1 {
    font-size: 34px;
  }
}

/* =========================
   MOBILE
========================= */
@media (max-width: 576px) {
  .welcome-card {
    padding: 22px;
  }

  .welcome-content h1 {
    font-size: 28px;
  }

  .stats-card {
    min-height: auto;
  }

  .stats-card span {
    font-size: 48px;
  }

  .create-btn {
    width: 100%;
  }
}
</style>
<template>
  <div class="content-wrapper">
    <div class="date-picker-wrapper">
      <v-card class="date-picker-card">
        <div class="month-year-nav">
          <div class="month-selector">
            <v-btn
              icon="mdi-chevron-left"
              size="small"
              variant="text"
              @click="previousMonth"
            ></v-btn>
            <v-menu
              v-model="showMonthMenu"
              :close-on-content-click="false"
              location="bottom"
            >
              <template #activator="{ props }">
                <v-btn variant="text" class="month-btn" v-bind="props">
                  {{ monthName }} <v-icon right>mdi-menu-down</v-icon>
                </v-btn>
              </template>
              <div class="month-year-menu">
                <div class="menu-header">
                  <v-btn
                    icon="mdi-chevron-left"
                    size="small"
                    variant="text"
                    @click="previousYear"
                  ></v-btn>
                  <span class="menu-title">{{ currentYear }}</span>
                  <v-btn
                    icon="mdi-chevron-right"
                    size="small"
                    variant="text"
                    @click="nextYear"
                  ></v-btn>
                </div>
                <div class="months-grid">
                  <div
                    v-for="(month, index) in monthsList"
                    :key="index"
                    :class="['month-item', { active: currentMonth === index }]"
                    @click="selectMonth(index)"
                  >
                    {{ month.slice(0, 3) }}
                  </div>
                </div>
              </div>
            </v-menu>
            <v-btn
              icon="mdi-chevron-right"
              size="small"
              variant="text"
              @click="nextMonth"
            ></v-btn>
          </div>

          <div class="year-selector">
            <v-btn
              icon="mdi-chevron-left"
              size="small"
              variant="text"
              @click="previousDecade"
            ></v-btn>
            <v-menu
              v-model="showYearMenu"
              :close-on-content-click="false"
              location="bottom"
            >
              <template #activator="{ props }">
                <v-btn variant="text" class="year-btn" v-bind="props">
                  {{ currentYear }} <v-icon right>mdi-menu-down</v-icon>
                </v-btn>
              </template>

              <div class="month-year-menu year-menu">
                <div class="menu-header">
                  <v-btn
                    icon="mdi-chevron-left"
                    size="small"
                    variant="text"
                    @click="previousDecade"
                  ></v-btn>
                  <span class="menu-title">
                    {{ decadeStart }}-{{ decadeEnd }}
                  </span>
                  <v-btn
                    icon="mdi-chevron-right"
                    size="small"
                    variant="text"
                    @click="nextDecade"
                  ></v-btn>
                </div>
                <div class="years-grid">
                  <div
                    v-for="year in yearRangeList"
                    :key="year"
                    :class="['year-item', { active: currentYear === year }]"
                    @click="selectYear(year)"
                  >
                    {{ year }}
                  </div>
                </div>
              </div>
            </v-menu>
            <v-btn
              icon="mdi-chevron-right"
              size="small"
              variant="text"
              @click="nextDecade"
            ></v-btn>
          </div>
        </div>

        <div class="calendar-container">
          <div class="day-header">
            <div v-for="day in dayNames" :key="day" class="day-name">
              {{ day }}
            </div>
          </div>

          <div class="calendar-days">
            <div
              v-for="(day, index) in calendarDays"
              :key="index"
              :class="[
                'day-cell',
                {
                  'other-month': day.isOtherMonth,
                  today: day.isToday,
                  selected: day.isSelected,
                },
              ]"
              @click="selectDate(day)"
            >
              {{ day.date }}
            </div>
          </div>
        </div>
      </v-card>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";

const currentMonth = ref(new Date().getMonth());
const currentYear = ref(new Date().getFullYear());
const decadeStartYear = ref(Math.floor(new Date().getFullYear() / 10) * 10);
const selectedDate = ref(null);
const today = new Date();
const showMonthMenu = ref(false);
const showYearMenu = ref(false);

const monthsList = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const dayNames = ["Sun", "M", "T", "W", "T", "F", "S"];

const monthName = computed(() => monthsList[currentMonth.value]);

const decadeStart = computed(() => decadeStartYear.value);

const decadeEnd = computed(() => decadeStartYear.value + 9);

const yearRangeList = computed(() => {
  const years = [];
  for (let i = 0; i < 12; i++) {
    years.push(decadeStartYear.value + i);
  }
  return years;
});

const calendarDays = computed(() => {
  const days = [];
  const firstDay = new Date(currentYear.value, currentMonth.value, 1);
  const lastDay = new Date(currentYear.value, currentMonth.value + 1, 0);
  const prevLastDay = new Date(currentYear.value, currentMonth.value, 0);

  const startDate = firstDay.getDay();
  const endDate = lastDay.getDate();
  const prevEndDate = prevLastDay.getDate();

  for (let i = startDate - 1; i >= 0; i--) {
    days.push({
      date: prevEndDate - i,
      isOtherMonth: true,
      isToday: false,
      isSelected: false,
      fullDate: new Date(
        currentYear.value,
        currentMonth.value - 1,
        prevEndDate - i
      ),
    });
  }

  for (let i = 1; i <= endDate; i++) {
    const date = new Date(currentYear.value, currentMonth.value, i);
    const isToday = date.toDateString() === today.toDateString();
    const isSelected =
      selectedDate.value &&
      date.toDateString() === new Date(selectedDate.value).toDateString();

    days.push({
      date: i,
      isOtherMonth: false,
      isToday: isToday,
      isSelected: isSelected,
      fullDate: date,
    });
  }

  const remainingDays = 42 - days.length;
  for (let i = 1; i <= remainingDays; i++) {
    days.push({
      date: i,
      isOtherMonth: true,
      isToday: false,
      isSelected: false,
      fullDate: new Date(currentYear.value, currentMonth.value + 1, i),
    });
  }

  return days;
});

const previousMonth = () => {
  if (currentMonth.value === 0) {
    currentMonth.value = 11;
    currentYear.value--;
  } else {
    currentMonth.value--;
  }
};

const nextMonth = () => {
  if (currentMonth.value === 11) {
    currentMonth.value = 0;
    currentYear.value++;
  } else {
    currentMonth.value++;
  }
};

const previousYear = () => {
  currentYear.value--;
};

const nextYear = () => {
  currentYear.value++;
};

const previousDecade = () => {
  decadeStartYear.value -= 10;
};

const nextDecade = () => {
  decadeStartYear.value += 10;
};

const selectMonth = (index) => {
  currentMonth.value = index;
  showMonthMenu.value = false;
};

const selectYear = (year) => {
  currentYear.value = year;
  showYearMenu.value = false;
};

const selectDate = (day) => {
  if (!day.isOtherMonth) {
    const year = day.fullDate.getFullYear();
    const month = String(day.fullDate.getMonth() + 1).padStart(2, "0");
    const date = String(day.fullDate.getDate()).padStart(2, "0");
    selectedDate.value = `${year}-${month}-${date}`;
  }
};

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

const formatDateHeader = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  });
};
</script>

<style scoped>
.content-wrapper {
  background: #ffffff;
  padding: 14px;
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
  width: 100%;
  border: var(--border-1);
}

.date-picker-wrapper {
  padding: 0;
  background: white;
  border-radius: 8px;
  max-width: 350px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  margin: 0 auto;
}

.date-picker-card {
  background: white;
  /* padding: 16px 24px; */
  border-radius: 0;
  box-shadow: none;
  border-top: none;
  flex: 1;
  overflow-y: hidden;
}

.month-year-nav {
  display: flex;
  justify-content: space-between;
  gap: 0;
  margin-bottom: 10px;
  margin-top: 0;
}

.month-selector,
.year-selector {
  display: flex;
  align-items: center;
  gap: 8px;
}

.month-btn,
.year-btn {
  font-weight: 500;
  text-transform: capitalize;
  padding: 6px 12px;
  /* min-width: auto;
  border: 1px solid #e0e0e0; */
  border-radius: 20px;
}

/* Month/Year Menu Styles */
.month-year-menu {
  background: white;
  padding: 16px;
  min-width: 280px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.year-menu {
  min-width: 320px;
}

.menu-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
  padding: 0 8px;
}

.menu-title {
  font-weight: 600;
  font-size: 16px;
  color: #333;
}

.months-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
}

.years-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
  max-height: 300px;
  overflow-y: auto;
  padding-right: 8px;
}

.month-item,
.year-item {
  padding: 12px 16px;
  text-align: center;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 500;
  background: #f5f5f5;
  color: #333;
  transition: all 0.2s ease;
  user-select: none;
}

.month-item:hover,
.year-item:hover {
  background: #e8e8e8;
}

.month-item.active,
.year-item.active {
  background: #e8e8e8;
  color: #333;
  border: 2px solid #1867c0;
}

.day-header {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 4px;
  margin-bottom: 5px;
}

.day-name {
  text-align: center;
  font-weight: 700;
  font-size: 12px;
  color: #666;
  padding: 8px 0;
}

.calendar-days {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 4px;
}

.day-cell {
  aspect-ratio: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  cursor: pointer;
  font-weight: 500;
  font-size: 14px;
  color: #333;
  transition: all 0.2s ease;
  user-select: none;
}

.day-cell:not(.other-month):hover {
  background: #f0f0f0;
  transform: scale(1.05);
}

.day-cell.other-month {
  color: #ccc;
  cursor: default;
}

.day-cell.today {
  border: 2px solid #1867c0;
  color: #1867c0;
  font-weight: 700;
}

.day-cell.selected {
  background: #1867c0;
  color: white;
  border: 2px solid #1867c0;
}

/* Scrollbar styling */
.years-grid::-webkit-scrollbar {
  width: 6px;
}

.years-grid::-webkit-scrollbar-track {
  background: #f0f0f0;
  border-radius: 10px;
}

.years-grid::-webkit-scrollbar-thumb {
  background: #999;
  border-radius: 10px;
}

.years-grid::-webkit-scrollbar-thumb:hover {
  background: #666;
}
</style>
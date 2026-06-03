<template>
  <div class="custom-table-wrapper">
    <table class="table table-striped table-hover align-middle">
      <thead class="style-header table-light">
        <tr>
          <th v-for="field in fields" :key="field.key" :class="field.thClass">
            {{ field.label }}
          </th>
        </tr>
      </thead>
      <tbody class="style-body">
        <template v-if="loading">
          <tr v-for="n in 5" :key="'loading-' + n" class="skeleton-row">
            <td v-for="field in fields" :key="'loading-td-' + field.key">
              <div class="skeleton-loader"></div>
            </td>
          </tr>
        </template>

        <template v-else>
          <tr v-for="(item, index) in items" :key="item.id || index">
            <!-- Added :data-label for mobile card view -->
            <td 
              v-for="field in fields" 
              :key="field.key" 
              :class="field.tdClass" 
              :data-label="!loading ? field.label : ''"
            >
              <slot :name="`cell(${field.key})`" :item="item">
                {{ item[field.key] }}
              </slot>
            </td>
          </tr>
          
          <tr v-if="items.length === 0" class="empty-row">
            <td :colspan="fields.length" class="text-center text-muted py-5">
              <div class="empty-state-content">
                <i class="bi bi-inbox fs-1 d-block mb-2 opacity-25"></i>
                មិនមានទិន្នន័យបង្ហាញឡើយ។
              </div>
            </td>
          </tr>
        </template>
      </tbody>
    </table>

    <nav
      v-if="totalRows > perPage"
      aria-label="Page navigation"
      class="style-pagination d-flex flex-column flex-md-row justify-content-md-between align-items-center"
    >
      <!-- Stacks vertically on mobile, horizontal on desktop -->
      <span class="text-muted small text-center text-md-start mb-3 mb-md-0">
        បង្ហាញ {{ startRow }} ដល់ {{ endRow }} នៃទិន្នន័យសរុប {{ totalRows }}
      </span>
      
      <!-- Smaller pagination on mobile, wraps if needed -->
      <ul :class="['pagination pagination-sm mb-0 d-flex justify-content-center align-items-center flex-wrap gap-1']">
        <li class="page-item" :class="{ disabled: currentPage === 1 }">
          <button
            class="page-link"
            @click="changePage(currentPage - 1)"
            aria-label="Previous"
          >
            <span aria-hidden="true">&laquo;</span>
          </button>
        </li>

        <li
          v-for="(page, index) in displayedPages"
          :key="index"
          class="page-item"
          :class="{
            active: currentPage === page,
            disabled: page === '...',
          }"
        >
          <span
            v-if="page === '...'"
            class="page-link bg-transparent border-0"
            >{{ page }}</span
          >

          <button v-else class="page-link" @click="changePage(page)">
            {{ page }}
          </button>
        </li>

        <li class="page-item" :class="{ disabled: currentPage === totalPages }">
          <button
            class="page-link"
            @click="changePage(currentPage + 1)"
            aria-label="Next"
          >
            <span aria-hidden="true">&raquo;</span>
          </button>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  items: { type: Array, required: true, default: () => [] },
  fields: { type: Array, required: true, default: () => [] },
  currentPage: { type: Number, default: 1 },
  perPage: { type: Number, default: 10 },
  totalRows: { type: Number, default: 0 },
  loading: { type: Boolean, default: false }
});

const emit = defineEmits(["update:currentPage", "page-changed"]);

const totalPages = computed(() => Math.ceil(props.totalRows / props.perPage));

const startRow = computed(() => (props.currentPage - 1) * props.perPage + 1);
const endRow = computed(() =>
  Math.min(props.currentPage * props.perPage, props.totalRows),
);

const displayedPages = computed(() => {
  const current = props.currentPage;
  const total = totalPages.value;

  if (total <= 7) {
    return Array.from({ length: total }, (_, i) => i + 1);
  }

  const pages = [];

  pages.push(1);

  let start = Math.max(2, current - 1);
  let end = Math.min(total - 1, current + 1);

  if (current <= 3) {
    end = 4;
  } else if (current >= total - 2) {
    start = total - 3;
  }

  if (start > 2) {
    pages.push("...");
  }

  for (let i = start; i <= end; i++) {
    pages.push(i);
  }

  if (end < total - 1) {
    pages.push("...");
  }

  pages.push(total);

  return pages;
});

const changePage = (page) => {
  if (page === props.currentPage || page < 1 || page > totalPages.value) return;

  emit("update:currentPage", page);

  emit("page-changed", page);
};
</script>

<style scoped>
.custom-table-wrapper {
  border-radius: var(--radius-lg, 16px);
  background: var(--bg-card, #ffffff);
  overflow: hidden;
  border: 1px solid var(--border-color, #e2e8f0);
}

.table {
  margin-bottom: 0;
  border-collapse: separate;
  border-spacing: 0;
}

.table th {
  background: var(--surface-alt, #f8fafc);
  font-weight: 600;
  font-size: 0.875rem;
  color: var(--text-muted, #64748b);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  padding: 16px 20px;
  border-bottom: 1px solid var(--border-color, #e2e8f0);
  white-space: nowrap;
}

.table td {
  padding: 16px 20px;
  vertical-align: middle;
  color: var(--text-main, #1e293b);
  border-bottom: 1px solid var(--border-color, #e2e8f0);
  transition: var(--transition, all 0.15s ease);
}

.table tbody tr {
  transition: var(--transition, all 0.15s ease);
}

.table tbody tr:hover {
  background-color: var(--primary-soft, #f0fdfa);
}

.table tbody tr:last-child td {
  border-bottom: none;
}

/* Pagination */
.style-pagination {
  padding: 20px;
  border-top: 1px solid var(--border-color, #e2e8f0);
}

.page-link {
  border: 1px solid var(--border-color, #e2e8f0);
  color: var(--text-muted, #64748b);
  border-radius: var(--radius-sm, 8px);
  margin: 0 2px;
  font-weight: 500;
  transition: var(--transition, all 0.15s ease);
  padding: 8px 14px;
}

.page-item.active .page-link {
  background-color: var(--primary, #0d9488);
  border-color: var(--primary, #0d9488);
  color: white;
  box-shadow: 0 4px 10px rgba(13, 148, 136, 0.2);
}

.page-link:hover:not(.disabled) {
  background-color: var(--primary-soft, #f0fdfa);
  color: var(--primary, #0d9488);
  border-color: var(--primary, #0d9488);
}

/* Skeleton Loader */
.skeleton-loader {
  width: 80%;
  height: 12px;
  background: linear-gradient(90deg, var(--surface-alt, #f1f5f9) 25%, var(--border-color, #e2e8f0) 50%, var(--surface-alt, #f1f5f9) 75%);
  background-size: 200% 100%;
  animation: loading-shimmer 1.5s infinite;
  border-radius: var(--radius-full, 50px);
}

@keyframes loading-shimmer {
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}

/* ==========================================
   📱 RESPONSIVE MOBILE CARD VIEW
   ========================================== */
@media (max-width: 768px) {
  .custom-table-wrapper {
    background: transparent;
    border: none;
    overflow-x: hidden;
  }

  .table {
    background: transparent;
  }

  /* Hide table headers on mobile */
  .table thead {
    display: none;
  }

  .table tbody {
    display: flex;
    flex-direction: column;
    gap: 16px;
    padding: 0;
  }

  /* Make each row look like a card */
  .table tbody tr {
    display: flex;
    flex-direction: column;
    background: var(--bg-card, #ffffff);
    border: 1px solid var(--border-color, #e2e8f0);
    border-radius: var(--radius-lg, 16px);
    overflow: hidden;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
  }

  /* Reset Bootstrap striped/hover for cards */
  .table tbody tr:nth-of-type(odd),
  .table tbody tr:hover {
    background-color: var(--bg-card, #ffffff);
  }

  /* Make cells flex rows: label on left, value on right */
  .table td {
    display: flex;
    justify-content: space-between;
    align-items: center;
    text-align: right;
    border-bottom: 1px solid var(--border-color, #e2e8f0);
    padding: 12px 20px;
  }

  /* Generate the label from data-label attribute */
  .table td::before {
    content: attr(data-label);
    font-weight: 600;
    text-transform: uppercase;
    font-size: 0.75rem;
    letter-spacing: 0.05em;
    color: var(--text-muted, #94a3b8);
    margin-right: 16px;
    text-align: left;
  }

  .table tbody tr:last-child td {
    border-bottom: none;
  }

  /* Hide labels for skeleton loaders on mobile */
  .skeleton-row td::before {
    content: none;
  }
  
  .skeleton-row .skeleton-loader {
    width: 100%;
  }

  /* Special styling for empty state on mobile */
  .empty-row {
    border: none;
    box-shadow: none;
    background: transparent;
  }
  .empty-row td {
    display: block;
    text-align: center;
    border-bottom: none;
  }
  .empty-row td::before {
    content: none;
  }
}
</style>
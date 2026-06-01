<template>
  <div class="table-responsive">
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
          <tr v-for="n in 5" :key="'loading-' + n">
            <td v-for="field in fields" :key="'loading-td-' + field.key">
              <div class="skeleton-loader"></div>
            </td>
          </tr>
        </template>

        <template v-else>
          <tr v-for="(item, index) in items" :key="item.id || index">
            <td v-for="field in fields" :key="field.key" :class="field.tdClass">
              <slot :name="`cell(${field.key})`" :item="item">
                {{ item[field.key] }}
              </slot>
            </td>
          </tr>
          
          <tr v-if="items.length === 0">
            <td :colspan="fields.length" class="text-center text-muted py-4">
              មិនមានទិន្នន័យបង្ហាញឡើយ។
            </td>
          </tr>
        </template>
      </tbody>
    </table>

    <nav
      v-if="totalRows > perPage"
      aria-label="Page navigation"
      class="style-pagination d-flex justify-content-between align-items-center mt-3"
    >
      <span class="text-muted small">
        បង្ហាញ {{ startRow }} ដល់ {{ endRow }} នៃទិន្នន័យសរុប {{ totalRows }}
      </span>
      <ul :class="['pagination pagination-md mb-0 d-flex justify-content-center align-items-center cursor-not-allowed']">
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
.table-responsive {
  border-radius: var(--radius-lg);
  background: var(--bg-card);
  overflow: hidden;
}

.table {
  margin-bottom: 0;
  border-collapse: separate;
  border-spacing: 0;
}

.table th {
  background: var(--surface-alt);
  font-weight: 600;
  font-size: 0.875rem;
  color: var(--text-muted);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  padding: 16px 20px;
  border-bottom: 1px solid var(--border-color);
}

.table td {
  padding: 16px 20px;
  vertical-align: middle;
  color: var(--text-main);
  border-bottom: 1px solid var(--border-color);
  transition: var(--transition);
}

.table tbody tr {
  transition: var(--transition);
}

.table tbody tr:hover {
  background-color: var(--primary-soft);
}

.table tbody tr:last-child td {
  border-bottom: none;
}

/* Pagination */
.style-pagination {
  padding: 20px;
  border-top: 1px solid var(--border-color);
}

.page-link {
  border: 1px solid var(--border-color);
  color: var(--text-muted);
  border-radius: var(--radius-sm);
  margin: 0 3px;
  font-weight: 500;
  transition: var(--transition);
  padding: 8px 14px;
}

.page-item.active .page-link {
  background-color: var(--primary);
  border-color: var(--primary);
  color: white;
  box-shadow: 0 4px 10px rgba(13, 148, 136, 0.2);
}

.page-link:hover:not(.disabled) {
  background-color: var(--primary-soft);
  color: var(--primary);
  border-color: var(--primary-light);
}

.skeleton-loader {
  width: 100%;
  height: 12px;
  background: linear-gradient(90deg, var(--surface-alt) 25%, var(--border-color) 50%, var(--surface-alt) 75%);
  background-size: 200% 100%;
  animation: loading-shimmer 1.5s infinite;
  border-radius: var(--radius-full);
}

@keyframes loading-shimmer {
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}
</style>
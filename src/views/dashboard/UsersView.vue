<template>
  <div class="users-view animate-entrance">
    <div class="header-section d-flex justify-content-between align-items-center mb-5">
      <div>
        <h1 class="display-6 fw-bold text-gradient">ការគ្រប់គ្រងអ្នកប្រើប្រាស់</h1>
        <p class="text-muted">គ្រប់គ្រងគណនី និងសិទ្ធិប្រើប្រាស់ក្នុងប្រព័ន្ធ</p>
      </div>
      <div class="d-flex gap-2">
        <BaseButton variant="outline" @click="handlePrint">
          <i class="bi bi-printer me-2"></i>បោះពុម្ព
        </BaseButton>
        <BaseButton variant="primary" @click="isCreateModalOpen = true">
          <i class="bi bi-person-plus me-2"></i>បន្ថែមអ្នកប្រើប្រាស់
        </BaseButton>
      </div>
    </div>

    <div class="card-modern overflow-hidden">
      <BaseTable 
        :items="userStore.users" 
        :fields="tableFields"
        :totalRows="userStore.users.length"
        :perPage="10"
        :currentPage="1"
        :loading="userStore.loading"
      >
        <template #cell(fullname)="{ item }">
          <div class="d-flex align-items-center">
            <div class="avatar-sm me-3 bg-info-soft text-info rounded-circle d-flex align-items-center justify-content-center">
              <i class="bi bi-person-badge"></i>
            </div>
            <span class="fw-semibold">{{ item.fullname || item.name }}</span>
          </div>
        </template>
        <template #cell(email)="{ item }">
          <span class="text-muted">{{ item.email }}</span>
        </template>
        <template #cell(role)="{ item }">
          <span :class="['badge-soft', item.role === 'admin' ? 'badge-danger' : 'badge-primary']">
            {{ item.role === 'admin' ? 'អ្នកគ្រប់គ្រង' : 'បុគ្គលិក' }}
          </span>
        </template>
        <template #cell(actions)="{ item }">
          <div class="d-flex gap-2">
            <button class="action-btn edit" title="កែប្រែ" @click="handleEdit(item)">
              <i class="bi bi-pencil-square"></i>
            </button>
            <button class="action-btn delete" title="លុប" @click="confirmDelete(item)">
              <i class="bi bi-trash3"></i>
            </button>
          </div>
        </template>
      </BaseTable>
    </div>

    <!-- Create/Edit User Modal -->
    <BaseModal 
      :show="isCreateModalOpen" 
      :title="isEditing ? 'កែប្រែព័ត៌មានអ្នកប្រើប្រាស់' : 'បន្ថែមអ្នកប្រើប្រាស់ថ្មី'" 
      @close="closeModal"
    >
      <form @submit.prevent="handleSubmit">
        <div class="row g-4">
          <div class="col-12">
            <BaseInput label="ឈ្មោះពេញ" v-model="formData.fullname" placeholder="បញ្ជូលឈ្មោះពេញ" required />
          </div>
          <div class="col-12">
            <BaseInput label="អ៊ីមែល" type="email" v-model="formData.email" placeholder="example@mail.com" required />
          </div>
          <div v-if="!isEditing" class="col-12">
            <BaseInput label="លេខសម្ងាត់" type="password" v-model="formData.password" placeholder="យ៉ាងតិច ៨ តួអក្សរ" required />
          </div>
          <div class="col-12">
            <div class="input-group-custom">
              <label class="custom-label">តួនាទី</label>
              <select class="form-select custom-select" v-model="formData.role" required>
                <option value="user">បុគ្គលិក (User)</option>
                <option value="admin">អ្នកគ្រប់គ្រង (Admin)</option>
              </select>
            </div>
          </div>
        </div>
      </form>
      <template #footer>
        <BaseButton variant="secondary" @click="closeModal" fullWidth>បោះបង់</BaseButton>
        <BaseButton variant="primary" @click="handleSubmit" :loading="userStore.loading" fullWidth>រក្សាទុក</BaseButton>
      </template>
    </BaseModal>

    <!-- Delete Confirmation Modal -->
    <DeleteConfirmModal
      :show="showDeleteModal"
      :loading="userStore.loading"
      :message="`តើអ្នកពិតជាចង់លុបអ្នកប្រើប្រាស់ '${selectedUser?.fullname || selectedUser?.name}' នេះមែនទេ?`"
      @close="showDeleteModal = false"
      @confirm="handleDelete"
    />
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue';
import { useUserStore } from '@/stores/user';
import BaseTable from '@/components/ui/BaseTable.vue';
import BaseButton from '@/components/ui/BaseButton.vue';
import BaseModal from '@/components/ui/BaseModal.vue';
import BaseInput from '@/components/ui/BaseInput.vue';
import DeleteConfirmModal from '@/components/ui/DeleteConfirmModal.vue';

const userStore = useUserStore();
const isCreateModalOpen = ref(false);
const showDeleteModal = ref(false);
const selectedUser = ref(null);
const isEditing = ref(false);
const editingId = ref(null);

const formData = reactive({
  fullname: '',
  email: '',
  password: '',
  role: 'user'
});

const tableFields = [
  { key: 'fullname', label: 'ឈ្មោះពេញ', thClass: 'ps-4', tdClass: 'ps-4' },
  { key: 'email', label: 'អ៊ីមែល' },
  { key: 'role', label: 'តួនាទី' },
  { key: 'actions', label: 'សកម្មភាព' }
];

const handleEdit = (user) => {
  isEditing.value = true;
  editingId.value = user.id;
  Object.assign(formData, {
    fullname: user.fullname || user.name,
    email: user.email,
    role: user.role || 'user'
  });
  isCreateModalOpen.value = true;
};

const closeModal = () => {
  isCreateModalOpen.value = false;
  isEditing.value = false;
  editingId.value = null;
  Object.assign(formData, {
    fullname: '',
    email: '',
    password: '',
    role: 'user'
  });
};

const handleSubmit = async () => {
  try {
    if (isEditing.value) {
      await userStore.updateUser(editingId.value, {
        fullname: formData.fullname,
        email: formData.email,
        role: formData.role
      });
    } else {
      await userStore.createUser(formData);
    }
    closeModal();
  } catch (err) {
    alert('មានបញ្ហាក្នុងការរក្សាទុក');
  }
};

const confirmDelete = (user) => {
  selectedUser.value = user;
  showDeleteModal.value = true;
};

const handleDelete = async () => {
  try {
    await userStore.deleteUser(selectedUser.value.id);
    showDeleteModal.value = false;
  } catch (err) {
    alert('បរាជ័យក្នុងការលុប');
  }
};

const handlePrint = () => {
  window.print();
};

onMounted(() => {
  userStore.fetchUsers();
});
</script>

<style scoped>
.users-view {
  max-width: 1400px;
  margin: 0 auto;
}

.avatar-sm {
  width: 36px;
  height: 36px;
  font-size: 1.1rem;
}

.action-btn {
  width: 32px;
  height: 32px;
  border-radius: var(--radius-sm);
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid var(--border-color);
  background: white;
  transition: var(--transition);
  cursor: pointer;
}

.action-btn.edit:hover {
  background: var(--info-soft);
  color: var(--info);
  border-color: var(--info);
}

.action-btn.delete:hover {
  background: var(--danger-soft);
  color: var(--danger);
  border-color: var(--danger);
}

.input-group-custom {
  position: relative;
  display: flex;
  flex-direction: column;
}

.custom-label {
  font-size: 0.75rem;
  font-weight: 600;
  color: #718096;
  margin-bottom: 4px;
  margin-left: 4px;
}

.custom-select {
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  padding: 12px;
  font-size: 0.95rem;
  transition: all 0.2s;
}

.custom-select:focus {
  border-color: #0d9488;
  box-shadow: 0 0 0 3px rgba(13, 148, 136, 0.1);
  outline: none;
}

@media print {
  .header-section button, 
  .action-btn,
  .sidebar,
  .navbar {
    display: none !important;
  }
}
</style>
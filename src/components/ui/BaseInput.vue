<script setup>
defineProps({
  modelValue: {
    type: [String, Number],
    default: "",
  },
  label: { type: String, default: "" },
  type: {
    type: String,
    default: "text",
  },
  message_error: {
    type: String,
    default: "",
  },
});

const emit = defineEmits(["update:modelValue"]);
</script>

<template>
  <div class="input-wrapper">
    <input
      :type="type"
      class="form-control"
      :id="`${label}-input`"
      :value="modelValue"
      @input="emit('update:modelValue', $event.target.value)"
      placeholder=""
    />
    <label :for="`${label}-input`" class="form-label"> {{ label }} </label>
    <div v-if="message_error" class="message_error">
      {{ message_error }}
    </div>
  </div>
</template>

<style scoped>
.input-wrapper {
  position: relative;
  margin-bottom: 4px;
}

.form-control {
  width: 100%;
  padding: 12px 16px;
  border: 1.5px solid var(--border-color);
  border-radius: var(--radius-md);
  background-color: var(--bg-card);
  font-size: 0.9375rem;
  font-weight: 500;
  color: var(--text-main);
  transition: var(--transition);
  height: 52px;
  outline: none;
}

.form-control::placeholder {
  color: transparent;
}

.form-label {
  position: absolute;
  top: 50%;
  left: 14px;
  transform: translateY(-50%);
  background-color: var(--bg-card);
  color: var(--text-light);
  padding: 0 6px;
  font-size: 0.9375rem;
  font-weight: 500;
  transition: var(--transition);
  pointer-events: none;
}

.form-control:focus {
  border-color: var(--primary);
  box-shadow: 0 0 0 4px var(--primary-soft);
}

.form-control:focus + .form-label,
.form-control:not(:placeholder-shown) + .form-label {
  top: 0;
  left: 12px;
  font-size: 0.75rem;
  font-weight: 600;
  color: var(--primary);
  transform: translateY(-50%);
}

.form-control:not(:focus):not(:placeholder-shown) + .form-label {
  color: var(--text-muted);
}

.message_error {
  color: var(--danger);
  font-size: 0.75rem;
  font-weight: 500;
  margin-top: 6px;
  display: flex;
  align-items: center;
  gap: 4px;
}

.message_error::before {
  content: '⚠';
}
</style>

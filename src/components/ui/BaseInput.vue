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
}

.form-control {
  width: 100%;
  padding-left: 12px;
  border: 1px solid #e2e8f0;
  border-radius: var(--radius-md);
  background-color: transparent;
  font-size: 1rem;
  transition: border-color 0.2s ease;
  border: none;
  height: 50px; 
  box-shadow: 0 0 0 1px rgba(59, 130, 246, 0.2);
}

.form-label {
  position: absolute;
  top: 50%;
  left: 12px;
  transform: translateY(-50%);
  background-color: var(--color-bg-light);
  color: #718096;
  padding: 0 4px;
  font-size: 0.9rem;
  transition: all 0.2s ease;
  pointer-events: none;
}

.form-control:focus + .form-label,
.form-control:not(:placeholder-shown) + .form-label {
  top: -5px;
  left: 8px;
  font-size: 0.75rem;
  height: 16px;
}

.form-control:focus {
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.2);
}

.message_error {
  color: #e53e3e;
  font-size: var(--text-xs);
  margin-top: 4px;
}
</style>

<script setup>
defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
  label: { type: String, default: "" },
});

const emit = defineEmits(["update:modelValue"]);
</script>

<template>
  <div class="form-check">
    <input
      type="checkbox"
      class="form-check-input"
      id="exampleCheck1"
      :checked="modelValue"
      @change="emit('update:modelValue', $event.target.checked)"
    />
    <label class="form-check-label" for="exampleCheck1"> {{ label }} </label>
  </div>
</template>

<style scoped>
.form-check {
  display: flex;
  align-items: center;
  gap: 12px;
  cursor: pointer;
  user-select: none;
}

.form-check-input {
  border: 1.5px solid #d9d9d9;
  border-radius: 4px;
  background-color: #ffffff;
  cursor: pointer;
  transition: all 0.2s ease;
}

.form-check-input:hover {
  border-color: #003262;
}

.form-check-input:checked {
  background-color: #003262;
  border-color: #003262;
}

.form-check-label {
  font-size: 12px;
  line-height: 1.5;
  color: #8c8c8c;
  cursor: pointer;
  margin-top: 5px;
  font-family: var(--font-khmer);
}
</style>

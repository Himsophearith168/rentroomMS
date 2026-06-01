<template>
    <div class="base-dropdown" ref="dropdownRef">
        <div class="dropdown-trigger" @click="toggleDropdown">
            <slot name="trigger" :isOpen="isOpen">
                <button class="default-btn">Options</button>
            </slot>
        </div>

        <transition name="dropdown-fade">
            <div v-if="isOpen" class="dropdown-menu" :class="alignClass">
                <slot :close="closeDropdown" :isOpen="isOpen"></slot>
            </div>
        </transition>
    </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue';

const props = defineProps({
    align: {
        type: String,
        default: 'left',
        validator: (value) => ['left', 'right'].includes(value)
    }
});

const isOpen = ref(false);
const dropdownRef = ref(null);

const toggleDropdown = () => {
    isOpen.value = !isOpen.value;
};

const closeDropdown = () => {
    isOpen.value = false;
};

const alignClass = computed(() => `align-${props.align}`);


const handleClickOutside = (event) => {
    if (dropdownRef.value && !dropdownRef.value.contains(event.target)) {
        closeDropdown();
    }
};

onMounted(() => {
    document.addEventListener('click', handleClickOutside, true);
});

onUnmounted(() => {
    document.removeEventListener('click', handleClickOutside, true);
});
</script>

<style scoped>
.base-dropdown {
    position: relative;
    display: inline-block;
}

.dropdown-menu {
    position: absolute;
    top: 100%;
    z-index: 1200;
    min-width: 200px;
    margin-top: 8px;
    background-color: var(--bg-card);
    border: 1px solid var(--border-color);
    border-radius: var(--radius-md);
    box-shadow: var(--shadow-lg);
    padding: 8px;
    transform-origin: top;
}

/* Alignment positions relative to parent container */
.align-left {
    left: 0;
    right: auto;
}

.align-right {
    right: 0;
    left: auto;
}

/* Clean, modern micro-interaction transitions */
.dropdown-fade-enter-active,
.dropdown-fade-leave-active {
    transition: opacity 0.2s cubic-bezier(0.4, 0, 0.2, 1), transform 0.2s cubic-bezier(0.4, 0, 0.2, 1);
}

.dropdown-fade-enter-from,
.dropdown-fade-leave-to {
    opacity: 0;
    transform: translateY(-10px) scale(0.95);
}
</style>
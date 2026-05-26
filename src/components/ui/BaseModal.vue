<template>
    <div>
        <div v-if="show" class="modal fade show" tabindex="-1" style="display: block" @click.self="emit('close')">
            <div class="modal-dialog modal-dialog-centered">
                <slot name="modal"></slot>
            </div>
        </div>

        <div class="modal-backdrop fade show" v-if="show" @click="emit('close')"></div>
    </div>
</template>

<script setup>
const emit = defineEmits(["close"]);

defineProps({
    show: { type: Boolean, default: false },
});
</script>

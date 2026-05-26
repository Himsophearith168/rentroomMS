<template>
    <div class="card border-0 rounded-4 p-4 d-flex flex-row justify-content-between align-items-start h-100 select-none"
        style="box-shadow: 0 8px 30px rgba(0, 0, 0, 0.035); min-height: 140px;">
        <div class="d-flex state-card flex-column justify-content-between h-100 flex-grow-1">
            <div>
                <span class="d-block font-medium text-truncate"
                    style="color: #64748b; font-size: 15px; font-weight: 500; letter-spacing: 0.025em;">
                    {{ label }}
                </span>

                <span class="d-block fw-bold tracking-tight mt-1"
                    style="color: #1e293b; font-size: 1.875rem; letter-spacing: -0.025em; line-height: 1.2;">
                    {{ value }}
                </span>
            </div>

            <div class="d-flex align-items-center gap-1 mt-3" style="font-size: 13px;">
                <span class="fw-semibold d-inline-flex align-items-center gap-0.5" style="color: #10b981;">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"
                        style="width: 16px; height: 16px;">
                        <path fill-rule="evenodd"
                            d="M12.577 4.878a.75.75 0 01.574.853l-.5 4.125a.75.75 0 01-1.48-.18l.346-2.858L6.57 11.77a.75.75 0 01-1.06-1.06l5.053-5.053-2.858.346a.75.75 0 01-.18-1.48l4.125-.5a.75.75 0 01.853.574z"
                            clip-rule="evenodd" />
                    </svg>
                    {{ trendValue }}
                </span>
                <span class="text-nowrap" style="color: #94a3b8;">
                    {{ trendLabel }}
                </span>
            </div>
        </div>

        <div :style="variantStyle" class="rounded-4  d-flex align-items-center justify-content-center flex-shrink-0 ms-3"
            style="width: 52px; height: 52px;">
            <div class="d-flex align-items-center justify-content-center" style="width: 26px; height: 26px;">
                <slot name="icon">
                    <svg class="w-100 h-100" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.75">
                        <circle cx="12" cy="12" r="9" />
                    </svg>
                </slot>
            </div>
        </div>
    </div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
    label: { type: String, required: true },
    value: { type: [String, Number], required: true },
    trendValue: { type: String, required: true },
    trendLabel: { type: String, default: 'Up from yesterday' },
    variant: {
        type: String,
        default: 'blue',
        validator: (value) => ['blue', 'yellow', 'green', 'orange'].includes(value)
    }
});

const variantStyle = computed(() => {
    const maps = {
        blue: { backgroundColor: '#eef2ff', color: '#1d4ed8' },
        yellow: { backgroundColor: '#fff7ed', color: '#f59e0b' },
        green: { backgroundColor: '#ecfdf5', color: '#10b981' },
        orange: { backgroundColor: '#fff5f1', color: '#f97316' }
    };
    return maps[props.variant] || maps.blue;
});
</script>

<style scoped>
.select-none {
    user-select: none;
}

</style>
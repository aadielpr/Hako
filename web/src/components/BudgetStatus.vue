<!-- BudgetStatus.vue -->
<template>
    <section>
        <div class="flex justify-between items-center mb-3">
            <h2 class="text-lg font-bold text-white">Budget Status</h2>
            <router-link 
                to="/budget/list"
                class="text-xs text-gray-400 hover:text-white transition-colors"
            >
                View All →
            </router-link>
        </div>
        <div class="grid grid-cols-2 gap-3">
            <div 
                v-for="category in budgetCategories" 
                :key="category.id"
                class="card p-3 flex items-center gap-3"
            >
                <div class="relative w-12 h-12 flex-shrink-0">
                    <svg class="w-12 h-12 transform -rotate-90">
                        <circle
                            cx="24"
                            cy="24"
                            r="20"
                            stroke-width="4"
                            fill="transparent"
                            class="stroke-dark-600"
                        />
                        <circle
                            cx="24"
                            cy="24"
                            r="20"
                            stroke-width="4"
                            fill="transparent"
                            :stroke="category.color"
                            :stroke-dasharray="circumference"
                            :stroke-dashoffset="getDashOffset(category.spent, category.limit)"
                            class="transition-all duration-300"
                        />
                    </svg>
                    <span class="absolute inset-0 flex items-center justify-center text-xs font-medium text-white">
                        {{ Math.round((category.spent / category.limit) * 100) }}%
                    </span>
                </div>
                <div class="flex-1 min-w-0">
                    <div class="flex items-center gap-2 mb-1">
                        <div class="w-2 h-2 rounded-full flex-shrink-0" :style="{ backgroundColor: category.color }"></div>
                        <span class="text-sm text-white font-medium truncate">{{ category.name }}</span>
                    </div>
                    <span class="text-xs text-gray-400 block truncate">
                        {{ formatRupiah(category.spent) }} / {{ formatRupiah(category.limit) }}
                    </span>
                </div>
            </div>
        </div>
    </section>
</template>

<style>
.hide-scrollbar::-webkit-scrollbar {
    display: none;
}
.hide-scrollbar {
    -ms-overflow-style: none;
    scrollbar-width: none;
}
</style>

<script setup>
import { computed } from 'vue';
import { formatRupiah } from '../utils/currency';

const props = defineProps({
    budgetCategories: {
        type: Array,
        required: true
    }
});

const radius = 20;
const circumference = computed(() => 2 * Math.PI * radius);

function getDashOffset(spent, limit) {
    const percentage = spent / limit;
    return circumference.value - (percentage * circumference.value);
}
</script> 
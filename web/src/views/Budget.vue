<template>
    <div class="p-4 sm:p-6 max-w-7xl mx-auto">
        <header class="flex justify-between items-center mb-6">
            <h1 class="text-2xl sm:text-3xl font-semibold text-white">Budget Status</h1>
            <button class="btn-primary text-xs py-1">Add Budget</button>
        </header>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
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
    </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { formatRupiah } from '../utils/currency';

const budgetCategories = ref([
    { id: 1, name: 'Food & Dining', spent: 800000, limit: 1000000, color: '#FF6B6B' },
    { id: 2, name: 'Transportation', spent: 400000, limit: 500000, color: '#4ECDC4' },
    { id: 3, name: 'Entertainment', spent: 300000, limit: 400000, color: '#45B7D1' },
    { id: 4, name: 'Utilities', spent: 200000, limit: 250000, color: '#96CEB4' },
    { id: 5, name: 'Shopping', spent: 450000, limit: 600000, color: '#FFB347' },
    { id: 6, name: 'Healthcare', spent: 150000, limit: 300000, color: '#FF7F50' },
    { id: 7, name: 'Education', spent: 750000, limit: 800000, color: '#87CEEB' },
    { id: 8, name: 'Savings', spent: 1200000, limit: 1500000, color: '#98FB98' },
    { id: 9, name: 'Investment', spent: 2000000, limit: 2500000, color: '#DDA0DD' },
    { id: 10, name: 'Others', spent: 180000, limit: 200000, color: '#B19CD9' }
]);

const radius = 20;
const circumference = computed(() => 2 * Math.PI * radius);

function getDashOffset(spent, limit) {
    const percentage = spent / limit;
    return circumference.value - (percentage * circumference.value);
}
</script> 
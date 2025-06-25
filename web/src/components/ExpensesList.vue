<!-- ExpensesList.vue -->
<template>
    <section class="mb-8">
        <div class="flex justify-between items-center mb-4">
            <h2 class="text-lg font-bold text-white">Recent Expenses</h2>
            <button class="text-xs text-gray-400 hover:text-white transition-colors">
                View All →
            </button>
        </div>
        <div class="space-y-4">
            <div 
                v-for="expense in expenses" 
                :key="expense.id"
                class="flex items-center gap-4 py-2 border-b border-dark-700/50 group hover:bg-dark-800/20 transition-all px-2 -mx-2 rounded-lg"
            >
                <div class="flex-1">
                    <div class="flex items-center gap-2">
                        <span class="text-base">{{ expense.categoryIcon }}</span>
                        <h4 class="text-sm text-white font-medium">{{ expense.description }}</h4>
                    </div>
                    <div class="flex items-center gap-2 mt-1">
                        <span class="text-xs text-gray-400">{{ expense.category }}</span>
                        <div class="w-1 h-1 rounded-full bg-dark-600"></div>
                        <span class="text-xs text-gray-400">Today</span>
                    </div>
                </div>
                <div class="text-sm font-medium" :class="expense.type === 'expense' ? 'text-rose-400' : 'text-emerald-400'">
                    {{ expense.type === 'expense' ? '-' : '+' }}{{ formatRupiah(expense.amount) }}
                </div>
            </div>
        </div>
    </section>
</template>

<script setup>
import { formatRupiah } from '../utils/currency';

defineProps({
    expenses: {
        type: Array,
        required: true
    }
});
</script> 
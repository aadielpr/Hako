<template>
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div class="card p-4">
            <h3 class="text-sm font-medium text-gray-400 mb-2">Monthly Overview</h3>
            <MonthlyChart 
                :income="income"
                :expenses="expenses"
                :savings="savings"
            />
        </div>
        <div class="card p-4">
            <h3 class="text-sm font-medium text-gray-400 mb-2">Expenses by Category</h3>
            <ExpensesCategory :categories="categories" />
        </div>
    </div>
</template>

<script setup>
import MonthlyChart from './MonthlyChart.vue';
import ExpensesCategory from './ExpensesCategory.vue';

defineProps({
    income: {
        type: Number,
        required: true
    },
    expenses: {
        type: Number,
        required: true
    },
    savings: {
        type: Number,
        required: true
    },
    categories: {
        type: Array,
        required: true
    }
});
</script> 
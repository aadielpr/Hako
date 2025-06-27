<template>
    <div class="p-4 sm:p-6 max-w-7xl mx-auto">
        <!-- Header -->
        <header class="flex justify-between items-center mb-6 sm:mb-8">
            <h1 class="text-2xl sm:text-3xl font-semibold text-white">Expenses</h1>
        </header>

        <!-- Summary Section -->
        <div class="mb-6">
            <h2 class="text-lg font-bold text-white mb-3">Monthly Summary</h2>
            <!-- Monthly Summary Cards -->
            <SummaryCards 
                :income="monthlyIncome"
                :expenses="monthlyExpenses"
                :savings="monthlySavings"
                class="mb-6"
            />

            <!-- Charts Section -->
            <ChartsSection 
                :income="monthlyIncome"
                :expenses="monthlyExpenses"
                :savings="monthlySavings"
                :categories="expenseCategories"
            />
        </div>

        <!-- Budget Status and Recent Expenses -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
            <BudgetStatus :budget-categories="budgetCategories" />
            <RecentExpenses :expenses="recentExpenses" class="mt-6">
                <template #header>
                    <div class="flex justify-between items-center">
                        <h3 class="text-lg font-medium">Recent Expenses</h3>
                        <router-link to="/expenses/list" class="text-primary-500 hover:text-primary-400">View All</router-link>
                    </div>
                </template>
            </RecentExpenses>
        </div>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import SummaryCards from '../components/SummaryCards.vue';
import ChartsSection from '../components/ChartsSection.vue';
import BudgetStatus from '../components/BudgetStatus.vue';
import RecentExpenses from '../components/RecentExpenses.vue';


// Mock data - will be replaced with API calls
const monthlyIncome = ref(5000000);
const monthlyExpenses = ref(3200000);
const monthlySavings = computed(() => monthlyIncome.value - monthlyExpenses.value);

const expenseCategories = ref([
    { name: 'Food', amount: 2500000 },
    { name: 'Transport', amount: 1500000 },
    { name: 'Shopping', amount: 2000000 },
    { name: 'Bills', amount: 3000000 },
    { name: 'Others', amount: 1000000 }
]);

const budgetCategories = ref([
    { 
        id: 1, 
        name: 'Food & Dining', 
        spent: 2500000, 
        limit: 3000000, 
        color: '#60A5FA'  // blue-400
    },
    { 
        id: 2, 
        name: 'Transportation', 
        spent: 1500000, 
        limit: 2000000, 
        color: '#FB923C'  // orange-400
    },
    { 
        id: 3, 
        name: 'Shopping', 
        spent: 2000000, 
        limit: 2500000, 
        color: '#34D399'  // emerald-400
    },
    { 
        id: 4, 
        name: 'Bills & Utilities', 
        spent: 3000000, 
        limit: 3500000, 
        color: '#A78BFA'  // violet-400
    }
]);

const recentExpenses = ref([
    {
        id: 1,
        description: 'Grocery Shopping',
        amount: 850000,
        category: 'Food & Dining',
        categoryIcon: '🛒',
        type: 'expense'
    },
    {
        id: 2,
        description: 'Salary',
        amount: 15000000,
        category: 'Income',
        categoryIcon: '💰',
        type: 'income'
    },
    {
        id: 3,
        description: 'Electric Bill',
        amount: 450000,
        category: 'Bills & Utilities',
        categoryIcon: '⚡',
        type: 'expense'
    },
    {
        id: 4,
        description: 'Internet Bill',
        amount: 350000,
        category: 'Bills & Utilities',
        categoryIcon: '🌐',
        type: 'expense'
    }
]);

const categories = ref([
    { id: 1, name: 'Food & Dining' },
    { id: 2, name: 'Transportation' },
    { id: 3, name: 'Entertainment' },
    { id: 4, name: 'Utilities' }
]);
</script> 
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
            <ExpensesList :expenses="recentExpenses" />
        </div>

        <!-- Quick Add Modal -->
        <div v-if="showAddExpense" class="fixed inset-0 bg-black/90 flex items-center justify-center z-50" @click="showAddExpense = false">
            <div class="bg-black border border-dark-800 rounded-2xl p-8 w-full max-w-md mx-4" @click.stop>
                <h3 class="text-xl font-bold text-white text-center mb-6">Add Expense</h3>
                <form @submit.prevent="addExpense" class="space-y-4">
                    <div>
                        <label class="block text-gray-400 text-sm mb-2">Description</label>
                        <input 
                            v-model="newExpense.description" 
                            type="text" 
                            required 
                            class="input-field w-full"
                        />
                    </div>
                    <div>
                        <label class="block text-gray-400 text-sm mb-2">Amount</label>
                        <input 
                            v-model="newExpense.amount" 
                            type="number" 
                            step="0.01" 
                            required 
                            class="input-field w-full"
                        />
                    </div>
                    <div>
                        <label class="block text-gray-400 text-sm mb-2">Category</label>
                        <select v-model="newExpense.category" required class="input-field w-full">
                            <option value="">Select Category</option>
                            <option v-for="cat in categories" :key="cat.id" :value="cat.id">
                                {{ cat.name }}
                            </option>
                        </select>
                    </div>
                    <div>
                        <label class="block text-gray-400 text-sm mb-2">Type</label>
                        <select v-model="newExpense.type" required class="input-field w-full">
                            <option value="expense">Expense</option>
                            <option value="income">Income</option>
                        </select>
                    </div>
                    <div class="flex gap-4 pt-4">
                        <button 
                            type="button" 
                            @click="showAddExpense = false"
                            class="flex-1 py-3 bg-dark-800 text-white rounded-lg font-medium hover:bg-black/40 transition-colors"
                        >
                            Cancel
                        </button>
                        <button 
                            type="submit"
                            class="flex-1 py-3 bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-lg font-medium hover:from-primary-600 hover:to-primary-700 transition-all transform hover:-translate-y-0.5"
                        >
                            Add
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>
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
import { ref, computed } from 'vue';
import { formatRupiah } from '../utils/currency';
import SummaryCards from '../components/SummaryCards.vue';
import ChartsSection from '../components/ChartsSection.vue';
import BudgetStatus from '../components/BudgetStatus.vue';
import ExpensesList from '../components/ExpensesList.vue';

// Reactive state
const showAddExpense = ref(false);
const newExpense = ref({
    description: '',
    amount: '',
    category: '',
    type: 'expense'
});

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

function addExpense() {
    // TODO: API call to add expense
    console.log('Adding expense:', newExpense.value);
    showAddExpense.value = false;
    newExpense.value = { description: '', amount: '', category: '', type: 'expense' };
}
</script> 
<template>
    <div class="min-h-screen bg-dark-900">
        <div class="max-w-6xl mx-auto px-6 py-8">
            <!-- Header -->
            <div class="px-6 py-4 mb-2">
                <div class="flex justify-between items-center">
                    <div>
                        <h1 class="text-2xl font-semibold text-white">Expense Records</h1>
                        <p class="text-sm text-dark-400 mt-1">Manage and track all family expenses</p>
                    </div>
                    <router-link to="/expenses/add" class="bg-dark-700 text-white px-4 py-2 rounded-md hover:bg-dark-600 transition-colors text-sm font-medium border border-dark-600">
                        + Add Record
                    </router-link>
                </div>
            </div>

            <!-- Filters -->
            <div class="px-6 py-4 mb-6">
                <div class="flex items-center gap-4">
                    <div class="relative">
                        <svg class="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-dark-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                        </svg>
                        <input 
                            type="text" 
                            placeholder="Search records..." 
                            class="pl-10 pr-4 py-2 border border-dark-600 rounded-md focus:outline-none focus:ring-2 focus:ring-white/20 focus:border-white/30 text-sm w-80 bg-dark-700 text-white placeholder-dark-400" 
                        />
                    </div>
                    <select class="border border-dark-600 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-white/20 focus:border-white/30 bg-dark-700 text-white">
                        <option value="">All Categories</option>
                        <option v-for="category in categories" :key="category" :value="category">
                            {{ category }}
                        </option>
                    </select>
                    <select class="border border-dark-600 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-white/20 focus:border-white/30 bg-dark-700 text-white">
                        <option value="">All Time</option>
                        <option value="today">Today</option>
                        <option value="week">This Week</option>
                        <option value="month">This Month</option>
                        <option value="year">This Year</option>
                    </select>
                    <button class="text-dark-400 hover:text-white px-3 py-2 text-sm">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.207A1 1 0 013 6.5V4z"></path>
                        </svg>
                    </button>
                </div>
            </div>

            <!-- Table -->
            <div class="overflow-x-auto">
                <table class="w-full">
                    <thead>
                        <tr class="border-b border-dark-700">
                            <th class="text-left py-3 px-6 font-medium text-dark-300 text-sm uppercase tracking-wider">Date</th>
                            <th class="text-left py-3 px-6 font-medium text-dark-300 text-sm uppercase tracking-wider">Description</th>
                            <th class="text-left py-3 px-6 font-medium text-dark-300 text-sm uppercase tracking-wider">Category</th>
                            <th class="text-left py-3 px-6 font-medium text-dark-300 text-sm uppercase tracking-wider">Amount</th>
                            <th class="text-center py-3 px-6 font-medium text-dark-300 text-sm uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody class="divide-y divide-dark-700">
                        <tr v-for="expense in expenses" :key="expense.id" class="hover:bg-dark-800/30">
                            <td class="py-4 px-6 text-sm text-white">{{ formatDate(expense.date) }}</td>
                            <td class="py-4 px-6">
                                <div class="text-sm font-medium text-white">{{ expense.description }}</div>
                            </td>
                            <td class="py-4 px-6">
                                <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium" :class="getCategoryBadge(expense.category)">
                                    {{ expense.category }}
                                </span>
                            </td>
                            <td class="py-4 px-6 text-sm font-medium text-white">{{ formatRupiah(expense.amount) }}</td>
                            <td class="py-4 px-6 text-center">
                                <div class="relative">
                                    <button 
                                        @click="toggleDropdown(expense.id)"
                                        class="text-dark-400 hover:text-white p-1 rounded-md hover:bg-dark-800 transition-colors"
                                    >
                                        <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                                        </svg>
                                    </button>
                                    
                                    <!-- Dropdown Menu -->
                                    <div 
                                        v-if="openDropdown === expense.id"
                                        class="absolute right-0 mt-1 w-40 bg-dark-700 border border-dark-600 rounded-md shadow-lg z-10"
                                    >
                                        <button 
                                            @click="editExpense(expense)"
                                            class="w-full text-left px-4 py-2 text-sm text-white hover:bg-dark-600 transition-colors flex items-center gap-2"
                                        >
                                            <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                                            </svg>
                                            Edit Record
                                        </button>
                                        <button 
                                            @click="viewExpense(expense)"
                                            class="w-full text-left px-4 py-2 text-sm text-white hover:bg-dark-600 transition-colors flex items-center gap-2"
                                        >
                                            <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                                            </svg>
                                            View Details
                                        </button>
                                        <button 
                                            @click="deleteExpense(expense)"
                                            class="w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-red-900/20 transition-colors flex items-center gap-2"
                                        >
                                            <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                                            </svg>
                                            Delete Record
                                        </button>
                                    </div>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <!-- Pagination -->
            <div class="px-6 py-4 mt-6">
                <div class="flex justify-between items-center">
                    <div class="text-sm text-dark-400">
                        Showing <span class="font-medium text-white">1</span> to <span class="font-medium text-white">{{ expenses.length }}</span> of <span class="font-medium text-white">{{ expenses.length }}</span> records
                    </div>
                    <div class="flex gap-2">
                        <button class="px-3 py-2 border border-dark-600 rounded-md text-sm text-dark-400 hover:bg-dark-800 disabled:opacity-50 disabled:cursor-not-allowed" disabled>
                            Previous
                        </button>
                        <button class="px-3 py-2 border border-dark-600 rounded-md text-sm text-white hover:bg-dark-800">
                            Next
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { formatRupiah } from '../utils/currency'
import { formatDate } from '../utils/date'

const categories = ['Food & Dining', 'Transportation', 'Entertainment', 'Utilities', 'Shopping', 'Healthcare', 'Education', 'Savings', 'Investment', 'Others']
const openDropdown = ref(null)

const expenses = ref([
    {
        id: 1,
        date: new Date('2024-02-20'),
        description: 'Grocery Shopping',
        category: 'Food & Dining',
        amount: 150000
    },
    {
        id: 2,
        date: new Date('2024-02-19'),
        description: 'Taxi Ride',
        category: 'Transportation',
        amount: 45000
    },
    {
        id: 3,
        date: new Date('2024-02-18'),
        description: 'Netflix Subscription',
        category: 'Entertainment',
        amount: 159000
    },
    {
        id: 4,
        date: new Date('2024-02-17'),
        description: 'Electricity Bill',
        category: 'Utilities',
        amount: 450000
    },
    {
        id: 5,
        date: new Date('2024-02-16'),
        description: 'New Shoes',
        category: 'Shopping',
        amount: 899000
    }
])

function toggleDropdown(id) {
    openDropdown.value = openDropdown.value === id ? null : id
}

function editExpense(expense) {
    console.log('Edit expense:', expense)
    openDropdown.value = null
}

function viewExpense(expense) {
    console.log('View expense:', expense)
    openDropdown.value = null
}

function deleteExpense(expense) {
    console.log('Delete expense:', expense)
    openDropdown.value = null
}

function getCategoryBadge(category) {
    const badges = {
        'Food & Dining': 'bg-orange-900/50 text-orange-300',
        'Transportation': 'bg-blue-900/50 text-blue-300',
        'Entertainment': 'bg-yellow-900/50 text-yellow-300',
        'Utilities': 'bg-green-900/50 text-green-300',
        'Shopping': 'bg-purple-900/50 text-purple-300',
        'Healthcare': 'bg-red-900/50 text-red-300',
        'Education': 'bg-indigo-900/50 text-indigo-300',
        'Savings': 'bg-emerald-900/50 text-emerald-300',
        'Investment': 'bg-pink-900/50 text-pink-300',
        'Others': 'bg-gray-900/50 text-gray-300'
    }
    return badges[category] || badges.Others
}

// Close dropdown when clicking outside
document.addEventListener('click', (e) => {
    if (!e.target.closest('.relative')) {
        openDropdown.value = null
    }
})
</script> 
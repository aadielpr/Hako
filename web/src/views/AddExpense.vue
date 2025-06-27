<template>
    <div class="min-h-screen bg-dark-900">
        <div class="max-w-4xl mx-auto px-6 py-8">
            <!-- Header -->
            <div class="py-4 mb-6">
                <div class="flex items-center gap-4 mb-4">
                    <router-link to="/expenses/list" class="text-dark-400 hover:text-white transition-colors">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
                        </svg>
                    </router-link>
                    <h1 class="text-2xl font-semibold text-white">Add New Expense</h1>
                </div>
                <p class="text-sm text-dark-400">Fill in the details below to add a new expense record</p>
            </div>

            <!-- Form -->
            <form @submit.prevent="submitForm" class="space-y-6">
                <!-- Basic Information -->
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label class="block text-sm font-medium text-white mb-2">Description</label>
                        <input 
                            v-model="form.description"
                            type="text" 
                            required
                            placeholder="Enter expense description"
                            class="w-full px-3 py-2 border border-dark-600 rounded-md focus:outline-none focus:ring-2 focus:ring-white/20 focus:border-white/30 bg-dark-700 text-white placeholder-dark-400"
                        />
                    </div>
                    
                    <div>
                        <label class="block text-sm font-medium text-white mb-2">Amount</label>
                        <div class="flex items-center">
                            <span class="text-dark-400 mr-2">Rp</span>
                            <input 
                                v-model="form.amount"
                                type="text" 
                                required
                                placeholder="0"
                                @input="formatAmount"
                                class="flex-1 px-3 py-2 border border-dark-600 rounded-md focus:outline-none focus:ring-2 focus:ring-white/20 focus:border-white/30 bg-dark-700 text-white placeholder-dark-400 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                            />
                        </div>
                    </div>

                    <div>
                        <label class="block text-sm font-medium text-white mb-2">Category</label>
                        <select 
                            v-model="form.category"
                            required
                            class="w-full px-3 py-2 border border-dark-600 rounded-md focus:outline-none focus:ring-2 focus:ring-white/20 focus:border-white/30 bg-dark-700 text-white"
                        >
                            <option value="">Select category</option>
                            <option v-for="category in categories" :key="category" :value="category">
                                {{ category }}
                            </option>
                        </select>
                    </div>

                    <div>
                        <label class="block text-sm font-medium text-white mb-2">Date</label>
                        <input 
                            v-model="form.date"
                            type="date" 
                            required
                            class="w-full px-3 py-2 border border-dark-600 rounded-md focus:outline-none focus:ring-2 focus:ring-white/20 focus:border-white/30 bg-dark-700 text-white"
                        />
                    </div>
                </div>

                <!-- Notes -->
                <div>
                    <label class="block text-sm font-medium text-white mb-2">Notes (Optional)</label>
                    <textarea 
                        v-model="form.notes"
                        rows="3"
                        placeholder="Add any additional notes about this expense"
                        class="w-full px-3 py-2 border border-dark-600 rounded-md focus:outline-none focus:ring-2 focus:ring-white/20 focus:border-white/30 bg-dark-700 text-white placeholder-dark-400 resize-none"
                    ></textarea>
                </div>

                <!-- Photo Upload -->
                <div>
                    <label class="block text-sm font-medium text-white mb-2">Receipt/Photo (Optional)</label>
                    <div class="border-2 border-dashed border-dark-600 rounded-lg p-6 text-center hover:border-dark-500 transition-colors">
                        <input 
                            ref="fileInput"
                            type="file" 
                            accept="image/*"
                            @change="handleFileUpload"
                            class="hidden"
                        />
                        
                        <div v-if="!form.photo" @click="$refs.fileInput.click()" class="cursor-pointer">
                            <svg class="mx-auto h-12 w-12 text-dark-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                                <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                            </svg>
                            <p class="mt-2 text-sm text-dark-400">Click to upload a photo</p>
                            <p class="text-xs text-dark-500 mt-1">PNG, JPG, GIF up to 10MB</p>
                        </div>
                        
                        <div v-else class="relative">
                            <img :src="form.photo" alt="Uploaded photo" class="mx-auto max-h-48 rounded-lg" />
                            <button 
                                @click="removePhoto"
                                type="button"
                                class="absolute top-2 right-2 bg-red-600 text-white rounded-full p-1 hover:bg-red-700 transition-colors"
                            >
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>

                <!-- Form Actions -->
                <div class="flex justify-end gap-4 pt-6 border-t border-dark-700">
                    <router-link 
                        to="/expenses/list"
                        class="px-4 py-2 border border-dark-600 rounded-md text-white hover:bg-dark-700 transition-colors text-sm font-medium"
                    >
                        Cancel
                    </router-link>
                    <button 
                        type="submit"
                        :disabled="isSubmitting"
                        class="px-6 py-2 bg-dark-700 text-white rounded-md hover:bg-dark-600 transition-colors text-sm font-medium border border-dark-600 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {{ isSubmitting ? 'Adding...' : 'Add Expense' }}
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const fileInput = ref(null)
const isSubmitting = ref(false)

const categories = ['Food & Dining', 'Transportation', 'Entertainment', 'Utilities', 'Shopping', 'Healthcare', 'Education', 'Savings', 'Investment', 'Others']

const form = reactive({
    description: '',
    amount: '',
    category: '',
    date: new Date().toISOString().split('T')[0],
    notes: '',
    photo: null
})

function formatAmount(event) {
    // Remove all non-digit characters
    let value = event.target.value.replace(/\D/g, '')
    
    // Add commas for thousands
    if (value) {
        value = parseInt(value).toLocaleString('en-US')
    }
    
    // Update the form value
    form.amount = value
}

function handleFileUpload(event) {
    const file = event.target.files[0]
    if (file) {
        if (file.size > 10 * 1024 * 1024) { // 10MB limit
            alert('File size must be less than 10MB')
            return
        }
        
        const reader = new FileReader()
        reader.onload = (e) => {
            form.photo = e.target.result
        }
        reader.readAsDataURL(file)
    }
}

function removePhoto() {
    form.photo = null
    if (fileInput.value) {
        fileInput.value.value = ''
    }
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

function submitForm() {
    isSubmitting.value = true
    
    // Simulate API call
    setTimeout(() => {
        console.log('Form submitted:', form)
        isSubmitting.value = false
        router.push('/expenses/list')
    }, 1000)
}
</script> 
<template>
    <section class="grid grid-cols-3 gap-2 sm:gap-3">
        <div class="card p-2 sm:p-4">
            <div class="flex items-center gap-1.5 sm:gap-2 mb-1">
                <div class="text-base sm:text-xl">💰</div>
                <h3 class="text-[10px] sm:text-xs text-gray-400 font-medium">Income</h3>
            </div>
            <p class="text-sm sm:text-xl font-bold text-white">{{ formatRupiah(income) }}</p>
            <div class="h-1 w-8 sm:w-12 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full mt-2"></div>
        </div>

        <div class="card p-2 sm:p-4">
            <div class="flex items-center gap-1.5 sm:gap-2 mb-1">
                <div class="text-base sm:text-xl">💸</div>
                <h3 class="text-[10px] sm:text-xs text-gray-400 font-medium">Expenses</h3>
            </div>
            <p class="text-sm sm:text-xl font-bold text-white">{{ formatRupiah(expenses) }}</p>
            <div class="h-1 w-8 sm:w-12 bg-gradient-to-r from-amber-400 to-orange-400 rounded-full mt-2"></div>
        </div>

        <div class="card p-2 sm:p-4">
            <div class="flex items-center gap-1.5 sm:gap-2 mb-1">
                <div class="text-base sm:text-xl">🎯</div>
                <h3 class="text-[10px] sm:text-xs text-gray-400 font-medium">Savings</h3>
            </div>
            <p class="text-sm sm:text-xl font-bold" :class="savings < 0 ? 'text-rose-400' : 'text-emerald-400'">
                {{ formatRupiah(savings) }}
            </p>
            <div class="h-1 w-8 sm:w-12" :class="[
                savings < 0 
                    ? 'bg-gradient-to-r from-rose-400 to-pink-400' 
                    : 'bg-gradient-to-r from-emerald-400 to-teal-400',
                'rounded-full mt-2'
            ]"></div>
        </div>
    </section>
</template>

<script setup>
import { formatRupiah } from '../utils/currency';

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
    }
});
</script> 
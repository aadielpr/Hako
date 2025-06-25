<template>
    <div id="app">
        <nav class="bg-dark-900 border-b border-dark-800">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="flex justify-between h-16 sm:h-20">
                    <div class="flex items-center">
                        <router-link to="/">
                            <img :src="logo" alt="Hako" class="h-12 sm:h-16 w-auto" />
                        </router-link>
                    </div>
                    <div class="flex items-center">
                        <div class="flex overflow-x-auto hide-scrollbar -mx-2 sm:mx-0">
                            <router-link 
                                v-for="item in navItems" 
                                :key="item.path"
                                :to="item.path"
                                class="text-dark-200 hover:text-white px-2 sm:px-3 py-2 text-xs sm:text-sm font-medium transition-colors whitespace-nowrap"
                                :class="{ 'text-white': $route.path === item.path }"
                            >
                                {{ item.name }}
                            </router-link>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
        
        <main class="min-h-screen">
            <router-view />
        </main>
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
import { ref } from 'vue';
import logo from './assets/HakoSecondary.png';

const navItems = ref([
    { name: 'Expenses', path: '/' },
    { name: 'Categories', path: '/categories' },
    { name: 'Budget', path: '/budget' },
    { name: 'Achievements', path: '/achievements' }
]);
</script>
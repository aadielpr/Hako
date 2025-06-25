import { createRouter, createWebHistory } from 'vue-router';
import Expenses from '../views/Expenses.vue';

const routes = [
    {
        path: '/',
        name: 'Expenses',
        component: Expenses
    },
    {
        path: '/categories',
        name: 'Categories',
        component: () => import('../views/Categories.vue')
    },
    {
        path: '/budget',
        name: 'Budget',
        component: () => import('../views/Budget.vue')
    },
    {
        path: '/budget/list',
        name: 'BudgetList',
        component: () => import('../views/BudgetList.vue')
    },
    {
        path: '/achievements',
        name: 'Achievements',
        component: () => import('../views/Achievements.vue')
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router; 
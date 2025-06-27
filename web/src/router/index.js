import { createRouter, createWebHistory } from 'vue-router';
import Expenses from '../views/Expenses.vue';
import ExpensesList from '../views/ExpensesList.vue';
import AddExpense from '../views/AddExpense.vue';
import Budget from '../views/Budget.vue';
import Categories from '../views/Categories.vue';
import Achievements from '../views/Achievements.vue';

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            redirect: '/expenses'
        },
        {
            path: '/expenses',
            name: 'expenses',
            component: Expenses
        },
        {
            path: '/expenses/list',
            name: 'expenses-list',
            component: ExpensesList
        },
        {
            path: '/expenses/add',
            name: 'add-expense',
            component: AddExpense
        },
        {
            path: '/budget',
            name: 'budget',
            component: Budget
        },
        {
            path: '/categories',
            name: 'categories',
            component: Categories
        },
        {
            path: '/achievements',
            name: 'achievements',
            component: Achievements
        }
    ]
});

export default router; 
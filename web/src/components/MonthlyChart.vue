<!-- MonthlyChart.vue -->
<template>
    <div class="mt-4">
        <Bar
            :data="chartData"
            :options="chartOptions"
            class="h-44"
        />
    </div>
</template>

<script setup>
import { computed } from 'vue';
import { Bar } from 'vue-chartjs';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { formatRupiah } from '../utils/currency';

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const props = defineProps({
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

const chartData = computed(() => ({
    labels: ['Income', 'Expenses', 'Savings'],
    datasets: [
        {
            data: [props.income, props.expenses, Math.abs(props.savings)],
            backgroundColor: [
                'rgba(59, 130, 246, 0.9)',  // blue-500
                'rgba(245, 158, 11, 0.9)',   // amber-500
                props.savings < 0 ? 'rgba(239, 68, 68, 0.9)' : 'rgba(16, 185, 129, 0.9)'  // red-500 or emerald-500
            ],
            borderColor: [
                'rgb(37, 99, 235)',  // blue-600
                'rgb(217, 119, 6)',   // amber-600
                props.savings < 0 ? 'rgb(220, 38, 38)' : 'rgb(5, 150, 105)'  // red-600 or emerald-600
            ],
            borderWidth: 1,
            borderRadius: 6
        }
    ]
}));

const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
        legend: {
            display: false
        },
        tooltip: {
            callbacks: {
                label: (context) => formatRupiah(context.raw)
            },
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            padding: 12,
            cornerRadius: 8
        }
    },
    scales: {
        y: {
            beginAtZero: true,
            grid: {
                color: 'rgba(75, 85, 99, 0.1)'
            },
            ticks: {
                callback: (value) => formatRupiah(value),
                color: 'rgb(156, 163, 175)',
                font: {
                    size: 11,
                    family: "'Poppins', sans-serif"
                }
            }
        },
        x: {
            grid: {
                display: false
            },
            ticks: {
                color: 'rgb(156, 163, 175)',
                font: {
                    size: 11,
                    family: "'Poppins', sans-serif"
                }
            }
        }
    }
};
</script> 
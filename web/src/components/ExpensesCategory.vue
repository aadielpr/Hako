<template>
    <div class="h-44 flex items-center">
        <Pie
            :data="chartData"
            :options="chartOptions"
        />
    </div>
</template>

<script setup>
import { computed } from 'vue';
import { Pie } from 'vue-chartjs';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { formatRupiah } from '../utils/currency';

ChartJS.register(ArcElement, Tooltip, Legend);

const props = defineProps({
    categories: {
        type: Array,
        required: true,
        default: () => [
            { name: 'Food', amount: 2500000 },
            { name: 'Transport', amount: 1500000 },
            { name: 'Shopping', amount: 2000000 },
            { name: 'Bills', amount: 3000000 }
        ]
    }
});

const chartData = computed(() => ({
    labels: props.categories.map(cat => cat.name),
    datasets: [
        {
            data: props.categories.map(cat => cat.amount),
            backgroundColor: [
                'rgba(59, 130, 246, 0.9)',   // blue-500
                'rgba(245, 158, 11, 0.9)',   // amber-500
                'rgba(16, 185, 129, 0.9)',   // emerald-500
                'rgba(139, 92, 246, 0.9)',   // violet-500
                'rgba(239, 68, 68, 0.9)',    // red-500
            ],
            borderColor: [
                'rgb(37, 99, 235)',   // blue-600
                'rgb(217, 119, 6)',   // amber-600
                'rgb(5, 150, 105)',   // emerald-600
                'rgb(124, 58, 237)',  // violet-600
                'rgb(220, 38, 38)',   // red-600
            ],
            borderWidth: 1
        }
    ]
}));

const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    layout: {
        padding: {
            left: 10,
            right: 10
        }
    },
    plugins: {
        legend: {
            position: 'right',
            align: 'center',
            labels: {
                color: 'rgb(156, 163, 175)',
                font: {
                    size: 11,
                    family: "'Poppins', sans-serif"
                },
                padding: 12,
                usePointStyle: true,
                pointStyle: 'circle'
            }
        },
        tooltip: {
            callbacks: {
                label: (context) => {
                    const label = context.label || '';
                    const value = formatRupiah(context.raw);
                    const total = context.dataset.data.reduce((a, b) => a + b, 0);
                    const percentage = Math.round((context.raw / total) * 100);
                    return `${label}: ${value} (${percentage}%)`;
                }
            },
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            titleFont: {
                size: 13,
                family: "'Poppins', sans-serif"
            },
            bodyFont: {
                size: 13,
                family: "'Poppins', sans-serif"
            },
            padding: 12,
            cornerRadius: 8,
            displayColors: false
        }
    }
};
</script> 
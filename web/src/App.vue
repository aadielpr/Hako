<template>
    <div id="app">
        <header>
            <h1>Hako App</h1>
        </header>
        <main>
            <div class="card">
                <button @click="fetchData">{{ buttonText }}</button>
                <p v-if="message">{{ message }}</p>
            </div>
        </main>
    </div>
</template>

<script>
import { ref } from 'vue';

export default {
    name: 'App',
    setup() {
        const message = ref('');
        const buttonText = ref('Test API Connection');

        async function fetchData() {
            try {
                const response = await fetch('/api/health');
                const data = await response.json();
                message.value = data.message;
                buttonText.value = 'Connected ✓';
            } catch (error) {
                message.value = 'Failed to connect to API';
                buttonText.value = 'Retry Connection';
            }
        }

        return {
            message,
            buttonText,
            fetchData,
        };
    },
};
</script>

<style scoped>
#app {
    max-width: 1280px;
    margin: 0 auto;
    padding: 2rem;
    text-align: center;
}

header h1 {
    font-size: 3.2em;
    line-height: 1.1;
    margin-bottom: 2rem;
}

.card {
    padding: 2em;
}

button {
    border-radius: 8px;
    border: 1px solid transparent;
    padding: 0.6em 1.2em;
    font-size: 1em;
    font-weight: 500;
    font-family: inherit;
    background-color: #1a1a1a;
    color: white;
    cursor: pointer;
    transition: border-color 0.25s;
}

button:hover {
    border-color: #646cff;
}

p {
    margin-top: 1rem;
    color: #888;
}
</style> 
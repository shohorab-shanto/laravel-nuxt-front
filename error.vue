<template>
    <div>
        <section class="content">
            <div class="error-page">
                <h2 class="headline text-warning"> {{error.statusCode}}</h2>

                <div class="error-content" style="text-align: center;">
                    <h3><i class="fas fa-exclamation-triangle text-warning"></i> Oops! {{error.message}}</h3>
                    <button class="btn btn-success" @click="handleError">Go Home...</button>
                </div>
            </div>
        </section>
    </div>
</template>

<script setup>
defineProps({
    error: Object
})

const handleError = () => clearError({ redirect: '/' })
</script>

<style scoped>
    .error-page{
        margin: 20% auto 0 !important;
    }
</style>
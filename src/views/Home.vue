<script setup lang="ts">
import { useUserStore } from '@/stores/user'
import { useI18n } from 'vue-i18n'

const { t, locale } = useI18n()
const userStore = useUserStore()

const changeLanguage = () => {
    locale.value = locale.value === 'fr' ? 'en' : 'fr'
}
</script>

<template>
    <div class="greeting-card">
        <h1>{{ t('welcome', { name: userStore.name }) }}</h1>

        <button @click="changeLanguage">
            {{ t('switchLanguage') }}
        </button>

        <input v-model="userStore.name" :placeholder="t('namePlaceholder')" />
    </div>
</template>
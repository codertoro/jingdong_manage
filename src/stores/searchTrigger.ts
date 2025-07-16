import { defineStore } from 'pinia'

export const useSearchTrigger = defineStore('searchTrigger', {
    state: () => ({
        triggerKey: 0, // 用来强制刷新
    }),
    actions: {
        trigger() {
            this.triggerKey++
        }
    }
})
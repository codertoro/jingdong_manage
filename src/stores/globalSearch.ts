import { defineStore } from 'pinia'

export const useGlobalSearch = defineStore('globalSearch', {
    state: () => ({
        queryString: '', // 全局搜索关键词
    }),
    actions: {
        setQueryString(str: string) {
            this.queryString = str
        },
        clearQueryString() {
            this.queryString = ''
        },
    },
})
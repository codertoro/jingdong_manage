//存储当前打开的 tab 页数据和操作方法
import { defineStore } from 'pinia'

export interface Tab {
    title: string
    name: string // 一般是 fullPath
    path: string
    closable?: boolean
}

export const useTabStore = defineStore('tabStore', {
    state: () => ({
        tabs: [] as Tab[],
        activeTab: '', // 当前激活的 tab 路由 fullPath
    }),
    actions: {
        addTab(tab: Tab) {
            const exists = this.tabs.find(t => t.name === tab.name)
            if (!exists) {
                this.tabs.push(tab)
            }
            this.activeTab = tab.name
        },
        removeTab(name: string) {
            const index = this.tabs.findIndex(t => t.name === name)
            if (index !== -1) {
                this.tabs.splice(index, 1)
                // 如果删除的是当前激活 tab，切换到其他 tab
                if (this.activeTab === name) {
                    const nextTab = this.tabs[index] || this.tabs[index - 1]
                    this.activeTab = nextTab?.name || ''
                }
            }
        },
        setActive(name: string) {
            this.activeTab = name
        },
        setTitle(name: string, newTitle: string) {
            const tab = this.tabs.find(t => t.name === name)
            if (tab) {
                tab.title = newTitle
            }
        },
        resetTabs() {
            this.tabs = []
            this.activeTab = ''
        },
    },
    persist: true // 开启持久化（需安装插件）
})
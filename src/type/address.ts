// @/type/address.ts

export interface Address {
    id: number
    userId: number
    realName: string
    mobile: string
    province: string
    city: string
    area: string
    house: string
    tag: string
    isDefault: number // 1 表示默认地址，0 表示非默认
    status: number     // 1 表示正常，0 表示已删除（逻辑删除）
    createTime: string // 或 Date，取决于你接口返回格式
    updateTime: string // 或 Date
}
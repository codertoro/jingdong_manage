// types/order.ts
import { PayStatus, OrderStatus } from '@/enums/orderStatus'


export interface Order {
    id: number // 主键ID
    orderNo: string // 订单号
    userId: number // 用户ID
    userName: string // 用户名
    userPhone: string // 用户电话
    userAddress: string // 用户地址
    userAddressId: number // 用户地址id
    userOpenid: string // 微信 OpenID
    shopId: number // 商铺ID
    shopName: string // 商铺名称
    orderAmount: number // 订单总金额
    payTime: number // 支付时间（时间戳）
    payStatus: PayStatus // 支付状态（枚举）
    orderStatus: OrderStatus // 订单状态（枚举）
    createTime: string // 创建时间（ISO字符串）
    updateTime: string // 修改时间（ISO字符串）
}
export interface OrderDetail {
    detailId: string
    orderNo: string
    productId: number
    name: string
    price: number // BigDecimal 通常用 number 表示，单位是分
    quantity: number
    imgUrl: string
    createTime: string // Date 类型建议用字符串，方便处理 ISO 格式
    updateTime: string
}
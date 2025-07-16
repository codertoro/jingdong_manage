// utils/messageBox.ts
import { ElMessage, ElMessageBox } from 'element-plus'

export function openEmailPrompt(orderNo:string) {
    return ElMessageBox.prompt(`请输入订单号确认删除:${orderNo}`, 'Tip', {
        confirmButtonText: 'OK',
        cancelButtonText: 'Cancel',
        inputPattern:
            new RegExp(`^${orderNo}$`),
        inputErrorMessage: 'Invalid Email',
    })
        .then(({ value }) => {
            ElMessage({
                type: 'success',
                message: `Your email is: ${value}`,
            })
        })
        .catch(() => {
            ElMessage({
                type: 'info',
                message: 'Input canceled',
            })
        })
}
import { moneyUtil } from "@ynet/miniprogram-utils"
/**
 * 货币格式化
 * @param {string} value 值
 * @param {number} digits  保留小数后多少位，默认2
 * @param {boolean} autoFill 是否自动补位
 * @param {boolean} noRoundFlag  是否不四舍五入 默认四舍五入
 */
export let moneyFormat = {
    moneyFormat: function(value, digits, autoFill, noRoundFlag, addComma) {
        return moneyUtil.format(value, digits, autoFill, noRoundFlag, addComma)
    }
}
// 将格式化后的金额格式化回不带“，”的字符串
export let moneyParse = {
    moneyParse: function(value) {
        return moneyUtil.parse(value)
    }
}
// 大写货币金额
export let moneyToChinese = {
    moneyToChinese: function(value) {
        return moneyUtil.toChinese(value)
    }
}
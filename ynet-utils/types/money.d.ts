/**
 *  功能名称：金额操作类
 *  描述信息：
 */
export declare namespace moneyUtil {
    /**
     * 货币格式化
     * @param {string} value 值
     * @param {number} digits  保留小数后多少位，默认2
     * @param {boolean} autoFill 是否自动补位
     * @param {boolean} noRoundFlag  是否不四舍五入 默认四舍五入
     */
    function format(value: string, digits: number, autoFill?: boolean, noRoundFlag?: boolean, addComma?: boolean): string;
    /**
     * 将格式化后的金额格式化回不带“，”的字符串
     * @param value 值
     */
    function parse(value: string): string;
    /**
     * 大写货币金额
     * @param value 值
     */
    function toChinese(value: string): string;
}

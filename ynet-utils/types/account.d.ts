/**
 *  功能名称：账号处理类
 *  描述信息：掩码 格式化等
 */
export declare namespace accountUtil {
    /**
     * 电子账号加密处理 前4后4中间*处理
     * @param {string} value 值
     * @param {0|1} maskType 加密方式
     *      0：6位********4位
     *      1：****4位
     * @returns {string} 转换后的值
     */
    function mask(value: string, maskType?: 0 | 1): string;
    /**
     * 电子账号后几位取值
     * @param {string} value 值
     * @param {number} size 截取后几位自己选择，默认4位
     * @returns {string} 后几位值
     */
    function last(value: string, size?: number): string;
    /**
     * 账号格式化
     * @param {string} value 4位一空格，不加密
     * @returns {string} 格式化的值
     */
    function format(value: string): string;
    /**
     * 转换账号，去除格式化标记
     * @param value 值
     * @returns
     */
    function parse(value: string): string;
}

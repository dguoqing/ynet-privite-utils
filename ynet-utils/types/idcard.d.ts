/**
 *  功能名称：身份证相关工具类
 *  描述信息：
 */
export declare namespace idcardUtil {
    /**
     * 身份证掩盖，保留前6位 后4位
     * @param {string} value 值
     * @returns {string} 结果
     */
    function mask(value: string): string;
    /**
     * 校验格式是否是身份证
     * @param {string} value 值
     * @returns {boolean} 结果
     */
    function validate(value: string): boolean;
    /**
     * 身份证号格式化
     * @param {string} value 值
     * @returns 以3 4 4进行格式化的值
     */
    function format(value: string): string;
}

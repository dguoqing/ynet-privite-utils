/**
 *  功能名称：账号处理类
 *  描述信息：掩码 格式化等
 */

export namespace accountUtil {
    /**
     * 电子账号加密处理 前4后4中间*处理
     * @param {string} value 值
     * @param {0|1} maskType 加密方式
     *      0：6位********4位
     *      1：****4位
     * @returns {string} 转换后的值
     */
    export function mask(value: string, maskType: 0 | 1 = 0): string {
        value = (value || "").toString();
        switch (maskType) {
            case 0:
                return value.substring(0, 6) + " ******** " + value.substring(value.length - 4);
            case 1:
                return "**** " + value.substring(value.length - 4);
            default:
                return "";
        }
    }

    /**
     * 电子账号后几位取值
     * @param {string} value 值
     * @param {number} size 截取后几位自己选择，默认4位
     * @returns {string} 后几位值
     */
    export function last(value: string, size?: number): string {
        value = value || "";
        size = size || 4;
        return value.substr(value.length - size, size);
    }

    /**
     * 账号格式化
     * @param {string} value 4位一空格，不加密
     * @returns {string} 格式化的值
     */
    export function format(value: string): string {
        let result = [];
        value = (value || "").replace(new RegExp(/\s/g), "");
        if (value && value.length) {
            for (let i = 0; i < value.length; i += 4) {
                if (value.length < i + 4) {
                    result.push(value.substring(i));
                } else {
                    result.push(value.substring(i, i + 4));
                }
            }
        }
        return result.join(" ");
    }

    /**
     * 转换账号，去除格式化标记
     * @param value 值
     * @returns
     */
    export function parse(value: string): string {
        return value.replace(/\\s/g, "");
    }
}

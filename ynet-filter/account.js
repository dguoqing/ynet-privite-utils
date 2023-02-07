import { accountUtil } from "@ynet/miniprogram-utils";

/**
 * 电子账号加密处理 前4后4中间*处理
 * @param {string} value 值
 * @param {0|1} maskType 加密方式
 *      0：6位********4位
 *      1：****4位
 * @returns {string} 转换后的值
 */
export let accountMask = {
    accountMask: function(value, maskType) {
        return accountUtil.mask(value, maskType);
    }
};
/**
 * 电子账号后几位取值
 * @param {string} value 值
 * @param {number} size 截取后几位自己选择，默认4位
 * @returns {string} 后几位值
 */
export let accountLast = {
    accountLast: function(value, size) {
        return accountUtil.last(value, size);
    }
};
/**
 * 账号格式化
 * @param {string} value 4位一空格，不加密
 * @returns {string} 格式化的值
 */
export let accountFormat = {
    accountFormat: function(value) {
        return accountUtil.format(value);
    }
};

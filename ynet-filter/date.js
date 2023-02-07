import { dateUtil } from "@ynet/miniprogram-utils";
/**
 * 格式化日期
 * @param {string} value 时间值;
 * @param {string} inFormat  输入格式
 * @param {string} outFormat 输出格式
 */
export let dateFormat = {
    dateFormat: function(value, inFormat, outFormat) {
        return dateUtil.format(value, inFormat, outFormat);
    }
};

/**
 * 格式化时间
 * @param {string} value 时间值;
 * @param {string} inFormat  输入格式
 * @param {string} outFormat 输出格式
 */
export let timeFormat = {
    timeFormat: function(value, inFormat, outFormat) {
        return dateUtil.formatTime(value, inFormat, outFormat);
    }
};

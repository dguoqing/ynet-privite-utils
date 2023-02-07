/**
 *  功能名称：身份证相关工具类
 *  描述信息：
 */
export namespace idcardUtil {
    /**
     * 身份证掩盖，保留前6位 后4位
     * @param {string} value 值
     * @returns {string} 结果
     */
    export function mask(value: string): string {
        return value.substr(0, 6) + " ******** " + value.substr(value.length - 4);
    }

    /**
     * 校验格式是否是身份证
     * @param {string} value 值
     * @returns {boolean} 结果
     */
    export function validate(value: string): boolean {
        var clientRegex = /^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/;
        if (clientRegex.test(value)) {
            if (value.length == 18) {
                var idCardWi = new Array(7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2);
                var idCardY = new Array(1, 0, 10, 9, 8, 7, 6, 5, 4, 3, 2);
                var idCardWiSum = 0;
                for (var i = 0; i < 17; i++) {
                    idCardWiSum += parseInt(value.substring(i, i + 1)) * idCardWi[i];
                }
                var idCardMod = idCardWiSum % 11;
                var idCardLast = value.substring(17);
                if (idCardMod == 2) {
                    if (idCardLast != "X" && idCardLast != "x") {
                        return false;
                    }
                } else {
                    if (parseInt(idCardLast) != idCardY[idCardMod]) {
                        return false;
                    }
                }
            }
            return true;
        } else {
            return false;
        }
    }

    /**
     * 身份证号格式化
     * @param {string} value 值
     * @returns 以3 4 4进行格式化的值
     */
    export function format(value: string): string {
        value = value.replace(/\s/g, "");
        if (value) {
            let len = value.length;
            switch (true) {
                case len >= 18:
                    return value.replace(/(\d{6})(\d{8})([0-9|X|x]{4})/, "$1 $2 $3");
                case len > 14:
                    len = len - 14;
                    return value.replace(new RegExp("(\\d{6})(\\d{8})([0-9|X|x]{" + len + "})"), "$1 $2 $3");
                case len > 6:
                    len = len - 6;
                    return value.replace(new RegExp("(\\d{6})(\\d{" + len + "})"), "$1 $2");
                default:
                    return value;
            }
        } else {
            return value;
        }
    }
}

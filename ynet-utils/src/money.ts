/**
 *  功能名称：金额操作类
 *  描述信息：
 */
export namespace moneyUtil {
    /**
     * 货币格式化
     * @param {string} value 值
     * @param {number} digits  保留小数后多少位，默认2
     * @param {boolean} autoFill 是否自动补位
     * @param {boolean} noRoundFlag  是否不四舍五入 默认四舍五入
     */
    export function format(
        value: string,
        digits: number,
        autoFill: boolean = true,
        noRoundFlag: boolean = false,
        addComma: boolean = true
    ): string {
        if (value === undefined || value === null) return "";
        value = (value + "").replace(new RegExp(",", "g"), "");
        if (value.indexOf(".") === 0) value = "0" + value;
        let result = toDecimalString(value, addComma, digits === undefined ? 2 : digits, autoFill, noRoundFlag);
        if (value && result === "") {
            return "";
        }
        return result;
    }

    /**
     * 将格式化后的金额格式化回不带“，”的字符串
     * @param value 值
     */
    export function parse(value: string): string {
        value = value || "";
        return value.replace(new RegExp(",", "g"), "");
    }

    /**
     * 大写货币金额
     * @param value 值
     */
    export function toChinese(value: string): string {
        value = parse(value);
        let result = "";

        if (value.indexOf("-") === 0) {
            result += "负";
            value = value.substring(1);
        }

        if (isNaN(parseInt(value))) return result;
        let reg = /^[+-]?((\d{1,3}(\,\d{3})*)|\d*)?(\.\d*)?$/;

        if (reg.test(value)) {
            if (value == null || value == "") {
                return result;
            }
            let noCommaCash = toDecimalString(value);

            let dotIndex = noCommaCash.indexOf(".");
            let integer, decimal;
            if (dotIndex == -1) {
                integer = noCommaCash;
                decimal = "00";
            } else {
                integer = noCommaCash.substring(0, dotIndex);
                decimal = noCommaCash.substring(dotIndex + 1);
            }

            if (integer == "0") {
                if (decimal == "00") {
                    result = moneyNums[0] + moneyShowname[2] + moneyPostfix;
                } else {
                    result = _convertDecimalToChineseCash(decimal);
                }

                if (result.charAt(0) === "零" && value != "0" && value != "0.00") {
                    result = result.substring(1);
                }
                return result;
            } else {
                result += _convertIntegerToChineseCash(integer);
                result += _convertDecimalToChineseCash(decimal);
                return result;
            }
        } else {
            return result;
        }
    }

    /**
     * 转换数值并格式化
     * @param value  值
     * @param addComma  是否加逗号分割
     * @param digits  保留小数后多少位，默认2
     * @param noRoundFlag  是否不四舍五入 默认四舍五入
     */
    function toDecimalString(
        value: string | number,
        addComma: boolean = false,
        digits: number = 2,
        autoFill: Boolean = true,
        noRoundFlag: boolean = false
    ): string {
        let str = "" + value;
        //默认保留两位
        if (digits === undefined) {
            digits = 2;
        }
        if (str.length == 0) str = "";
        str = str.replace(/\,/g, "");
        let reg = /^[+-]?((\d{1,3}(\,\d{3})*)|\d*)?(\.\d*)?$/;

        if (reg.test(str)) {
            if (str.trim() == "") return "";
            //解析符号、整数部分和小数部分
            let sign = str.charAt(0);
            if (sign == "+" || sign == "-") {
                str = str.substring(1);
            } else {
                sign = "";
            }
            let pointPos = str.indexOf(".");
            let integer = str;
            let decimal = "";
            if (pointPos >= 0) {
                integer = str.substring(0, pointPos);
                decimal = str.substring(pointPos + 1);
            }
            while (integer.charAt(0) == "0") {
                integer = integer.substring(1);
            }
            if (!(typeof digits == "number") && digits >= 0 && (pointPos < 0 || pointPos + 1 == str.length)) {
                digits = 0;
            }
            if (integer.length == 0) integer = "0";

            //小数和四舍五入
            if (digits && typeof digits == "number" && digits >= 0) {
                if (autoFill) {
                    while (decimal.length < digits) {
                        decimal += "0";
                    }
                }
                let nextNumber = decimal.charAt(digits);
                decimal = decimal.substr(0, digits);
                if (!noRoundFlag && parseInt(nextNumber) >= 5) {
                    let tmp = Math.pow(10, digits);
                    let newValue = (sign ? sign : "") + (parseInt(integer, 10) * tmp + parseInt(decimal, 10) + 1) / tmp;
                    return toDecimalString(newValue, addComma, digits, autoFill, noRoundFlag);
                }
            }
            //加逗号
            if (addComma) {
                let sb = "";
                for (let i = 0, len = integer.length; i < len; i++) {
                    sb += integer.charAt(i);
                    if ((i + 1) % 3 == len % 3 && i + 1 != len) {
                        sb += ",";
                    }
                }
                integer = sb;
            }
            //拼合
            let res = "";
            if (sign) res += sign;
            res += integer;
            if (decimal) res += "." + decimal;
            return res;
        } else {
            return "";
        }
    }

    //#region 大写转换
    /**
     * 小数部分转化为汉字金额
     * @param cash
     */
    function _convertDecimalToChineseCash(cash: string): string {
        let returnCash = "";
        if (cash == "00") {
            returnCash = moneyPostfix;
        } else if (cash.charAt(1) == "0") {
            let intValue = parseInt(cash.charAt(0));
            returnCash = moneyNums[intValue] + moneyShowname[1] + moneyPostfix;
        } else {
            for (let i = 0; i < cash.length; i++) {
                if (i >= 2) {
                    break;
                }
                let intValue = parseInt(cash.charAt(i));
                switch (i) {
                    case 0: {
                        if (intValue != 0) {
                            returnCash += moneyNums[intValue] + moneyShowname[1];
                        } else {
                            returnCash += moneyNums[intValue];
                        }
                        break;
                    }
                    case 1: {
                        if (intValue != 0) {
                            returnCash += moneyNums[intValue] + moneyShowname[0];
                        }
                        break;
                    }
                    default:
                        break;
                }
            }
        }
        return returnCash;
    }
    /**
     * 整数部分转化为汉字金额
     * @param cash
     */
    function _convertIntegerToChineseCash(cash: string): string {
        if (cash == "0") return "";
        //		return LUI_format.moneyNums[0]+LUI_format.moneyShowname[2];
        let S = ""; //返回值
        let p = 0; //字符位置指针
        let m = cash.length % 4; //取模

        // 四位一组得到组数
        let k = m > 0 ? Math.floor(cash.length / 4) + 1 : Math.floor(cash.length / 4);
        // 外层循环在所有组中循环
        // 从左到右 高位到低位 四位一组 逐组处理
        // 每组最后加上一个单位: "[万亿]","[亿]","[万]"
        for (let i = k; i > 0; i--) {
            let L = 4;
            if (i == k && m != 0) {
                L = m;
            }
            // 得到一组四位数 最高位组有可能不足四位
            let s = cash.substring(p, p + L);
            let l = s.length;

            // 内层循环在该组中的每一位数上循环 从左到右 高位到低位
            for (let j = 0; j < l; j++) {
                let n = parseInt(s.substring(j, j + 1));
                if (n == 0) {
                    if (
                        j < l - 1 &&
                        parseInt(s.substring(j + 1, j + 1 + 1)) > 0 && //后一位(右低)
                        S.substring(S.length - 1, S.length) != moneyNums[n]
                    ) {
                        S += moneyNums[n];
                    }
                } else {
                    //处理 1013 一千零"十三", 1113 一千一百"一十三"
                    //if (!(n == 1 && (S.substring(S.length-1,S.length) == LUI_format.moneyNums[0] | S.length == 0) && j == l - 2))
                    // {

                    S += moneyNums[n];
                    //}
                    S += moneyDigits[l - j - 1];
                }
            }
            p += L;
            // 每组最后加上一个单位: [万],[亿] 等
            if (i < k) {
                //不是最高位的一组
                if (parseInt(s) != 0) {
                    //如果所有 4 位不全是 0 则加上单位 [万],[亿] 等
                    S += moneyBigunits[i - 1];
                }
            } else {
                //处理最高位的一组,最后必须加上单位
                S += moneyBigunits[i - 1];
            }
        }
        return S + moneyShowname[2];
    }
    //大写金额
    const moneyNums: Array<string> = ["零", "壹", "贰", "叁", "肆", "伍", "陆", "柒", "捌", "玖"];
    const moneyDigits: Array<string> = ["", "拾", "佰", "仟"];
    const moneyBigunits: Array<string> = ["", "万", "亿", "万亿", "仟兆"];
    const moneyShowname: Array<string> = ["分", "角", "元"];
    const moneyPostfix: string = "整";
    //#endregion
}

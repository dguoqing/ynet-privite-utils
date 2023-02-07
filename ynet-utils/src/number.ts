import numPrecision from "number-precision";

export namespace numberUtil {
    /**
     * 加法
     * @param num1
     * @param num2
     * @returns
     */
    export function plus(num1: number, num2: number) {
        return numPrecision.plus(num1, num2);
    }
    /**
     *  减法
     * @param num1
     * @param num2
     * @returns
     */
    export function minus(num1: number, num2: number) {
        return numPrecision.minus(num1, num2);
    }
    /**
     * 乘法
     * @param num1
     * @param num2
     * @returns
     */
    export function times(num1: number, num2: number) {
        return numPrecision.times(num1, num2);
    }
    /**
     * 除法
     * @param num1
     * @param num2
     * @returns
     */
    export function divide(num1: number, num2: number) {
        return numPrecision.divide(num1, num2);
    }
    /**
     * 四舍五入
     * @param num
     * @param ratio 保留几位小数
     * @returns
     */
    export function round(num: number, ratio: number) {
        return numPrecision.round(num, ratio);
    }
    /**
     * 小数位补足0
     * @param number
     * @param bitNum 补位个数
     * @returns
     */
    export function decimalComplementZero(number: string, bitNum: number) {
        var f_x = parseFloat(number);
        if (isNaN(f_x)) {
            return 0;
        }
        var s_x = number.toString();
        var pos_decimal = s_x.indexOf(".");
        if (pos_decimal < 0) {
            pos_decimal = s_x.length;
            s_x += ".";
        }
        while (s_x.length <= pos_decimal + bitNum) {
            s_x += "0";
        }
        return s_x;
    }
}

export declare namespace numberUtil {
    /**
     * 加法
     * @param num1
     * @param num2
     * @returns
     */
    function plus(num1: number, num2: number): number;
    /**
     *  减法
     * @param num1
     * @param num2
     * @returns
     */
    function minus(num1: number, num2: number): number;
    /**
     * 乘法
     * @param num1
     * @param num2
     * @returns
     */
    function times(num1: number, num2: number): number;
    /**
     * 除法
     * @param num1
     * @param num2
     * @returns
     */
    function divide(num1: number, num2: number): number;
    /**
     * 四舍五入
     * @param num
     * @param ratio 保留几位小数
     * @returns
     */
    function round(num: number, ratio: number): number;
    /**
     * 小数位补足0
     * @param number
     * @param bitNum 补位个数
     * @returns
     */
    function decimalComplementZero(number: string, bitNum: number): string | 0;
}

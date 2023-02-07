import { ManipulateType, UnitType } from "dayjs";
/**
 *  作者：张传辉
 *  日期：2020年6月1日
 *  功能名称：日期处理类
 *  描述信息：
 */
export declare namespace dateUtil {
    /**
     * 格式化日期
     * @param {string} value 时间值;
     * @param {string} inFormat  输入格式
     * @param {string} outFormat 输出格式
     */
    function format(value: string, inFormat: string, outFormat?: string): string;
    /**
     * 格式化时间
     * @param value 时间值
     * @param inFormat 输入格式
     * @param outFormat 输出格式
     * @returns
     */
    function formatTime(value: string, inFormat?: string, outFormat?: string): string;
    /**
     * 将字符串转换为Date
     * @param value
     * @param inFormat
     */
    function parse(value: string, inFormat?: string): Date;
    /**
     * 获取一个月多少天
     * @param value 要求YYYYMM
     */
    function getDaysInMonth(value: string): any;
    /**
     * 时间区间判断
     * @param start 开始时间
     * @param end 结束时间
     * @param value 差值时间
     * @param type 差值类型 M
     * @param format 格式化 默认 YYYYMMDD
     *
     */
    function checkDateRange(start: string, end: string, value: number, type?: ManipulateType, format?: string): boolean;
    /**
     * 计算返回两个时间差值
     * @param start 开始时间
     * @param end 结束时间
     * @param type 差值类型默认为月
     * 返回值为number类型
     */
    function getDayDiff(start: string, end: string, type?: UnitType, format?: string): number;
    /**
     * 加日期
     * @param {string} start  开始时间
     * @param {string} value  差值
     * @param {DurationInputArg2} type 差值类型
     * @param {string} inFormat 输入格式 默认YYYYMMDD
     * @param {string} outFormat 输出格式 默认为输入格式
     */
    function add(start: string, value: number, type: ManipulateType, inFormat?: string, outFormat?: string): string;
    /**
     * 减日期
     * @param {string} start 开始时间
     * @param {string} value 差值
     * @param {DurationInputArg2} type  差值类型
     * @param {string} inFormat 输入格式 默认YYYYMMDD
     * @param {string} outFormat 输出格式 默认为输入格式
     */
    function subtractDate(start: string, value: number, type: ManipulateType, inFormat?: string, outFormat?: string): string;
    /**
     * 当前北京时间
     * @param {string} outFormat 输出格式 默认："YYYYMMDD"
     */
    function now(format?: string): string;
    /**
     * 获取当前日期所在周的所有值，从周一开始
     * @param value 值
     * @param format 传入格式
     * @param outFormat 传出格式
     */
    function getWeekDates(value: string, format: string, outFormat?: string): string[];
    /**
     * 判断当前是否是工作日
     * @param value 值
     * @param format 格式
     */
    function checkWorkDay(value: string, dateformat?: string): Boolean;
}

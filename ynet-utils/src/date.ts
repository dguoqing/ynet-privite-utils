import dayjs, { ManipulateType, UnitType } from "dayjs";

/**
 *  作者：张传辉
 *  日期：2020年6月1日
 *  功能名称：日期处理类
 *  描述信息：
 */
export namespace dateUtil {
    /**
     * 格式化日期
     * @param {string} value 时间值;
     * @param {string} inFormat  输入格式
     * @param {string} outFormat 输出格式
     */
    export function format(value: string, inFormat: string, outFormat: string = "YYYYMMDD"): string {
        return dayjs(value, inFormat).format(outFormat);
    }

    /**
     * 格式化时间
     * @param value 时间值
     * @param inFormat 输入格式
     * @param outFormat 输出格式
     * @returns
     */
    export function formatTime(value: string, inFormat: string = "HHmmss", outFormat: string = "HH:mm:ss") {
        return dayjs("00000000" + value, "YYYYMMDD" + inFormat).format(outFormat);
    }

    /**
     * 将字符串转换为Date
     * @param value
     * @param inFormat
     */
    export function parse(value: string, inFormat: string = "YYYYMMDD"): Date {
        return dayjs(value, inFormat).toDate();
    }

    /**
     * 获取一个月多少天
     * @param value 要求YYYYMM
     */
    export function getDaysInMonth(value: string): any {
        return dayjs(value, "YYYYMM").daysInMonth();
    }

    /**
     * 时间区间判断
     * @param start 开始时间
     * @param end 结束时间
     * @param value 差值时间
     * @param type 差值类型 M
     * @param format 格式化 默认 YYYYMMDD
     *
     */
    export function checkDateRange(
        start: string,
        end: string,
        value: number,
        type: ManipulateType = "M",
        format: string = "YYYYMMDD"
    ): boolean {
        if (start && end) {
            let endValue = dayjs(end, format);
            // end减去value的值后与start作比较，应对月末的情况
            let startValue = endValue.subtract(value, type).format(format);

            if (startValue <= start) {
                return true;
            }
        }
        return false;
    }

    /**
     * 计算返回两个时间差值
     * @param start 开始时间
     * @param end 结束时间
     * @param type 差值类型默认为月
     * 返回值为number类型
     */
    export function getDayDiff(start: string, end: string, type: UnitType = "M", format: string = "YYYYMMDD"): number {
        return dayjs(start, format).diff(dayjs(end, format), type);
    }

    /**
     * 加日期
     * @param {string} start  开始时间
     * @param {string} value  差值
     * @param {DurationInputArg2} type 差值类型
     * @param {string} inFormat 输入格式 默认YYYYMMDD
     * @param {string} outFormat 输出格式 默认为输入格式
     */
    export function add(
        start: string,
        value: number,
        type: ManipulateType,
        inFormat: string = "YYYYMMDD",
        outFormat: string = "YYYYMMDD"
    ): string {
        let startMoment = dayjs(start, inFormat);
        return startMoment.add(value, type).format(outFormat);
    }
    /**
     * 减日期
     * @param {string} start 开始时间
     * @param {string} value 差值
     * @param {DurationInputArg2} type  差值类型
     * @param {string} inFormat 输入格式 默认YYYYMMDD
     * @param {string} outFormat 输出格式 默认为输入格式
     */
    export function subtractDate(
        start: string,
        value: number,
        type: ManipulateType,
        inFormat: string = "YYYYMMDD",
        outFormat: string = "YYYYMMDD"
    ): string {
        let startMoment = dayjs(start, inFormat);
        return startMoment.subtract(value, type).format(outFormat);
    }
    /**
     * 当前北京时间
     * @param {string} outFormat 输出格式 默认："YYYYMMDD"
     */
    export function now(format: string = "YYYYMMDD"): string {
        return dayjs().format(format);
    }

    /**
     * 获取当前日期所在周的所有值，从周一开始
     * @param value 值
     * @param format 传入格式
     * @param outFormat 传出格式
     */
    export function getWeekDates(value: string, format: string, outFormat: string = "YYYYMMDD") {
        let date = parse(value, format);

        let today = date.getDay(); //周几
        let year = date.getFullYear(); // 2020
        let month = date.getMonth(); // 0-11
        let day = date.getDate(); // 1-31

        let week = [];
        for (let i = 0; i < 7; i++) {
            let flag = day + i - today;
            week.push(dayjs(new Date(year, month, flag)).format(outFormat));
        }
        return week;
    }

    /**
     * 判断当前是否是工作日
     * @param value 值
     * @param format 格式
     */
    export function checkWorkDay(value: string, dateformat: string = "YYYYMMDD"): Boolean {
        let day = format(value, dateformat, "DD");

        return day === "00" || day === "06";
    }
}

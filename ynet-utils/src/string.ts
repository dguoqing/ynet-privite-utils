/**
 *  功能名称：字符串操作
 *  描述信息：
 */
export namespace stringUtil {
    /**
     * 判断字符串是否为空
     * @param {*} value 值
     */
    export function isStrEmpty(value: any): boolean {
        return value === undefined || value === "" || value === null;
    }

    /**
     * 字符串长度（汉字2字符）
     * @param value
     */
    export function charLength(value: string): number {
        //一个汉字对应2个字符
        let len = 0;
        for (let i = 0; i < value.length; i++) {
            if (value.charCodeAt(i) > 127 || value.charCodeAt(i) == 94) {
                len += 2;
            } else {
                len += 1;
            }
        }
        return len;
    }
}

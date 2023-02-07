/**
 *  作者：张传辉
 *  日期：2020年6月1日
 *  功能名称：ID生成类
 *  描述信息：
 */
export namespace idsUtil {
    let _guidNum: number = 0;

    export function guid(): string {
        return "guid_" + _guidNum++ + new Date().getTime() + Math.ceil(Math.random() * 1000);
    }

    export function random(length: number = 32): string {
        let result: Array<string> = [];

        let keys = [
            "0",
            "1",
            "2",
            "3",
            "4",
            "5",
            "6",
            "7",
            "8",
            "9",
            "a",
            "b",
            "c",
            "d",
            "e",
            "f",
            "g",
            "h",
            "i",
            "j",
            "k",
            "l",
            "m",
            "n",
            "o",
            "p",
            "q",
            "r",
            "s",
            "t",
            "u",
            "v",
            "w",
            "x",
            "y",
            "z"
        ];

        for (let i = 0; i < length; i++) {
            let pos = Math.round(Math.random() * (keys.length - 1));

            result.push(keys[pos]);
        }

        return result.join("");
    }
}

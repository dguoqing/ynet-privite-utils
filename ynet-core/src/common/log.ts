/**
 * 日志
 */
export namespace Log {
    /**
     * info日志
     * @param  tagName 标记
     * @param  content 内容
     */
    export function info(tagName: string, content: string): void {
        writeLog("info", tagName, content);
    }

    /**
     * 警告日志
     * @param tagName 标记
     * @param content 内容
     */
    export function warn(tagName: string, content: string): void {
        writeLog("warn", tagName, content);
    }

    /**
     * 错误日志
     * @param tagName 标记
     * @param content 内容
     * @param err 错误（可选）
     */
    export function error(tagName: string, content: string, err?: Error): void {
        writeLog("error", tagName, content, err);
    }

    function writeLog(type: string, tagName: string, content: string, err?: Error): void {
        if (checkLogLeve(type)) {
            switch (type) {
                case "info":
                    console.info(`${getTimer()} --- ${tagName} --- ${content}`);
                    break;
                case "warn":
                    console.warn(`${getTimer()} --- ${tagName} --- ${content}`);
                    break;
                case "error":
                    console.error(`${getTimer()} --- ${tagName} --- ${content}`, err || "");
                    break;
            }
        }
    }

    function checkLogLeve(tag: string): boolean {
        let logLeve = ynet_process_loglevel || "";
        let logs: Array<string> = logLeve.split(",");

        return logs.indexOf("all") > -1 || logs.indexOf(tag) > -1;
    }

    //时间戳
    function getTimer(): string {
        let date = new Date();
        function supplyZero(value: number, diffCount: number = 2): string {
            let strValue = value.toString();
            let lengthValue = strValue.length;
            if (strValue.length < diffCount) {
                for (let i = 0; i < diffCount - lengthValue; i++) {
                    strValue = "0" + strValue;
                }
            }
            return strValue;
        }

        return (
            supplyZero(date.getHours()) +
            ":" +
            supplyZero(date.getMinutes()) +
            ":" +
            supplyZero(date.getSeconds()) +
            ":" +
            supplyZero(date.getMilliseconds(), 3)
        );
    }

    declare const ynet_process_loglevel: any;
}

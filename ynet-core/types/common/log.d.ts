/**
 * 日志
 */
export declare namespace Log {
    /**
     * info日志
     * @param  tagName 标记
     * @param  content 内容
     */
    function info(tagName: string, content: string): void;
    /**
     * 警告日志
     * @param tagName 标记
     * @param content 内容
     */
    function warn(tagName: string, content: string): void;
    /**
     * 错误日志
     * @param tagName 标记
     * @param content 内容
     * @param err 错误（可选）
     */
    function error(tagName: string, content: string, err?: Error): void;
}

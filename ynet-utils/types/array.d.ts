/**
 *  功能名称：数组处理类
 *  描述信息：
 */
export declare namespace arrayUtil {
    /**
     * 从列表中移除某一项
     * @param {Array} list 数据源
     * @param {Any|Function} value  值；若为Function 则根据true/false作为依据
     * @returns {Array} 处理后的数组
     */
    function without<T>(arr: Array<T>, filter: ((item: T) => boolean) | T): Array<T>;
}

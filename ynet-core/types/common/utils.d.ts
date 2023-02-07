export declare namespace arrayUtils {
    /**
     * 排除数组某一项
     * @param arr 数组
     * @param filter 筛选条件
     * @returns
     */
    function without<T>(arr: Array<T>, filter: ((item: T) => boolean) | T): Array<T>;
}

export namespace arrayUtils {
    /**
     * 排除数组某一项
     * @param arr 数组
     * @param filter 筛选条件
     * @returns
     */
    export function without<T>(arr: Array<T>, filter: ((item: T) => boolean) | T): Array<T> {
        if (typeof filter === "function") {
            arr.splice(
                arr.findIndex((item: T) => (<Function>filter)(item)),
                1
            );
        } else {
            arr.splice(arr.indexOf(filter), 1);
        }
        return arr;
    }
}

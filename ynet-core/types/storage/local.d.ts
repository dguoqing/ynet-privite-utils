export declare const STORAGELOCALINJECTTAGNAME = "YNET_STORAGE_LOCAL";
/**
 * 持久化缓存类
 * @class Local
 */
export declare class Local {
    private tagName;
    private local?;
    /**
     * 构造函数
     * @param {string} tagName 标识库名称
     */
    constructor(tagName: string);
    /**
     * 设置缓存
     * @param {string} key 缓存名称 sting类型
     * @param {string} value 缓存数据 任意类型
     * @return: void
     */
    set(key: string, value: string): void;
    /**
     * 获取缓存
     * @param {string} key 缓存名称 string类型
     * @param {boolean} remove 在获取后是否立即清除 Boolean
     * @return: 返回对应key值的数据 类型为any
     */
    get(key: string, remove?: boolean): string | null;
    /**
     * 移除缓存
     * @param {string} key
     * @return: void
     */
    remove(key: string): void;
    /**
     * 清理tagname表示库里全部缓存
     * @param {type}
     * @return: void
     */
    clear(): void;
}
export declare abstract class ILocal {
    abstract clear(tagName: string): void;
    abstract get(tagName: string, key: string): string | null;
    abstract set(tagName: string, key: string, value: string): void;
    abstract remove(tagName: string, key: string): void;
}

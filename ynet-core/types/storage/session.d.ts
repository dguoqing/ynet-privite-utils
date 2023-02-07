export declare const STORAGESESSIONINJECTTAGNAME = "YNET_STORAGE_SESSION";
export declare class Session {
    private tagName;
    private session?;
    constructor(tagName: string);
    /**
     * 获取缓存
     * @param {string} key
     * @return {any}
     */
    get(key: string, remove?: boolean): any;
    /**
     *设置会话级缓存
     * @param {string} 缓存名称
     * @param {any} 缓存数据
     * @param {number} 缓存时效
     * @returns {void}
     */
    set(key: string, value: any, timer?: number): void;
    /**
     * 移除缓存
     * @param {string} key 缓存名称
     * @returns void
     */
    remove(key: string): void;
    /**
     * 清理全部缓存
     * @param {type}
     * @return: void
     */
    clear(): void;
}
/**
 * 会话级缓存数据类型接口
 */
export declare type SessionItem = {
    timer?: number;
    updateTimer: number;
    value: any;
    key: string;
    source?: string;
};
/**
 * 对方开放实现类注入
 */
export declare abstract class ISession {
    abstract set(tagName: string, key: string, value: SessionItem): void;
    abstract get(tagName: string, key: string, remove?: boolean): SessionItem | undefined;
    abstract remove(tagName: string, key: string): void;
    abstract clear(tagName: string): void;
}

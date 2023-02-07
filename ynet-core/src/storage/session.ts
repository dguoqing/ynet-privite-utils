import { IContainer } from "../common/ioc";

export const STORAGESESSIONINJECTTAGNAME = "YNET_STORAGE_SESSION";

export class Session {
    private session?: ISession = IContainer.get(STORAGESESSIONINJECTTAGNAME);

    constructor(private tagName: string) {}

    /**
     * 获取缓存
     * @param {string} key
     * @return {any}
     */
    public get(key: string, remove?: boolean): any {
        //设置时传入表示库名称
        let sItem = this.session?.get(this.tagName, key, remove);

        if (sItem && sItem.timer && new Date().getTime() - sItem.updateTimer > sItem.timer) {
            this.remove(key);
            return undefined;
        }
        return sItem?.value;
    }
    /**
     *设置会话级缓存
     * @param {string} 缓存名称
     * @param {any} 缓存数据
     * @param {number} 缓存时效
     * @returns {void}
     */
    public set(key: string, value: any, timer?: number): void {
        this.session?.set(this.tagName, key, {
            timer: timer,
            updateTimer: new Date().getTime(),
            value: value,
            key: key
        });
    }

    /**
     * 移除缓存
     * @param {string} key 缓存名称
     * @returns void
     */
    public remove(key: string): void {
        this.session?.remove(this.tagName, key);
    }
    /**
     * 清理全部缓存
     * @param {type}
     * @return: void
     */
    public clear(): void {
        this.session?.clear(this.tagName);
    }
}

/**
 * 会话级缓存数据类型接口
 */
export type SessionItem = {
    timer?: number;
    updateTimer: number;
    value: any;
    key: string;
    source?: string;
};

/**
 * 对方开放实现类注入
 */
export abstract class ISession {
    abstract set(tagName: string, key: string, value: SessionItem): void;
    abstract get(tagName: string, key: string, remove?: boolean): SessionItem | undefined;
    abstract remove(tagName: string, key: string): void;
    abstract clear(tagName: string): void;
}

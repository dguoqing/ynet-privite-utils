import { IContainer } from "../common/ioc";

export const STORAGELOCALINJECTTAGNAME = "YNET_STORAGE_LOCAL";

/**
 * 持久化缓存类
 * @class Local
 */
export class Local {
    private local?: ILocal = IContainer.get(STORAGELOCALINJECTTAGNAME);

    /**
     * 构造函数
     * @param {string} tagName 标识库名称
     */
    constructor(private tagName: string) {}

    /**
     * 设置缓存
     * @param {string} key 缓存名称 sting类型
     * @param {string} value 缓存数据 任意类型
     * @return: void
     */
    public set(key: string, value: string): void {
        this.local?.set(this.tagName, key, value);
    }

    /**
     * 获取缓存
     * @param {string} key 缓存名称 string类型
     * @param {boolean} remove 在获取后是否立即清除 Boolean
     * @return: 返回对应key值的数据 类型为any
     */
    public get(key: string, remove?: boolean): string | null {
        let result = this.local?.get(this.tagName, key);

        if (result && remove) {
            this.remove(key);
        }

        return <any>result;
    }

    /**
     * 移除缓存
     * @param {string} key
     * @return: void
     */
    public remove(key: string): void {
        this.local?.remove(this.tagName, key);
    }

    /**
     * 清理tagname表示库里全部缓存
     * @param {type}
     * @return: void
     */

    public clear(): void {
        this.local?.clear(this.tagName);
    }
}

//对外开放实现类注入
export abstract class ILocal {
    abstract clear(tagName: string): void;
    abstract get(tagName: string, key: string): string | null;
    abstract set(tagName: string, key: string, value: string): void;
    abstract remove(tagName: string, key: string): void;
}

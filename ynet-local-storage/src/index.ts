import { ILocal } from "@ynet/miniprogram-core";

export class LocalStorage extends ILocal {
    public clear(tagName: string): void {
        uni.clearStorageSync();
    }
    public get(tagName: string, key: string): string | null {
        return uni.getStorageSync(this.getId(tagName, key));
    }
    public set(tagName: string, key: string, value: string): void {
        uni.setStorageSync(this.getId(tagName, key), value);
    }
    public remove(tagName: string, key: string): void {
        uni.removeStorageSync(this.getId(tagName, key));
    }

    private getId(tagName: string, key: string) {
        return `${tagName}$${key}`;
    }
}

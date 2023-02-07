import { ISession, SessionItem } from "@ynet/miniprogram-core";

export class SessionGlobal extends ISession {
    public set(tagName: string, key: string, value: SessionItem): void {
        (<any>getApp().globalData)[this.getId(tagName, key)] = value;
    }

    public get(tagName: string, key: string, remove?: boolean): SessionItem | undefined {
        let result = getApp().globalData?.[this.getId(tagName, key)];

        if (remove) {
            this.remove(tagName, key);
        }
        return result;
    }

    public remove(tagName: string, key: string): void {
        delete getApp().globalData?.[this.getId(tagName, key)];
    }

    public clear(tagName: string): void {
        getApp().globalData = {};
    }

    private getId(tagName: string, key: string) {
        return `${tagName}$${key}`;
    }
}

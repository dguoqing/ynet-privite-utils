import { ISession, SessionItem } from "@ynet/miniprogram-core";
export declare class SessionGlobal extends ISession {
    set(tagName: string, key: string, value: SessionItem): void;
    get(tagName: string, key: string, remove?: boolean): SessionItem | undefined;
    remove(tagName: string, key: string): void;
    clear(tagName: string): void;
    private getId;
}

import { ILocal } from "@ynet/miniprogram-core";
export declare class LocalStorage extends ILocal {
    clear(tagName: string): void;
    get(tagName: string, key: string): string | null;
    set(tagName: string, key: string, value: string): void;
    remove(tagName: string, key: string): void;
    private getId;
}

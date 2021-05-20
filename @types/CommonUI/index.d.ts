declare module 'CommonUI' {
    export interface Iiscrolls {
        cash: IJqMap | null;
        num: number;
        init(target: string, option: IObj): void;
        resize(): void;
    }
    export interface IJqMap {
        map: IObj | null;
        put<T>(key:string | number, value: T): void;
        get<T>(key:string | number): T;
        containsKey(key:string | number): boolean;
        clear(): void;
        remove(key:string | number): void;
        keys(): (string | number)[];
        values(): any[];
        size(): number;
    }

    /*type*/
    export type SwiperParam = string | HTMLElement;
    export type slideSortParam = 'slick' | 'swiper';
    
}


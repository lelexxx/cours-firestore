
export default interface GenericStorage<Type> {
    getAll(): Promise<Type[]>;

    get(id: number): Promise<Type | null>;

    update(item: Type): Promise<Type>;

    add(item: Type): Promise<Type>;

    clear(id: number | null): Promise<void>;
}
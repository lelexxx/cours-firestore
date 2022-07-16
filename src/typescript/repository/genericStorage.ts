
export default interface GenericStorage<Type> {
    getAll(): Promise<Type[]>;

    get(id: number): Promise<Type | null>;

    addOrUpdate(item: Type): Promise<Type>;

    update(item: Type): Promise<Type>;

    add(item: Type): Promise<Type>;
}
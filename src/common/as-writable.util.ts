type Writeable<T> = { -readonly [P in keyof T]: T[P] };

export const asWritable = <T>(obj: T): Writeable<T> => obj;
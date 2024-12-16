// let's imagine this file is autogenerated from the backend
// ideally, we want to keep these api related types in sync
// with the backend instead of manually writing them out

export type BaseEntity = {
  id: string;
  createdAt: number;
};

export type Entity<T> = {
  [K in keyof T]: T[K];
} & BaseEntity;

export type User = Entity<{
  id: string;
  name: string;
  email: string;
  role: 'ADMIN' | 'USER';
}>;

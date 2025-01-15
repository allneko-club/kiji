/**
 * keyOfのvalueバージョン。与えられたオブジェクトのvalueのユニオン型を作成
 */
export type valueOf<T> = T[keyof T];


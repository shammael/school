export type StringOptions = {
  contains?: string;
  endsWith?: string;
  equals?: string;
  gt?: string;
  gte?: string;
  in?: string[];
  lt?: string;
  lte?: string;
  mode?: 'insensitive' | 'default';
  not?: string;
  notIn?: string[];
  startsWith?: string;
};

export type NumberOptions = {
  equals?: number;
  in?: number[];
  not?: number;
  notIn?: number[];
  lt?: number;
  lte?: number;
  gt?: number;
  gte?: number;
};

export type EnumOptions<T = any> = {
  equals?: T;
  in?: T[];
  not?: T;
  notIn?: T[];
};

export type DateOptions = {
  notIn?: Date[];
  equals?: Date;
  not?: Date;
  in?: Date[];
  lte?: Date;
  gt?: Date;
  gte?: Date;
  lt?: Date;
};

export type UUIDOptions = {
  equals?: string;
  in?: string[];
  not?: string;
  notIn?: string[];
};

export type BooleanOptions = {
  equals?: boolean;
  in?: boolean[];
  not?: boolean;
  notIn?: boolean[];
};

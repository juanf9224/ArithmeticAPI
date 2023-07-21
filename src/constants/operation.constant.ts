export enum OperationType {
    ADDITION = 'addition',
    SUBSTRACTION = 'substraction',
    MULTIPLICATION = 'multiplication',
    DIVISION = 'division',
    SQUARE_ROOT = 'square_root',
    RANDOM_STRING = 'random_string',
}

export interface OperationData<T> {
    valueA: T;
    valueB?: T;
}

type WithRequiredProperty<T, K extends keyof T> = T & {
    [Property in K]-?: T[Property];
};

export interface MathOperation extends WithRequiredProperty<OperationData<number>, 'valueB'> {}
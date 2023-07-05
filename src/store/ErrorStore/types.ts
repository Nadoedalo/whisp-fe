export interface IError {
    errorType: 'primary' | 'secondary' | 'success',
    errorText: string;
    id?: string;
}
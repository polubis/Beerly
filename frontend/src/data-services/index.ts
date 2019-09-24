export class EnhancedData<T> {
  constructor(public data: T, public isLoading = true, public error = '') {}
}

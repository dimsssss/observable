/**
 * Observable은 항목들을 배출하거나 observable의 메서드 호출을 통해 옵저버에게 알림을 보낸다.
 * 자세한 내용은 {@link https://reactivex.io/documentation/ko/observable.html}
 * 
 * @param {Function} execute 
 */
export default function Observable(execute) {
    this._execute = execute
}

Observable.prototype.subscribe = function(subscriber) {
    return this._execute(subscriber)
}

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
    return this._execute(new Subscribe(subscriber))
}

function Subscribe(observableSpec) {
    this._isCompleted = false
    this._isError = false
    this._observableSpec = observableSpec
}

Subscribe.prototype.onNext = function(value) {
    if (this._isCompleted) {
        return
    }
    return this._observableSpec.onNext(value)
}

Subscribe.prototype.onError = function(error) {
    this._isError = true
    this._observableSpec.onError(error)
    throw new Error()
}

Subscribe.prototype.onCompleted = function(value) {
    this._isCompleted = true
    return this._observableSpec.onCompleted(value)
}

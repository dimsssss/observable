import Observable from "../observable.js"

describe('Observable 테스트', function() {
    it('subscribe를 실행하면 sum은 20이 되어야 한다', async function() {
        let sum = 0

        const observable = new Observable((subscriber) => {
            sum += subscriber.onNext(1)
            sum += subscriber.onNext(2)
            sum += subscriber.onNext(3)

            return new Promise((resolve) => {
                setTimeout(() => {
                    sum += subscriber.onNext(4)
                    sum = subscriber.onCompleted(sum)
                    resolve(sum)
                }, 1000);
            })
            
        })

        const result = await observable.subscribe({ onNext: (x) => x, onCompleted: (x) => x * 2 })
        expect(result).toEqual(20)
    })

    it('예외가 발생하면 실행을 중단한다', async function() {
        let sum = 0

        const observable = new Observable((subscriber) => {            
            sum += subscriber.onNext(1)
            sum += subscriber.onNext(2)
            throw new Error('error')
            sum += subscriber.onNext(3)
        })
        expect(() => observable.subscribe({ onNext: (x) => x, onCompleted: (x) => x * 2 })).toThrow(Error)
        expect(sum).toBe(3)
    })

    it('onCompleted 후의 값은 전달되지 않는다', async function() {
        let sum = 0

        const observable = new Observable((subscriber) => {            
            sum += subscriber.onNext(1)
            sum += subscriber.onNext(2)
            sum += subscriber.onCompleted(0)
            sum += subscriber.onNext(2)
        })

        observable.subscribe({ onNext: (x) => x, onCompleted: (x) => x * 2 })

        expect(sum).toBe(NaN)
    })

    it('onError 후의 값은 전달되지 않는다', async function() {
        let sum = 0

        const observable = new Observable((subscriber) => {            
            sum += subscriber.onNext(1)
            sum += subscriber.onNext(2)
            sum += subscriber.onError(0)
            sum += subscriber.onNext(2)
        })

        try {
            observable.subscribe({ onNext: (x) => x, onError: (x) => 'Error' })
        } catch (error) {
            expect(sum).toBe(3)
        }
    })
})

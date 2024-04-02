import Observable from "../observable.js"
import { expect } from "chai"

describe('Observable 테스트', function() {
    it('Observable subscribe 테스트', async function() {
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
        expect(result).equal(20)
    })
})

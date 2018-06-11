import {expect} from 'code'
import 'isomorphic-fetch'
import sinon from 'sinon'
import {fetchPuppers} from './pupper'

describe('Name of the group', () => {
    let fetchStub
    let mockPupper = 'hound'

    beforeEach(() => {
        fetchStub = sinon.stub(global, 'fetch')
    })

    afterEach(() => {
        sinon.restore()
    })

    describe('When fetchPuppers is called with args', () => {

        it('should call fetch', () => {
            fetchStub.resolves({json: sinon.spy()})

            fetchPuppers(mockPupper)

            sinon.assert.calledOnce(fetchStub)
            sinon.assert.calledWithExactly(fetchStub, `https://dog.ceo/api/breed/${mockPupper}/images`
            )
        })

        describe('on success', () => {

            it('should return mock data', () => {
                const mockData = {
                    "message": [
                        "https://images.dog.ceo/breeds/hound-afghan/n02088094_1003.jpg",
                        "https://images.dog.ceo/breeds/hound-afghan/n02088094_1007.jpg",
                        "https://images.dog.ceo/breeds/hound-afghan/n02088094_1023.jpg",
                        "https://images.dog.ceo/breeds/hound-afghan/n02088094_10263.jpg",
                        "https://images.dog.ceo/breeds/hound-afghan/n02088094_10715.jpg",
                        "https://images.dog.ceo/breeds/hound-afghan/n02088094_10822.jpg"
                    ]
                }
                const json = sinon.stub().returns(mockData)

                fetchStub.resolves({json})

                fetchPuppers(mockPupper)
                .then(data => {
                    expect(data).to.equal(mockData)
                })
                .catch(err => {
                    expect(err).to.be.undefined()
                })
            })

        })

        describe('on failure', () => {

            it('should return an error', () => {
                fetchStub.rejects({json: 'bork bork'})

                return fetchPuppers(mockPupper)
                .then(data => {
                    expect(data).to.be.undefined()
                })
                .catch(err => {
                    expect(err).to.not.equal(undefined)
                })
            })
        })
    })

    describe('When no arguments are called', () => {
        return fetchPuppers('')
        .catch(err => {
            expect(err).to.equal({error: 'no puppers?! whaaattt?!'})
        })
    })

})

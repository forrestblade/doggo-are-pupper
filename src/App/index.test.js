/* eslint-env jest */
import React from 'react'
import { expect } from 'code'
import { shallow } from 'enzyme'
import sinon from 'sinon'
import App from './'

describe('App', () => {
  let fetchPuppersStub = sinon.stub()

  function requiredProps (overrides) {
    let props = {
      fetchPuppers: fetchPuppersStub
    }

    return {
      ...props,
      ...overrides
    }
  }

  function renderComponent (props = requiredProps()) {
    return shallow(<App {...props} />)
  }

  describe('When the application renders', () => {
    it('should exist with a specifying className', () => {
      const component = renderComponent()

      expect(component.is('main.App')).true()
    })

    it('should contain `PupperSelection`', () => {
      const component = renderComponent()

      expect(component.find('PupperSelection').exists()).true()
    })

    it('should pass a selection handler to `PupperSelection`', () => {
      const component = renderComponent()
      expect(
        component.find('PupperSelection').props().handleSubmit
      ).to.be.function()
    })

    it('should contain a `PupperGallery`', () => {
      const component = renderComponent()

      expect(component.find('PuppersGallery').exists()).true()
    })

    it('should pass a `puppers` prop to `PupperGallery`', () => {
      const component = renderComponent()

      expect(component.find('PuppersGallery').props().puppers).to.be.an.array()
    })

    it('should start with an empty list of puppers in state', () => {
      const component = renderComponent()

      expect(component.state().puppers).to.equal([])
    })

    describe('When the `PupperSelection` sends back a selection', () => {
      let component
      const mockPupper = 'hound'
      const mockData = {
        message: [
          'https://images.dog.ceo/breeds/hound-afghan/n02088094_1003.jpg',
          'https://images.dog.ceo/breeds/hound-afghan/n02088094_1007.jpg',
          'https://images.dog.ceo/breeds/hound-afghan/n02088094_1023.jpg',
          'https://images.dog.ceo/breeds/hound-afghan/n02088094_10263.jpg',
          'https://images.dog.ceo/breeds/hound-afghan/n02088094_10715.jpg',
          'https://images.dog.ceo/breeds/hound-afghan/n02088094_10822.jpg'
        ]
      }

      beforeEach(() => {
        fetchPuppersStub.resolves(mockData)
        component = renderComponent()
        component
          .find('PupperSelection')
          .props()
          .handleSubmit(mockPupper)
      })

      afterEach(() => {
        sinon.restore()
      })

      it('should update with puppers image urls in state', () => {
        const pupperImages = mockData.message.map(url => url)

        expect(component.state().puppers).to.equal(pupperImages)
      })
    })

    describe('When the `PupperSelection` sends back undefined', () => {
      const component = renderComponent()

      beforeEach(() => {
        fetchPuppersStub.rejects({ error: 'no puppers?! whaaattt?!' })
        component
          .find('PupperSelection')
          .props()
          .handleSubmit(undefined)
      })

      afterEach(() => {
        sinon.restore()
      })

      it('should display an error on the page', () => {
        component.update()

        expect(component.find('span.error').exists()).true()
      })
    })
  })
})

import React from 'react'
import { expect } from 'code'
import { shallow } from 'enzyme'
import PupperGallery from './PuppersGallery'

describe('given a list of pupper image urls', () => {
  function requiredProps (overrides) {
    let props = {
        puppers: []
    }

    return {
      ...props,
      ...overrides
    }
  }
  function renderComponent (props = requiredProps()) {
    return shallow(<PupperGallery {...props} />)
  }

  it('should exist with a specifying className', () => {
    let component = renderComponent()

    expect(component.is('article.Gallery')).to.be.true()
  })

  it('should contain an h2', () => {
    let component = renderComponent()

    expect(component.find('h2').exists()).to.be.true()
  })

  describe('When passed an empty array of urls', () => {
    let component = renderComponent()

    expect(component.find('img').exists()).to.be.false()
  })

  describe('When passed an array of pupper image urls', () => {
    const mockData = {
      message: [
        'https://images.dog.ceo/breeds/hound-afghan/n02088094_1003.jpg',
        'https://images.dog.ceo/breeds/hound-afghan/n02088094_1007.jpg',
        'https://images.dog.ceo/breeds/hound-afghan/n02088094_1023.jpg',
        'https://images.dog.ceo/breeds/hound-afghan/n02088094_10263.jpg',
        'https://images.dog.ceo/breeds/hound-afghan/n02088094_10715.jpg',
        'https://images.dog.ceo/breeds/hound-afghan/n02088094_1023.jpg',
        'https://images.dog.ceo/breeds/hound-afghan/n02088094_10263.jpg',
        'https://images.dog.ceo/breeds/hound-afghan/n02088094_10715.jpg',
        'https://images.dog.ceo/breeds/hound-afghan/n02088094_1023.jpg',
        'https://images.dog.ceo/breeds/hound-afghan/n02088094_10263.jpg',
        'https://images.dog.ceo/breeds/hound-afghan/n02088094_10715.jpg',
        'https://images.dog.ceo/breeds/hound-afghan/n02088094_1023.jpg',
        'https://images.dog.ceo/breeds/hound-afghan/n02088094_10263.jpg',
        'https://images.dog.ceo/breeds/hound-afghan/n02088094_10715.jpg',
        'https://images.dog.ceo/breeds/hound-afghan/n02088094_10822.jpg'
      ]
    }

    it('should render images of array length', () => {
      const puppers = mockData.message.slice(0, 12).map(url => url)
      console.log(puppers)
      let component = renderComponent(requiredProps({ puppers }))

      expect(component.find('img').length).to.equal(puppers.length)
    })
  })
})

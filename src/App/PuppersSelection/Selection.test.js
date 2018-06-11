import { expect } from 'code'
import { shallow } from 'enzyme'
import React from 'react'
import sinon from 'sinon'
import PupperSelection from './PuppersSelection'

describe('Given a Selection of puppers', () => {
  let handleSubmitStub = sinon.stub()

  function requiredProps (overrides) {
    const props = {
      handleSubmit: handleSubmitStub
    }

    return {
      ...props,
      ...overrides
    }
  }

  function renderComponent (props = requiredProps()) {
    return shallow(<PupperSelection {...props} />)
  }

  describe('When the app first renders', () => {
    it('should exist with a specifying className', () => {
      const component = renderComponent()

      expect(component.is('section.Selection')).true()
    })

    it('should contain a header and three buttons', () => {
      const component = renderComponent()
      const section = component.find('section')
      const form = section.find('form')

      expect(section.length).to.equal(1)
      expect(section.childAt(0).is('h1.header')).true()
      expect(form.childAt(0).is('input')).true()
      expect(form.childAt(1).is('input')).true()
      expect(form.childAt(2).is('input')).true()
    })

    it('should contain no choice in state', () => {
      const component = renderComponent()

      expect(component.state().choice).to.equal(undefined)
    })

    describe('When a user selects a pupper', () => {
      let component
      let mockPupper

      beforeEach(() => {
        mockPupper = 'hound'
        component = renderComponent()
        component.find('.btn1').simulate('click', {target: {value: mockPupper}})
      })

      it('should match state and input value', () => {
          expect(component.state().choice).to.equal(mockPupper)
      })


      describe('when a pupper is submitted', () => {

        beforeEach(() => {
          component.find('form').simulate('submit' , {preventDefault: sinon.spy()})
        })

        it('should call the correct callback once', () => {
          sinon.assert.calledOnce(handleSubmitStub)
        })


        it('should set choice state to undefined', () => {
          const state = component.state().choice
          expect(state).to.equal(undefined)
        })

      })



    })
  })
})

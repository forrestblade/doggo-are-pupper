import React, { Component } from 'react'
import PropTypes from 'prop-types'

function handleSubmit (e) {
  const choice = e.target.value
  this.setState({choice})
}

function handleClick (e) {
  e.preventDefault()
  this.setState({choice: undefined})
  this.props.handleSubmit(this.state.choice)
}

export default class PupperSelection extends Component {
  state = {
    choice: undefined
  }
  render () {
    return (
      <section className='Selection tc'>
        <h1 className='bg-washed-red mt0 pt2'>Select a pupper!</h1>
        <form onSubmit={handleClick.bind(this)}>
          <input
            onClick={handleSubmit.bind(this)}
            value='hound'
            className='f6 btn1 link bn br3 dim ph3 pv2 mh4 mb2 dib white bg-purple'
            type='submit'
          />
          <input
            onClick={handleSubmit.bind(this)}
            value='labrador'
            className='f6 btn2 link dim bn br3 ph3 pv2 mb2 mh4 dib white bg-light-purple'
            type='submit'
          />
          <input
            onClick={handleSubmit.bind(this)}
            value='husky'
            className='f6 btn3 link dim bn br3 ph3 pv2 mb2 dib mh4 white bg-hot-pink'
            type='submit'
          />
        </form>
      </section>
    )
  }
}

PupperSelection.propTypes = {
  handleSubmit: PropTypes.func.isRequired
}

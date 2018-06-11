import React, { Component } from 'react'
import PuppersSelection from './PuppersSelection/PuppersSelection'
import PuppersGallery from './PuppersGallery/PuppersGallery'
import PropTypes from 'prop-types'
import {fetchPuppers} from '../Services/pupper'

function handleSelection (choice) {
  this.props.fetchPuppers(choice)
    .then(data => {
      const pupperUrls = data.message.map(url => url)
      this.setState({
        puppers: pupperUrls,
        formError: undefined
      })
    })
    .catch(err => {
      this.setState({
        formError: err.error
      })
    })
}

class App extends Component {
  state = {
    puppers: [],
    formError: undefined
  }

  render () {
    return (
      <main className='App code min-vh-100 bg-washed-red'>
        <PuppersSelection handleSubmit={handleSelection.bind(this)} />
        {this.state.formError && <span className='error'>{this.state.formError}</span>}
        <PuppersGallery puppers={this.state.puppers} />
      </main>
    )
  }
}

App.defaultProps = {
  fetchPuppers
}

App.propTypes = {
  fetchPuppers: PropTypes.func
}

export default App

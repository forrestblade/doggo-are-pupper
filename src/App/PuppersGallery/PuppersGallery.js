import React from 'react'

const PuppersGallery = ({ puppers }) => {
  let random = Math.floor(Math.random() * puppers.length)
  return (
    <article className='Gallery cf w-100'>
      {puppers.length === 0 ? <span /> : <h2 className='f3 fw4 tc pa3 code mv0'>borks</h2>}
      {puppers.slice(random, random + 12).map((url, i) => {
        return <div key={i} className='fl w-50 w-third-m w-25-ns'>
          <div className='aspect-ratio aspect-ratio--1x1'>
            <img style={{ backgroundImage: `url(${url})` }} className='db grow dim bg-center cover aspect-ratio--object' alt='' />
          </div>
        </div>
      })}

    </article>
  )
}

export default PuppersGallery

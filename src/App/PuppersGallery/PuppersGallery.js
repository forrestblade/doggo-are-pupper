import React from 'react'

const PuppersGallery = ({ puppers }) => {
  return (
    <article className="Gallery cf w-100">
      <h2 className="f3 fw4 tc pa3 mv0">Pictures!</h2>
      {puppers.slice(0, 12).map((url, i) => {
        return <div key={i} className="fl w-50 w-third-m w-25-ns">
        <div  className="aspect-ratio aspect-ratio--1x1">
          <img style={{ backgroundImage: `url(${url})` }} className="db grow dim bg-center cover aspect-ratio--object" />
        </div>
      </div>
      })}

    </article>
  )
}

export default PuppersGallery

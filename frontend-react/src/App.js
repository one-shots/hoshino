import * as React from 'react'
import './App.css'

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001'

const ReviewModal = () => {
  return (
    <div className="modal fade" id="review-modal" tabIndex="-1" aria-hidden="true">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-body">
            <h2 className="review-title">What's your rating?</h2>
            <h4 className="review-header">Rating</h4>
            <div className="review-section">
              <div className="stars">
                <div id="rate-1" className="star"></div>
                <div id="rate-2" className="star"></div>
                <div id="rate-3" className="star"></div>
                <div id="rate-4" className="star"></div>
                <div id="rate-5" className="star"></div>
              </div>
            </div>
            <h4 className="review-header">Review</h4>
            <div className="review-section">
              <input id="comment-input" type="email" className="form-control no-border" id="reviewCommentInput" placeholder="Start typing ..." />
            </div>
            <div className="review-section">
              <button
                id="submit-review"
                type="button"
                className="btn btn-outline-secondary review-button"
              >
                Submit review
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const useProducts = (videogameSlug) => {
  const [products, setProducts] = React.useState([])
  const [error, setError] = React.useState()
  const [loading, setLoading] = React.useState(true)

  React.useEffect(() => {

    setLoading(true)

    fetch(`${API_URL}/products`)
      .then(response => response.json())
      .then((data) => {
        setProducts(data)
      })
      .catch(err => {
        setError(err)
      })
      .then(() => {
        setLoading(false)
      })

    return () => {
      setProducts([])
      setError(undefined)
      setLoading(false)
    }
  }, [])

  return {
    error,
    loading,
    products,
  }
}

const App = () => {
  const {
    error,
    loading,
    products,
  } = useProducts()

  console.log(error)
  console.log(products)

  return (
    <div className="d-flex justify-content-center flex-wrap main-box">
      <div id="current-product" className="card main-card">
        <div className="card-body">
          {error && <h4 className="error-message">{`${error}`}</h4>}

          <h1 id="product-name">Loading ...</h1>
          <div className="d-flex justify-content-between align-content-center rating-box">
            <div id="average-rating" className="d-flex align-content-start">
              <div className="rating-number">
                1.0
              </div>
              <div id="average-stars" className="stars d-flex justify-content-start align-content-center">
                <div className="star"></div>
                <div className="star"></div>
                <div className="star"></div>
                <div className="star"></div>
                <div className="star"></div>
              </div>
            </div>
            <div className="d-flex align-content-center">
              <button
                id="add-review"
                type="button"
                className="btn btn-outline-secondary review-button"
                data-bs-toggle="modal"
                data-bs-target="#review-modal"
              >
                Add review
              </button>
            </div>
          </div>

          <h4 className="existing-reviews__header">Reviews</h4>
          <div id="existing-reviews"></div>
        </div>
      </div>
    </div>
  )
}

export default App

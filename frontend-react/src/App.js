import * as React from 'react'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import Modal from 'react-bootstrap/Modal'
import './App.css'

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001'

const useProducts = () => {
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

const Star = ({ filled, onClick }) => {
  return (
    <div
      className={`${filled ? 'filled-' : ''}star`}
      onClick={onClick}
    />
  )
}

const Stars = ({
  count, onClick = () => {
  },
}) => {
  return (
    <div id="average-stars" className="stars d-flex justify-content-start align-content-center">
      {[1, 2, 3, 4, 5].map((num) => {
        return (
          <Star
            key={`star-${num}`}
            filled={num <= count + 0.5}
            onClick={() => onClick(num)}
          />
        )
      })}
    </div>
  )
}

const useReviews = (productId) => {
  const [reviews, setReviews] = React.useState([])
  const [error, setError] = React.useState()
  const [loading, setLoading] = React.useState(true)

  React.useEffect(() => {
    if (productId) {
      setLoading(true)
      fetch(`${API_URL}/reviews?productId=${productId}`)
        .then(response => response.json())
        .then((data) => {
          setReviews(data)
        })
        .catch(err => {
          setError(err)
        })
        .then(() => {
          setLoading(false)
        })
    } else {
      setReviews([])
    }

    return () => {
      setReviews([])
      setError(undefined)
      setLoading(false)
    }
  }, [productId])

  return {
    error,
    loading,
    reviews,
  }
}

const ExistingReview = ({ review }) => {
  let commentShown = ''
  if (review.comment) {
    commentShown = ', ' + review.comment.slice(0, 1).toLowerCase() + review.comment.slice(1)
  }

  return (
    <div className="d-flex justify-content-start align-content-center">
      <Stars count={review.rating} />
      <p className="existing-review__paragraph">{review.rating}<span className="existing-review__text">{commentShown}</span></p>
    </div>
  )
}

const Product = ({ product }) => {
  const [showModal, setShowModal] = React.useState(false)

  const {
    error,
    reviews,
  } = useReviews(product && product.id)

  const [comment, setComment] = React.useState('')
  const [rating, setRating] = React.useState(1)
  const submit = () => {
    const newReview = {
      productId: product.id,
      rating,
      comment,
    }
    console.log(newReview)
    // TODO
  }

  if (!product || !product.id) {
    return (
      <h4 className="error-message">
        No product found
      </h4>
    )
  }

  let averageRating = 0.0
  if (reviews.length) {
    const sum = reviews.reduce(function(acc, curr) {
      return curr.rating + acc
    }, 0)
    averageRating = sum / reviews.length
  }

  return (
    <>
      {error && <h4 className="error-message">{`${error}`}</h4>}
      <h1 id="product-name">{product.name || '???'}</h1>
      <div className="d-flex justify-content-between align-content-center rating-box">
        <div id="average-rating" className="d-flex align-content-start">
          <div className="rating-number">
            {averageRating.toFixed(1)}
          </div>
          <Stars count={averageRating} />
        </div>
        <div className="d-flex align-content-center">
          <Button
            id="add-review"
            variant="outline-secondary"
            className="review-button"
            onClick={() => setShowModal(true)}
          >
            Add review
          </Button>
        </div>
      </div>

      <h4 className="existing-reviews__header">Reviews</h4>
      <div id="existing-reviews">
        {reviews.map((review, i) => (
          <ExistingReview review={review} key={`review-${i}`} />
        ))}
      </div>

      <Modal
        show={showModal}
        onHide={() => setShowModal(false)}
        keyboard
      >
        <Modal.Body>
          <div className="modal-body">
            <h2 className="review-title">What's your rating?</h2>
            <h4 className="review-header">Rating</h4>
            <div className="review-section">
              <Stars count={rating} onClick={rating => setRating(rating)} />
            </div>
            <h4 className="review-header">Review</h4>
            <div className="review-section">
              <input
                id="comment-input"
                type="text"
                className="form-control no-border"
                placeholder="Start typing ..."
                value={comment}
                onChange={e => setComment(e.target.value)}
              />
            </div>
            <div className="review-section">
              <Button
                id="submit-review"
                variant="outline-secondary"
                className="review-button"
                onClick={submit}
              >
                Submit review
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  )
}

const App = () => {
  const {
    error,
    loading,
    products,
  } = useProducts()

  const product = products && products[0]

  return (
    <div className="d-flex justify-content-center flex-wrap main-box">
      <Card id="current-product" className="card main-card">
        <Card.Body>
          {error && <h4 className="error-message">{`${error}`}</h4>}
          {loading ? (
            <h1 id="product-name">Loading ...</h1>
          ) : (
            <Product product={product} />
          )}
        </Card.Body>
      </Card>
    </div>
  )
}

export default App

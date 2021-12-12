const API_URL = 'http://localhost:4001' // TODO set this as env var in a build tool

let currentProduct = null
let allReviews = []

function prependReview(review) {
  // Only show comment if it it's not blank
  let commentShown = ''
  if (review.comment) {
    commentShown = ', ' + review.comment.slice(0, 1).toLowerCase() + review.comment.slice(1)
  }

  const starElements = $('<div class="stars">')
  for (let j = 1; j <= 5; j++) {
    starElements.append(`<div class="${j <= review.rating ? 'filled-' : ''}star"></div>`)
  }

  // Show an existing review
  $('#existing-reviews').prepend(
    $('<div/>')
      .addClass('d-flex justify-content-start align-content-center')
      .append(starElements)
      .addClass('stars')
      .append(`<p class="existing-review__paragraph">${review.rating}<span class="existing-review__text">${commentShown}</span></p>`),
  )
}

function updateAverageRating() {
  const reviews = allReviews

  if (reviews.length) {
    const sum = reviews.reduce(function(acc, curr) {
      console.log(curr.rating, acc)
      return curr.rating + acc
    }, 0)
    const averageRating = sum / reviews.length

    // Update average rating number
    $('#average-rating .rating-number').text(averageRating.toFixed(1))


    // Update average rating stars
    $('#average-stars').empty()

    for (let j = 1; j <= 5; j++) {
      $('#average-stars').append(`<div class="${j <= averageRating + 0.5 ? 'filled-' : ''}star"></div>`)
    }
  }

}

function refreshReviews(productId) {
  $.get(API_URL + '/reviews?productId=' + productId, function(reviews) {

    allReviews = reviews

    updateAverageRating()

    // Remove placeholders
    $('#existing-reviews').empty()

    // Add each existing review
    for (let i = 0; i < reviews.length; i++) {
      prependReview(reviews[i])
    }
  })
}

// Display correct number of gold stars
function fillStars(rating) {
  for (let j = 1; j <= 5; j++) {
    $('#rate-' + j).removeClass('filled-star')
    $('#rate-' + j).addClass('star')
  }
  for (let j = 1; j <= rating; j++) {
    $('#rate-' + j).removeClass('star')
    $('#rate-' + j).addClass('filled-star')
  }
}

$(document).ready(function() {

  // Get and display the product
  $.get(API_URL + '/products', function(data) {
    currentProduct=data[0]
    $('#product-name').text(currentProduct.name)
    refreshReviews(currentProduct.id)
  })

  const reviewModal = new bootstrap.Modal(document.getElementById('review-modal'), {
    keyboard: false,
  })

  // Adding a review
  $('#add-review').on('click', function() {
    reviewModal.toggle()
  })

  // Submitting a review
  let currentRating = 1
  fillStars(currentRating)
  for (let i = 1; i <= 5; i++) {
    $('#rate-' + i).on('click', function() {
      fillStars(i)
      currentRating = i
    })
  }
  $('#submit-review').on('click', function() {
    const comment = $('#comment-input').val()

    const newReview = {
      rating: currentRating,
      productId: currentProduct.id,
      comment,
    }

    $.ajax({
      type: 'POST',
      url: API_URL + '/reviews',
      contentType: 'application/json',
      data: JSON.stringify(newReview),
      success: function(data) {
        // Close the modal
        reviewModal.hide()

        // Show newest review
        prependReview(newReview)
        allReviews.push(newReview)

        // Update average rating
        updateAverageRating()
      },
    })
  })
})
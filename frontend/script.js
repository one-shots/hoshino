const API_URL = 'http://localhost:4001' // TODO set this as env var in a build tool

function showReviews(productId) {
  $.get(API_URL + '/reviews?productId=' + productId, function(reviews) {

    // Remove placeholders
    $('#existing-reviews').empty()

    // Add each existing review
    for (let i = 0; i < reviews.length; i++) {
      const review = reviews[0]

      // Only show comment if it it's not blank
      let commentShown = ''
      if (review.comment) {
        commentShown = ', ' + review.comment.slice(0, 1).toLowerCase() + review.comment.slice(1)
      }

      const starElements = $('<div class="stars">')
      for (let j = 1; j <= 5; j++) {
        starElements.append(`<div class="${j <= review.rating ? 'filled-' : ''}star"></div>`)
      }

      $('#existing-reviews').append(
        $('<div/>')
          .addClass('d-flex justify-content-start align-content-center existing-review')
          .append(starElements)
          .addClass('stars')
          .append(`<p class="existing-review__paragraph">${review.rating}<span class="existing-review__text">${commentShown}</span></p>`),
      )
    }
  })
}

$(document).ready(function() {
  // Get and display the product
  let currentProductId = 0
  $.get(API_URL + '/products', function(data) {
    const product = data[0]
    currentProductId = product.id
    $('#product-name').text(product.name)
    showReviews(currentProductId)
  })

  const myModal = new bootstrap.Modal(document.getElementById('review-modal'), {
    keyboard: false,
  })

  // Adding a review
  $('#add-review').on('click', function() {
    myModal.toggle()
  })
})
$(document).ready(function() {
  console.log('hello')

  var myModal = new bootstrap.Modal(document.getElementById('review-modal'), {
    keyboard: false,
  })

  $('#add-review').on('click', function() {
    myModal.toggle()
  })
})
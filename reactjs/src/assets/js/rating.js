var $star_rating = $('.star-rating span');

$star_rating.on('click', function() {
  $star_rating.siblings('input.rating-value').val($(this).data('rating'));
  return SetRatingStar();
});

function SetRatingStar() {
  return $star_rating.each(function () {
    if (parseInt($star_rating.siblings('input.rating-value').val()) >= parseInt($(this).data('rating'))) {
      return $(this).removeClass('star-o').addClass('star');
    } else {
      return $(this).removeClass('star').addClass('star-o');
    }
  });
};

$(document).ready(function () {
    $('.top-bar').click(function () {
        var isNone = $(this).next().hasClass('d-none');
        $('.top-bar').next().addClass('d-none');
        if (isNone) {
            $(this).next().removeClass('d-none');
        } else {
            $(this).next().addClass('d-none');
        }
    });
});


$('.checkbox01').change(function(){
  var $this = $(this), $div = $('input.menuitem');
  if( $this.is(':checked') )
  {
    $div.addClass('show01');
  }
  else
  {
    $div.removeClass('show01');
  }
}).change();

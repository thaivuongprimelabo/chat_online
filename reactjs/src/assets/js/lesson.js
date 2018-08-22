/**
 * lesson.js for menu
 * @author: Tran Vu Hao
**/
;(function($) {
	"use strict";

	var
		header = 0,
		winHeight = 0,
		$win,
		$btn = null,
		$lesson = null,
		$btnCard = null,
		$xhtml = "",
		$btnFolder = null,
		$content = null;

	function init() {
		$win = $(window);
		$btn = $(".contents_list");
		$btnCard = $(".card-body")
		$content = $("#accordion");
		$lesson = $(".lesson");
		$btnFolder = $(".btn_folder");

		// call
		menu();
		loadMore();
		folderControl();
		resizable();
		$win.on("load resize", function() {
			setHeight();
		});
	}

	function menu() {
		$btn.click(function(e) {
			e.preventDefault();
			var open = $content.hasClass("open");
			if (open) {
				$content.removeClass("open");
			} else {
				$content.addClass("open");
			}
		});
		$btnCard.click(function(e) {
			e.preventDefault();
			$content.removeClass("open");
		});
	}

	function loadMore(number) {
		$xhtml += '<div class="col-12 border border-utils align-middle animate transition rounded margin-top bg-white">';
		$xhtml += '  <p class="text-center text_reservation_date margin-top">2017年11月7日&nbsp;(火)&nbsp;19:00〜19:45</p>';
		$xhtml += '  <div class="row">';
		$xhtml += '    <div class="col-2">';
		$xhtml += '      <label class="reservation_title">講師</label>';
		$xhtml += '      <div class="tutor_icon_detail margin-bottom">';
		$xhtml += '        <img class="d-block img-thumbnail" src="img/tutor_dummy.png" alt="tutor_dummy" width="100" height="100">';
		$xhtml += '        <img class="d-block tutor_favorite_icon" src="img/heart.png" alt="tutor_farorite_icon" width="12" height="12">';
		$xhtml += '      </div>';
		$xhtml += '      <p class="tutor_name_centered"><a href="tutor_detail.html">テスト鈴木</a></p>';
		$xhtml += '      <p class="tutor_skill_txt">PHP,Java,Ruby';
		$xhtml += '        <br> ★★★★★(5)';
		$xhtml += '        <br> 10件';
		$xhtml += '      </p>';
		$xhtml += '    </div>';
		$xhtml += '    <div class="col-10">';
		$xhtml += '      <label class="reservation_title">コース</label>';
		$xhtml += '      <p>HTML基礎コース</p>';
		$xhtml += '      <label class="reservation_title">セクション</label>';
		$xhtml += '      <p>1章</p>';
		$xhtml += '      <label class="reservation_title">講師からのメッセージ</label>';
		$xhtml += '      <p>テストテストテストテストテストテストテストテストテストテストテストテストテストテストテストテストテストテストテストテストテストテストテストテストテストテストテスト</p>';
		$xhtml += '      <form>';
		$xhtml += '        <div class="form-group">';
		$xhtml += '          <label class="reservation_title">レッスンメモ</label>';
		$xhtml += '          <textarea class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>';
		$xhtml += '        </div>';
		$xhtml += '        <div class="form-row btn_padding_bottom">';
		$xhtml += '          <button type="submit" class="btn btn-success btn_centered">登録</button>';
		$xhtml += '        </div>';
		$xhtml += '      </form>';
		$xhtml += '    </div>';
		$xhtml += '  </div>';
		$xhtml += '</div>';

		$win.on("scroll", function() {
			if ($win.scrollTop() + $win.height() == $(document).height()) {
				$(".loading").show();
				setTimeout(function() {
        	$(".wrap_note").append($xhtml);
        	animate();
				});
			}
		});
	}

	function animate() {
		setTimeout(function() {
			if ($('.animate').length > 0) {
				$('.animate').addClass('animated');
				$(".loading").hide();
			}
		}, 1500);
	}

	function setHeight() {
		header = $("header").height();
		winHeight = $(window).height();
		$lesson.css({
			"height": (winHeight - header) + "px"
		});
		$("#editor_folder").css({
			"height": winHeight - 50 + "px"
		});
	}

	function folderControl() {
		$btnFolder.click(function(e) {
			e.preventDefault();
			var $this = $(this);
			var	open = $("#folder_view").hasClass("open");
			if (open) {
				$("#folder_view").removeClass("open");
				$("#editor_view").css("width", "100%");
			} else {
				$("#folder_view").addClass("open");
				$("#editor_view").css("width", "70%");
			}
		});
	};

	function resizable() {
		var $col01 = $("#resizable .col01");
    var $col02 = $("#resizable .col02");
    var $col03 = $("#resizable .col03");
    var $col50 = $("#resizable .col50");
    var $move01 = $("#resizable .move01");
    var $move02 = $("#resizable .move02");
    var $move50 = $("#resizable .move50");
    var $resizable = $("#resizable");
    var status01 = false;
    var status02 = false;
    var status50 = false;

    $move01.on({
      "mousedown": () => status01 = true
    });

    $move02.on({
      "mousedown": () => status02 = true
    });

    $move50.on({
      "mousedown": () => status50 = true
    });

    $resizable.on("mouseup", function() {
      status01 = false;
      status02 = false;
      status50 = false;
    });

    $resizable.on("mousemove", function(e) {
      var offset = $(this).offset();
      
      if (status01) {
        $col01.css("width", e.pageX);
        $col02.css("width", $(this).width() - ($col01.width() + $col03.width()));
        $col03.css("width", $(this).width() - ($col01.width() + $col02.width()));
      }

      if (status02) {
        $col02.css("width", (e.pageX - $col01.width()));
        $col03.css("width", $(this).width() - ($col01.width() + $col02.width()));
      }

      if (status50) {
        $col50.css("width", e.pageX);
        $col50.next().css("width", $(this).width() - $col50.width());
      }

    });

    $(window).on("load resize", function() {
      var winW = $(window).width();
      $("#resizable .col01, #resizable .col02")
      .css({"min-width": (winW/5) + "px", "max-width": (winW/2) + "px", "width": (winW/3) + "px"});
      $("#resizable .col50")
      .css({"min-width": (winW/5) + "px", "max-width": (winW/0.8) + "px", "width": (winW/2) + "px"});
    });
	}

	$(function() {
		init();
	});

})(jQuery);
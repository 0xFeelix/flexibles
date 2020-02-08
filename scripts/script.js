

/*Navbar active element switch*/
$(function(){
$('.navigation a').click(function(){
    $('.navigation a').removeClass('navigation-active');
    $(this).addClass('navigation-active');
});
});

/*Navbar fixed menu when scrolling*/
$(function(){
  var menu = $('#menu'),
      item_view = $('.cd-item .view'),
      tophead = $('.top-head');
  $(window).on('scroll resize', function(){
    if(window.innerWidth > 770){
      if ($(this).scrollTop() > 15){
        !menu.hasClass('fixed-menu') && (menu.addClass('fixed-menu'), tophead.css({'max-width' : '85%'}));
      }else{
        menu.hasClass('fixed-menu') && (menu.removeClass('fixed-menu'), tophead.css({'max-width' : 'unset'}));
      }
    }else{
      menu.hasClass('fixed-menu') && (menu.removeClass('fixed-menu'), tophead.css({'max-width' : 'unset'}));
    }

    if(window.innerWidth <= 770){
        menu.addClass('skin-background');
        $('.remove').removeClass('skin-color');
    }else{
        menu.removeClass('skin-background');
        $('.remove').addClass('skin-color');
    }

      if(window.innerWidth < 1100){
        item_view.addClass('skin-background');
        item_view.removeClass('skin-color');
      }else{
        item_view.removeClass('skin-background');
        item_view.addClass('skin-color');
      }

  }).trigger('resize');

});



/*Color switcher panel*/
$(function(){

    var fixedMenu = $('.color-panel');

$('.cog-panel-switcher').click(function(){

  fixedMenu.toggleClass('visible');

if(fixedMenu.hasClass('visible')){

    fixedMenu.animate({
    left: '0'
  }, 500)

} else {

    fixedMenu.animate({
    left: '-200'
  }, 500)

}


});
});

//Fixed menu change colors
$('.change-colors li').click(function(){

  $('body').attr('data-default-color', $(this).data('color'));

});

//Fixed menu current color
$('.change-colors li').click(function(){
    $('.change-colors li').removeClass('current-color');
    $(this).addClass('current-color')
});



//Animate progress
$(function(){
    $('.animate-progress span').each(function(){
        $(this).animate({
            width: $(this).attr('data-progress') + '%'
        })
    })
});

//Contact, form-content change color
$(function(){
    var icon = $(".contact-form i"),
        input = $(".contact-form");


    input.focusin(function() {
        $(this).find(icon).addClass("skin-color");

    });
    input.focusout(function() {
        $(this).find(icon).removeClass("skin-color");
    });
});



//Portfolio script
jQuery(document).ready(function($){
	var gallery = $('.cd-gallery'),
		foldingPanel = $('.cd-folding-panel'),
		mainContent = $('.cd-main');
	/* open folding content */
	gallery.on('click', 'a', function(event){
		event.preventDefault();
		openItemInfo($(this).attr('href'));
	});

	/* close folding content */
	foldingPanel.on('click', '.cd-close', function(event){
		event.preventDefault();
		toggleContent('', false);
	});
	gallery.on('click', function(event){
		/* detect click on .cd-gallery::before when the .cd-folding-panel is open */
		if($(event.target).is('.cd-gallery') && $('.fold-is-open').length > 0 ) toggleContent('', false);
	})

	function openItemInfo(url) {
		var mq = viewportSize();
		if( gallery.offset().top > $(window).scrollTop() && mq != 'mobile') {
			/* if content is visible above the .cd-gallery - scroll before opening the folding panel */
			$('body,html').animate({
				'scrollTop': gallery.offset().top
			}, 100, function(){
	           	toggleContent(url, true);
	        });
	    } else if( gallery.offset().top + gallery.height() < $(window).scrollTop() + $(window).height()  && mq != 'mobile' ) {
			/* if content is visible below the .cd-gallery - scroll before opening the folding panel */
			$('body,html').animate({
				'scrollTop': gallery.offset().top + gallery.height() - $(window).height()
			}, 100, function(){
	           	toggleContent(url, true);
	        });
		} else {
			toggleContent(url, true);
		}
	}

	function toggleContent(url, bool) {
		if( bool ) {
			/* load and show new content */
			var foldingContent = foldingPanel.find('.cd-fold-content');
			foldingContent.load(url+' .cd-fold-content > *', function(event){
				setTimeout(function(){
					$('body').addClass('overflow-hidden');
					foldingPanel.addClass('is-open');
					mainContent.addClass('fold-is-open');
				}, 100);

			});
		} else {
			/* close the folding panel */
			var mq = viewportSize();
			foldingPanel.removeClass('is-open');
			mainContent.removeClass('fold-is-open');

			(mq == 'mobile' || $('.no-csstransitions').length > 0 )
				/* according to the mq, immediately remove the .overflow-hidden or wait for the end of the animation */
				? $('body').removeClass('overflow-hidden')

				: mainContent.find('.cd-item').eq(0).one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function(){
					$('body').removeClass('overflow-hidden');
					mainContent.find('.cd-item').eq(0).off('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend');
				});
		}

	}

	function viewportSize() {
		/* retrieve the content value of .cd-main::before to check the actua mq */
		return window.getComputedStyle(document.querySelector('.cd-main'), '::before').getPropertyValue('content').replace(/"/g, "").replace(/'/g, "");
	}
});



//Show/Hide content script


$(function () {

  $("#content section").not(":first").hide();

$("#menu .navigation li").click(function() {
    $("#content section").hide().eq($(this).index()).fadeIn()
}).eq(0).addClass("active");

})

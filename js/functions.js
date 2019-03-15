;(function($) {

  'use strict'; // Using strict mode

  // Page transitions

  $('a[href!=#][data-toggle!=tab][data-toggle!=collapse][target!=_blank][class!=anchor]').addClass('smooth');

  $('.smooth').on('click', function(e){
    e.preventDefault();
    var href = $(this).attr('href');
    $('body').removeClass('menu-active').css({'opacity' : 0});
    setTimeout(function(){
      window.location = href;
    },700);
  });

  // Navigation

  $('.nav-trigger').on('click', function(e){
    $('body').toggleClass('menu-active');
  });

  // Grid functions

  var $grid = $('.grid');

  $grid.imagesLoaded(function(){
    // Initialize Masonry after the images are loaded
    $grid.packery({
      itemSelector: '.item', // Portfolio item
    });
  });

  // Filter functions used for grid
  $('.filter').on('click', function(e){
    e.preventDefault();
    e.stopPropagation();
    $('body').addClass('filtering');
    var selected = $(this).attr('data-filter');
    $('.filter.active').removeClass('active');
    $(this).addClass('active');
    $('.grid').find('.'+selected).fadeTo(300,1);
    $('.grid').find('.item:not(.'+selected+')').fadeTo(300,0.2);
  });

  $(window).on('resize', function(){
    // Change Masonry on resize
    $grid.packery('layout');
    setTimeout(function(){
      $grid.packery('layout');
      window.requestAnimationFrame(inView); // Make new items visible
    }, 1500);
  });

  // You can use anchor links, using the .anchor class
  $('.anchor').on('click', function(e){
    e.preventDefault();
    e.stopPropagation();
    var href = $(this).attr('href');
    $('html,body').animate({
      scrollTop : $(href).offset().top+'px'
    });
  });

  // Initialize functions on scroll
  $(window).on('scroll', function(){
    window.requestAnimationFrame(parallax); // Parallax
  });

  // Parallax background script, use the ".parallax" class.
  var parallaxSpeed = 0.15;

  function parallax(){
    // Parallax scrolling function
    $('.parallax').each(function(){
      var el = $(this);
      var yOffset = $(window).scrollTop(),
          parallaxOffset = yOffset * parallaxSpeed,
          parallaxOffset = +parallaxOffset.toFixed(2);
      if(el.hasClass('fs')){
        el.css('transform','translate3d(-50%,-'+(50-parallaxOffset*.15)+'%,0)');
      } else {
        el.css('transform','translate3d(0,'+parallaxOffset+'px,0)');
      }

    });
  }

  var $animation_elements = $('.fadein'); // The fly-in element, used for elements that fly-in the window after they're visible on screen

  function inView() { // Function when element is in view
    var window_height =   $(window).height();
    var window_top_position =   $(window).scrollTop();
    var window_bottom_position = (window_top_position + window_height);

    $.each($animation_elements, function() {
      var $element = $(this);
      var element_height = $element.outerHeight();
      var element_top_position = $element.offset().top-100;
      var element_bottom_position = (element_top_position + element_height);

      //check to see if this current container is within viewport
      if ((element_bottom_position >= window_top_position) &&
        (element_top_position <= window_bottom_position)) {
        $element.addClass('in-view');
      } else {
        $element.removeClass('in-view');
      }
    });
  }

  $(window).on('scroll resize', function(){
    window.requestAnimationFrame(inView);
    var anchorLink = $('.anchor');
    anchorLink.each(function(){
      var id = '#'+$('.in-view').attr('id');
      if(id == $(this).attr('href')){
        $anchorLink.removeClass('active');
        $(this).addClass('active');
      }
    });
  });

  $(window).on('load', function(){
    window.requestAnimationFrame(inView);
    $('body').imagesLoaded(function(){
      $("body").removeClass("preload");
    });
  });

  $(window).bind("pageshow", function(event) {
      if (event.originalEvent.persisted) {
          window.location.reload()
      }
  });

})(jQuery);

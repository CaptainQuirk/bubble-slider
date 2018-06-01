
(function ($) {

    $.fn.bubbleslider = function (options) {

        $.fn.bubbleslider.settings = $.extend($.fn.bubbleslider.defaults, options);

        return this.each(function (i, slider) {

            $.fn.bubbleslider.initialisation($(slider));
            $.fn.bubbleslider.settings.initialisation($(slider));
            
            $(slider).on("click", ".bubble", function () {
                if (!$(slider).hasClass('in-progress') && !$(this).hasClass('active')) {
                    
                    $(slider).addClass('in-progress');
                    
                    $.fn.bubbleslider.settings.beforeAnimation($(slider));

                    var $clickedBubble = $(this);
                    var $firstBubble = $(slider).find('.bubble.active');
                    var $lastBubble = $(slider).find('.bubble.last');

                    var clickedBubbleNumber = $(this).attr('bubble-position');
                    var lastdBubbleNumber = $lastBubble.attr('bubble-position');

                    var clickedBubblePosition = $clickedBubble.position();
                    var firstBubblePosition = $firstBubble.position();
                    var lastBubblePosition = $lastBubble.position();

                    var events = [];
                    $(slider).find('.bubble').each(function (i, bubble) {
                        if ($(bubble).attr("bubble-position") > clickedBubbleNumber) {
                            events.push({
                                bubble: $(bubble),
                                position: $(slider).find('.bubble[bubble-position=' + ($(bubble).attr('bubble-position') - 1) + ']').position()
                            });
                        }
                    });
                                        
                    events.forEach(function (event) {
                        $.fn.bubbleslider.moveToPosition($(slider), event.bubble, event.position, null, function () {
                            event.bubble.attr('bubble-position', event.bubble.attr('bubble-position') - 1);
                            event.bubble.removeClass("last");
                        });
                    });

                    $.fn.bubbleslider.moveToPosition($(slider), $clickedBubble, firstBubblePosition, clickedBubbleNumber, function () {
                        $clickedBubble.addClass('active');
                        $clickedBubble.removeClass("last");
                        $clickedBubble.attr('bubble-position', 0);
                        $.fn.bubbleslider.settings.clickedBubbleAfterAnimationCallback($clickedBubble);
                        $(slider).removeClass('in-progress');
                    }, 'up');

                    $.fn.bubbleslider.moveToPosition($(slider), $firstBubble, lastBubblePosition, clickedBubbleNumber, function () {
                        $firstBubble.removeClass("active");
                        $firstBubble.addClass("last");
                        $firstBubble.attr("bubble-position", lastdBubbleNumber);
                        $.fn.bubbleslider.settings.firstBubbleAfterAnimationCallback($firstBubble);
                        $(slider).removeClass('in-progress');
                    }, 'down');
                }
                    
            });
        });
    };
    
    /**
     * 
     */
    $.fn.bubbleslider.defaults = {
        duration: 500,
        initialisation: function ($slider) {
            
        },
        beforeAnimation: function ($slider) {
            
        },
        firstBubbleAfterAnimationCallback: function ($bubble) {
            
        },
        clickedBubbleAfterAnimationCallback: function ($bubble) {
            
        }
    }
    
    /**
     * Initialisation du slider
     * @param {type} $slider
     * @returns {undefined}
     */
    $.fn.bubbleslider.initialisation = function ($slider) {
        $slider.find('.bubble').first().addClass('active');
        $slider.find('.bubble').last().addClass('last');
        
        $slider.css('position', 'absolute');
        
        $slider.find('.bubble').each(function (i, bubble) {
            $(bubble).attr('bubble-position', i);
            $(bubble).css({
                top: $(bubble).offset().top - $slider.offset().top,
                left: $(bubble).offset().left - $slider.offset().left
            });
        });
        
        $slider.find('.bubble').each(function (i, bubble) {
            $(bubble).css({
                position: 'absolute'
            });
        });
    }
    
    /**
     * Mouvement d'un element vers une position
     * @param {type} $slider
     * @param {type} $element
     * @param {type} $position
     * @returns {undefined}
     */
    $.fn.bubbleslider.moveToPosition = function ($slider, $element, position, number, callback, direction) {

        if (null !== number) {
            number = Math.pow(((number*2) - 1) / number, 1.5);
        }
                
        var baseTop = $element.css('top');
        
        $element.animate({
            top: position.top,
            left: position.left
        }, {
            duration: $.fn.bubbleslider.settings.duration,
            progress: function(animation, progress) {
                if (null !== number) {
                    switch (direction) {
                        case 'up' : $element.css('top', '-=' + $.fn.bubbleslider.computeSin(progress, 75 * number)); break;
                        case 'down' : $element.css('top', '+=' + $.fn.bubbleslider.computeSin(progress, 75 * number)); break;
                    }
                }
            },
            complete: function () {
                $element.css('top', baseTop);
                callback();
            }
        });
    }
    
    $.fn.bubbleslider.computeSin = function (value, multiplicateur) {
        var deg = Math.round(((180 * (value * 100)) / 100) * 100) / 100;
        return (Math.sin((deg * Math.PI) / 180) * multiplicateur);
    }

}(jQuery));

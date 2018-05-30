


(function ($) {

    $.fn.bubbleslider = function (options) {

        $.fn.bubbleslider.settings = $.extend($.fn.bubbleslider.defaults, options);

        return this.each(function (i, slider) {

            $.fn.bubbleslider.initialisation($(slider));
            $.fn.bubbleslider.settings.initialisation($(slider));
            
            $(slider).on("click", ".bubble", function () {
                if (!$(slider).hasClass('in-progress')) {
                    
                    $(slider).addClass('in-progress');
                    
                    $.fn.bubbleslider.settings.beforeAnimation($(slider));

                    var $clickedBubble = $(this);
                    var $firstBubble = $(slider).find('.bubble.active');

                    var clickedBubbleNumber = $(this).attr('bubble-position');

                    var clickedBubblePosition = $clickedBubble.position();
                    var firstBubblePosition = $firstBubble.position();

                    $.fn.bubbleslider.moveToPosition($(slider), $clickedBubble, firstBubblePosition, clickedBubbleNumber, function () {
                        $clickedBubble.addClass('active');
                        $clickedBubble.attr('bubble-position', 1);
                        $.fn.bubbleslider.settings.clickedBubbleAfterAnimationCallback($clickedBubble);
                        $(slider).removeClass('in-progress');
                    }, true);

                    $.fn.bubbleslider.moveToPosition($(slider), $firstBubble, clickedBubblePosition, clickedBubbleNumber, function () {
                        $firstBubble.removeClass("active");
                        $firstBubble.attr("bubble-position", clickedBubbleNumber);
                        $.fn.bubbleslider.settings.firstBubbleAfterAnimationCallback($firstBubble);
                        $(slider).removeClass('in-progress');
                    }, false);
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
    $.fn.bubbleslider.moveToPosition = function ($slider, $element, position, number, callback, up) {

        number = Math.pow(((number*2) - 1) / number, 1.5);
        
        console.log(number);
        
        var baseTop = $element.css('top');
        
        $element.animate({
            top: position.top,
            left: position.left
        }, {
            duration: $.fn.bubbleslider.settings.duration,
            progress: function(animation, progress) {
                up
                    ? $element.css('top', '-=' + $.fn.bubbleslider.computeSin(progress, 75 * number))
                    : $element.css('top', '+=' + $.fn.bubbleslider.computeSin(progress, 75 * number));
            },
            complete: function () {
                $element.css('top', baseTop);
                callback();
            }
        });
    }
    
    $.fn.bubbleslider.computeSin = function (value, multiplicateur) {
        var deg = Math.round(((180 * (value*100)) / 100) * 100) / 100;
        return (Math.sin((deg * Math.PI) / 180) * multiplicateur);
    }

}(jQuery));

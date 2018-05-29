


(function ($) {

    $.fn.bubbleslider = function (options) {

        $.fn.bubbleslider.settings = $.extend($.fn.bubbleslider.defaults, options);

        return this.each(function (i, slider) {
            
            console.log(Math.sin(0 * (Math.PI/180)));
            console.log(Math.sin(90 * (Math.PI/180)));
            console.log(Math.sin(360));
            
            $.fn.bubbleslider.initialisation($(slider));
            $.fn.bubbleslider.settings.initialisation($(slider));
            
            $(slider).on("click", ".bubble", function () {
                var $clickedBubble = $(this);
                var $firstBubble = $(slider).find('.bubble.active');
                
                var clickedBubblePosition = $clickedBubble.position();
                var firstBubblePosition = $firstBubble.position();
                
                $.fn.bubbleslider.moveToPosition($(slider), $clickedBubble, firstBubblePosition, function () {
                    $clickedBubble.addClass('active');
                    $.fn.bubbleslider.settings.clickedBubbleAfterAnimationCallback($clickedBubble);
                }, true);
                
                $.fn.bubbleslider.moveToPosition($(slider), $firstBubble, clickedBubblePosition, function () {
                    $firstBubble.removeClass("active");
                    $.fn.bubbleslider.settings.firstBubbleAfterAnimationCallback($firstBubble);
                }, false);
            });
        });
    };
    
    /**
     * 
     */
    $.fn.bubbleslider.defaults = {
        initialisation: function ($slider) {
            console.log($slider);
        },
        firstBubbleAfterAnimationCallback: function ($bubble) {
            console.log($bubble);
        },
        clickedBubbleAfterAnimationCallback: function ($bubble) {
            console.log($bubble);
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
    $.fn.bubbleslider.moveToPosition = function ($slider, $element, position, callback, debug) {
        $element.animate({
            top: position.top,
            left: position.left
        }, {
            duration: 1000,
            complete: callback,
            step: function (p, fx) {
                if (debug && fx.prop === 'top') {
                    s = Math.sin(p);
                    y = s * 100 + 150;
                    console.log(s);
                }
            }
        });
    }

}(jQuery));

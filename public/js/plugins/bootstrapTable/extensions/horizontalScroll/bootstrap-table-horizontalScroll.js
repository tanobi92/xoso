/**
 * @author zhixin wen <wenzhixin2010@gmail.com>
 * extensions: https://github.com/kayalshri/tableExport.jquery.plugin
 */

(function ($) {
    'use strict';


    $.extend($.fn.bootstrapTable.defaults, {
        maxHeight: false,
    });


    $.extend($.fn.bootstrapTable.defaults);

    function getScrollbarWidth() {
        var outer = document.createElement("div");
        outer.style.visibility = "hidden";
        outer.style.width = "100px";
        outer.style.msOverflowStyle = "scrollbar"; // needed for WinJS apps

        document.body.appendChild(outer);

        var widthNoScroll = outer.offsetWidth;
        // force scrollbars
        outer.style.overflow = "scroll";

        // add innerdiv
        var inner = document.createElement("div");
        inner.style.width = "100%";
        outer.appendChild(inner);

        var widthWithScroll = inner.offsetWidth;

        // remove divs
        outer.parentNode.removeChild(outer);

        return widthNoScroll - widthWithScroll;
    }

    var BootstrapTable = $.fn.bootstrapTable.Constructor,
        _horizontalScroll = BootstrapTable.prototype.horizontalScroll,
        _init = BootstrapTable.prototype.init;

    BootstrapTable.prototype.horizontalScroll = function () {

        _horizontalScroll.apply(this, Array.prototype.slice.apply(arguments));

        if(this.options.maxHeight) {
            var that = this;
            // horizontal scroll event
            // TODO: it's probably better improving the layouts than binding to scroll event
            if(this.$tableBody.height() > this.options.maxHeight) {
                this.options.height = this.options.maxHeight;
                that.trigger('scroll-body');
                this.$tableBody.off('scroll').on('scroll', function () {
                    if (that.options.maxHeight) {
                        that.$tableHeader.scrollLeft($(this).scrollLeft());
                    }

                    if (that.options.showFooter && !that.options.cardView) {
                        that.$tableFooter.scrollLeft($(this).scrollLeft());
                    }
                });
                this.$tableContainer.css('height', `${this.options.maxHeight}px`);
                this.$tableHeader.show();
                this.resetHeader();
                const scrollW = getScrollbarWidth();
                this.resetView();
                setTimeout(()=>{
                    const w = this.$tableBody.width();
                    this.$tableHeader.children().css('width', `${w - scrollW}px`);
                }, 500);
            }

        }
    };
    BootstrapTable.prototype.init = function () {

        _init.apply(this, Array.prototype.slice.apply(arguments));

        this.horizontalScroll();
    }
})(jQuery);

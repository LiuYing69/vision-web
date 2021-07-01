/*
鐢ㄩ€旈」鐩細鑷畾涔夋粴鍔ㄦ潯瀹炵幇
*/
(function (win, doc, $) {
    // 瀹氫箟鐨勬粴鍔ㄦ潯鐨勬瀯閫犲嚱鏁�
    function CusScrollBar(options) {
        // 鍑芥暟鐨勮皟鐢�
        this._init(options);
    }
    // 瀵硅薄鐨勫悎骞�
    $.extend(CusScrollBar.prototype, {
        _init: function (options) {
            // 闂寘
            var self = this;
            // 鍒濆鍖栧弬鏁�
            self.options = {
                scrollDir: 'Y', //婊氬姩鐨勬柟鍚�
                contentSelector: '', //婊氬姩鍐呭鍖洪€夋嫨鍣�
                barSelector: '', //婊氬姩鏉￠€夋嫨鍣�
                sliderSelector: '', //婊氬姩婊戝潡閫夋嫨鍣�
                wheelStep: 100, //婊氬姩姝ラ暱锛堥紶鏍囩Щ鍔ㄤ竴涓嬶紝鍐呭婊氬姩鐨勫箙搴︼級
            }
            // 瑕嗙洊鍙傛暟
            $.extend(true, self.options, options || {});
            self._initDomEvent();
            return self;
        },

        /**
         * 鍒濆鍖朌OM寮曠敤
         * @method _initDomEvent
         * @return {CusScrollBar}
         */
        _initDomEvent: function () {
            var opts = this.options;
            // 婊氬姩鍐呭鍖哄璞★紝蹇呭～椤�
            this.$cont = $(opts.contentSelector);
            // 婊氬姩鏉℃粦鍧楀璞★紝蹇呴』椤�
            this.$slider = $(opts.sliderSelector);
            // 婊氬姩鏉″璞�
            this.$bar = opts.barSelector ? $(opts.barSelector) : self.$slider.parent();
            // 鑾峰彇鏂囨。瀵硅薄
            this.$doc = $(doc);
            // 鑾峰彇鍒濆鍖栨粦鍧楁嫋鍔ㄥ姛鑳�
            this._initSliderDragEvent();
            // 鑾峰彇鍚屾婊戝潡鐨勪綅缃�
            this._bindContentScroll();
            // 鑾峰彇榧犳爣婊氳疆浜嬩欢
            this._bindMousewheel();
            // 鑾峰彇鍐呭鏉ュ畾涔夋粦鍧楃殑楂樺害
            this._initSliderHeight();

        },
        // 鏍规嵁鍐呭鏉ュ畾涔夋粦鍧楃殑楂樺害
        _initSliderHeight: function () {
            var rate = this.$cont.height() / this.$cont[0].scrollHeight;
            var sliderHeight = rate * this.$bar.height();
            this.$slider.css('height', sliderHeight);
        },


        /**
         * 鍒濆鍖栨粦鍧楁嫋鍔ㄥ姛鑳�
         * @return {[Object]} [this]
         */
        _initSliderDragEvent: function () {
            var self = this;
            // 婊戝潡鍏冪礌
            var slider = this.$slider,
                sliderEl = slider[0];
            // 濡傛灉鍏冪礌瀛樺湪
            if (sliderEl) {
                var doc = this.$doc,
                    dragStartPagePostion,
                    dragStartScrollPostion,
                    dragContBarRate;

                function mousemoveHandler(e) {
                    e.preventDefault();
                    if (dragStartPagePostion == null) {
                        return;
                    }
                    //鍐呭寮€濮嬪嵎鏇茬殑楂樺害+rate*(榧犳爣閲婃斁鐨勪綅缃�-寮€濮嬬殑浣嶇疆) == 灏辨槸鍐呭婊戝姩鐨勪綅缃�
                    self.scrollTo(dragStartScrollPostion + (e.pageY - dragStartPagePostion) * dragContBarRate);
                }
                slider.on('mousedown', function (e) {
                    e.preventDefault();
                    // 鑾峰彇榧犳爣鐨勭偣鍑荤殑寮€濮嬩綅缃�
                    dragStartPagePostion = e.pageY;
                    // 鑾峰彇鍐呭鍖哄煙鐨勫悜涓婂嵎鍖虹殑楂樺害
                    dragStartScrollPostion = self.$cont[0].scrollTop;
                    dragContBarRate = self.getMaxScrollPosition() / self.getMaxSliderPosition();
                    // 鐩戝惉鐨刣ocument瀵硅薄
                    doc.on('mousemove.scroll', mousemoveHandler).on('mouseup.scroll', function () {
                        doc.off('.scroll');
                    });
                });
                return self;
            }
        },

        // 璁＄畻婊戝潡鐨勫綋鍓嶄綅缃�
        getSliderPosition: function () {
            var self = this,
                // 婊戝潡鍙互绉诲姩鐨勮窛绂�
                maxSliderPosition = self.getMaxSliderPosition();
            // 婊戝潡绉诲姩鐨勮窛绂�
            return Math.min(maxSliderPosition, maxSliderPosition * self.$cont[0].scrollTop / self.getMaxScrollPosition());
        },

        // 鍐呭鍙粴鍔ㄧ殑楂樺害
        getMaxScrollPosition: function () {
            var self = this;
            return Math.max(self.$cont.height(), self.$cont[0].scrollHeight) - self.$cont.height();

        },

        //婊戝潡鍙Щ鍔ㄧ殑璺濈
        getMaxSliderPosition: function () {
            var self = this;
            return self.$bar.height() - self.$slider.height();
        },

        // 鐩戝惉鍐呭鐨勬粴鍔紝鍚屾婊戝潡鐨勪綅缃�
        _bindContentScroll: function () {
            var self = this;
            self.$cont.on('scroll', function () {
                var sliderEl = self.$slider && self.$slider[0];
                if (sliderEl) {
                    // 璁剧疆婊戝潡鐨勪綅缃�
                    sliderEl.style.top = self.getSliderPosition() + 'px';
                }
            });
            return self;
        },

        // 榧犳爣婊氳疆浜嬩欢
        _bindMousewheel: function () {
            var self = this;
            // on鐩戝惉浜嬩欢锛屽涓簨浠跺埄鐢ㄧ┖鏍煎垎寮€
            self.$cont.on('mousewheel DOMMouseScroll', function (e) {
                e.preventDefault();
                // 鍒ゆ柇鍘熺敓浜嬩欢瀵硅薄鐨勫睘鎬�
                var oEv = e.originalEvent,
                    //鍘熺敓浜嬩欢瀵硅薄,锛堝叾浠栨祻瑙堝櫒璐熸暟鍚戜笅锛宖irefox姝ｆ暟鍚戜笅,鎵€浠ュ湪wheelDelta鍓嶉潰鏈夎礋鏁帮級
                    // 鎯宠杈惧埌鐨勬晥鏋滐紝榧犳爣鍚戜笅婊氬姩锛屽唴瀹瑰悜涓嬭蛋
                    wheelRange = oEv.wheelDelta ? -oEv.wheelDelta / 120 : (oEv.detail || 0) / 3;
                // 璋冪敤scrollTo鏂规硶銆�
                self.scrollTo(self.$cont[0].scrollTop + wheelRange * self.options.wheelStep)
            });
        },

        // 鍐呭鐨勬粦鍔�
        scrollTo: function (positonVal) {
            var self = this;
            self.$cont.scrollTop(positonVal);
        }
    });

    win.CusScrollBar = CusScrollBar;
})(window, document, jQuery)
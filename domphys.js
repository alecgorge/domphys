(function ($) {
	$.physics = {
		frameTime: 10,
		frameDistance: 2,
		parent: $(document)
	};
	$.fn.physics = function (options) {
		var opts = $.extend($.physics, options);
	
		function animateBox (dom, outerHeight, containerHeight) {
			var topAmnt = parseInt(dom.css('top').split('px')[0]);
			var absTop = dom.offset().top;
			btm = absTop + outerHeight;
			
			var nextFrameHeight = opts.frameDistance;
			if(btm >= containerHeight) {
				return;
			}
			else if(btm + opts.frameDistance > containerHeight) {
				nextFrameHeight = containerHeight - btm;
			}
			
			var done = false;
			dom.siblings().each(function () {
				if(done) {
					return;
				}
				/* Find the top right and top left corners of the sibling and compare them
				   to this blocks bottom right and left corners to see if they will overlap. */
				
				var $this = $(this);
				
				// var isSiblingUnderneathX = $this.offset().left + $this.width() > dom.offset().left || $this.offset().left < dom.offset().left + dom.width();

				// resting on top
				// console.log(dom);
				// console.log($this);
				// console.log($this.offset().left + $this.width() > dom.offset().left);
				// console.log($this.offset().left < dom.offset().left + dom.width());
				// console.log(btm);
				// console.log($this.offset().top);
				// console.log(btm < $this.offset().top);
				// console.log((btm == $this.offset().top && ($this.offset().top + $this.outerHeight() >= containerHeight)));
				// console.log($this.offset().left);
				// console.log(dom.offset().left + dom.width());
				// console.log($this.offset().left + $this.width());
				// console.log($this.offset().left + $this.width() <= dom.offset().left + dom.width());
				if((btm < $this.offset().top || (btm == $this.offset().top && ($this.offset().top + $this.outerHeight() >= containerHeight)))
						// is underneath (sibling is poking out to the left)
					    // && ($this.offset().left + $this.width() > dom.offset().left ||
							// is underneath
							// +-----+
							// +-----+
							// +-----+
							// +-----+
					    && ((($this.offset().left + $this.outerHeight() == dom.offset().left + dom.outerHeight()) && (dom.offset().left && $this.offset().left)) ||
							// +-----+
							// +-----+
							//     +-----+
							//     +-----+
							($this.offset().left < dom.offset().left && $this.offset().left + $this.outerHeight() > dom.offset().left))) {
					done = true;
				}
				
				/*test if the sibling is underneath.
				var isSiblingUnderneathY = btm < $this.offset().top;
				
				if(isUnderneathY && isUnderneathX) {
					done = true;
					return;
				}
				else if() {
					
				}
				
				$(this).*/
			});
			
			if(done) {
				return;
			}
			
			dom.css('top', (topAmnt+nextFrameHeight)+"px");
			setTimeout(function () {
				animateBox(dom, outerHeight, containerHeight)
			}, opts.frameTime);
		}
		
		return this.each(function () {
			var $this = $(this);
			
			$this.css('position','relative');
			if($this.css('top').split('px').length != 2) {
				$this.css('top', '0px');
			}
			
			animateBox($this, $this.innerHeight(), (opts.parent[0] == document ? opts.parent.height() : opts.parent.outerHeight(true) - opts.parent.css('margin-bottom').split('px')[0]));
		});
	};
})(jQuery);
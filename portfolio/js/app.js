carousel = {

  init: function() {

    this.$carousel = $('.js-carousel');
    this.$carouselFrame = $('.js-border');
    this.$contactLink = $('.js-contact-text');
    this.$logo = $('.js-logo');
    this.$statusText = $('.js-status-text');

    this.$leftArrow = $('.js-left-arrow');
    this.$rightArrow = $('.js-right-arrow');

    this.introSlideIndex = 0;
    this.contactSlideIndex = 12;
    this.statusText = "";

    this.bindEvents();
  },

  bindEvents: function() {
    var self = this;

    this.$carousel.royalSlider({
      keyboardNavEnabled: true,
      loop: true,
      slidesSpacing: 0,
      numImagesToPreload: 50
    });

    this.slider = this.$carousel.data('royalSlider');

    this.$contactLink.on('click', function() {
      self.warpToSlide(self.contactSlideIndex);
    });

    this.$logo.on('click', function() {
      self.warpToSlide(self.introSlideIndex);
    });

    this.slider.ev.on('rsBeforeAnimStart', function(event) {
      // Update status text before animation between slides start
      self.setStatusText();
    });

    this.$leftArrow.on('click', function() {
      self.slider.prev();
    });

    this.$rightArrow.on('click', function() {
      self.slider.next();
    })
  },

  warpToSlide: function(index) {

    if ((index === this.introSlideIndex && this.currSlideIsIntro()) ||
         index === this.contactSlideIndex && this.currSlideIsContact()) {
      return;
    }

    var self = this;

    var prevIndex = this.getPrevIndex(index);
    var $prevToTargetSlide = this.getSlideByIndex(prevIndex);

    var $currentSlide = this.getSlideByIndex(this.slider.currSlideId);
    var $cloned = $currentSlide.clone();


    this.$carouselFrame.after($cloned);

    $prevToTargetSlide.hide();
    this.$statusText.hide();

    this.jumpTo(prevIndex, function() {
      $cloned.detach();

      $prevToTargetSlide.before($cloned);

      self.slider.ev.on('rsAfterSlideChange', function(event) {
        self.slider.ev.off('rsAfterSlideChange');
        $prevToTargetSlide.show();
        self.$statusText.show();
        $cloned.remove();
      });

      setTimeout(function() {
        self.slider.next();
      }, 70)
    });

  },

  jumpTo: function(index, cb) {
    var self = this;
    this.slider.st.transitionSpeed = 0;
    this.slider.goTo(index);
    setTimeout(function() {
      self.slider.st.transitionSpeed = 600;
      cb();
    }, 150);
  },

  setStatusText: function() {
    var slideNumber = this.slider.currSlideId;
    var slideCount = this.slider.numSlides-2;

    var $currSlide = this.getSlideByIndex(slideNumber);

    if ($currSlide.hasClass('landing__carousel-item-project')) {
      var project_name = $currSlide.attr('data-name');
      this.$statusText.text(slideNumber + " / " + slideCount + " - " + project_name);
    } else {
      this.$statusText.text("");
    }
  },

  getSlideByIndex: function(index) {
    return $(this.slider.slidesJQ[index]).children().first();
  },

  getNextIndex: function(index) {
    return (index + 1) % this.slider.numSlides;
  },

  getPrevIndex: function(index) {
    var prevIndex = index - 1;
    if (prevIndex === -1) {
      return this.slider.numSlides - 1;
    } else {
      return prevIndex;
    }
  },

  currSlideIsContact: function() {
    return this.getSlideByIndex(this.slider.currSlideId).hasClass('js-contact-page');
  },

  currSlideIsIntro: function() {
    return this.getSlideByIndex(this.slider.currSlideId).hasClass('js-intro-page');
  }

};

$(document).ready(function() {
  carousel.init();
});



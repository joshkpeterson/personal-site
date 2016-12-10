// Don't take this as a code sample. Largely adapted from a Jekyll template I didn't code. -Josh

var Tabs = (function() {
  var s;

  return {
    settings: {
      tabs: document.getElementsByClassName('tabs__item'),
      tab: document.getElementsByClassName('tab')
    },

    init: function() {
      s = this.settings;
      this.display();
      this.click();
      this.configureAndroid();

      var gradientElement = document.getElementById('gradient');
      if (gradientElement !== null) { this.initGradient(); }
      console.log('Don\'t take this as a code sample. Largely adapted from a Jekyll template I didn\'t code. -Josh')
    },

    configureAndroid: function() {
      console.log('configuring');
      var userAgent = navigator.userAgent || navigator.vendor || window.opera;
      
      if (/android/i.test(userAgent)) {
        var elements = document.querySelectorAll('.no-android');
        console.log(elements);
        for (i = 0; i < elements.length; ++i) {
          elements[i].style.mixBlendMode = "normal";
        }
      }
    },

    initGradient: function() {
      console.log('init');
      var colors = new Array(
        [62,35,255],
        [60,255,60],
        [255,35,98],
        [45,175,230],
        [255,0,255],
        [255,128,0]);

      var step = 0;
      //color table indices for: 
      // current color left
      // next color left
      // current color right
      // next color right
      var colorIndices = [0,1,2,3];

      //transition speed
      var gradientSpeed = 0.002;

      function updateGradient()
      {
        
        // if ( $===undefined ) return;
        
      var c0_0 = colors[colorIndices[0]];
      var c0_1 = colors[colorIndices[1]];
      var c1_0 = colors[colorIndices[2]];
      var c1_1 = colors[colorIndices[3]];

      var istep = 1 - step;
      var r1 = Math.round(istep * c0_0[0] + step * c0_1[0]);
      var g1 = Math.round(istep * c0_0[1] + step * c0_1[1]);
      var b1 = Math.round(istep * c0_0[2] + step * c0_1[2]);
      var color1 = "rgb("+r1+","+g1+","+b1+")";

      var r2 = Math.round(istep * c1_0[0] + step * c1_1[0]);
      var g2 = Math.round(istep * c1_0[1] + step * c1_1[1]);
      var b2 = Math.round(istep * c1_0[2] + step * c1_1[2]);
      var color2 = "rgb("+r2+","+g2+","+b2+")";

      // document.getElementById('gradient').style.background = "linear-gradient(to right, " + color1 + ", " + color2 + ")";

      // $('.container--outer').css({
      //   background: "-webkit-gradient(linear, left top, right top, from("+color1+"), to("+color2+"))"}).css({
      //    background: "-moz-linear-gradient(left, "+color1+" 0%, "+color2+" 100%)"});
       

      document.getElementById('gradient').style.background = "linear-gradient(to right, " + color1 + ", " + color2 + ")";
      // document.getElementById('gradient').style.background = "gradient(linear, left top, right top, from("+color1+"), to("+color2+"))";
      // linear-gradient(to right, blue, white);

        step += gradientSpeed;
        if ( step >= 1 )
        {
          step %= 1;
          colorIndices[0] = colorIndices[1];
          colorIndices[2] = colorIndices[3];
          
          //pick two new target color indices
          //do not pick the same as the current one
          colorIndices[1] = ( colorIndices[1] + Math.floor( 1 + Math.random() * (colors.length - 1))) % colors.length;
          colorIndices[3] = ( colorIndices[3] + Math.floor( 1 + Math.random() * (colors.length - 1))) % colors.length;
          
        }
      }

      setInterval(updateGradient,24);
    },

    display: function() {
      if (s.tab.length) {
        [].forEach.call(s.tab, function(tab) {
          tab.style.display = 'none';
        });
        s.tab[0].style.display = 'block';
        s.tab[0].classList.add('active');
        s.tabs[0].classList.add('active');
      }
    },

    click: function() {
      if (s.tabs.length) {
        var currentIdx = 0,
            prevIdx = currentIdx;

        [].forEach.call(s.tabs, function(tab, idx) {
          tab.addEventListener('click', function() {
            prevIdx = currentIdx;
            currentIdx = idx;

            if (prevIdx !== currentIdx) {
              s.tab[prevIdx].style.display = 'none';
              s.tab[prevIdx].classList.remove('active');
              s.tabs[prevIdx].classList.remove('active');
              s.tab[currentIdx].style.display = 'block';
              s.tab[currentIdx].classList.add('active');
              s.tabs[currentIdx].classList.add('active');
            }
          });
        });
      }
    }

  }
})();

var Preview = (function() {
  var s;

  return {
    settings: {
      img: document.getElementsByClassName('preview__img'),
      post: document.getElementsByClassName('preview')
    },

    init: function() {
      s = this.settings;
      this.display();
      this.mouseenter();
    },

    display: function() {
      if (s.img.length) {
        [].forEach.call(s.img, function(img) {
          img.style.display = 'none';
        });
        s.img[0].style.display = 'block';
      }
    },

    mouseenter: function() {
      if (s.post.length) {
        var currentIdx = 0,
            prevIdx = currentIdx;

        [].forEach.call(s.post, function(preview, idx) {
          preview.addEventListener('mouseenter', function() {
            prevIdx = currentIdx;
            currentIdx = idx;

            if (prevIdx !== currentIdx) {
              s.img[prevIdx].style.display = 'none';
              s.img[currentIdx].style.display = 'block';
            }
          });
        });
      }
    }
  }
})();

var wow = new WOW({
  animateClass: 'fade-in'
});

document.addEventListener('DOMContentLoaded', function() {
  Tabs.init();
  Preview.init();
  wow.init();
});

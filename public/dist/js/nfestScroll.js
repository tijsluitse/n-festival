var nfest=nfest||{};nfest.scrollToNext=function(){var o=function(){return self.pageYOffset?self.pageYOffset:document.documentElement&&document.documentElement.scrollTop?document.documentElement.scrollTop:document.body.scrollTop?document.body.scrollTop:0},t=function(o){for(var t=document.getElementById(o),e=t.offsetTop,n=t;n.offsetParent&&n.offsetParent!=document.body;)n=n.offsetParent,e+=n.offsetTop;return e},e=function(e){var n=o(),r=t(e),s=r>n?r-n:n-r;if(100>s)return void scrollTo(0,r);var l=Math.round(s/100);l=20;var a=Math.round(s/25),c=r>n?n+a:n-a,i=0;if(r>n)for(var f=n;r>f;f+=a)setTimeout("window.scrollTo(0, "+c+")",i*l),c+=a,c>r&&(c=r),i++;else for(var f=n;f>r;f-=a)setTimeout("window.scrollTo(0, "+c+")",i*l),c-=a,r>c&&(c=r),i++},n=function(){var o=document.querySelector(".introPage");localStorage.getItem("introPage")||(o.classList.remove("hide"),o.addEventListener("animationend",function(){setTimeout(function(){o.classList.add("hide")},1e3)}),setTimeout(function(){nfest.scrollToNext.smoothScroll("menu")},4e3),localStorage.setItem("introPage","true"))},r=function(){var o=document.getElementById("currentEvents"),t=nfest.helpers.hasClass(o,"scrollNow");t&&nfest.scrollToNext.smoothScroll("pastEvents")};return{smoothScroll:e,currentYPosition:o,elmYPosition:t,introEnd:n,toCurrentEvents:r}}(),"/"==window.location.pathname&&nfest.scrollToNext.introEnd(),"/day1"!=window.location.pathname&&"/day2"!=window.location.pathname&&"/program"!=window.location.pathname||nfest.scrollToNext.toCurrentEvents();
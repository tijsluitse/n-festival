var nfest=nfest||{};nfest.detail=function(){var e=function(){nfest.detail.recommendations()},t=function(){for(var e=document.querySelectorAll(".recObj"),t=document.querySelector(".eventInfo").id,n=(document.querySelector(".eventInfo").dataset.theme,[].slice.call(document.querySelectorAll(".recObj"))),r=document.querySelector(".reloadRecommendations"),o=(e.length-1,3),a=[],c=0;c<n.length;c++)a.push(n[c].id);var l=a.indexOf(t);a.splice(l,1);var i=function(){for(var e=[];e.length<o;){for(var t=Math.floor(Math.random()*a.length),n=!1,r=0;r<e.length;r++)if(e[r]==t){n=!0;break}n||(e[e.length]=t)}for(var r=0;r<e.length;r++){var c="#"+a[e[r]];document.querySelector(c).classList.remove("hide")}};r.onclick=function(){var e=document.querySelectorAll(".recObj"),t=document.querySelector(".reloadIcon");t.classList.add("reloadAnimation"),t.addEventListener("animationend",function(){t.classList.remove("reloadAnimation")}),Array.prototype.forEach.call(e,function(e){e.classList.add("hide")}),i()},i()};return{detailLauncher:e,recommendations:t}}(),nfest.detail.detailLauncher();
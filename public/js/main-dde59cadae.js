!function(){"use strict";if(!document.querySelectorAll)return!1;var e,t,n=document.querySelectorAll("[data-toggle]");for(t=function(t){var n,o,i=t.getAttribute("data-toggle")||"active",s=t.getAttribute("data-toggle-target");n="is-"+i,o=function(e,t){var n=t.className,o=new RegExp("(?:^|\\s)"+e+"(?!\\S)");o.test(n)?t.className=n.replace(o,""):t.className+=" "+e},t.onclick=function(){var t="true"===this.getAttribute("aria-expanded"),i=document.querySelectorAll(s);for(this.setAttribute("aria-expanded",!t),o(n,this),e=0;e<i.length;e+=1)o(n,i[e])}},e=0;e<n.length;e+=1)t(n[e])}(),function(){"use strict";var e,t,n,o,i,s,c=document.documentElement,a=".sticky";return document.querySelector&&c.getBoundingClientRect?(s=document.querySelector(a),t=function(){var e,t,n=s.getBoundingClientRect();return e=n.bottom-n.top,t=n.top+(window.pageYOffset||c.scrollTop)-(c.clientTop||0),{height:e,offset:t}}(),e=document.createElement("div"),e.style.display="none",e.style.height=t.height+"px",s.parentNode.insertBefore(e,s),o=function(){var e=["-webkit-","-moz-","-ms-","-o-",""],t="position:",n="sticky",o=document.createElement("a"),i=o.style;return i.cssText=t+e.join(n+";"+t).slice(0,-t.length),-1!==i.position.indexOf(n)}(),o||(c.className+=" not-sticky"),n=function(){var n,a=(window.pageYOffset||c.scrollTop)-(c.clientTop||0);n=a-t.offset,n>=0&&!i?(i=!0,s.className+=" is-fixed",o||(e.style.display="block")):0>=n&&i&&(i=!1,s.className=s.className.replace(/(?:^|\s)is-fixed(?!\S)/,""),o||(e.style.display="none"))},n(),void(window.addEventListener?window.addEventListener("scroll",n,!1):window.attachEvent&&window.attachEvent("onscroll",n))):!1}();
!function(){function e(e){return e&&e.__esModule?e.default:e}var t="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},n={},s={},i=t.parcelRequirecf35;null==i&&((i=function(e){if(e in n)return n[e].exports;if(e in s){var t=s[e];delete s[e];var i={id:e,exports:{}};return n[e]=i,t.call(i.exports,i,i.exports),i.exports}var r=new Error("Cannot find module '"+e+"'");throw r.code="MODULE_NOT_FOUND",r}).register=function(e,t){s[e]=t},t.parcelRequirecf35=i);var r=i("bpxeT"),o=i("8nrFW"),a=i("2TvXO"),l=i("5C21v"),c=i("cY1yb"),u={myLibrarySection:document.getElementById("my-library"),libraryContent:document.querySelector(".js-my-library-content"),genreList:document.querySelector(".js-my-library-genre-list"),moviesList:document.querySelector(".js-my-library-movies-list"),loadMoreButton:document.querySelector(".js-my-library-load-more-button")},d=i("bxNz7");var y=i("kvC6y");i("9RsV7");var m=i("8MBJY"),p=i("a2hTj"),v=function(){"use strict";function t(n){var s=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null;e(m)(this,t),this.select=document.querySelector(n),this.selectedValue=this.select.firstElementChild,this.optionList=this.select.lastElementChild,this.optionListFirstElementChild=this.optionList.firstElementChild,this.optionData=s,this.optionListValue=null}return e(p)(t,[{key:"addEventListenerSelect",value:function(){this.select.classList.add("cs-select"),this.selectedValue.classList.add("cs-selected-option"),this.optionList.classList.add("cs-option-list"),this.optionListFirstElementChild.classList.add("cs-option"),this.selectedValue.addEventListener("mouseenter",this.onSelectHover.bind(this)),this.selectedValue.addEventListener("mouseleave",this.onSelectLostHover.bind(this)),this.optionList.addEventListener("mouseenter",this.onSelectHover.bind(this)),this.optionList.addEventListener("mouseleave",this.onSelectLostHover.bind(this)),this.optionData&&this.optionList.insertAdjacentHTML("beforeend",this.optionData.map((function(e){var t=e.value,n=e.text;return'<div class="cs-option" data-value="'.concat(t,'" class="">').concat(n,"</div>")})).join(""))}},{key:"onSelectHover",value:function(e){this.select.classList.add("cs-select-active"),this.optionList.addEventListener("click",this.onOptionClick.bind(this))}},{key:"onSelectLostHover",value:function(e){this.select.classList.remove("cs-select-active"),this.optionList.removeEventListener("click",this.onOptionClick.bind(this))}},{key:"onOptionClick",value:function(e){this.optionListValue=e.target.textContent,this.selectedValue.firstChild.textContent=this.optionListValue,this.select.classList.remove("cs-select-active"),this.optionList.removeEventListener("click",this.onOptionClick)}}]),t}(),h=new(0,y.Loader),f="All",L=0,b=0,g=0,x=[],S=l.default.load(c.STORAGE_KEY.myLibraryMoviesList);function k(e){if(f=e.target.textContent,L=0,"All Genres"===f)return f="All Genres",void E(S);E(x=S.filter((function(e){return e.genres.some((function(e){return e.name===f}))})))}function E(e){return C.apply(this,arguments)}function C(){return(C=e(r)(e(a).mark((function t(n){return e(a).wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(h.onShow(),b=0,g=6,u.moviesList.innerHTML="",u.loadMoreButton.style.display="none",!(n.length>6)){e.next=9;break}u.loadMoreButton.style.display="block",u.loadMoreButton.addEventListener("click",M),O(b,g,n),e.next=12;break;case 9:return e.next=11,(0,d.createMarkupFilmsCards)(n);case 11:u.moviesList.innerHTML=e.sent;case 12:h.onClose();case 13:case"end":return e.stop()}}),t)})))).apply(this,arguments)}function M(){h.onShow(),u.loadMoreButton.blur(),O(b+=6,g+=6,"All Genres"===f?S:x),h.onClose()}function O(e,t,n){return T.apply(this,arguments)}function T(){return(T=e(r)(e(a).mark((function t(n,s,i){var r,o;return e(a).wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(L+=1,!(i.length/6>L)){e.next=11;break}return r=i.slice(n,s),e.t0=u.moviesList,e.next=7,(0,d.createMarkupFilmsCards)(r);case 7:e.t1=e.sent,e.t0.insertAdjacentHTML.call(e.t0,"beforeend",e.t1),e.next=18;break;case 11:return o=i.slice(n,s),e.t2=u.moviesList,e.next=15,(0,d.createMarkupFilmsCards)(o);case 15:e.t3=e.sent,e.t2.insertAdjacentHTML.call(e.t2,"beforeend",e.t3),u.loadMoreButton.style.display="none";case 18:case"end":return e.stop()}}),t)})))).apply(this,arguments)}!function(){if(0===(null==S?void 0:S.length))u.genreList.removeEventListener("click",k),u.myLibrarySection.classList.add("my-library-content-text-message-section"),u.libraryContent.innerHTML=' \n    <p class="my-library-content-text-message">\n        <span>OOPS...</span>\n        <span>We are very sorry!</span>\n        <span>You don’t have any movies at your library.</span>\n    </p>\n    <a class="button-accent my-library-content-text-message-button" href="./catalog.html">Search movie</a>\n    ';else if(S){var t=S.reduce((function(t,n){return e(o)(t).concat(e(o)(n.genres))}),[]).filter((function(e,t,n){return t===n.findIndex((function(t){return t.id===e.id&&t.name===e.name}))})),n=t.map((function(e){return{value:e.id,text:e.name}}));new v(".js-select-my-library-genre-list",n).addEventListenerSelect(),document.querySelector(".select-my-library-option-list").addEventListener("click",k),E(S)}else u.genreList.removeEventListener("click",k),u.myLibrarySection.classList.add("my-library-content-text-message-section"),u.libraryContent.innerHTML=' \n    <p class="my-library-content-text-message">\n        <span>OOPS...</span>\n        <span>We are very sorry!</span>\n        <span>You don’t have any movies at your library.</span>\n    </p>\n    <a class="button-accent my-library-content-text-message-button" href="./catalog.html">Search movie</a>\n    '}(),document.addEventListener("click",(function(e){if("add-remove-to-my-library"===e.target.dataset.action){var t=l.default.load(c.STORAGE_KEY.myLibraryMoviesList);0===t.length&&(u.myLibrarySection.classList.add("my-library-content-text-message-section"),u.libraryContent.innerHTML=' \n    <p class="my-library-content-text-message">\n        <span>OOPS...</span>\n        <span>We are very sorry!</span>\n        <span>You don’t have any movies at your library.</span>\n    </p>\n    <a class="button-accent my-library-content-text-message-button" href="./catalog.html">Search movie</a>\n    '),E(t)}})),i("cs7FV"),i("2jzSA"),i("4F07H"),i("8e9SS"),i("etUX2"),i("hkeON")}();
//# sourceMappingURL=my-library.57967226.js.map

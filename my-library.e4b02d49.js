var e="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},t={},n={},s=e.parcelRequirecf35;null==s&&((s=function(e){if(e in t)return t[e].exports;if(e in n){var s=n[e];delete n[e];var i={id:e,exports:{}};return t[e]=i,s.call(i.exports,i,i.exports),i.exports}var o=new Error("Cannot find module '"+e+"'");throw o.code="MODULE_NOT_FOUND",o}).register=function(e,t){n[e]=t},e.parcelRequirecf35=s);var i=s("2xHB1"),o=s("78eZQ");const a={myLibrarySection:document.getElementById("my-library"),libraryContent:document.querySelector(".js-my-library-content"),genreList:document.querySelector(".js-my-library-genre-list"),moviesList:document.querySelector(".js-my-library-movies-list"),loadMoreButton:document.querySelector(".js-my-library-load-more-button")};var r=s("1nG8V");var l=s("gjiCh");s("lewhg");class c{constructor(e,t=null){this.select=document.querySelector(e),this.selectedValue=this.select.firstElementChild,this.optionList=this.select.lastElementChild,this.optionListFirstElementChild=this.optionList.firstElementChild,this.optionData=t,this.optionListValue=null}addEventListenerSelect(){this.select.classList.add("cs-select"),this.selectedValue.classList.add("cs-selected-option"),this.optionList.classList.add("cs-option-list"),this.optionListFirstElementChild.classList.add("cs-option"),this.selectedValue.addEventListener("mouseenter",this.onSelectHover.bind(this)),this.selectedValue.addEventListener("mouseleave",this.onSelectLostHover.bind(this)),this.optionList.addEventListener("mouseenter",this.onSelectHover.bind(this)),this.optionList.addEventListener("mouseleave",this.onSelectLostHover.bind(this)),this.optionData&&this.optionList.insertAdjacentHTML("beforeend",this.optionData.map((({value:e,text:t})=>`<div class="cs-option" data-value="${e}" class="">${t}</div>`)).join(""))}onSelectHover(e){this.select.classList.add("cs-select-active"),this.optionList.addEventListener("click",this.onOptionClick.bind(this))}onSelectLostHover(e){this.select.classList.remove("cs-select-active"),this.optionList.removeEventListener("click",this.onOptionClick.bind(this))}onOptionClick(e){this.optionListValue=e.target.textContent,this.selectedValue.firstChild.textContent=this.optionListValue,this.select.classList.remove("cs-select-active"),this.optionList.removeEventListener("click",this.onOptionClick)}}const d=new(0,l.Loader);let m,y="All",u=0,h=0,p=0,L=[];const v=i.default.load(o.STORAGE_KEY.myLibraryMoviesList);function b(e){if(y=e.target.textContent,u=0,"All Genres"===y)return y="All Genres",void f(v);L=v.filter((e=>e.genres.some((e=>e.name===y)))),f(L)}async function f(e){d.onShow(),h=0,p=6,a.moviesList.innerHTML="",a.loadMoreButton.style.display="none",e.length>6?(a.loadMoreButton.style.display="block",a.loadMoreButton.addEventListener("click",g),S(h,p,e)):a.moviesList.innerHTML=await(0,r.createMarkupFilmsCards)(e),d.onClose()}function g(){d.onShow(),a.loadMoreButton.blur(),h+=6,p+=6,S(h,p,"All Genres"===y?v:L),d.onClose()}async function S(e,t,n){if(u+=1,m=n.length/6,m>u){const s=n.slice(e,t);a.moviesList.insertAdjacentHTML("beforeend",await(0,r.createMarkupFilmsCards)(s))}else{const s=n.slice(e,t);a.moviesList.insertAdjacentHTML("beforeend",await(0,r.createMarkupFilmsCards)(s)),a.loadMoreButton.style.display="none"}}!function(){if(0===v?.length)a.genreList.removeEventListener("click",b),a.myLibrarySection.classList.add("my-library-content-text-message-section"),a.libraryContent.innerHTML=' \n    <p class="my-library-content-text-message">\n        <span>OOPS...</span>\n        <span>We are very sorry!</span>\n        <span>You don’t have any movies at your library.</span>\n    </p>\n    <a class="button-accent my-library-content-text-message-button" href="./catalog.html">Search movie</a>\n    ';else if(v){const e=v.reduce(((e,t)=>[...e,...t.genres]),[]).filter(((e,t,n)=>t===n.findIndex((t=>t.id===e.id&&t.name===e.name)))),t=e.map((({id:e,name:t})=>({value:e,text:t})));new c(".js-select-my-library-genre-list",t).addEventListenerSelect(),document.querySelector(".select-my-library-option-list").addEventListener("click",b),f(v)}else a.genreList.removeEventListener("click",b),a.myLibrarySection.classList.add("my-library-content-text-message-section"),a.libraryContent.innerHTML=' \n    <p class="my-library-content-text-message">\n        <span>OOPS...</span>\n        <span>We are very sorry!</span>\n        <span>You don’t have any movies at your library.</span>\n    </p>\n    <a class="button-accent my-library-content-text-message-button" href="./catalog.html">Search movie</a>\n    '}(),document.addEventListener("click",(function(e){if("add-remove-to-my-library"===e.target.dataset.action){const e=i.default.load(o.STORAGE_KEY.myLibraryMoviesList);0===e.length&&(a.myLibrarySection.classList.add("my-library-content-text-message-section"),a.libraryContent.innerHTML=' \n    <p class="my-library-content-text-message">\n        <span>OOPS...</span>\n        <span>We are very sorry!</span>\n        <span>You don’t have any movies at your library.</span>\n    </p>\n    <a class="button-accent my-library-content-text-message-button" href="./catalog.html">Search movie</a>\n    '),f(e)}})),s("8FnLx"),s("6Ju3h"),s("6HA5D"),s("iuRNH"),s("jnjzE"),s("i04RF");
//# sourceMappingURL=my-library.e4b02d49.js.map

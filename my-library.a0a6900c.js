!function(){var e=document.querySelectorAll(".js-header-nav-link"),t=window.location.pathname;e.forEach((function(e){var a=new URL(e.href).pathname;"/cinemania/"===t&&"/cinemania/index.html"===a&&e.classList.add("active"),a===t&&e.classList.add("active")}));var a,c=document.querySelector(".js-theme-switch-toggle"),s=document.querySelector("body"),i="light-theme",n="dark-theme",d="theme";c.addEventListener("change",(function(e){var t="";e.currentTarget.checked?(t=i,s.classList.remove(n),s.classList.add(t)):(t=n,s.classList.add(t),s.classList.remove(i));localStorage.setItem(d,t)})),(a=localStorage.getItem(d))?s.classList.add(a):s.classList.add(n),a===i&&c.setAttribute("checked",!0)}();
//# sourceMappingURL=my-library.a0a6900c.js.map

const e=document.querySelectorAll(".js-header-nav-link"),t=window.location.pathname;e.forEach((e=>{const a=new URL(e.href).pathname;"/cinemania/"===t&&"/index.html"===a&&e.classList.add("active"),a===t&&e.classList.add("active")}));const a=document.querySelector(".js-theme-switch-toggle"),c=document.querySelector("body"),s="light-theme",n="dark-theme";a.addEventListener("change",(function(e){let t="";e.currentTarget.checked?(t=s,c.classList.remove(n),c.classList.add(t)):(t=n,c.classList.add(t),c.classList.remove(s));localStorage.setItem("theme",t)})),function(){const e=localStorage.getItem("theme");e?c.classList.add(e):c.classList.add(n),e===s&&a.setAttribute("checked",!0)}();
//# sourceMappingURL=catalog.77350e0b.js.map

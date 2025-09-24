
// app.js - general behavior: login guard, active nav, localStorage helpers, delete confirm, animations
document.addEventListener('DOMContentLoaded', ()=>{

  // redirect to login if not authenticated (except login page)
  if (!location.pathname.endsWith('index.html') && !location.pathname.endsWith('/')){
    if (!sessionStorage.getItem('loggedIn')){
      location.href = 'index.html';
      return;
    }
  }

  // active nav links
  const links = document.querySelectorAll('.menu a');
  links.forEach(a=>{
    if (a.href === location.href || location.href.endsWith(a.getAttribute('href'))) a.classList.add('active');
    a.addEventListener('click', ()=>{ links.forEach(x=>x.classList.remove('active')); a.classList.add('active'); });
  });

  // logout link behavior
  const logout = document.querySelectorAll('a[href="index.html"]');
  logout.forEach(l => { l.addEventListener('click', ()=> sessionStorage.removeItem('loggedIn')); });

  // animate dashboard cards if present
  const cards = document.querySelectorAll('.card');
  cards.forEach((c,i)=>{ c.style.animationDelay = (i*120)+'ms'; c.classList.add('fade-in'); });

});

// storage helpers
function loadItems(){ try{ return JSON.parse(localStorage.getItem('st_items')||'[]') }catch(e){return[]} }
function saveItems(items){ localStorage.setItem('st_items', JSON.stringify(items)) }
function loadSales(){ try{ return JSON.parse(localStorage.getItem('st_sales')||'[]') }catch(e){return[]} }
function saveSales(sales){ localStorage.setItem('st_sales', JSON.stringify(sales)) }

// delete confirm helper
function confirmDelete(cb){ if (confirm('Are you sure you want to delete this item?')) cb(); }

// simple currency format
function formatCurr(n){ return '₹'+Number(n).toLocaleString('en-IN', {minimumFractionDigits:2, maximumFractionDigits:2}) }

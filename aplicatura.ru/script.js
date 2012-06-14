var current=1;
function showpage(id){
var page=['','#about','#study1','#study2','#contacts'];document.location.replace(page[id]);try {pageTracker._trackPageview();} catch(err) {}
var div=document.getElementById('page'+current);div.style.zIndex=2;div=document.getElementById('page'+id);div.style.zIndex=4;div=document.getElementById('img'+Math.round(current*0.75));div.style.zIndex='';div=document.getElementById('img'+Math.round(id*0.75));div.style.zIndex=4;current=id;}
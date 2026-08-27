let current=JSON.parse(localStorage.getItem("jhonny_current")||"null");

function users(){
 return JSON.parse(localStorage.getItem("jhonny_users")||"[]");
}
function saveUsers(u){
 localStorage.setItem("jhonny_users",JSON.stringify(u));
}
function show(id){
 document.querySelectorAll(".page").forEach(x=>x.classList.remove("active"));
 document.getElementById(id).classList.add("active");
 if(id==="account")account();
 if(id==="leaderboard")leaderboard();
 window.scrollTo(0,0);
}
function register(){
 let u=regUser.value.trim(),e=regEmail.value.trim(),p=regPass.value;
 if(!u||!e||!p)return alert("Please complete all fields");
 if(p!==regConfirm.value)return alert("Passwords do not match");
 let list=users();
 if(list.some(x=>x.user.toLowerCase()===u.toLowerCase()))
   return alert("Username already exists");
 list.push({user:u,email:e,pass:p,points:1000});
 saveUsers(list);
 alert("Registration successful! You received 1,000 demo points.");
 loginFields(u,p);
}
function loginFields(u,p){
 loginUser.value=u;loginPass.value=p;login();
}
function login(){
 let u=loginUser.value.trim(),p=loginPass.value;
 let list=users(),x=list.find(a=>a.user===u&&a.pass===p);
 if(!x)return alert("Invalid username or password");
 current=x;
 localStorage.setItem("jhonny_current",JSON.stringify(current));
 updateHeader();
 show("home");
}
function logout(){
 current=null;
 localStorage.removeItem("jhonny_current");
 updateHeader();
 show("home");
}
function updateHeader(){
 guestBtns.classList.toggle("hidden",!!current);
 userBtns.classList.toggle("hidden",!current);
 if(current)hello.textContent="Hi, "+current.user;
}
function account(){
 if(!current){show("login");return}
 accountName.textContent=current.user;
 accountEmail.textContent=current.email;
 balance.textContent=current.points.toLocaleString();
}
function googleDemo(){
 alert("Google Sign-In is a demo button. Real Google OAuth requires your own Google Cloud credentials and backend.");
}
function play(game){
 if(!current){
   alert("Please register or login first.");
   show("login");
   return;
 }
 let reward=Math.floor(Math.random()*151)+25;
 current.points+=reward;
 let list=users();
 let x=list.find(a=>a.user===current.user);
 if(x)x.points=current.points;
 saveUsers(list);
 localStorage.setItem("jhonny_current",JSON.stringify(current));
 modalTitle.textContent=game;
 modalContent.innerHTML="<h1>★ "+reward+" POINTS</h1><p>You played "+game+".</p><p>Demo points have been added to your account.</p><button class='gold' onclick='closeModal();account();show(\"account\")'>View Account</button>";
 modal.classList.remove("hidden");
}
function closeModal(){modal.classList.add("hidden")}
function leaderboard(){
 let list=users().sort((a,b)=>b.points-a.points).slice(0,10);
 leaders.innerHTML=list.length?list.map((x,i)=>`<div style="padding:15px;border-bottom:1px solid #333"><b>#${i+1}</b> ${x.user}<span style="float:right;color:#ffe000">${x.points.toLocaleString()}</span></div>`).join(""):"No players yet.";
}
updateHeader();

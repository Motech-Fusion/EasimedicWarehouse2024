"use strict";(self.webpackChunk_2023MelaChatWebApp=self.webpackChunk_2023MelaChatWebApp||[]).push([[264],{1264:(se,P,s)=>{s.r(P),s.d(P,{AuthenticationModule:()=>ae});var p=s(6814),i=s(95),F=s(848),e=s(9212),b=s(3218),U=s(1006),q=s(4221),M=s(1552),O=s(2563);let J=(()=>{class n{toggleDropdown(){this.isDropdownOpen=!this.isDropdownOpen}selectCountryCode(t){this.selectedCountryCode=t,this.isDropdownOpen=!1}constructor(t,r,o,a,l){this.router=t,this.fireStoreCollectionsService=r,this.store=o,this.alertService=a,this.afMessaging=l,this.email="",this.password="",this.showPassword=!1,this.spinner=!1,this.PhoneContentFormControl=new i.NI("",[i.kI.required,i.kI.pattern(/^\d{9}$/)]),this.PasswordContentFormControl=new i.NI,this.phoneNumber="",this.selectedCountryCode="27",this.isDropdownOpen=!1,this.countryCodes=["1","44","81","27","33"]}ngOnInit(){this.PhoneContentFormControl.valueChanges.subscribe(t=>{this.phoneNumber=t}),this.PasswordContentFormControl.valueChanges.subscribe(t=>{this.password=t})}navigateTo(t){this.router.navigate([`authentication/${t}`])}signIn(t){t.preventDefault(),this.spinner=!0,this.fireStoreCollectionsService.signInWithPhoneNumber("+27"+this.phoneNumber,this.password).then(r=>{this.spinner=!1;var o=r;this.store.dispatch((0,F.lx)({user:o})),localStorage.setItem("user",JSON.stringify(o)),this.router.navigate(""==o.image?["/authentication","choose-image"]:["home"],{queryParams:{InterestedIn:o.InterestedIn,availability:o.availability,bio:o.bio,blocked:o.blocked,created:o.created,dob:o.dob,friends:o.friends,image:o.image,language:o.language,location:o.location,name:o.name,notificationToken:o.notificationToken,password:o.password,phone:o.phone,requests:o.requests,suspended:o.suspended,username:o.username}})}).catch(r=>{this.spinner=!1,this.alertService.error("Invalid username or password, please enter valid info")}),setTimeout(()=>{this.spinner=!1},6e3)}static#e=this.\u0275fac=function(r){return new(r||n)(e.Y36(b.F0),e.Y36(U.d),e.Y36(q.yh),e.Y36(M.c),e.Y36(O.BG))};static#t=this.\u0275cmp=e.Xpm({type:n,selectors:[["app-login"]],decls:35,vars:6,consts:[[1,"bg-gray-50","min-h-screen","flex","items-center","justify-center"],[1,"bg-gray-100","flex","rounded-2xl","shadow-lg","max-w-3xl","p-5","items-center"],[1,"md:w-1/2","px-8","md:px-16"],[1,"font-bold","text-2xl","text-[#002D74]"],[1,"text-xs","mt-4","text-[#002D74]"],["action","",1,"flex","flex-col","gap-4"],[1,"flex"],[1,"inline-flex","items-center","px-3","text-sm","text-gray-900","bg-gray-200","border","border-e-0","border-gray-300","rounded-s-md","dark:bg-gray-600","dark:text-gray-400","dark:border-gray-600"],[1,"w-4","h-4","text-gray-500","dark:text-gray-400"],["max","9","maxlength","9","type","text","id","phone","placeholder","Phone number",1,"rounded-none","rounded-e-lg","bg-gray-50","border","border-gray-300","text-gray-900","focus:ring-blue-500","focus:border-blue-500","block","flex-1","min-w-0","w-full","text-sm","p-2.5","dark:bg-gray-700","dark:border-gray-600","dark:placeholder-gray-400","dark:text-white","dark:focus:ring-blue-500","dark:focus:border-blue-500",3,"formControl"],["fill","none","viewBox","0 0 24 24","stroke","currentColor",1,"w-4","h-4","text-gray-500","dark:text-gray-400"],["stroke-linecap","round","stroke-linejoin","round","stroke-width","2","d","M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"],["type","password","id","password","placeholder","\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022",1,"rounded-none","rounded-e-lg","bg-gray-50","border","border-gray-300","text-gray-900","focus:ring-blue-500","focus:border-blue-500","block","flex-1","min-w-0","w-full","text-sm","p-2.5","dark:bg-gray-700","dark:border-gray-600","dark:placeholder-gray-400","dark:text-white","dark:focus:ring-blue-500","dark:focus:border-blue-500",3,"formControl"],[1,"bg-[#002D74]","rounded-xl","text-white","py-2","hover:scale-105","duration-300","button-color",3,"disabled","ngClass","click"],[1,"mt-6","grid","grid-cols-3","items-center","text-gray-400"],[1,"border-gray-400"],[1,"text-center","text-sm"],[1,"mt-5","text-xs","border-b","border-[#002D74]","py-4","text-[#002D74]"],["href","#"],[1,"mt-3","text-xs","flex","justify-between","items-center","text-[#002D74]"],[1,"py-2","px-5","bg-white","border","rounded-xl","hover:scale-110","duration-300",3,"click"],[1,"md:block","hidden","w-1/2"],["src","https://images.unsplash.com/photo-1504813184591-01572f98c85f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1771&q=80",1,"rounded-2xl","img-right"]],template:function(r,o){1&r&&(e.TgZ(0,"section",0)(1,"div",1)(2,"div",2)(3,"h2",3),e._uU(4,"Login"),e.qZA(),e.TgZ(5,"p",4),e._uU(6,"If you are already a member, easily log in"),e.qZA(),e.TgZ(7,"form",5)(8,"div",6)(9,"span",7)(10,"p",8),e._uU(11,"+27"),e.qZA()(),e._UZ(12,"input",9),e.qZA(),e.TgZ(13,"div",6)(14,"span",7),e.O4$(),e.TgZ(15,"svg",10),e._UZ(16,"path",11),e.qZA()(),e.kcU(),e._UZ(17,"input",12),e.qZA(),e.TgZ(18,"button",13),e.NdJ("click",function(l){return o.signIn(l)}),e._uU(19,"Login"),e.qZA()(),e.TgZ(20,"div",14),e._UZ(21,"hr",15),e.TgZ(22,"p",16),e._uU(23,"OR"),e.qZA(),e._UZ(24,"hr",15),e.qZA(),e.TgZ(25,"div",17)(26,"a",18),e._uU(27,"Forgot your password?"),e.qZA()(),e.TgZ(28,"div",19)(29,"p"),e._uU(30,"Don't have an account?"),e.qZA(),e.TgZ(31,"button",20),e.NdJ("click",function(){return o.navigateTo("UserType")}),e._uU(32,"Register"),e.qZA()()(),e.TgZ(33,"div",21),e._UZ(34,"img",22),e.qZA()()()),2&r&&(e.xp6(7),e.Udp("margin-top","16px"),e.xp6(5),e.Q6J("formControl",o.PhoneContentFormControl),e.xp6(5),e.Q6J("formControl",o.PasswordContentFormControl),e.xp6(1),e.Q6J("disabled",""==o.phoneNumber)("ngClass",""==o.phoneNumber?"disabled":""))},dependencies:[p.mk,i._Y,i.Fj,i.JJ,i.JL,i.nD,i.oH],styles:[".main-app-container[_ngcontent-%COMP%]{width:100%!important;display:flex;justify-content:center;align-items:center;height:100%!important;align-content:center;min-height:100vh;background-image:url(easimedicbackground.1920ddbd6e411a0f.png)}.melachat-icon-container[_ngcontent-%COMP%]{width:100%;display:flex;align-items:center;align-content:center;justify-content:center}.melachat-icon[_ngcontent-%COMP%]{height:60px;width:60px}.brand-img[_ngcontent-%COMP%]{border-radius:13px!important}@media (min-width: 200px){.main-app-container[_ngcontent-%COMP%]{width:100%!important;display:flex;justify-content:center;align-items:center;padding-left:22px;padding-right:22px}}.text-gray-500[_ngcontent-%COMP%]{--tw-text-opacity: 1;color:rgb(107 114 128/var(--tw-text-opacity));font-size:13px}.country-code-picker[_ngcontent-%COMP%]{position:absolute;inset-y:0;start:0;display:flex;align-items:center;padding:.75rem;background-color:#f7fafc;border:1px solid #edf2f7;border-right:0;border-top-left-radius:.375rem;border-bottom-left-radius:.375rem;cursor:pointer}.arrow-down[_ngcontent-%COMP%]{margin-left:.5rem}.country-code-dropdown[_ngcontent-%COMP%]{position:absolute;top:100%;left:0;z-index:10;display:none;border:1px solid #edf2f7;border-top:0;background-color:#fff;border-bottom-right-radius:.375rem;border-bottom-left-radius:.375rem;overflow:hidden;box-shadow:0 1px 2px #0000000d;width:100%}.country-code-dropdown[_ngcontent-%COMP%]   div[_ngcontent-%COMP%]{padding:.5rem;cursor:pointer;transition:background-color .3s}.country-code-dropdown[_ngcontent-%COMP%]   div[_ngcontent-%COMP%]:hover{background-color:#edf2f7}.img-right[_ngcontent-%COMP%]{max-width:100%;height:600px;object-fit:cover}.button-color[_ngcontent-%COMP%]{background-color:#1da1f2}.disabled[_ngcontent-%COMP%]{background-color:gray}"]})}return n})();function S(n,g){1&n&&(e.TgZ(0,"div",3)(1,"div",4)(2,"div",5),e._uU(3,"Welcome to the EasiMedic Warehouse"),e.qZA()(),e.O4$(),e.TgZ(4,"svg",6),e._UZ(5,"path",7),e.qZA()())}function N(n,g){if(1&n){const t=e.EpF();e.TgZ(0,"div",8)(1,"div",9)(2,"div",10),e.O4$(),e.TgZ(3,"svg",11),e._UZ(4,"polygon",12),e.qZA(),e.kcU(),e.TgZ(5,"div")(6,"div",13)(7,"nav",14)(8,"div",15)(9,"div",16)(10,"a",17)(11,"span",18),e._uU(12,"Workflow"),e.qZA(),e._UZ(13,"img",19),e.qZA()()()()()(),e.TgZ(14,"main",20)(15,"div",21)(16,"h1",22)(17,"span",23),e._uU(18,"Easi Medic Warehouse"),e.qZA(),e.TgZ(19,"span",24),e._uU(20,"- Online healthcare"),e.qZA()(),e.TgZ(21,"p",25),e._uU(22," EasiMedicWarehouse, The leading source for trustworthy and timely health and medical news and information. Providing credible health information, supportive community, and easy to use platform to access healthcare services "),e.qZA(),e.TgZ(23,"div",26)(24,"div",27)(25,"button",28),e.NdJ("click",function(){e.CHM(t);const o=e.oxw(2);return e.KtG(o.proceed())}),e._uU(26," Proceed "),e.qZA()(),e.TgZ(27,"div",29)(28,"a",30),e._uU(29," Live demo "),e.qZA()()()()()()(),e.TgZ(30,"div",31),e._UZ(31,"img",32),e.qZA()()}}function D(n,g){if(1&n&&(e.TgZ(0,"body"),e.YNc(1,S,6,0,"div",1)(2,N,32,0,"div",2),e.qZA()),2&n){const t=e.oxw();e.xp6(1),e.Q6J("ngIf",t.spinner),e.xp6(1),e.Q6J("ngIf",0==t.spinner)}}let I=(()=>{class n{constructor(t,r){this.route=t,this.platformId=r,this.spinner=!1,this.isBrowser=(0,p.NF)(r),this.isServer=(0,p.PM)(r)}ngOnInit(){console.log(this.isBrowser),this.spinner=!0,setTimeout(()=>{this.spinner=!1},3e3)}proceed(){this.route.navigate(["authentication/login"])}static#e=this.\u0275fac=function(r){return new(r||n)(e.Y36(b.F0),e.Y36(e.Lbi))};static#t=this.\u0275cmp=e.Xpm({type:n,selectors:[["app-welcome"]],decls:1,vars:1,consts:[[4,"ngIf"],["class","spinnerHeartBeat",4,"ngIf"],["class","relative bg-white overflow-hidden",4,"ngIf"],[1,"spinnerHeartBeat"],[2,"flex","1","display","flex","align-items","center","width","100%","justify-content","center","position","absolute","top","0","left","0","right","0","margin-top","40%"],[1,"stat-value"],["x","0px","y","0px","viewBox","0 0 398 53.9",1,"svg"],["d","M297.5,41.2h-76.6c-0.5,0-0.9,0.4-1,0.8l-1.6,11.3l-3.1-32c0-0.5-0.4-0.9-0.9-0.9c-0.5,0-0.9,0.3-1,0.8\n                         l-5.3,25.5l-2.3-10.9c-0.1-0.4-0.4-0.7-0.9-0.8c-0.4,0-0.8,0.2-1,0.6l-2.3,4.8h-107c0,0,0,0,0,0H82c-1.6,0-2.2,1.1-2.2,1.6\n                         l-1.6,11.3l-3.1-52c0-0.5-0.4-0.9-0.9-0.9c-0.5,0-0.9,0.3-1,0.8l-9.3,45.5l-2.3-10.9c-0.1-0.4-0.4-0.7-0.9-0.8c-0.4,0-0.8,0.2-1,0.6\n                         l-2.3,4.8H0.5",1,"st0"],[1,"relative","bg-white","overflow-hidden"],[1,"max-w-7xl","mx-auto"],[1,"relative","z-10","pb-8","bg-white","sm:pb-16","md:pb-20","lg:max-w-2xl","lg:w-full","lg:pb-28","xl:pb-32"],["fill","currentColor","viewBox","0 0 100 100","preserveAspectRatio","none","aria-hidden","true",1,"hidden","lg:block","absolute","right-0","inset-y-0","h-full","w-48","text-white","transform","translate-x-1/2"],["points","50,0 100,0 50,100 0,100"],[1,"relative","pt-6","px-4","sm:px-6","lg:px-8"],["aria-label","Global",1,"relative","flex","items-center","justify-between","sm:h-10","lg:justify-start"],[1,"flex","items-center","flex-grow","flex-shrink-0","lg:flex-grow-0"],[1,"flex","items-center","justify-between","w-full","md:w-auto","rounded-xl"],["href","#"],[1,"sr-only"],["alt","Workflow","src","https://firebasestorage.googleapis.com/v0/b/e-health-3eda1.appspot.com/o/logo.png?alt=media&token=8e2a71d7-679c-4072-a073-6316e00e9e97",1,"h-15","w-auto","sm:h-12","easiMedic"],[1,"mt-10","mx-auto","max-w-7xl","px-4","sm:mt-12","sm:px-6","md:mt-16","lg:mt-20","lg:px-8","xl:mt-28"],[1,"sm:text-center","lg:text-left"],[1,"text-4xl","tracking-tight","font-extrabold","text-gray-900","sm:text-5xl","md:text-6xl"],[1,"block","xl:inline"],[1,"block","text-indigo-600","xl:inline"],[1,"mt-3","text-base","text-gray-500","sm:mt-5","sm:text-lg","sm:max-w-xl","sm:mx-auto","md:mt-5","md:text-xl","lg:mx-0"],[1,"mt-5","sm:mt-8","sm:flex","sm:justify-center","lg:justify-start"],[1,"rounded-md","shadow"],["href","#",1,"w-full","flex","items-center","justify-center","px-8","py-3","border","border-transparent","text-base","font-medium","rounded-md","text-white","bg-indigo-600","hover:bg-indigo-700","md:py-4","md:text-lg","md:px-10","proceed",3,"click"],[1,"mt-3","sm:mt-0","sm:ml-3"],["href","#",1,"w-full","flex","items-center","justify-center","px-8","py-3","border","border-transparent","text-base","font-medium","rounded-md","text-indigo-700","bg-indigo-100","hover:bg-indigo-200","md:py-4","md:text-lg","md:px-10","liveDemo"],[1,"lg:absolute","lg:inset-y-0","lg:right-0","lg:w-1/2"],["src","https://images.unsplash.com/photo-1504813184591-01572f98c85f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1771&q=80","alt","",1,"h-96","w-full","object-cover","sm:h-72","md:h-96","lg:w-full","lg:h-full"]],template:function(r,o){1&r&&e.YNc(0,D,3,2,"body",0),2&r&&e.Q6J("ngIf",o.isBrowser)},dependencies:[p.O5],styles:[".easiMedic[_ngcontent-%COMP%]{height:120px!important;width:120px!important;padding-top:12px}button[_ngcontent-%COMP%]{background-color:#1da1f2!important}body[_ngcontent-%COMP%]{background-color:#f5f5f5!important;background:rgb(245,245,245)!important}#loading[_ngcontent-%COMP%]{display:inline-block;width:50px;height:50px;border:3px solid #1da1f2;border-radius:50%;border-top-color:#fff;animation:_ngcontent-%COMP%_spin 1s ease-in-out infinite;-webkit-animation:_ngcontent-%COMP%_spin 1s ease-in-out infinite}@keyframes _ngcontent-%COMP%_spin{to{-webkit-transform:rotate(360deg)}}.spinnerHeartBeat[_ngcontent-%COMP%]{background:transparent!important;width:100%;height:100%}.svg[_ngcontent-%COMP%]{height:100%;width:100%}path[_ngcontent-%COMP%]{stroke:#1da1f2;stroke-width:1px;fill:none;stroke-dasharray:150,200;stroke-dashoffset:0;animation:_ngcontent-%COMP%_pulse 4s infinite linear}@keyframes _ngcontent-%COMP%_pulse{0%{stroke-dashoffset:0}to{stroke-dashoffset:1050}}.stat-value[_ngcontent-%COMP%]{color:#1da1f2!important}.liveDemo[_ngcontent-%COMP%]{color:#1da1f2!important;background-color:#fff!important;box-shadow:0 1px 4px #b9b9b94d,0 4px 2px #00000038}.proceed[_ngcontent-%COMP%]{box-shadow:0 1px 4px #b9b9b94d,0 4px 2px #00000038}"]})}return n})();var w=s(5861),c=s(9774),x=s(6676),A=s(7874);function Y(n,g){if(1&n){const t=e.EpF();e.TgZ(0,"div",23)(1,"input",24),e.NdJ("change",function(){const a=e.CHM(t).$implicit,l=e.oxw(2);return e.KtG(l.onOptionChange(a.id))}),e.qZA(),e.TgZ(2,"label",25),e._uU(3),e.qZA()()}if(2&n){const t=g.$implicit,r=e.oxw(2);e.xp6(1),e.s9C("value",t.id),e.Q6J("formControl",r.ServiceProviderTypeFormControl)("id",t.id)("checked",r.selectedOption===t.id),e.xp6(1),e.Q6J("formControl",r.ServiceProviderTypeFormControl)("for",t.id),e.xp6(1),e.hij(" ",t.label," ")}}function j(n,g){if(1&n&&(e.TgZ(0,"div")(1,"h1",21),e._uU(2," Please select below"),e.qZA(),e.YNc(3,Y,4,7,"div",22),e.qZA()),2&n){const t=e.oxw();e.xp6(3),e.Q6J("ngForOf",t.options)}}function Q(n,g){if(1&n&&(e.TgZ(0,"div",27)(1,"label",28),e._uU(2,"Select Doctor category"),e.qZA(),e.TgZ(3,"select",29)(4,"option",30),e._uU(5,"Select Doctor category"),e.qZA(),e.TgZ(6,"option",31),e._uU(7,"General Practioner"),e.qZA(),e.TgZ(8,"option",32),e._uU(9,"Dentist"),e.qZA(),e.TgZ(10,"option",33),e._uU(11,"Physiotherapist"),e.qZA(),e.TgZ(12,"option",34),e._uU(13,"Dietician"),e.qZA(),e.TgZ(14,"option",35),e._uU(15,"Radiographer"),e.qZA(),e.TgZ(16,"option",36),e._uU(17,"Therapist"),e.qZA()()()),2&n){const t=e.oxw(2);e.xp6(3),e.Q6J("formControl",t.ServiceProviderCategoryContentFormControl)}}function H(n,g){if(1&n&&(e.TgZ(0,"div",9),e.YNc(1,Q,18,1,"div",26),e.qZA()),2&n){const t=e.oxw();e.xp6(1),e.Q6J("ngIf","Doctors"==t.providerType)}}function B(n,g){if(1&n&&(e.TgZ(0,"div",27)(1,"label",28),e._uU(2,"Select Sangoma category"),e.qZA(),e.TgZ(3,"select",29)(4,"option",30),e._uU(5,"Select Sangoma category"),e.qZA(),e.TgZ(6,"option",37),e._uU(7,"Healer"),e.qZA(),e.TgZ(8,"option",37),e._uU(9,"Prophet"),e.qZA()()()),2&n){const t=e.oxw(2);e.xp6(3),e.Q6J("formControl",t.ServiceProviderCategoryContentFormControl)}}function G(n,g){if(1&n&&(e.TgZ(0,"div",9),e.YNc(1,B,10,1,"div",26),e.qZA()),2&n){const t=e.oxw();e.xp6(1),e.Q6J("ngIf","Sangoma"==t.providerType)}}let E=(()=>{class n{constructor(t,r){this.firestore=t,this.router=r,this.selectedOption=null,this.PhoneContentFormControl=new i.NI,this.UsernameFormControl=new i.NI,this.FullNamesFormControl=new i.NI,this.PhoneFormControl=new i.NI,this.SurnameFormControl=new i.NI,this.BioFormControl=new i.NI,this.PasswordFormControl=new i.NI,this.ConfirmPasswordFormControl=new i.NI,this.options=[{id:"Doctors",label:"Medical Doctor"},{id:"Sangoma",label:"Sangoma"},{id:"TowTrucks",label:"Tow truck driver"},{id:"Security",label:"Security"}],this.bio="",this.phone="",this.username="",this.fullNames="",this.password="",this.confirmPassword="",this.selectedUserType=null,this.ServiceProviderTypeFormControl=new i.NI,this.ServiceProviderCategoryContentFormControl=new i.NI,this.providerType=""}ngOnInit(){this.router.routerState.root.queryParams.subscribe(t=>{t&&(this.selectedUserType=t.userType)}),this.BioFormControl.valueChanges.subscribe(t=>{this.bio=t}),this.PhoneFormControl.valueChanges.subscribe(t=>{this.phone=t}),this.UsernameFormControl.valueChanges.subscribe(t=>{this.username=t}),this.FullNamesFormControl.valueChanges.subscribe(t=>{this.fullNames=t}),this.PasswordFormControl.valueChanges.subscribe(t=>{this.password=t}),this.ConfirmPasswordFormControl.valueChanges.subscribe(t=>{this.confirmPassword=t}),this.ServiceProviderTypeFormControl.valueChanges.subscribe(t=>{this.providerType=t})}onOptionChange(t){this.selectedOption=t,console.log(t)}registerUserInFirestore(t,r,o,a,l,h,C){var d=this;return(0,w.Z)(function*(){try{const m=(0,c.hJ)(d.firestore,"Users"),u=(0,c.hJ)(d.firestore,"Doctors"),_=(0,c.hJ)(d.firestore,"Sangomas"),k=(0,c.hJ)(d.firestore,"TowTruckServices");let f="";const y="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";for(let Z=0;Z<10;Z++)f+=y.charAt(Math.floor(Math.random()*y.length));const T=A.AES.encrypt(a,f).toString();yield(0,c.ET)(m,{username:r,name:o,phone:t,password:{ciphertext:T,key:f},notificationToken:l,image:"https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",bio:"",friends:[],blocked:[],location:{},requests:[],language:"English",dob:h,created:x().format("DD-MM-YYYY"),availability:"online",InterestedIn:"",suspended:!1,easiMedicFor:d.selectedUserType}).then(function(){var Z=(0,w.Z)(function*(v){"Doctors"==d.providerType?yield(0,c.pl)((0,c.JU)(u,v.id),{username:r,name:o,phone:t,fullname:o,password:{ciphertext:T,key:f},notificationToken:l,image:"https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",bio:"",friends:[],blocked:[],location:{},requests:[],language:"English",dob:h,created:x().format("DD-MM-YYYY"),availability:"online",InterestedIn:"",suspended:!1,easiMedicFor:d.selectedUserType}):"Sangoma"==d.providerType?yield(0,c.pl)((0,c.JU)(_,v.id),{username:r,name:o,fullname:o,phone:t,password:{ciphertext:T,key:f},notificationToken:l,image:"https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",bio:"",friends:[],blocked:[],location:{},requests:[],language:"English",dob:h,created:x().format("DD-MM-YYYY"),availability:"online",InterestedIn:"",suspended:!1,easiMedicFor:d.selectedUserType}):"TowTrucks"==d.providerType&&(yield(0,c.pl)((0,c.JU)(k,v.id),{username:r,name:o,fullname:o,phone:t,password:{ciphertext:T,key:f},notificationToken:l,image:"https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",bio:"",friends:[],blocked:[],location:{},requests:[],language:"English",dob:h,created:x().format("DD-MM-YYYY"),availability:"online",InterestedIn:"",suspended:!1,easiMedicFor:d.selectedUserType}))});return function(v){return Z.apply(this,arguments)}}())}catch(m){throw console.error(m.message),m}})()}registerProviderUserInFirestore(t,r,o,a,l,h,C,d){var m=this;return(0,w.Z)(function*(){try{const u=(0,c.hJ)(m.firestore,C);let _="";const k="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";for(let y=0;y<10;y++)_+=k.charAt(Math.floor(Math.random()*k.length));A.AES.encrypt(a,_).toString(),yield(0,c.ET)(u,{address:"",approved:"",closed:[],description:m.bio,experience:0,fee:0,fullname:m.fullNames,image:"",latitude:"",location:{},open:[],plan:"Basic",qualification:"",regDate:x().format("DD-MM-YYYY"),street:"",type:d})}catch(u){throw console.error(u.message),u}})()}handleSignup(){var t=this;return(0,w.Z)(function*(){try{yield t.registerUserInFirestore(t.phone,t.username,t.fullNames,t.password,"","",t.selectedOption),"Service Provider"==t.selectedUserType&&(yield t.registerProviderUserInFirestore(t.phone,t.username,t.fullNames,t.password,"","",t.selectedOption,t.providerType)),t.router.navigate(["authentication/login"])}catch{}})()}GoToLogin(){this.router.navigate(["authentication/login"])}static#e=this.\u0275fac=function(r){return new(r||n)(e.Y36(c.gg),e.Y36(b.F0))};static#t=this.\u0275cmp=e.Xpm({type:n,selectors:[["app-register"]],decls:38,vars:10,consts:[[1,"main-app-container"],[1,"bg-grey-lighter","min-h-screen","flex","flex-col"],[1,"container","max-w-sm","mx-auto","flex-1","flex","flex-col","items-center","justify-center","px-2"],[1,"bg-white","px-6","py-8","rounded","shadow-md","text-black","w-full"],[1,"text-xl","font-medium","text-gray-900","dark:text-white","sign-up-text"],["type","text","name","username","placeholder","Username",1,"block","border","border-grey-light","w-full","p-3","rounded","mb-4",3,"formControl"],["type","text","name","fullname","placeholder","Full Names",1,"block","border","border-grey-light","w-full","p-3","rounded","mb-4",3,"formControl"],["type","text","name","surname","placeholder","Surname",1,"block","border","border-grey-light","w-full","p-3","rounded","mb-4",3,"formControl"],["type","text","name","phone","placeholder","Phone",1,"block","border","border-grey-light","w-full","p-3","rounded","mb-4",3,"formControl"],[1,"dropdown-container"],["for","message",1,"block","mb-2","text-sm","font-medium","text-gray-900","dark:text-white"],["id","message","rows","4","placeholder","Write your thoughts here...",1,"block","p-2.5","w-full","text-sm","text-gray-900","bg-gray-50","rounded-lg","border","border-gray-300","focus:ring-blue-500","focus:border-blue-500","dark:bg-gray-700","dark:border-gray-600","dark:placeholder-gray-400","dark:text-white","dark:focus:ring-blue-500","dark:focus:border-blue-500",3,"formControl"],[4,"ngIf"],["class","dropdown-container",4,"ngIf"],["type","password","name","password","placeholder","Password",1,"block","border","border-grey-light","w-full","p-3","rounded","mb-4",3,"formControl"],["type","password","name","confirm_password","placeholder","Confirm Password",1,"block","border","border-grey-light","w-full","p-3","rounded","mb-4"],["type","submit",1,"w-full","text-white","bg-blue-700","hover:bg-blue-800","focus:ring-4","focus:outline-none","focus:ring-blue-300","font-medium","rounded-lg","text-sm","px-5","py-2.5","text-center","dark:bg-blue-600","dark:hover:bg-blue-700","dark:focus:ring-blue-800","melachat-button-color",3,"ngClass","click"],[1,"text-center","text-sm","text-grey-dark","mt-4"],["href","#",1,"no-underline","border-b","border-grey-dark","text-grey-dark"],[1,"text-sm","font-medium","text-gray-500","dark:text-gray-300","margin-topclass"],[1,"text-blue-700","hover:underline","dark:text-blue-500",3,"click"],[1,"text-xl","font-medium","text-gray-900","dark:text-white","sign-up-text",2,"margin-top","16px"],["class","flex items-center ps-4 border border-gray-200 rounded dark:border-gray-700",4,"ngFor","ngForOf"],[1,"flex","items-center","ps-4","border","border-gray-200","rounded","dark:border-gray-700"],["type","radio","name","melachat-option",1,"w-4","h-4","text-blue-600","bg-gray-100","border-gray-300","rounded","focus:ring-blue-500","dark:focus:ring-blue-600","dark:ring-offset-gray-800","focus:ring-2","dark:bg-gray-700","dark:border-gray-600",3,"formControl","id","value","checked","change"],[1,"w-full","py-4","ms-2","text-sm","font-medium","text-gray-900","dark:text-gray-300",3,"formControl","for"],["class","col-span-2 sm:col-span-1",4,"ngIf"],[1,"col-span-2","sm:col-span-1"],["for","category",1,"block","mb-2","text-sm","font-medium","text-gray-900","dark:text-white"],["id","category",1,"bg-gray-50","border","border-gray-300","text-gray-900","text-sm","rounded-lg","focus:ring-primary-500","focus:border-primary-500","block","w-full","p-2.5","dark:bg-gray-600","dark:border-gray-500","dark:placeholder-gray-400","dark:text-white","dark:focus:ring-primary-500","dark:focus:border-primary-500",3,"formControl"],["selected",""],["value","General Practioner"],["value","Dentist"],["value","Physiotherapist"],["value","Dietician"],["value","Radiographer"],["value","Therapist"],["value","Healer"]],template:function(r,o){1&r&&(e.TgZ(0,"div",0)(1,"div",1)(2,"div",2)(3,"div",3)(4,"h1",4),e._uU(5,"Sign up"),e.qZA(),e._UZ(6,"input",5)(7,"input",6)(8,"input",7)(9,"input",8),e.TgZ(10,"div",9)(11,"label",10),e._uU(12,"Short bio about you"),e.qZA(),e._UZ(13,"textarea",11),e.YNc(14,j,4,1,"div",12),e.qZA(),e.YNc(15,H,2,1,"div",13)(16,G,2,1,"div",13),e._UZ(17,"input",14)(18,"input",15),e.TgZ(19,"button",16),e.NdJ("click",function(){return o.handleSignup()}),e._uU(20,"Create Account"),e.qZA(),e.TgZ(21,"div",17),e._uU(22," By signing up, you agree to the "),e.TgZ(23,"a",18),e._uU(24," Terms of Service "),e.qZA(),e._uU(25," and "),e.TgZ(26,"a",18),e._uU(27," Privacy Policy "),e.qZA()(),e.TgZ(28,"div",19),e._uU(29," Already have an account? "),e.TgZ(30,"a",20),e.NdJ("click",function(){return o.GoToLogin()}),e._uU(31," Log in "),e.qZA(),e._uU(32,". "),e.qZA()(),e.TgZ(33,"div",19),e._uU(34," Already have an account? "),e.TgZ(35,"a",20),e.NdJ("click",function(){return o.GoToLogin()}),e._uU(36," Log in "),e.qZA(),e._uU(37,". "),e.qZA()()()()),2&r&&(e.xp6(6),e.Q6J("formControl",o.UsernameFormControl),e.xp6(1),e.Q6J("formControl",o.FullNamesFormControl),e.xp6(1),e.Q6J("formControl",o.SurnameFormControl),e.xp6(1),e.Q6J("formControl",o.PhoneFormControl),e.xp6(4),e.Q6J("formControl",o.BioFormControl),e.xp6(1),e.Q6J("ngIf","Service Provider"===o.selectedUserType),e.xp6(1),e.Q6J("ngIf","Service Provider"===o.selectedUserType),e.xp6(1),e.Q6J("ngIf","Service Provider"===o.selectedUserType),e.xp6(1),e.Q6J("formControl",o.PasswordFormControl),e.xp6(2),e.Q6J("ngClass",""==o.bio||null==o.bio||""==o.phone||null==o.phone||""==o.password||null==o.password?"disabled":"active"))},dependencies:[p.mk,p.sg,p.O5,i.YN,i.Kr,i.Fj,i.EJ,i._,i.JJ,i.oH],styles:[".main-app-container[_ngcontent-%COMP%]{width:100%!important;display:flex;justify-content:center;align-items:center;height:100%!important;align-content:center;min-height:100vh;background-image:url(easimedicbackground.1920ddbd6e411a0f.png)}.margin-topclass[_ngcontent-%COMP%]{margin-top:22px}.sign-up-text[_ngcontent-%COMP%]{margin-bottom:16px}.dropdown-container[_ngcontent-%COMP%]{margin-top:12px;margin-bottom:16px}.dropdown[_ngcontent-%COMP%]:hover   .dropdown-menu[_ngcontent-%COMP%]{display:block}.px-2[_ngcontent-%COMP%]{margin-top:39px!important;margin-bottom:40px!important}.disabled[_ngcontent-%COMP%]{background-color:gray}.active[_ngcontent-%COMP%]{background-color:#1da1f2}"]})}return n})();function R(n,g){if(1&n){const t=e.EpF();e.TgZ(0,"div",13)(1,"input",14),e.NdJ("change",function(){const a=e.CHM(t).$implicit,l=e.oxw();return e.KtG(l.onOptionChange(a.id))}),e.qZA(),e.TgZ(2,"label",15),e._uU(3),e.qZA()()}if(2&n){const t=g.$implicit,r=e.oxw();e.xp6(1),e.s9C("value",t.id),e.Q6J("formControl",r.selectUserFormControl)("id",t.id)("checked",r.selectedOption===t.id),e.xp6(1),e.Q6J("for",t.id),e.xp6(1),e.hij(" ",t.label," ")}}let W=(()=>{class n{constructor(t){this.router=t,this.selectUserFormControl=new i.NI,this.selectedOption=null,this.options=[{id:"General user",label:"General user"},{id:"Service Provider",label:"Service Provider"}]}onOptionChange(t){this.selectedOption=t,console.log(t)}navigateTo(t){this.router.navigate([`authentication/${t}`],{queryParams:{userType:this.selectedOption}})}static#e=this.\u0275fac=function(r){return new(r||n)(e.Y36(b.F0))};static#t=this.\u0275cmp=e.Xpm({type:n,selectors:[["app-choose-type-of-user"]],decls:17,vars:3,consts:[[1,"bg-gray-50","min-h-screen","flex","items-center","justify-center"],[1,"bg-gray-100","flex","rounded-2xl","shadow-lg","max-w-3xl","p-5","items-center"],[1,"md:w-1/2","px-8","md:px-16"],[1,"font-bold","text-2xl","text-[#002D74]"],[1,"text-xs","mt-4","text-[#002D74]"],["action","",1,"flex","flex-col","gap-4"],[1,"relative"],[1,"dropdown-container"],[1,"text-xl","font-medium","text-gray-900","dark:text-white","sign-up-text",2,"margin-top","16px","margin-bottom","16px"],["class","flex items-center ps-4 border border-gray-200 rounded dark:border-gray-700",4,"ngFor","ngForOf"],[1,"bg-[#002D74]","rounded-xl","text-white","py-2","hover:scale-105","duration-300","button-color",3,"ngClass","disabled","click"],[1,"md:block","hidden","w-1/2"],["src","https://images.unsplash.com/photo-1504813184591-01572f98c85f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1771&q=80",1,"rounded-2xl","img-right"],[1,"flex","items-center","ps-4","border","border-gray-200","rounded","dark:border-gray-700"],["type","radio","name","melachat-option",1,"w-4","h-4","text-blue-600","bg-gray-100","border-gray-300","rounded","focus:ring-blue-500","dark:focus:ring-blue-600","dark:ring-offset-gray-800","focus:ring-2","dark:bg-gray-700","dark:border-gray-600",3,"formControl","id","value","checked","change"],[1,"w-full","py-4","ms-2","text-sm","font-medium","text-gray-900","dark:text-gray-300",3,"for"]],template:function(r,o){1&r&&(e.TgZ(0,"section",0)(1,"div",1)(2,"div",2)(3,"h2",3),e._uU(4,"Please select below to continue with registration"),e.qZA(),e.TgZ(5,"p",4),e._uU(6,"Choose whether you're a service provider(e.g,Doctor,Sangoma etc) or General user"),e.qZA(),e.TgZ(7,"form",5)(8,"div",6)(9,"div",7)(10,"h1",8),e._uU(11," Please select below"),e.qZA(),e.YNc(12,R,4,6,"div",9),e.qZA()(),e.TgZ(13,"button",10),e.NdJ("click",function(){return o.navigateTo("register")}),e._uU(14,"Continue"),e.qZA()()(),e.TgZ(15,"div",11),e._UZ(16,"img",12),e.qZA()()()),2&r&&(e.xp6(12),e.Q6J("ngForOf",o.options),e.xp6(1),e.Q6J("ngClass",""==o.selectedOption||null==o.selectedOption?"disabled":"")("disabled",""==o.selectedOption||null==o.selectedOption))},dependencies:[p.mk,p.sg,i._Y,i.Fj,i._,i.JJ,i.JL,i.oH],styles:[".main-app-container[_ngcontent-%COMP%]{width:100%!important;display:flex;justify-content:center;align-items:center;height:100%!important;align-content:center;min-height:100vh;background-image:url(easimedicbackground.1920ddbd6e411a0f.png)}.melachat-icon-container[_ngcontent-%COMP%]{width:100%;display:flex;align-items:center;align-content:center;justify-content:center}.melachat-icon[_ngcontent-%COMP%]{height:60px;width:60px}.brand-img[_ngcontent-%COMP%]{border-radius:13px!important}@media (min-width: 200px){.main-app-container[_ngcontent-%COMP%]{width:100%!important;display:flex;justify-content:center;align-items:center;padding-left:22px;padding-right:22px}}.text-gray-500[_ngcontent-%COMP%]{--tw-text-opacity: 1;color:rgb(107 114 128/var(--tw-text-opacity));font-size:13px}.country-code-picker[_ngcontent-%COMP%]{position:absolute;inset-y:0;start:0;display:flex;align-items:center;padding:.75rem;background-color:#f7fafc;border:1px solid #edf2f7;border-right:0;border-top-left-radius:.375rem;border-bottom-left-radius:.375rem;cursor:pointer}.arrow-down[_ngcontent-%COMP%]{margin-left:.5rem}.country-code-dropdown[_ngcontent-%COMP%]{position:absolute;top:100%;left:0;z-index:10;display:none;border:1px solid #edf2f7;border-top:0;background-color:#fff;border-bottom-right-radius:.375rem;border-bottom-left-radius:.375rem;overflow:hidden;box-shadow:0 1px 2px #0000000d;width:100%}.country-code-dropdown[_ngcontent-%COMP%]   div[_ngcontent-%COMP%]{padding:.5rem;cursor:pointer;transition:background-color .3s}.country-code-dropdown[_ngcontent-%COMP%]   div[_ngcontent-%COMP%]:hover{background-color:#edf2f7}.img-right[_ngcontent-%COMP%]{max-width:100%;height:600px;object-fit:cover}.button-color[_ngcontent-%COMP%]{background-color:#1da1f2}.disabled[_ngcontent-%COMP%]{background-color:gray}"]})}return n})();var L=s(6208);const z=["imageInput"];function $(n,g){if(1&n){const t=e.EpF();e.TgZ(0,"button",10),e.NdJ("click",function(){e.CHM(t);const o=e.oxw();return e.KtG(o.triggerImageInput())}),e.TgZ(1,"figure",11),e.O4$(),e.TgZ(2,"svg",12),e._UZ(3,"path",13)(4,"circle",14),e.qZA()()()}}function X(n,g){if(1&n&&(e.TgZ(0,"div",15),e._UZ(1,"img",16),e.TgZ(2,"div",17)(3,"div",18),e._uU(4),e.qZA(),e.TgZ(5,"div",19),e._uU(6),e.qZA()()()),2&n){const t=e.oxw();e.xp6(1),e.s9C("src",t.selectedImage,e.LSH),e.xp6(3),e.Oqu(t.User.name),e.xp6(2),e.Oqu(t.User.bio)}}function K(n,g){if(1&n){const t=e.EpF();e.TgZ(0,"button",20),e.NdJ("click",function(){e.CHM(t);const o=e.oxw();return e.KtG(o.navigateBack())}),e._uU(1,"Continue"),e.qZA()}if(2&n){const t=e.oxw();e.s9C("disabled",!t.selectedImage)}}let V=(()=>{class n{constructor(t,r,o){this.router=t,this.firebaseService=r,this.alertService=o,this.selectedImages=[]}ngOnInit(){this.router.routerState.root.queryParams.subscribe(t=>{t&&(this.User={InterestedIn:t.InterestedIn,availability:t.availability,bio:t.bio,blocked:t.blocked,created:t.created,dob:t.dob,friends:t.friends,image:t.image,language:t.language,location:t.location,name:t.name,notificationToken:t.notificationToken,password:t.password,phone:t.phone,requests:t.requests,suspended:t.suspended,username:t.username})})}triggerImageInput(){this.imageInput.nativeElement.click()}onImageSelected(t){const r=t.target;if(r.files){const a=Array.from(r.files);a.forEach(l=>{const h=new FileReader;h.onload=C=>{const d=(C.target?.result).split(",")[1];l.url=d,this.selectedImage=d;var m=this.firebaseService.uploadPicture(d).then(u=>{console.warn("download url here : ",u),this.uploadUserImage(u)}).catch(u=>{console.error(u)});console.warn(m)},h.readAsDataURL(l)}),this.selectedImages=a}}uploadUserImage(t){this.firebaseService.updateduserprofile(this.User.phone,t).subscribe(r=>{this.alertService.success("Uploaded profile picture successully")})}navigateBack(){this.router.navigate(["/authentication","login"])}static#e=this.\u0275fac=function(r){return new(r||n)(e.Y36(b.F0),e.Y36(U.d),e.Y36(M.c))};static#t=this.\u0275cmp=e.Xpm({type:n,selectors:[["app-choose-image"]],viewQuery:function(r,o){if(1&r&&e.Gf(z,5),2&r){let a;e.iGM(a=e.CRH())&&(o.imageInput=a.first)}},decls:14,vars:3,consts:[[1,"main-app-container"],[1,"get-started"],[1,"mb-4","text-4xl","font-extrabold","leading-none","tracking-tight","text-gray-900","md:text-5xl","lg:text-6xl","dark:text-white",2,"color","white","text-align","center"],[1,"text-blue-600","dark:text-blue-500","melachat-text-color"],[1,"text-lg","font-normal","text-gray-500","lg:text-xl","dark:text-gray-400","browse-friends-p",2,"text-align","center"],["type","file","accept","image/*","multiple","",2,"display","none",3,"change"],["imageInput",""],["type","button","style","margin-top:22px",3,"click",4,"ngIf"],["class","flex items-center gap-4","style","margin-top:22px",4,"ngIf"],["class","w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4\n focus:outline-none focus:ring-blue-300 font-medium rounded-lg \n text-sm px-5 py-2.5 text-center dark:bg-blue-600 \n dark:hover:bg-blue-700 dark:focus:ring-blue-800 melachat-button-color","style","margin-top:22px;width:40%",3,"disabled","click",4,"ngIf"],["type","button",2,"margin-top","22px",3,"click"],[1,"max-w-lg"],["type","image","viewBox","0 0 24 24","fill","none","stroke","currentColor","stroke-width","2","stroke-linecap","round","stroke-linejoin","round",1,"h-16","w-16","text-white"],["d","M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"],["cx","12","cy","13","r","4"],[1,"flex","items-center","gap-4",2,"margin-top","22px"],["alt","",1,"w-10","h-10","rounded-full",2,"width","120px","height","120px","border-radius","50%",3,"src"],[1,"font-medium","dark:text-white"],[2,"color","white","font-weight","900"],[1,"text-sm","text-gray-500","dark:text-gray-400"],[1,"w-full","text-white","bg-blue-700","hover:bg-blue-800","focus:ring-4","focus:outline-none","focus:ring-blue-300","font-medium","rounded-lg","text-sm","px-5","py-2.5","text-center","dark:bg-blue-600","dark:hover:bg-blue-700","dark:focus:ring-blue-800","melachat-button-color",2,"margin-top","22px","width","40%",3,"disabled","click"]],template:function(r,o){1&r&&(e.TgZ(0,"div",0)(1,"div",1)(2,"h1",2),e._uU(3," Choose your "),e.TgZ(4,"span",3),e._uU(5,"Profile"),e.qZA(),e._uU(6," picture"),e.qZA(),e.TgZ(7,"p",4),e._uU(8,"Click the camera icon below to select your profile picture "),e.qZA(),e.TgZ(9,"input",5,6),e.NdJ("change",function(l){return o.onImageSelected(l)}),e.qZA(),e.YNc(11,$,5,0,"button",7)(12,X,7,3,"div",8)(13,K,2,1,"button",9),e.qZA()()),2&r&&(e.xp6(11),e.Q6J("ngIf",!o.selectedImage),e.xp6(1),e.Q6J("ngIf",o.selectedImage),e.xp6(1),e.Q6J("ngIf",o.selectedImage))},dependencies:[p.O5],styles:[".main-app-container[_ngcontent-%COMP%]{width:100%!important;display:flex;justify-content:center;align-items:center;height:100%!important;align-content:center;min-height:100vh;background-image:url(easimedicbackground.1920ddbd6e411a0f.png)}.get-started[_ngcontent-%COMP%]{display:flex;flex-direction:column;align-items:center}"]})}return n})();var ee=s(1864),te=s(7217),oe=s(7337),ne=s(9862);const re=[{path:"",component:I},{path:"welcome",component:I},{path:"login",component:J},{path:"register",component:E},{path:"UserType",component:W},{path:"choose-image",component:V}],ie={position:{horizontal:{position:"left",distance:12},vertical:{position:"bottom",distance:12,gap:10}},theme:"material",behaviour:{autoHide:5e3,onClick:"hide",onMouseover:"pauseAutoHide",showDismissButton:!0,stacking:4},animations:{enabled:!0,show:{preset:"slide",speed:300,easing:"ease"},hide:{preset:"fade",speed:300,easing:"ease",offset:50},shift:{speed:300,easing:"ease"},overlap:150}};let ae=(()=>{class n{static#e=this.\u0275fac=function(r){return new(r||n)};static#t=this.\u0275mod=e.oAB({type:n});static#o=this.\u0275inj=e.cJS({imports:[p.ez,b.Bz.forChild(re),L.m,i.UX,ee.Eb.withConfig(ie),te.hO.initializeApp(oe.N.firebase),O.XZ,ne.JF]})}return n})()}}]);
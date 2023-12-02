(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[926],{9844:function(A,e,n){Promise.resolve().then(n.bind(n,5535))},5535:function(A,e,n){"use strict";n.r(e),n.d(e,{default:function(){return a}});var s=n(7437),o=n(2265),t=n(9993);function a(){let[A,e]=(0,o.useState)({date:"",time:"",subject:"Maths",keyStage:"KS1",groupOrIndividual:""}),n=A=>{A.persist();let{name:n,value:s}=A.target;e(A=>({...A,[n]:s}))},a=A=>{e(e=>({...e,groupOrIndividual:A.target.value}))};return(0,s.jsx)(s.Fragment,{children:(0,s.jsxs)(t.Z,{children:[(0,s.jsx)("br",{}),(0,s.jsx)("h3",{className:"bookings-title",children:"Make a Booking"}),(0,s.jsx)("br",{}),(0,s.jsx)("br",{}),(0,s.jsxs)("form",{className:"form",onSubmit:e=>{e.preventDefault(),"individual"===A.groupOrIndividual?window.open("https://buy.stripe.com/28o7sMgyw76h4cUaEF"):window.open("https://buy.stripe.com/8wM6oIfus9ep6l2bIK")},children:[(0,s.jsx)("label",{htmlFor:"lessonDate",children:"Select a Date:"}),(0,s.jsx)("input",{type:"date",name:"date",id:"lessonDate",required:!0,value:A.date,onChange:n}),(0,s.jsx)("br",{}),(0,s.jsx)("br",{}),(0,s.jsx)("label",{htmlFor:"lessonTime",children:"Select a Time:"}),(0,s.jsx)("input",{type:"time",min:"16:00",max:"21:00",id:"lessonTime",required:!0,value:A.time,onChange:A=>{let{value:n}=A.target;e(A=>({...A,time:n}))}}),(0,s.jsx)("br",{}),(0,s.jsx)("br",{}),(0,s.jsx)("label",{htmlFor:"lessonSubject",children:"Select a subject:"}),(0,s.jsxs)("select",{id:"lessonSubject",required:!0,value:A.subject,onChange:n,children:[(0,s.jsx)("option",{value:"Maths",children:"Maths"}),(0,s.jsx)("option",{value:"English",children:"English"}),(0,s.jsx)("option",{value:"Physics",children:"Physics"}),(0,s.jsx)("option",{value:"Biology",children:"Biology"}),(0,s.jsx)("option",{value:"Chemistry",children:"Chemistry"}),(0,s.jsx)("option",{value:"11plus",children:"11+"})]}),(0,s.jsx)("br",{}),(0,s.jsx)("br",{}),(0,s.jsx)("label",{htmlFor:"lessonSubject",children:"Select a key stage:"}),(0,s.jsxs)("select",{id:"lessonSubject",required:!0,value:A.keyStage,onChange:n,children:[(0,s.jsx)("option",{value:"KS1",children:"KS1/KS2"}),(0,s.jsx)("option",{value:"KS3",children:"KS3/KS4"}),(0,s.jsx)("option",{value:"Alevel",children:"A-Level"})]}),(0,s.jsx)("br",{}),(0,s.jsx)("br",{}),(0,s.jsxs)("div",{className:"type",children:[(0,s.jsx)("label",{htmlFor:"lessonDate",children:"Group"}),(0,s.jsx)("input",{type:"radio",name:"grouporind",value:"group",onChange:a,checked:"group"===A.groupOrIndividual,required:!0}),(0,s.jsx)("br",{}),(0,s.jsx)("br",{}),(0,s.jsx)("label",{htmlFor:"lessonDate",children:"Individual"}),(0,s.jsx)("input",{type:"radio",name:"grouporind",value:"individual",onChange:a,checked:"individual"===A.groupOrIndividual,required:!0}),(0,s.jsx)("br",{}),(0,s.jsx)("br",{})]}),(0,s.jsx)("br",{}),(0,s.jsx)("br",{}),(0,s.jsx)("button",{type:"submit",children:"Continue to payment"}),(0,s.jsx)("br",{}),(0,s.jsx)("br",{}),(0,s.jsx)("p",{className:"disclaimer",children:"Please note: payments are taken on a monthly basis"}),(0,s.jsxs)("p",{className:"disclaimer",children:["If you would like an alternative payment structure, please contact"," ",(0,s.jsx)("a",{className:"admin-link",href:"mailto:admin@tutoringtosuccess.co.uk",children:(0,s.jsx)("strong",{children:"Admin"})})]})]})]})})}n(9824)},9993:function(A,e,n){"use strict";n.d(e,{Z:function(){return B}});var s=n(7437),o=n(6691),t=n.n(o),a=n(2265),i=n(4033),r=n(1396),l=n.n(r),c=n(4440),d=n.n(c),m=[{id:1,route:"/",name:"Home"},{id:2,route:"/about",name:"About"},{id:3,route:"/bookings",name:"Bookings"},{id:4,route:"/pricing",name:"Pricing"},{id:5,route:"/testimonials",name:"Testimonials"},{id:6,route:"/offers",name:"Offers"},{id:7,route:"/contact",name:"Contact"}],u=n(8256),h=n.n(u),p=()=>{let[A,e]=(0,a.useState)(!1),n=(0,i.usePathname)();return(0,s.jsxs)("div",{className:h().navbar,children:[(0,s.jsxs)("div",{className:d()(h()["menu-toggle"],A?h().open:""),onClick:()=>e(!A),children:[(0,s.jsx)("div",{className:h().bar}),(0,s.jsx)("div",{className:h().bar}),(0,s.jsx)("div",{className:h().bar})]}),(0,s.jsx)("nav",{className:d()(h().nav,A?h().open:""),children:m.map((e,o)=>(0,s.jsx)(l(),{href:e.route,className:"".concat(h().navLink," ").concat(n===e.route&&h().active," ").concat(0!==o&&!A&&h().borderGold," ").concat(A&&h().borderBottom),children:e.name},e.id))})]})},g={src:"/_next/static/media/Logo1.395b98ae.jpeg",height:2480,width:3508,blurDataURL:"data:image/jpeg;base64,/9j/2wBDAAoHBwgHBgoICAgLCgoLDhgQDg0NDh0VFhEYIx8lJCIfIiEmKzcvJik0KSEiMEExNDk7Pj4+JS5ESUM8SDc9Pjv/2wBDAQoLCw4NDhwQEBw7KCIoOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozv/wgARCAAGAAgDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAb/xAAVAQEBAAAAAAAAAAAAAAAAAAAAAv/aAAwDAQACEAMQAAABpRL/xAAWEAADAAAAAAAAAAAAAAAAAAADERP/2gAIAQEAAQUCoR//xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oACAEDAQE/AX//xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oACAECAQE/AX//xAAXEAADAQAAAAAAAAAAAAAAAAAAATKR/9oACAEBAAY/ApWn/8QAGBAAAgMAAAAAAAAAAAAAAAAAETEAIdH/2gAIAQEAAT8hbpQPJ//aAAwDAQACAAMAAAAQD//EABQRAQAAAAAAAAAAAAAAAAAAAAD/2gAIAQMBAT8Qf//EABYRAAMAAAAAAAAAAAAAAAAAAAABEf/aAAgBAgEBPxCs/8QAGRAAAgMBAAAAAAAAAAAAAAAAAREAIUFR/9oACAEBAAE/EA6VrCXZ/9k=",blurWidth:8,blurHeight:6};function x(){return(0,s.jsxs)("div",{className:h().header,children:[(0,s.jsx)("div",{children:(0,s.jsx)(t(),{priority:!0,src:g,alt:"logo",className:h().logo})}),(0,s.jsx)("div",{className:h().navbar,children:(0,s.jsx)(p,{})}),(0,s.jsx)("br",{})]})}var j=n(802),_=n(5171);let b=(0,j.ZP)("div")({paddingTop:_.N_.SCALE_5,textAlign:"center"}),v=(0,j.ZP)("div")({maxWidth:_.PL,marginLeft:_.N_.SCALE_3,marginRight:_.N_.SCALE_3,textAlign:"left",[_.qk.LARGESCREEN]:{marginLeft:_.N_.SCALE_5,marginRight:_.N_.SCALE_5},"@media only screen and (min-width:1020px)":{margin:"0 auto"}}),f=A=>{let{children:e,...n}=A;return(0,s.jsx)(b,{...n,children:(0,s.jsx)(v,{children:e})})};f.displayName="Main";var E={src:"/_next/static/media/ig.72421873.png",height:64,width:64,blurDataURL:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAICAMAAADz0U65AAAAZlBMVEVMaXG0Bu7/NDT6KUfYArv/vwGYHPDuC43YAMnsCI//Pyj+Lz7+SB/9ogD7BnF/MPb6KS2aHPTdArP9ODnnAKP9WxT/iwGcHOXIDr/9FUT/qAH/eQXUAb/DANm/AeG9BdXSANb2AoP9ZRqGAAAAInRSTlMArAqusLE4FQutFmK2N7O0N6pita2ytbaytqqyhS+JK6qygCpDEAAAAAlwSFlzAAALEwAACxMBAJqcGAAAAERJREFUeJwFwQcCgCAMBLArq5SNe+v/X2kCV2vvRA6rA/v7IWwYjLneD8Li/cQGmrVShQUzYhojCpaMENB2ZGvtcab2A2b/AuCkFfNaAAAAAElFTkSuQmCC",blurWidth:8,blurHeight:8},C={src:"/_next/static/media/fb.776e9bda.png",height:64,width:64,blurDataURL:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAICAMAAADz0U65AAAAHlBMVEUXd/IXefcWf9UWd/MWd/IXdvEWd/MWdvAXd/IYf/9As6+OAAAACXRSTlP9/gLpzG6ZiMerbKGyAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAM0lEQVR4nCXJQQ4AIQzDQCdp2eX/H0aFk0cyJVAopu3egOTONMudGWX7uyteG/QgShf/ARS/AK+IyNeYAAAAAElFTkSuQmCC",blurWidth:8,blurHeight:8},N={src:"/_next/static/media/tw.9f436179.png",height:64,width:64,blurDataURL:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAICAMAAADz0U65AAAALVBMVEUelPIcn/EcofIcovQdoPMcn/EaovQdoPAdpPYdo/Mdo/QcpfUepfgeqf0dovTTDjk6AAAADXRSTlMBO/q/kHklEfNn50z4hxOKLgAAAAlwSFlzAAALEwAACxMBAJqcGAAAADpJREFUeJwdzIkRwDAIBLEFDP7C9V9uJilAAmDahDSIPslQ7kd9yW65VlFH7h3AdvUysOEK++mtr3gBNJEBZWtRrmwAAAAASUVORK5CYII=",blurWidth:8,blurHeight:8};let S=A=>{""!==A&&window.open(A)},w=[{name:"Home",href:"/"},{name:"About",href:"/about"},{name:"Bookings",href:"/bookings"},{name:"Pricing",href:"/pricing"},{name:"Testimonials",href:"/testimonials"},{name:"Offers",href:"/offers"},{name:"Contact",href:"/contact"},{name:"Sitemap",href:"/sitemap.xml"}];function k(){return(0,s.jsx)("div",{className:h().footer,children:(0,s.jsx)("div",{className:h().footerWrapper,children:(0,s.jsxs)("div",{className:h().footerFlex1,children:[(0,s.jsx)("div",{className:h().footerLinks,children:w.map((A,e)=>(0,s.jsx)("div",{children:(0,s.jsx)("a",{href:A.href,target:"Online"===A.name?"_blank":"",children:A.name})},e))}),(0,s.jsxs)("div",{className:h().socials,children:[(0,s.jsx)(t(),{priority:!0,src:E,alt:"Instagram logo",onClick:()=>S("https://www.instagram.com/tutoringtosuccesslimited/")}),(0,s.jsx)(t(),{priority:!0,src:C,alt:"Facebook logo",onClick:()=>S("")}),(0,s.jsx)(t(),{priority:!0,src:N,alt:"Twitter logo",onClick:()=>S("")})]}),(0,s.jsxs)("div",{className:h().footerLegal,children:[(0,s.jsx)("p",{children:"Company Registration Number: 15228068"}),(0,s.jsx)("p",{children:"Copyright \xa9 Ranjeet Sidhu 2023"})]})]})})})}function B(A){let{children:e}=A;return(0,s.jsxs)("div",{className:h().container,children:[(0,s.jsxs)(f,{children:[(0,s.jsx)(x,{}),(0,s.jsx)("div",{children:e})]}),(0,s.jsx)(k,{})]})}},9824:function(){},8256:function(A){A.exports={nav:"components_nav__urMfi",navLink:"components_navLink__SZdF9",active:"components_active__2qSNM",borderGold:"components_borderGold__6toCx",borderBottom:"components_borderBottom__gN_Az",header:"components_header___smpP","menu-toggle":"components_menu-toggle__d_Ipk",bar:"components_bar__N03sJ",container:"components_container__KqGqu",footer:"components_footer__7bPeW",footerWrapper:"components_footerWrapper__NMBzh",footerFlex1:"components_footerFlex1__sOQps",socials:"components_socials__09_64",footerLinks:"components_footerLinks__YHLwb",footerLegal:"components_footerLegal__oDpRp",open:"components_open__CX_zB",logo:"components_logo__P3W1_",images:"components_images__EOXCo",fadeIn:"components_fadeIn__LjPAk","img-wrapper":"components_img-wrapper__X3OLx",quote:"components_quote__Lohdp",carousel:"components_carousel__vvO_f",image:"components_image__kD5bh",navbar:"components_navbar__S7xCu"}}},function(A){A.O(0,[175,971,472,744],function(){return A(A.s=9844)}),_N_E=A.O()}]);
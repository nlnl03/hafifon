(function(e){function t(t){for(var s,c,r=t[0],i=t[1],l=t[2],u=0,m=[];u<r.length;u++)c=r[u],Object.prototype.hasOwnProperty.call(n,c)&&n[c]&&m.push(n[c][0]),n[c]=0;for(s in i)Object.prototype.hasOwnProperty.call(i,s)&&(e[s]=i[s]);d&&d(t);while(m.length)m.shift()();return o.push.apply(o,l||[]),a()}function a(){for(var e,t=0;t<o.length;t++){for(var a=o[t],s=!0,r=1;r<a.length;r++){var i=a[r];0!==n[i]&&(s=!1)}s&&(o.splice(t--,1),e=c(c.s=a[0]))}return e}var s={},n={app:0},o=[];function c(t){if(s[t])return s[t].exports;var a=s[t]={i:t,l:!1,exports:{}};return e[t].call(a.exports,a,a.exports,c),a.l=!0,a.exports}c.m=e,c.c=s,c.d=function(e,t,a){c.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:a})},c.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},c.t=function(e,t){if(1&t&&(e=c(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var a=Object.create(null);if(c.r(a),Object.defineProperty(a,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var s in e)c.d(a,s,function(t){return e[t]}.bind(null,s));return a},c.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return c.d(t,"a",t),t},c.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},c.p="";var r=window["webpackJsonp"]=window["webpackJsonp"]||[],i=r.push.bind(r);r.push=t,r=r.slice();for(var l=0;l<r.length;l++)t(r[l]);var d=i;o.push([0,"chunk-vendors"]),a()})({0:function(e,t,a){e.exports=a("56d7")},"0e93":function(e,t,a){"use strict";a("1ab4")},"16ce":function(e,t,a){"use strict";a("e017")},1771:function(e,t,a){var s={"./Assistant-Regular.ttf":"33e1","./CMD.png":"8134","./KioskServlet.jpg":"fd40","./SCCM.png":"4f4b","./active-directory-logo2.png":"df0b","./bios.png":"713a","./communication.png":"914e","./disc.png":"183b","./fileServer.jpg":"e0d7","./installation.jpg":"3e86","./mail.jpg":"8e4a","./mivzOper.png":"ed98","./onlineCourse.jpg":"80e6","./pc.jpg":"1e5e","./printer.jpg":"9db6","./takalot.jpg":"3722","./xrm.jpg":"580a"};function n(e){var t=o(e);return a(t)}function o(e){if(!a.o(s,e)){var t=new Error("Cannot find module '"+e+"'");throw t.code="MODULE_NOT_FOUND",t}return s[e]}n.keys=function(){return Object.keys(s)},n.resolve=o,e.exports=n,n.id="1771"},"183b":function(e,t,a){e.exports=a.p+"img/disc.75e57f0a.png"},"1ab4":function(e,t,a){},"1e5e":function(e,t,a){e.exports=a.p+"img/pc.f8de9fed.jpg"},"1f62":function(e,t,a){"use strict";a("d2a3")},"2ee9":function(e,t,a){},"33e1":function(e,t,a){e.exports=a.p+"fonts/Assistant-Regular.5193a037.ttf"},3722:function(e,t,a){e.exports=a.p+"img/takalot.bc954f09.jpg"},"3e86":function(e,t,a){e.exports=a.p+"img/installation.7ea70fac.jpg"},"4f4b":function(e,t,a){e.exports=a.p+"img/SCCM.4e98334e.png"},"56d7":function(e,t,a){"use strict";a.r(t);var s=a("7a23");function n(e,t,a,n,o,c){const r=Object(s["resolveComponent"])("MainNavbar"),i=Object(s["resolveComponent"])("router-view");return Object(s["openBlock"])(),Object(s["createElementBlock"])("div",null,[Object(s["createVNode"])(r),Object(s["createVNode"])(i)])}const o=e=>(Object(s["pushScopeId"])("data-v-2bdcf54e"),e=e(),Object(s["popScopeId"])(),e),c={class:"main-nav"},r=Object(s["createTextVNode"])(" חפיפה "),i=Object(s["createTextVNode"])(" לאיזור אישי "),l={class:"menu"},d={class:"nav-bar"},u=Object(s["createTextVNode"])("המבחן הסופי"),m=Object(s["createTextVNode"])("חוברת חפיפה"),b=o(()=>Object(s["createElementVNode"])("span",null,"בחנים",-1)),p={key:0,class:"drop-down-menu"},h=Object(s["createTextVNode"])("תרגולים");function O(e,t,a,n,o,O){const j=Object(s["resolveComponent"])("router-link");return Object(s["openBlock"])(),Object(s["createElementBlock"])("div",c,[Object(s["createVNode"])(j,{to:{name:"HomePage"},class:"home-title"},{default:Object(s["withCtx"])(()=>[r]),_:1}),Object(s["createVNode"])(j,{to:{name:"User"},class:"user-title"},{default:Object(s["withCtx"])(()=>[i]),_:1}),Object(s["createElementVNode"])("div",l,[Object(s["createElementVNode"])("div",d,[Object(s["createElementVNode"])("ul",null,[Object(s["createElementVNode"])("li",null,[Object(s["createElementVNode"])("div",null,[Object(s["createVNode"])(j,{to:{name:"FinalExam"}},{default:Object(s["withCtx"])(()=>[u]),_:1})])]),Object(s["createElementVNode"])("li",null,[Object(s["createElementVNode"])("div",null,[Object(s["createVNode"])(j,{to:{name:"HafifaBook"}},{default:Object(s["withCtx"])(()=>[m]),_:1})])]),Object(s["createElementVNode"])("li",{onMouseleave:t[1]||(t[1]=e=>o.isOpen=!1)},[Object(s["createElementVNode"])("div",{onMouseover:t[0]||(t[0]=e=>o.isOpen=!0)},[b,o.isOpen?(Object(s["openBlock"])(),Object(s["createElementBlock"])("div",p,[(Object(s["openBlock"])(!0),Object(s["createElementBlock"])(s["Fragment"],null,Object(s["renderList"])(o.examsName,e=>(Object(s["openBlock"])(),Object(s["createElementBlock"])("ul",{class:"drop-down-items",key:e},[Object(s["createVNode"])(j,{to:{name:"exams",params:{Title:e.Title}},class:"exams"},{default:Object(s["withCtx"])(()=>[Object(s["createTextVNode"])(Object(s["toDisplayString"])(e.subject),1)]),_:2},1032,["to"])]))),128))])):Object(s["createCommentVNode"])("",!0)],32)],32),Object(s["createElementVNode"])("li",null,[Object(s["createElementVNode"])("div",null,[Object(s["createVNode"])(j,{to:{name:"PracticesList"}},{default:Object(s["withCtx"])(()=>[h]),_:1})])])])])])])}var j=a("bc3a"),f=a.n(j),g={name:"MainNavbar",data(){return{isOpen:!1,examsName:[],url:"https://portal.army.idf/sites/hafifon383/_api/web/Lists/getByTitle('testsNames')/Items"}},methods:{async getNameOfExams(){const e=await f.a.get(this.url);this.examsName=e.data.value,console.log(this.examsName)}},async beforeMount(){if("development"==this.url)await this.getNameOfExams();else{const e=await f.a.get(this.url);this.examsName=e.data.value}}},k=(a("5ffa"),a("d959")),v=a.n(k);const x=v()(g,[["render",O],["__scopeId","data-v-2bdcf54e"]]);var N=x,E={name:"App",components:{MainNavbar:N}};a("9691");const y=v()(E,[["render",n]]);var V=y,B=a("6c02");const w=e=>(Object(s["pushScopeId"])("data-v-896aefb0"),e=e(),Object(s["popScopeId"])(),e),D={class:"container"},C=w(()=>Object(s["createElementVNode"])("div",{class:"title"},[Object(s["createElementVNode"])("h1",null,"ברוכים הבאים לאתר חפיפה")],-1)),S={class:"name"},T={class:"btns"},I=Object(s["createTextVNode"])("המשך תרגול"),_=Object(s["createTextVNode"])("למבחן הסופי");function P(e,t,a,n,o,c){const r=Object(s["resolveComponent"])("router-link");return Object(s["openBlock"])(),Object(s["createElementBlock"])("div",D,[C,Object(s["createElementVNode"])("div",S,[Object(s["createElementVNode"])("h2",null,"שלום "+Object(s["toDisplayString"])(o.userName),1)]),Object(s["createElementVNode"])("div",T,[Object(s["createVNode"])(r,{to:""},{default:Object(s["withCtx"])(()=>[I]),_:1}),Object(s["createVNode"])(r,{to:""},{default:Object(s["withCtx"])(()=>[_]),_:1})])])}var U={name:"HomePage",data(){return{currentUserData:[],Id:null,token:"",sharePointUrl:"https://portal.army.idf/sites/hafifon383/_api/web/Lists/getByTitle('students')/items",currentUser:"https://portal.army.idf/sites/gdud0383/Team/_api/web/currentUser",userName:""}},methods:{async getCurrentUser(){const e=await f.a.get(this.currentUser);this.currentUserData=e.data,this.Id=this.currentUserData.Id;const t=this.currentUserData.Title.split("/");this.userName=t[t.length-1],localStorage.setItem("userName",this.userName),localStorage.setItem("userId",this.Id),console.log(this.userName),console.log(this.currentUserData)},async getToken(){const e=await f.a.post("https://portal.army.idf/sites/hafifon383/_api/contextinfo");this.token=e.data.FormDigestValue,console.log(this.token)},async checkIfUser(){console.log(this.Id);const e=await f.a.get(this.sharePointUrl+`?$filter=num eq '${this.Id}'`),t=e.data.value;if(console.log(t),await this.getToken(),0==t.length)try{await f.a.post(this.sharePointUrl,{Title:this.userName,num:this.Id,exam1:null,exam2:null,exam3:null,exam4:null,finalTest:null},{headers:{"X-RequestDigest":this.token}})}catch(a){console.log(a.message)}}},async beforeMount(){await this.getCurrentUser(),await this.checkIfUser()}};a("e956");const F=v()(U,[["render",P],["__scopeId","data-v-896aefb0"]]);var A=F;const q=e=>(Object(s["pushScopeId"])("data-v-e396cf36"),e=e(),Object(s["popScopeId"])(),e),L=q(()=>Object(s["createElementVNode"])("h1",null,"תרגולים",-1)),M=q(()=>Object(s["createElementVNode"])("div",{class:"text-under-line"},null,-1)),Q={class:"container-cards"},$={class:"flex-cards"},R=["src"],z={class:"inner-flex"},H={class:"text"},J={class:"num-of-que"};function K(e,t,n,o,c,r){const i=Object(s["resolveComponent"])("router-link");return Object(s["openBlock"])(),Object(s["createElementBlock"])(s["Fragment"],null,[L,M,Object(s["createElementVNode"])("div",Q,[Object(s["createElementVNode"])("div",$,[(Object(s["openBlock"])(!0),Object(s["createElementBlock"])(s["Fragment"],null,Object(s["renderList"])(c.practices,e=>(Object(s["openBlock"])(),Object(s["createElementBlock"])("div",{class:"items",key:e},[Object(s["createVNode"])(i,{class:"router-text",to:{name:"beforeEnterQuiz",params:{practices:JSON.stringify(e),title:e.Title}}},{default:Object(s["withCtx"])(()=>[Object(s["createElementVNode"])("img",{class:"image-of-items",src:a("1771")("./"+e.Img)},null,8,R),Object(s["createElementVNode"])("div",z,[Object(s["createElementVNode"])("h4",H,Object(s["toDisplayString"])(e.Subject),1),Object(s["createElementVNode"])("span",J,"מספר שאלות: "+Object(s["toDisplayString"])(e.numOfQue),1)])]),_:2},1032,["to"])]))),128))])])],64)}const X=e=>(Object(s["pushScopeId"])("data-v-d269323e"),e=e(),Object(s["popScopeId"])(),e),W={class:"main-container"},G={key:0,class:"about-quiz"},Y={class:"quiz-subject"},Z=X(()=>Object(s["createElementVNode"])("div",{class:"quiz-info"}," Lorem ipsum dolor sit, amet consectetur adipisicing elit. Qui nesciunt eius corrupti expedita necessitatibus voluptatum cumque odit deleniti aspernatur ex, pariatur assumenda labore. Vitae quasi et esse at doloremque ut aliquam, voluptate ab totam aspernatur eius earum reiciendis iste dolor aperiam saepe error eos culpa nobis nisi repellendus inventore quis, temporibus odit? Recusandae autem repellat vitae tempore repudiandae accusantium in illo quidem? Impedit, perspiciatis dignissimos. At numquam non corporis architecto quidem quaerat, ad accusantium ab fuga voluptas minima quam cupiditate ipsam, accusamus praesentium tenetur assumenda, quasi sunt adipisci aliquid necessitatibus? Doloribus ipsum praesentium, ipsa sapiente cumque voluptatem iure error repellendus. ",-1)),ee={class:"start-back-buttons"},te=Object(s["createTextVNode"])(" התחל תרגול");function ae(e,t,a,n,o,c){const r=Object(s["resolveComponent"])("router-link");return Object(s["openBlock"])(),Object(s["createElementBlock"])("div",W,[e.isShow?Object(s["createCommentVNode"])("",!0):(Object(s["openBlock"])(),Object(s["createElementBlock"])("div",G,[Object(s["createElementVNode"])("div",Y,Object(s["toDisplayString"])(o.Subject),1),Z,Object(s["createElementVNode"])("div",ee,[Object(s["createElementVNode"])("button",{class:"back-btn",onClick:t[0]||(t[0]=e=>c.goBack())},"בחזרה לתרגולים"),Object(s["createVNode"])(r,{class:"start-btn",to:{name:"quiz"}},{default:Object(s["withCtx"])(()=>[te]),_:1})])]))])}var se={name:"beforeEnterQuiz",data(){return{results:[],Subject:""}},methods:{goBack(){this.$router.go(-1)}},async beforeMount(){const e=await f.a.get("https://portal.army.idf/sites/hafifon383/_api/web/Lists/getByTitle('tirgulim')/Items");this.results=e.data.value,this.results=this.results.filter(e=>e.Title==this.$route.params.title)[0],this.Subject=this.results.Subject,console.log(this.Subject)}};a("57d3");const ne=v()(se,[["render",ae],["__scopeId","data-v-d269323e"]]);var oe=ne,ce={name:"PracticesList",components:{beforeEnterQuiz:oe},data(){return{practices:[],url:"https://portal.army.idf/sites/hafifon383/_api/web/Lists/getByTitle('tirgulim')/Items"}},async beforeMount(){const e=await f.a.get(this.url);this.practices=e.data.value,console.log(this.practices)}};a("0e93");const re=v()(ce,[["render",K],["__scopeId","data-v-e396cf36"]]);var ie=re;const le={class:"final"};function de(e,t,a,n,o,c){return Object(s["openBlock"])(),Object(s["createElementBlock"])("div",le," מבחן סופי ")}var ue={};const me=v()(ue,[["render",de]]);var be=me;const pe=e=>(Object(s["pushScopeId"])("data-v-b8e62e76"),e=e(),Object(s["popScopeId"])(),e),he=pe(()=>Object(s["createElementVNode"])("h1",null,"האיזור האישי",-1)),Oe=pe(()=>Object(s["createElementVNode"])("div",{class:"under-line"},null,-1)),je={class:"main"},fe={class:"right-side-flex"},ge={class:"name-progress-details"},ke={class:"personal-info"},ve={class:"personal-info-items"},xe={class:"inner-right-flex"},Ne={key:0,class:"name-detail"},Ee=pe(()=>Object(s["createElementVNode"])("div",{class:"hafifa-nickname"}," חפיפון מתחיל ",-1)),ye=pe(()=>Object(s["createElementVNode"])("div",{class:"inner-left-flex"},[Object(s["createElementVNode"])("img",{class:"user-image",src:"http://www.portalhr.leshem.idf/KioskServlet?infoOrPic=pic"})],-1)),Ve={class:"progress-info"},Be={class:"progress-item"},we=pe(()=>Object(s["createElementVNode"])("div",{class:"title"},"כמה עברתי מהחפיפה",-1)),De={class:"progress-circle"},Ce=Object(s["createStaticVNode"])('<div class="left-side-flex" data-v-b8e62e76><div class="grid-container" data-v-b8e62e76><div class="average" data-v-b8e62e76><span class="items-title" data-v-b8e62e76>ממוצע ציונים </span><span class="gradeAv" data-v-b8e62e76></span></div><div class="test-1-score" data-v-b8e62e76><span class="items-title" data-v-b8e62e76>מבחן 1</span><span class="the-grades" data-v-b8e62e76></span></div><div class="test-2-score" data-v-b8e62e76><span class="items-title" data-v-b8e62e76>מבחן 2</span><span class="the-grades" data-v-b8e62e76></span></div><div class="test-3-score" data-v-b8e62e76><span class="items-title" data-v-b8e62e76>מבחן 3</span><span class="the-grades" data-v-b8e62e76></span></div><div class="test-4-score" data-v-b8e62e76><span class="items-title" data-v-b8e62e76>מבחן 4</span></div></div></div>',1);function Se(e,t,a,n,o,c){const r=Object(s["resolveComponent"])("circle-progress");return Object(s["openBlock"])(),Object(s["createElementBlock"])(s["Fragment"],null,[he,Oe,Object(s["createElementVNode"])("div",je,[Object(s["createElementVNode"])("div",fe,[Object(s["createElementVNode"])("div",ge,[Object(s["createElementVNode"])("div",ke,[Object(s["createElementVNode"])("div",ve,[Object(s["createElementVNode"])("div",xe,[o.isFinished?(Object(s["openBlock"])(),Object(s["createElementBlock"])("div",Ne,[Object(s["createElementVNode"])("h2",null,Object(s["toDisplayString"])(o.userName),1)])):Object(s["createCommentVNode"])("",!0),Ee]),ye])]),Object(s["createElementVNode"])("div",Ve,[Object(s["createElementVNode"])("div",Be,[we,Object(s["createElementVNode"])("div",De,[Object(s["createVNode"])(r,{percent:70,"show-percent":!0,"fill-color":"#00a2f3",viewport:!0,transition:600})])])])])]),Ce])],64)}var Te=a("78da"),Ie=a.n(Te),_e=(a("872e"),{components:{CircleProgress:Ie.a},data(){return{userDetails:[],gradesAvera:[],userName:"",isFinished:!1}},beforeMount(){var e=localStorage.getItem("userName");this.userName=e,console.log(this.userName),this.isFinished=!0}});a("9fa3");const Pe=v()(_e,[["render",Se],["__scopeId","data-v-b8e62e76"]]);var Ue=Pe;function Fe(e,t,a,n,o,c){return Object(s["openBlock"])(),Object(s["createElementBlock"])("h1",null," חוברת חפיפה ")}var Ae={};const qe=v()(Ae,[["render",Fe]]);var Le=qe;const Me=e=>(Object(s["pushScopeId"])("data-v-13d081ba"),e=e(),Object(s["popScopeId"])(),e),Qe={key:0,class:"quiz-box"},$e={key:0},Re={class:"question"},ze={class:"questions-text"},He={class:"current-que"},Je=["onUpdate:modelValue","value","onClick","name","id","disabled"],Ke=["for"],Xe={class:"answers-text"},We={key:1,class:"bank-quiz"},Ge={class:"option-title"},Ye=["onUpdate:modelValue","id","value","onClick","disabled"],Ze=["for"],et=["disabled"],tt=Me(()=>Object(s["createElementVNode"])("span",{class:"finish-btn-text"}," סיים ",-1));function at(e,t,a,n,o,c){const r=Object(s["resolveComponent"])("router-link");return o.isFinished?(Object(s["openBlock"])(),Object(s["createElementBlock"])("div",Qe,[(Object(s["openBlock"])(!0),Object(s["createElementBlock"])(s["Fragment"],null,Object(s["renderList"])(o.examData,(e,a)=>(Object(s["openBlock"])(),Object(s["createElementBlock"])("form",{key:a},[a==o.ite?(Object(s["openBlock"])(),Object(s["createElementBlock"])("div",$e,[Object(s["createElementVNode"])("div",Re,[Object(s["createElementVNode"])("span",ze,Object(s["toDisplayString"])(e.Title),1),Object(s["createElementVNode"])("div",He,Object(s["toDisplayString"])(o.ite+1)+"/"+Object(s["toDisplayString"])(o.examData.length),1)]),"american"==e.type?(Object(s["openBlock"])(),Object(s["createElementBlock"])("div",{key:0,class:"answer-options",ref:e["Title"]},[(Object(s["openBlock"])(!0),Object(s["createElementBlock"])(s["Fragment"],null,Object(s["renderList"])(e.answers,(t,n)=>(Object(s["openBlock"])(),Object(s["createElementBlock"])("div",{class:"answer-items",style:Object(s["normalizeStyle"])("--cursor:"+o.inputsCursor),key:n},[Object(s["withDirectives"])(Object(s["createElementVNode"])("input",{type:"radio","onUpdate:modelValue":t=>o.userData[e.Title]=t,ref:t,value:t,onClick:t=>c.clickHandler(t,a,e["Title"]),name:e.Title,id:t,disabled:o.userData[e.Title]},null,8,Je),[[s["vModelRadio"],o.userData[e.Title]]]),Object(s["createElementVNode"])("label",{for:t},[Object(s["createElementVNode"])("div",Xe,Object(s["toDisplayString"])(t),1)],8,Ke)],4))),128))],512)):Object(s["createCommentVNode"])("",!0),"bankQue"==e.type?(Object(s["openBlock"])(),Object(s["createElementBlock"])("div",We,[(Object(s["openBlock"])(!0),Object(s["createElementBlock"])(s["Fragment"],null,Object(s["renderList"])(Object.keys(e.bankOptions),(t,n)=>(Object(s["openBlock"])(),Object(s["createElementBlock"])("div",{class:"bank-quiz-que",key:t+n},[Object(s["createElementVNode"])("div",Ge,Object(s["toDisplayString"])(t),1),Object(s["createElementVNode"])("div",{class:"VX",ref:t},null,512),Object(s["createElementVNode"])("div",{class:"bank-options",ref:t+n},[(Object(s["openBlock"])(!0),Object(s["createElementBlock"])(s["Fragment"],null,Object(s["renderList"])(e.bankCorrect,(r,i)=>(Object(s["openBlock"])(),Object(s["createElementBlock"])("div",{class:"bank-words-items",key:r+i},[Object(s["withDirectives"])(Object(s["createElementVNode"])("input",{type:"radio","onUpdate:modelValue":a=>o.bankUserData[e.Title][t]=a,id:r+n,value:r,onClick:s=>c.clickBankHandler(s,t,o.bankUserData[e.Title],a,n),disabled:""!=o.bankUserData[e.Title][t]},null,8,Ye),[[s["vModelRadio"],o.bankUserData[e.Title][t]]]),Object(s["createElementVNode"])("label",{class:"bank-options-text",for:r+n},Object(s["toDisplayString"])(r),9,Ze)]))),128))],512)]))),128))])):Object(s["createCommentVNode"])("",!0),o.ite!=o.examData.length-1?(Object(s["openBlock"])(),Object(s["createElementBlock"])("button",{key:2,class:"next-button",onClick:t[0]||(t[0]=(...e)=>c.nextQue&&c.nextQue(...e)),ref:"nextBtn",disabled:!o.userData[e.Title]&&o.isDisabled,style:Object(s["normalizeStyle"])("--next-btn-cusror:"+o.nextBtnCursor)},"הבא",12,et)):Object(s["createCommentVNode"])("",!0)])):Object(s["createCommentVNode"])("",!0)]))),128)),o.examData.length==o.ite+1?(Object(s["openBlock"])(),Object(s["createBlock"])(r,{key:0,class:"submit-btn",to:{name:"result"},onClick:c.submit},{default:Object(s["withCtx"])(()=>[tt]),_:1},8,["onClick"])):Object(s["createCommentVNode"])("",!0)])):Object(s["createCommentVNode"])("",!0)}const st=e=>(Object(s["pushScopeId"])("data-v-0bc5fd11"),e=e(),Object(s["popScopeId"])(),e),nt={class:"results-card"},ot={class:"score"},ct={key:0,class:"results-table"},rt=st(()=>Object(s["createElementVNode"])("thead",null,[Object(s["createElementVNode"])("tr",null,[Object(s["createElementVNode"])("th",null,"השאלה"),Object(s["createElementVNode"])("th",null,"התשובה שענית"),Object(s["createElementVNode"])("th",null,"התשובה הנכונה")])],-1)),it={class:"btn"},lt=Object(s["createTextVNode"])("חזרה לתרגולים"),dt=Object(s["createTextVNode"])("לסרטון בנושא"),ut={key:1,class:"all-correct"},mt=st(()=>Object(s["createElementVNode"])("span",null,"כל התשבות נכונות, עבודה מעולה !",-1)),bt=[mt];function pt(e,t,a,n,o,c){const r=Object(s["resolveComponent"])("circle-progress"),i=Object(s["resolveComponent"])("router-link");return Object(s["openBlock"])(),Object(s["createElementBlock"])("div",nt,[Object(s["createElementVNode"])("div",ot,[Object(s["createVNode"])(r,{percent:o.score,"show-percent":!0,"fill-color":"#00a2f3",viewport:!0,transition:700},null,8,["percent"])]),o.showMassaAllCorrect?Object(s["createCommentVNode"])("",!0):(Object(s["openBlock"])(),Object(s["createElementBlock"])("div",ct,[Object(s["createElementVNode"])("table",null,[rt,Object(s["createElementVNode"])("tbody",null,[(Object(s["openBlock"])(!0),Object(s["createElementBlock"])(s["Fragment"],null,Object(s["renderList"])(o.userResults,e=>(Object(s["openBlock"])(),Object(s["createElementBlock"])("tr",{key:e},[Object(s["createElementVNode"])("td",null,Object(s["toDisplayString"])(e.theCorrectAns),1),Object(s["createElementVNode"])("td",null,Object(s["toDisplayString"])(e.wrongAns),1),Object(s["createElementVNode"])("td",null,Object(s["toDisplayString"])(e.wrongQue),1)]))),128)),(Object(s["openBlock"])(!0),Object(s["createElementBlock"])(s["Fragment"],null,Object(s["renderList"])(o.userBankResults,e=>(Object(s["openBlock"])(),Object(s["createElementBlock"])("tr",{key:e},[Object(s["createElementVNode"])("td",null,Object(s["toDisplayString"])(e.theCorrectBankAns),1),Object(s["createElementVNode"])("td",null,Object(s["toDisplayString"])(e.wrongBankAns),1),Object(s["createElementVNode"])("td",null,Object(s["toDisplayString"])(e.wrongBankQue),1)]))),128))])]),Object(s["createElementVNode"])("div",it,[Object(s["createVNode"])(i,{class:"back-btn",to:{name:"PracticesList"}},{default:Object(s["withCtx"])(()=>[lt]),_:1}),Object(s["createVNode"])(i,{class:"video-btn",to:{name:"PracticesList"}},{default:Object(s["withCtx"])(()=>[dt]),_:1})])])),o.showMassaAllCorrect?(Object(s["openBlock"])(),Object(s["createElementBlock"])("div",ut,bt)):Object(s["createCommentVNode"])("",!0)])}var ht={name:"practiceResult",components:{CircleProgress:Ie.a},data(){return{userResults:[],userBankResults:[],score:"",showMassaAllCorrect:!1,isBankQue:!1}},async beforeMount(){var e=localStorage.getItem("pointsInPerc");this.score=JSON.parse(e),console.log(this.score);var t=localStorage.getItem("results");this.userResults=JSON.parse(t);var a=localStorage.getItem("bankResults");this.userBankResults=JSON.parse(a),console.log(this.userResults),0==this.userResults.length&&0==this.userBankResults.length&&(this.showMassaAllCorrect=!0)}};a("1f62");const Ot=v()(ht,[["render",pt],["__scopeId","data-v-0bc5fd11"]]);var jt=Ot,ft={components:{practiceResult:jt},data(){return{examData:[],url:`https://portal.army.idf/sites/hafifon383/_api/web/Lists/getByTitle('${this.$route.params.title}')/Items`,userData:{},bankUserData:{},grades:0,isFinished:!1,isFinishedButton:!1,ite:0,inputsCursor:"pointer",nextBtnCursor:"not-allowed",wrongAns:"",wrongQue:"",theCorrectAns:"",results:[],bankResults:[],bankWrongAns:[],parseAns:[],isDisabled:!0,bankQuePoints:0}},methods:{clickHandler(e,t,a){this.inputsCursor="not-allowed",this.nextBtnCursor="pointer";const s=e.target,n=s.value,o=this.examData[t]["correctAnswer"];console.log(this.$refs[a].children[o].querySelector("input"));const c=this.$refs[a].children[o].querySelector("input"),r=c.value;if(n!=r&&s.classList.add("input-answer-wrong"),c.classList.add("input-answer-right"),this.ite!=this.examData.length-1){var i=this.$refs["nextBtn"];i.classList.add("next-btn-on")}},clickBankHandler(e,t,a,s,n){var o=this.$refs[t+n];o.classList.add("bank-input-cursor"),this.checkIfcorrectBank(e,t,a,s),this.disableNextBtn(a)},checkIfcorrectBank(e,t,a,s){const n=e.target,o=n.value,c=this.$refs[t];var r=0;Object.keys(this.examData[s].bankOptions).forEach(e=>{r++}),o==this.examData[s].bankOptions[t]?(console.log("correct"),c.classList.add("input-bank-right"),this.bankQuePoints+=100/this.examData.length/r,console.log(this.bankQuePoints)):(console.log("not correct"),c.classList.add("input-bank-wrong"),this.bankResults.push({wrongBankQue:this.examData[s].Title,wrongBankAns:o+": "+t,theCorrectBankAns:this.examData[s].bankOptions[t]+": "+t,type:"bankQue"}))},disableNextBtn(e){var t=0;if(Object.values(e).forEach(e=>{console.log(e),""==e&&t++}),t>1)this.isDisabled=!0;else{this.isDisabled=!1;const e=this.$refs["nextBtn"];e.classList.add("next-btn-on"),this.nextBtnCursor="pointer"}},asyncParse(e){return new Promise(t=>{t(JSON.parse(e))})},nextQue(){this.isDisabled=!0,this.inputsCursor="pointer",this.nextBtnCursor="not-allowed",this.ite++,this.isFinishedButton=!1},backQue(){this.ite--},updateVmodelAmerican(){this.examData.forEach(e=>{"american"==e.type&&(console.log("american"),this.userData[e.Title]="")}),console.log(this.userData),this.isFinished=!0},updateVmodelBank(){this.examData.forEach(e=>{"bankQue"==e.type&&(this.bankUserData[e.Title]={},Object.keys(e.bankOptions).forEach(t=>{this.bankUserData[e.Title][t]=""}))}),console.log(this.bankUserData),this.isFinished=!0},submit(){console.log(this.results),this.examData.forEach(e=>{"american"==e.type&&(console.log(this.userData),this.userData[e.Title]==e.answers[e.correctAnswer]?(this.grades++,console.log(this.grades)):(this.wrongQue=e.Title,this.wrongAns=this.userData[e.Title],this.theCorrectAns=e.answers[e.correctAnswer],this.results.push({wrongQue:this.wrongQue,wrongAns:this.wrongAns,theCorrectAns:this.theCorrectAns,type:"AmerQue"})))});var e=Math.round(this.grades/this.examData.length*100+this.bankQuePoints);localStorage.setItem("pointsInPerc",JSON.stringify(e)),localStorage.setItem("results",JSON.stringify(this.results)),localStorage.setItem("bankResults",JSON.stringify(this.bankResults))}},async beforeMount(){if(this.url==`https://portal.army.idf/sites/hafifon383/_api/web/Lists/getByTitle('${this.$route.params.title}')/Items`){const e=await f.a.get(this.url);this.examData=e.data.value;await Promise.all(this.examData.map(e=>this.asyncParse(e.answers).then(t=>(e["answers"]=t,{item:e})))),await Promise.all(this.examData.map(e=>{if("bankQue"==e.type)return this.asyncParse(e.bankCorrect).then(t=>(e["bankCorrect"]=t,{item:e}))})),await Promise.all(this.examData.map(e=>{if("bankQue"==e.type)return this.asyncParse(e.bankOptions).then(t=>(e["bankOptions"]=t,{bankOption:e}))}));console.log(this.examData)}else{const e=await f.a.get(this.url);this.examData=e.data.value,this.examData=this.examData.filter(e=>e.Title==this.$route.params.title)[0],this.examData=this.examData.exam,console.log(this.examData)}this.updateVmodelBank()},mounted(){this.updateVmodelAmerican()}};a("ef97");const gt=v()(ft,[["render",at],["__scopeId","data-v-13d081ba"]]);var kt=gt;const vt={key:0,class:"exam"},xt={class:"question"},Nt={class:"answer-options"},Et=["onUpdate:modelValue","value","name","id"],yt=["for"],Vt={class:"answer-text"},Bt=Object(s["createTextVNode"])("הגש"),wt={key:1,class:"alreadySubmitted"};function Dt(e,t,a,n,o,c){const r=Object(s["resolveComponent"])("router-link");return Object(s["openBlock"])(),Object(s["createElementBlock"])(s["Fragment"],null,[o.isAllowed&&o.isFinished?(Object(s["openBlock"])(),Object(s["createElementBlock"])("div",vt,[(Object(s["openBlock"])(!0),Object(s["createElementBlock"])(s["Fragment"],null,Object(s["renderList"])(o.examData,(e,a)=>(Object(s["openBlock"])(),Object(s["createElementBlock"])("form",{key:a},[Object(s["createElementVNode"])("div",xt,[Object(s["createElementVNode"])("span",null,Object(s["toDisplayString"])(a+1)+". "+Object(s["toDisplayString"])(e.Title),1)]),Object(s["createElementVNode"])("div",Nt,[(Object(s["openBlock"])(!0),Object(s["createElementBlock"])(s["Fragment"],null,Object(s["renderList"])(e.answers,(a,n)=>(Object(s["openBlock"])(),Object(s["createElementBlock"])("div",{class:"answer-items",key:n},[Object(s["withDirectives"])(Object(s["createElementVNode"])("input",{type:"radio",ref:a,"onUpdate:modelValue":t=>o.examUserData[e.Title]=t,value:a,onChange:t[0]||(t[0]=e=>c.clickHandler(e)),name:e.Title,id:a},null,40,Et),[[s["vModelRadio"],o.examUserData[e.Title]]]),Object(s["createElementVNode"])("label",{for:a},[Object(s["createElementVNode"])("div",Vt,Object(s["toDisplayString"])(a),1)],8,yt)]))),128))])]))),128)),Object(s["createVNode"])(r,{class:"submit-btn",to:{name:"submitExams"},onClick:c.submit},{default:Object(s["withCtx"])(()=>[Bt]),_:1},8,["onClick"])])):Object(s["createCommentVNode"])("",!0),0==o.isAllowed?(Object(s["openBlock"])(),Object(s["createElementBlock"])("div",wt," כבר הגשת מבחן זה... ")):Object(s["createCommentVNode"])("",!0)],64)}var Ct={data(){return{urlForTheExams:`https://portal.army.idf/sites/hafifon383/_api/web/Lists/getByTitle('${this.$route.params.Title}')/Items`,examData:[],isFinished:!1,examUserData:{},token:"",isFinished:!1,userName:"",userId:"",isAllowed:!1,examExistData:[],urlForPostUser:"https://portal.army.idf/sites/hafifon383/_api/web/Lists/getByTitle('pending tests')/Items"}},methods:{asyncParse(e){return new Promise(t=>{t(JSON.parse(e))})},clickHandler(e){const t=e.target,a=t.value;console.log(a)},async getToken(){const e=await f.a.post("https://portal.army.idf/sites/hafifon383/_api/contextinfo");this.token=e.data.FormDigestValue,console.log(this.token)},async postExams(){if("https://portal.army.idf/sites/hafifon383/_api/web/Lists/getByTitle('pending tests')/Items"==this.urlForPostUser){await this.getToken();await f.a.post(this.urlForPostUser,{Title:this.userName,exam:JSON.stringify(this.examUserData),num:this.userId,type:this.$route.params.Title},{headers:{"X-RequestDigest":this.token}})}else{console.log(this.urlForPostUser);await f.a.post(this.urlForPostUser,{Title:"sdsdsd",exam:this.examUserData,num:this.userId,type:this.$route.params.Title})}},submit(){console.log(this.examUserData),this.postExams()},async checkIfExamExist(){this.userId=localStorage.getItem("userId");const e=await f.a.get(`https://portal.army.idf/sites/hafifon383/_api/web/Lists/getByTitle('pending tests')/Items?$filter=(num eq '${this.userId}') and (type eq '${this.$route.params.Title}')`);try{this.examExistData=e.data.value,console.log(this.examExistData),null==this.examExistData[0].exam?(console.log("is empty, you should see the exam"),this.isAllowed=!0):(console.log("is full"),this.isAllowed=!1)}catch{console.log("is empty, you should see the exam"),this.isAllowed=!0}}},async beforeMount(){if(await this.checkIfExamExist(),this.userName=localStorage.getItem("userName"),console.log(this.userName),console.log(this.isAllowed),this.urlForTheExams==`https://portal.army.idf/sites/hafifon383/_api/web/Lists/getByTitle('${this.$route.params.Title}')/Items`){console.log(this.urlForTheExams);const e=await f.a.get(this.urlForTheExams);this.examData=e.data.value,console.log(this.examData);await Promise.all(this.examData.map(e=>this.asyncParse(e.answers).then(t=>(e["answers"]=t,{item:e}))))}else{const e=await f.a.get(this.urlForTheExams);this.examData=e.data.value,console.log(this.examData)}this.isFinished=!0,console.log(this.isFinished)},mounted(){this.examData.forEach(e=>{this.examUserData[e.Title]=""}),console.log(this.examUserData)}};a("bfb6");const St=v()(Ct,[["render",Dt],["__scopeId","data-v-7ec092d2"]]);var Tt=St;const It={class:"title"};function _t(e,t,a,n,o,c){return Object(s["openBlock"])(),Object(s["createElementBlock"])("div",It,"המבחן הוגש בהצלחה")}var Pt={};a("16ce");const Ut=v()(Pt,[["render",_t],["__scopeId","data-v-1da10be8"]]);var Ft=Ut;const At=[{path:"/HomePage",name:"HomePage",component:A},{path:"/Practices",name:"PracticesList",component:ie},{path:"/FinalExam",name:"FinalExam",component:be},{path:"/User",name:"User",component:Ue},{path:"/HafifaBook",name:"HafifaBook",component:Le},{path:"/exams/:Title",name:"exams",component:Tt,props:e=>({...e.params})},{path:"/exams/:Title/submitted",name:"submitExams",component:Ft,props:e=>({...e.params})},{path:"/Practices/:title",name:"beforeEnterQuiz",component:oe,props:e=>({...e.params})},{path:"/Practices/:title/quiz",name:"quiz",component:kt,props:e=>({...e.params})},{path:"/Practices/:title/result",name:"result",component:jt,props:e=>({...e.params})}],qt=Object(B["a"])({history:Object(B["b"])(""),routes:At});var Lt=qt;Object(s["createApp"])(V).use(Lt).mount("#app")},"57d3":function(e,t,a){"use strict";a("6ce8")},"580a":function(e,t,a){e.exports=a.p+"img/xrm.0eb906a3.jpg"},"5ffa":function(e,t,a){"use strict";a("c68d")},"606a":function(e,t,a){},"6ce8":function(e,t,a){},"713a":function(e,t,a){e.exports=a.p+"img/bios.ea33ba68.png"},"80e6":function(e,t,a){e.exports=a.p+"img/onlineCourse.fd2b6fae.jpg"},8134:function(e,t,a){e.exports=a.p+"img/CMD.4a05cdd1.png"},"879e":function(e,t,a){},"8e4a":function(e,t,a){e.exports=a.p+"img/mail.b1be72ce.jpg"},"914e":function(e,t,a){e.exports=a.p+"img/communication.51737fd5.png"},9691:function(e,t,a){"use strict";a("606a")},"9db6":function(e,t,a){e.exports=a.p+"img/printer.8bd0f703.jpg"},"9fa3":function(e,t,a){"use strict";a("879e")},bfb6:function(e,t,a){"use strict";a("2ee9")},c68d:function(e,t,a){},d2a3:function(e,t,a){},df0b:function(e,t,a){e.exports=a.p+"img/active-directory-logo2.6af63782.png"},e017:function(e,t,a){},e0d7:function(e,t,a){e.exports=a.p+"img/fileServer.9953c2a0.jpg"},e7f6:function(e,t,a){},e956:function(e,t,a){"use strict";a("e7f6")},ed98:function(e,t,a){e.exports=a.p+"img/mivzOper.996f2a76.png"},ef97:function(e,t,a){"use strict";a("fa57")},fa57:function(e,t,a){},fd40:function(e,t,a){e.exports=a.p+"img/KioskServlet.3c3587b1.jpg"}});
//# sourceMappingURL=app.908c378c.js.map
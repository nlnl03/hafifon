(function(e){function t(t){for(var c,o,r=t[0],i=t[1],l=t[2],u=0,m=[];u<r.length;u++)o=r[u],Object.prototype.hasOwnProperty.call(s,o)&&s[o]&&m.push(s[o][0]),s[o]=0;for(c in i)Object.prototype.hasOwnProperty.call(i,c)&&(e[c]=i[c]);d&&d(t);while(m.length)m.shift()();return n.push.apply(n,l||[]),a()}function a(){for(var e,t=0;t<n.length;t++){for(var a=n[t],c=!0,r=1;r<a.length;r++){var i=a[r];0!==s[i]&&(c=!1)}c&&(n.splice(t--,1),e=o(o.s=a[0]))}return e}var c={},s={app:0},n=[];function o(t){if(c[t])return c[t].exports;var a=c[t]={i:t,l:!1,exports:{}};return e[t].call(a.exports,a,a.exports,o),a.l=!0,a.exports}o.m=e,o.c=c,o.d=function(e,t,a){o.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:a})},o.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},o.t=function(e,t){if(1&t&&(e=o(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var a=Object.create(null);if(o.r(a),Object.defineProperty(a,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var c in e)o.d(a,c,function(t){return e[t]}.bind(null,c));return a},o.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return o.d(t,"a",t),t},o.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},o.p="";var r=window["webpackJsonp"]=window["webpackJsonp"]||[],i=r.push.bind(r);r.push=t,r=r.slice();for(var l=0;l<r.length;l++)t(r[l]);var d=i;n.push([0,"chunk-vendors"]),a()})({0:function(e,t,a){e.exports=a("56d7")},"0e93":function(e,t,a){"use strict";a("4129")},1771:function(e,t,a){var c={"./Assistant-Regular.ttf":"33e1","./CMD.png":"8134","./KioskServlet.jpg":"fd40","./active-directory-logo2.png":"df0b","./bios.png":"713a","./disc.png":"183b","./fileServer.jpg":"e0d7","./mail.jpg":"8e4a","./onlineCourse.jpg":"80e6","./pc.jpg":"1e5e","./printer.jpg":"9db6"};function s(e){var t=n(e);return a(t)}function n(e){if(!a.o(c,e)){var t=new Error("Cannot find module '"+e+"'");throw t.code="MODULE_NOT_FOUND",t}return c[e]}s.keys=function(){return Object.keys(c)},s.resolve=n,e.exports=s,s.id="1771"},"183b":function(e,t,a){e.exports=a.p+"img/disc.75e57f0a.png"},"1e5e":function(e,t,a){e.exports=a.p+"img/pc.f8de9fed.jpg"},"33e1":function(e,t,a){e.exports=a.p+"fonts/Assistant-Regular.5193a037.ttf"},"3b42":function(e,t,a){"use strict";a("5c10")},4129:function(e,t,a){},"4f2a":function(e,t,a){},"55f5":function(e,t,a){},"56d7":function(e,t,a){"use strict";a.r(t);var c=a("7a23");function s(e,t,a,s,n,o){const r=Object(c["resolveComponent"])("MainNavbar"),i=Object(c["resolveComponent"])("router-view");return Object(c["openBlock"])(),Object(c["createElementBlock"])("div",null,[Object(c["createVNode"])(r),Object(c["createVNode"])(i)])}const n=e=>(Object(c["pushScopeId"])("data-v-d45ce580"),e=e(),Object(c["popScopeId"])(),e),o={class:"main-nav"},r=Object(c["createTextVNode"])(" חפיפה "),i=Object(c["createTextVNode"])(" לאיזור אישי "),l={class:"menu"},d={class:"nav-bar"},u=Object(c["createTextVNode"])("המבחן הסופי"),m=Object(c["createTextVNode"])("חוברת חפיפה"),b=n(()=>Object(c["createElementVNode"])("span",null,"בחנים",-1)),p={key:0,class:"drop-down-menu"},j={class:"drop-down-items"},O=Object(c["createTextVNode"])("בוחן 1"),f=Object(c["createTextVNode"])("בוחן 2"),h=Object(c["createTextVNode"])("בוחן 3"),g=Object(c["createTextVNode"])("בוחן 4"),v=Object(c["createTextVNode"])("תרגולים");function N(e,t,a,s,n,N){const x=Object(c["resolveComponent"])("router-link");return Object(c["openBlock"])(),Object(c["createElementBlock"])("div",o,[Object(c["createVNode"])(x,{to:{name:"HomePage"},class:"home-title"},{default:Object(c["withCtx"])(()=>[r]),_:1}),Object(c["createVNode"])(x,{to:{name:"User"},class:"user-title"},{default:Object(c["withCtx"])(()=>[i]),_:1}),Object(c["createElementVNode"])("div",l,[Object(c["createElementVNode"])("div",d,[Object(c["createElementVNode"])("ul",null,[Object(c["createElementVNode"])("li",null,[Object(c["createElementVNode"])("div",null,[Object(c["createVNode"])(x,{to:{name:"FinalExam"}},{default:Object(c["withCtx"])(()=>[u]),_:1})])]),Object(c["createElementVNode"])("li",null,[Object(c["createElementVNode"])("div",null,[Object(c["createVNode"])(x,{to:{name:"HafifaBook"}},{default:Object(c["withCtx"])(()=>[m]),_:1})])]),Object(c["createElementVNode"])("li",{onMouseleave:t[1]||(t[1]=e=>n.isOpen=!1)},[Object(c["createElementVNode"])("div",{onMouseover:t[0]||(t[0]=e=>n.isOpen=!0)},[b,n.isOpen?(Object(c["openBlock"])(),Object(c["createElementBlock"])("div",p,[Object(c["createElementVNode"])("ul",j,[Object(c["createVNode"])(x,{to:{name:"exam1"},class:"exams"},{default:Object(c["withCtx"])(()=>[O]),_:1}),Object(c["createVNode"])(x,{to:{name:"exam2"},class:"exams"},{default:Object(c["withCtx"])(()=>[f]),_:1}),Object(c["createVNode"])(x,{to:{name:"exam3"},class:"exams"},{default:Object(c["withCtx"])(()=>[h]),_:1}),Object(c["createVNode"])(x,{to:{name:"exam4"},class:"exams"},{default:Object(c["withCtx"])(()=>[g]),_:1})])])):Object(c["createCommentVNode"])("",!0)],32)],32),Object(c["createElementVNode"])("li",null,[Object(c["createElementVNode"])("div",null,[Object(c["createVNode"])(x,{to:{name:"PracticesList"}},{default:Object(c["withCtx"])(()=>[v]),_:1})])])])])])])}var x={name:"MainNavbar",data(){return{isOpen:!1}}},V=(a("b0ff"),a("6b0d")),E=a.n(V);const k=E()(x,[["render",N],["__scopeId","data-v-d45ce580"]]);var D=k,y={name:"App",components:{MainNavbar:D}};a("3b42");const w=E()(y,[["render",s]]);var B=w,S=a("6c02");const C=e=>(Object(c["pushScopeId"])("data-v-5ced1eb5"),e=e(),Object(c["popScopeId"])(),e),_={class:"container"},I=C(()=>Object(c["createElementVNode"])("div",{class:"title"},[Object(c["createElementVNode"])("h1",null,"ברוכים הבאים לאתר חפיפה")],-1)),T=C(()=>Object(c["createElementVNode"])("div",{class:"name"},[Object(c["createElementVNode"])("h2",null,"שלום טכנאי")],-1)),q={class:"btns"},M=Object(c["createTextVNode"])("המשך תרגול"),P=Object(c["createTextVNode"])("למבחן הסופי");function F(e,t,a,s,n,o){const r=Object(c["resolveComponent"])("router-link");return Object(c["openBlock"])(),Object(c["createElementBlock"])("div",_,[I,T,Object(c["createElementVNode"])("div",q,[Object(c["createVNode"])(r,{to:""},{default:Object(c["withCtx"])(()=>[M]),_:1}),Object(c["createVNode"])(r,{to:""},{default:Object(c["withCtx"])(()=>[P]),_:1})])])}var A={components:{}};a("d75b");const L=E()(A,[["render",F],["__scopeId","data-v-5ced1eb5"]]);var z=L;const Q=e=>(Object(c["pushScopeId"])("data-v-e396cf36"),e=e(),Object(c["popScopeId"])(),e),H=Q(()=>Object(c["createElementVNode"])("h1",null,"תרגולים",-1)),$=Q(()=>Object(c["createElementVNode"])("div",{class:"text-under-line"},null,-1)),U={class:"container-cards"},J={class:"flex-cards"},R=["src"],K={class:"inner-flex"},G={class:"text"},W={class:"num-of-que"};function X(e,t,s,n,o,r){const i=Object(c["resolveComponent"])("router-link");return Object(c["openBlock"])(),Object(c["createElementBlock"])(c["Fragment"],null,[H,$,Object(c["createElementVNode"])("div",U,[Object(c["createElementVNode"])("div",J,[(Object(c["openBlock"])(!0),Object(c["createElementBlock"])(c["Fragment"],null,Object(c["renderList"])(o.practices,e=>(Object(c["openBlock"])(),Object(c["createElementBlock"])("div",{class:"items",key:e},[Object(c["createVNode"])(i,{class:"router-text",to:{name:"beforeEnterQuiz",params:{practices:JSON.stringify(e),title:e.Title}}},{default:Object(c["withCtx"])(()=>[Object(c["createElementVNode"])("img",{class:"image-of-items",src:a("1771")("./"+e.Img)},null,8,R),Object(c["createElementVNode"])("div",K,[Object(c["createElementVNode"])("h4",G,Object(c["toDisplayString"])(e.Subject),1),Object(c["createElementVNode"])("span",W,"מספר שאלות: "+Object(c["toDisplayString"])(e.numOfQue),1)])]),_:2},1032,["to"])]))),128))])])],64)}const Y=e=>(Object(c["pushScopeId"])("data-v-d269323e"),e=e(),Object(c["popScopeId"])(),e),Z={class:"main-container"},ee={key:0,class:"about-quiz"},te={class:"quiz-subject"},ae=Y(()=>Object(c["createElementVNode"])("div",{class:"quiz-info"}," Lorem ipsum dolor sit, amet consectetur adipisicing elit. Qui nesciunt eius corrupti expedita necessitatibus voluptatum cumque odit deleniti aspernatur ex, pariatur assumenda labore. Vitae quasi et esse at doloremque ut aliquam, voluptate ab totam aspernatur eius earum reiciendis iste dolor aperiam saepe error eos culpa nobis nisi repellendus inventore quis, temporibus odit? Recusandae autem repellat vitae tempore repudiandae accusantium in illo quidem? Impedit, perspiciatis dignissimos. At numquam non corporis architecto quidem quaerat, ad accusantium ab fuga voluptas minima quam cupiditate ipsam, accusamus praesentium tenetur assumenda, quasi sunt adipisci aliquid necessitatibus? Doloribus ipsum praesentium, ipsa sapiente cumque voluptatem iure error repellendus. ",-1)),ce={class:"start-back-buttons"},se=Object(c["createTextVNode"])(" התחל תרגול");function ne(e,t,a,s,n,o){const r=Object(c["resolveComponent"])("router-link");return Object(c["openBlock"])(),Object(c["createElementBlock"])("div",Z,[e.isShow?Object(c["createCommentVNode"])("",!0):(Object(c["openBlock"])(),Object(c["createElementBlock"])("div",ee,[Object(c["createElementVNode"])("div",te,Object(c["toDisplayString"])(n.Subject),1),ae,Object(c["createElementVNode"])("div",ce,[Object(c["createElementVNode"])("button",{class:"back-btn",onClick:t[0]||(t[0]=e=>o.goBack())},"בחזרה לתרגולים"),Object(c["createVNode"])(r,{class:"start-btn",to:{name:"quiz"}},{default:Object(c["withCtx"])(()=>[se]),_:1})])]))])}var oe=a("bc3a"),re=a.n(oe),ie={name:"beforeEnterQuiz",data(){return{results:[],Subject:""}},methods:{goBack(){this.$router.go(-1)}},async beforeMount(){const e=await re.a.get("https://portal.army.idf/sites/hafifon383/_api/web/Lists/getByTitle('tirgulim')/Items");this.results=e.data.value,this.results=this.results.filter(e=>e.Title==this.$route.params.title)[0],this.Subject=this.results.Subject,console.log(this.Subject)}};a("57d3");const le=E()(ie,[["render",ne],["__scopeId","data-v-d269323e"]]);var de=le,ue={name:"PracticesList",components:{beforeEnterQuiz:de},data(){return{practices:[],url:"https://portal.army.idf/sites/hafifon383/_api/web/Lists/getByTitle('tirgulim')/Items"}},async beforeMount(){const e=await re.a.get(this.url);this.practices=e.data.value,console.log(this.practices)}};a("0e93");const me=E()(ue,[["render",X],["__scopeId","data-v-e396cf36"]]);var be=me;const pe={class:"final"};function je(e,t,a,s,n,o){return Object(c["openBlock"])(),Object(c["createElementBlock"])("div",pe," מבחן סופי ")}var Oe={};const fe=E()(Oe,[["render",je]]);var he=fe;const ge=e=>(Object(c["pushScopeId"])("data-v-2cf3bdca"),e=e(),Object(c["popScopeId"])(),e),ve=ge(()=>Object(c["createElementVNode"])("h1",null,"האיזור האישי",-1)),Ne=ge(()=>Object(c["createElementVNode"])("div",{class:"under-line"},null,-1)),xe={class:"main"},Ve={class:"right-side-flex"},Ee={class:"fff"},ke={class:"personal-info"},De={class:"personal-info-items"},ye={class:"inner-right-flex"},we={key:0,class:"name-detail"},Be=ge(()=>Object(c["createElementVNode"])("div",{class:"hafifa-nickname"}," חפיפון מתחיל ",-1)),Se={class:"inner-left-flex"},Ce=["src"],_e={class:"progress-info"},Ie={class:"progress-item"},Te=ge(()=>Object(c["createElementVNode"])("div",{class:"title"},"כמה עברתי מהחפיפה",-1)),qe={class:"progress-circle"},Me={class:"left-side-flex"},Pe={class:"grid-container"},Fe={class:"average"},Ae=ge(()=>Object(c["createElementVNode"])("span",{class:"items-title"},"ממוצע ציונים ",-1)),Le={class:"gradeAv"},ze={class:"test-1-score"},Qe=ge(()=>Object(c["createElementVNode"])("span",{class:"items-title"},"מבחן 1",-1)),He={class:"the-grades"},$e={class:"test-2-score"},Ue=ge(()=>Object(c["createElementVNode"])("span",{class:"items-title"},"מבחן 2",-1)),Je={class:"the-grades"},Re={class:"test-3-score"},Ke=ge(()=>Object(c["createElementVNode"])("span",{class:"items-title"},"מבחן 3",-1)),Ge={class:"the-grades"},We={class:"test-4-score"},Xe=ge(()=>Object(c["createElementVNode"])("span",{class:"items-title"},"מבחן 4",-1)),Ye={class:"the-grades"};function Ze(e,t,s,n,o,r){const i=Object(c["resolveComponent"])("circle-progress");return Object(c["openBlock"])(),Object(c["createElementBlock"])(c["Fragment"],null,[ve,Ne,Object(c["createElementVNode"])("div",xe,[Object(c["createElementVNode"])("div",Ve,[Object(c["createElementVNode"])("div",Ee,[Object(c["createElementVNode"])("div",ke,[Object(c["createElementVNode"])("div",De,[Object(c["createElementVNode"])("div",ye,[o.finished?(Object(c["openBlock"])(),Object(c["createElementBlock"])("div",we,[Object(c["createElementVNode"])("h2",null,Object(c["toDisplayString"])(o.userDetails[0].name),1),Object(c["createElementVNode"])("h5",null,Object(c["toDisplayString"])(o.userDetails[0].mahlaka),1)])):Object(c["createCommentVNode"])("",!0),Be]),Object(c["createElementVNode"])("div",Se,[Object(c["createElementVNode"])("img",{class:"user-image",src:a("fd40")},null,8,Ce)])])]),Object(c["createElementVNode"])("div",_e,[Object(c["createElementVNode"])("div",Ie,[Te,Object(c["createElementVNode"])("div",qe,[Object(c["createVNode"])(i,{percent:70,"show-percent":!0,"fill-color":"#00a2f3",viewport:!0,transition:600})])])])])]),Object(c["createElementVNode"])("div",Me,[Object(c["createElementVNode"])("div",Pe,[Object(c["createElementVNode"])("div",Fe,[Ae,Object(c["createElementVNode"])("span",Le,Object(c["toDisplayString"])(o.gradesAvera[0]),1)]),Object(c["createElementVNode"])("div",ze,[Qe,Object(c["createElementVNode"])("span",He,Object(c["toDisplayString"])(o.userDetails[0].grades.test1),1)]),Object(c["createElementVNode"])("div",$e,[Ue,Object(c["createElementVNode"])("span",Je,Object(c["toDisplayString"])(o.userDetails[0].grades.test2),1)]),Object(c["createElementVNode"])("div",Re,[Ke,Object(c["createElementVNode"])("span",Ge,Object(c["toDisplayString"])(o.userDetails[0].grades.test3),1)]),Object(c["createElementVNode"])("div",We,[Xe,Object(c["createElementVNode"])("span",Ye,Object(c["toDisplayString"])(o.userDetails[0].grades.test4),1)])])])])],64)}var et=a("78da"),tt=a.n(et),at=(a("872e"),{components:{CircleProgress:tt.a},data(){return{finished:!1,userDetails:[],gradesAvera:[]}},async beforeMount(){const e=await re.a.get("http://localhost:3000/users");this.userDetails=e.data,this.finished=!0,console.log(this.userDetails);for(let o in this.userDetails){var t=parseInt(this.userDetails[o].grades.test1),a=parseInt(this.userDetails[o].grades.test2),c=parseInt(this.userDetails[o].grades.test3),s=parseInt(this.userDetails[o].grades.test4),n=(t+a+c+s)/4;this.gradesAvera.push(n)}console.log(this.gradesAvera)}});a("7fab");const ct=E()(at,[["render",Ze],["__scopeId","data-v-2cf3bdca"]]);var st=ct;function nt(e,t,a,s,n,o){return Object(c["openBlock"])(),Object(c["createElementBlock"])("h1",null," חוברת חפיפה ")}var ot={};const rt=E()(ot,[["render",nt]]);var it=rt;const lt=e=>(Object(c["pushScopeId"])("data-v-4474c557"),e=e(),Object(c["popScopeId"])(),e),dt={key:0,class:"quiz-box"},ut={key:0,class:"show"},mt={class:"question"},bt={class:"questions-text"},pt={class:"current-que"},jt={class:"answer-options"},Ot=["onUpdate:modelValue","value","onChange","name","id","disabled"],ft=["for"],ht={class:"answers-text"},gt=["disabled"],vt=lt(()=>Object(c["createElementVNode"])("span",{class:"finish-btn-text"}," סיים ",-1));function Nt(e,t,a,s,n,o){const r=Object(c["resolveComponent"])("router-link");return n.isFinished?(Object(c["openBlock"])(),Object(c["createElementBlock"])("div",dt,[(Object(c["openBlock"])(!0),Object(c["createElementBlock"])(c["Fragment"],null,Object(c["renderList"])(n.examData,(e,a)=>(Object(c["openBlock"])(),Object(c["createElementBlock"])("form",{key:a},[a==n.ite?(Object(c["openBlock"])(),Object(c["createElementBlock"])("div",ut,[Object(c["createElementVNode"])("div",mt,[Object(c["createElementVNode"])("span",bt,Object(c["toDisplayString"])(e.Title),1),Object(c["createElementVNode"])("div",pt,Object(c["toDisplayString"])(n.ite+1)+"/"+Object(c["toDisplayString"])(n.examData.length),1)]),Object(c["createElementVNode"])("div",jt,[(Object(c["openBlock"])(!0),Object(c["createElementBlock"])(c["Fragment"],null,Object(c["renderList"])(e.answers,t=>(Object(c["openBlock"])(),Object(c["createElementBlock"])("div",{class:"answer-items",style:Object(c["normalizeStyle"])("--cursor:"+n.inputsCursor),key:t},[Object(c["withDirectives"])(Object(c["createElementVNode"])("input",{type:"radio","onUpdate:modelValue":t=>n.userData[e.Title]=t,ref:t+a,value:t,onChange:e=>o.clickHandler(e,a),name:e.Title,id:t,disabled:n.userData[e.Title]},null,40,Ot),[[c["vModelRadio"],n.userData[e.Title]]]),Object(c["createElementVNode"])("label",{for:t},[Object(c["createElementVNode"])("span",ht,Object(c["toDisplayString"])(t),1)],8,ft)],4))),128))]),n.ite!=n.examData.length-1?(Object(c["openBlock"])(),Object(c["createElementBlock"])("button",{key:0,class:"next-button",onClick:t[0]||(t[0]=(...e)=>o.nextQue&&o.nextQue(...e)),disabled:!n.userData[e.Title],style:Object(c["normalizeStyle"])("--next-btn-cusror:"+n.nextBtnCursor)},"הבא",12,gt)):Object(c["createCommentVNode"])("",!0)])):Object(c["createCommentVNode"])("",!0)]))),128)),n.examData.length==n.ite+1?(Object(c["openBlock"])(),Object(c["createBlock"])(r,{key:0,class:"submit-btn",to:{name:"result"},onClick:o.submit},{default:Object(c["withCtx"])(()=>[vt]),_:1},8,["onClick"])):Object(c["createCommentVNode"])("",!0)])):Object(c["createCommentVNode"])("",!0)}function xt(e,t,a,s,n,o){return Object(c["openBlock"])(),Object(c["createElementBlock"])("h1",null,Object(c["toDisplayString"])(n.score),1)}var Vt={name:"practiceResult",data(){return{userData:[],score:""}},async beforeMount(){console.log(e);var e=localStorage.getItem("score");this.score=e,console.log(this.score),this.userData=localStorage.getItem("userData"),this.userData=JSON.parse(this.userData),console.log(this.userData)}};const Et=E()(Vt,[["render",xt]]);var kt=Et,Dt={components:{practiceResult:kt},data(){return{routerName:"",examData:[],localExam:[],url:`https://portal.army.idf/sites/hafifon383/_api/web/Lists/getByTitle('${this.$route.params.title}')/Items`,userData:{},grades:0,score:"",isFinished:!1,isFinishedButton:!1,ite:0,disableInp:!1,inputsCursor:"pointer",nextBtnCursor:"not-allowed",wrongAns:[]}},methods:{clickHandler(e,t){this.inputsCursor="not-allowed",this.nextBtnCursor="pointer",this.disableInp=!0;const a=e.target,c=this.$refs[this.examData[t]["correctAnswer"]+t];console.log(a),console.log(c),console.log(this.examData[t]["correctAnswer"]+t),a.classList.add("input-answer-right"),a.value!=c.value&&(a.classList.add("input-answer-wrong"),c.classList.add("input-answer-right"))},checkIfDone(){console.log(this.userData);let e=!0;this.isFinishedButton=e,console.log(this.ite),console.log(this.isFinishedButton)},nextQue(){this.inputsCursor="pointer",this.nextBtnCursor="not-allowed",this.ite++,this.isFinishedButton=!1},backQue(){this.ite--},submit(){this.examData.forEach(e=>{if(this.userData[e.Title]==e.correctAnswer)this.grades++;else{var t=this.que.Title;console.log(t),this.wrongAns.push(this.userData[e.Title])}}),console.log(this.wrongAns),console.log(this.userData),this.score=this.grades+"/"+this.examData.length,console.log(this.score),localStorage.setItem("score",this.score),localStorage.setItem("userData",JSON.stringify(this.userData))}},async beforeMount(){if(this.url==`https://portal.army.idf/sites/hafifon383/_api/web/Lists/getByTitle('${this.$route.params.title}')/Items`){const e=await re.a.get(this.url);this.examData=e.data.value,this.examData.forEach(e=>{try{e.answers=JSON.parse(e.answers)}catch(t){console.log("error:",t,e.answers)}}),this.isFinished=!0,console.log(this.examData)}else{this.isFinished=!0;const e=await re.a.get(this.url);this.examData=e.data.value,this.examData=this.examData.filter(e=>e.Title==this.$route.params.title)[0],this.examData=this.examData.exam,console.log(this.examData)}},mounted(){this.examData.forEach(e=>{this.userData[e.Title]=""}),console.log(this.userData)}};a("70b4");const yt=E()(Dt,[["render",Nt],["__scopeId","data-v-4474c557"]]);var wt=yt;function Bt(e,t,a,c,s,n){return null}var St={data(){return{exam1Data:[]}},async beforeMount(){const e=await re.a.get("http://localhost:3000/exam1");this.exam1Data=e.data.value,console.log(this.exam1Data)}};const Ct=E()(St,[["render",Bt]]);var _t=Ct;const It={},Tt=It;var qt=Tt;const Mt={},Pt=Mt;var Ft=Pt;const At={},Lt=At;var zt=Lt;const Qt=[{path:"/HomePage",name:"HomePage",component:z},{path:"/Practices",name:"PracticesList",component:be},{path:"/FinalExam",name:"FinalExam",component:he},{path:"/User",name:"User",component:st},{path:"/HafifaBook",name:"HafifaBook",component:it},{path:"/exam1",name:"exam1",component:_t},{path:"/exam2",name:"exam2",component:qt},{path:"/exam3",name:"exam3",component:Ft},{path:"/exam4",name:"exam4",component:zt},{path:"/Practices/:title",name:"beforeEnterQuiz",component:de,props:e=>({...e.params})},{path:"/Practices/:title/quiz",name:"quiz",component:wt,props:e=>({...e.params})},{path:"/Practices/:title/result",name:"result",component:kt,props:e=>({...e.params})}],Ht=Object(S["a"])({history:Object(S["b"])(""),routes:Qt});var $t=Ht,Ut=(a("5363"),a("afc9")),Jt=Object(Ut["a"])();Object(c["createApp"])(B).use($t).use(Jt).mount("#app")},"57d3":function(e,t,a){"use strict";a("4f2a")},"5c10":function(e,t,a){},"70b4":function(e,t,a){"use strict";a("e7ad")},"713a":function(e,t,a){e.exports=a.p+"img/bios.ea33ba68.png"},"7fab":function(e,t,a){"use strict";a("cabb")},"80e6":function(e,t,a){e.exports=a.p+"img/onlineCourse.fd2b6fae.jpg"},8134:function(e,t,a){e.exports=a.p+"img/CMD.4a05cdd1.png"},"8e4a":function(e,t,a){e.exports=a.p+"img/mail.b1be72ce.jpg"},"9db6":function(e,t,a){e.exports=a.p+"img/printer.8bd0f703.jpg"},b0ff:function(e,t,a){"use strict";a("d97b")},cabb:function(e,t,a){},d75b:function(e,t,a){"use strict";a("55f5")},d97b:function(e,t,a){},df0b:function(e,t,a){e.exports=a.p+"img/active-directory-logo2.6af63782.png"},e0d7:function(e,t,a){e.exports=a.p+"img/fileServer.9953c2a0.jpg"},e7ad:function(e,t,a){},fd40:function(e,t,a){e.exports=a.p+"img/KioskServlet.3c3587b1.jpg"}});
//# sourceMappingURL=app.5702bc45.js.map
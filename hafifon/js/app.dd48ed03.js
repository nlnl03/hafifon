(function(e){function t(t){for(var c,o,r=t[0],l=t[1],i=t[2],u=0,b=[];u<r.length;u++)o=r[u],Object.prototype.hasOwnProperty.call(n,o)&&n[o]&&b.push(n[o][0]),n[o]=0;for(c in l)Object.prototype.hasOwnProperty.call(l,c)&&(e[c]=l[c]);d&&d(t);while(b.length)b.shift()();return s.push.apply(s,i||[]),a()}function a(){for(var e,t=0;t<s.length;t++){for(var a=s[t],c=!0,r=1;r<a.length;r++){var l=a[r];0!==n[l]&&(c=!1)}c&&(s.splice(t--,1),e=o(o.s=a[0]))}return e}var c={},n={app:0},s=[];function o(t){if(c[t])return c[t].exports;var a=c[t]={i:t,l:!1,exports:{}};return e[t].call(a.exports,a,a.exports,o),a.l=!0,a.exports}o.m=e,o.c=c,o.d=function(e,t,a){o.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:a})},o.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},o.t=function(e,t){if(1&t&&(e=o(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var a=Object.create(null);if(o.r(a),Object.defineProperty(a,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var c in e)o.d(a,c,function(t){return e[t]}.bind(null,c));return a},o.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return o.d(t,"a",t),t},o.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},o.p="";var r=window["webpackJsonp"]=window["webpackJsonp"]||[],l=r.push.bind(r);r.push=t,r=r.slice();for(var i=0;i<r.length;i++)t(r[i]);var d=l;s.push([0,"chunk-vendors"]),a()})({0:function(e,t,a){e.exports=a("56d7")},"02a8":function(e,t,a){},"0e93":function(e,t,a){"use strict";a("1ab4")},1771:function(e,t,a){var c={"./Assistant-Regular.ttf":"33e1","./CMD.png":"8134","./KioskServlet.jpg":"fd40","./SCCM.png":"4f4b","./active-directory-logo2.png":"df0b","./bios.png":"713a","./communication.png":"914e","./disc.png":"183b","./fileServer.jpg":"e0d7","./installation.jpg":"3e86","./mail.jpg":"8e4a","./mivzOper.png":"ed98","./onlineCourse.jpg":"80e6","./pc.jpg":"1e5e","./printer.jpg":"9db6","./takalot.jpg":"3722","./xrm.jpg":"580a"};function n(e){var t=s(e);return a(t)}function s(e){if(!a.o(c,e)){var t=new Error("Cannot find module '"+e+"'");throw t.code="MODULE_NOT_FOUND",t}return c[e]}n.keys=function(){return Object.keys(c)},n.resolve=s,e.exports=n,n.id="1771"},"183b":function(e,t,a){e.exports=a.p+"img/disc.75e57f0a.png"},"1ab4":function(e,t,a){},"1b5b":function(e,t,a){},"1e5e":function(e,t,a){e.exports=a.p+"img/pc.f8de9fed.jpg"},"33e1":function(e,t,a){e.exports=a.p+"fonts/Assistant-Regular.5193a037.ttf"},3499:function(e,t,a){},3722:function(e,t,a){e.exports=a.p+"img/takalot.bc954f09.jpg"},"3e86":function(e,t,a){e.exports=a.p+"img/installation.7ea70fac.jpg"},"3efc":function(e,t,a){},"3f03":function(e,t,a){"use strict";a("b943")},"4f4b":function(e,t,a){e.exports=a.p+"img/SCCM.4e98334e.png"},"56d7":function(e,t,a){"use strict";a.r(t);var c=a("7a23");function n(e,t,a,n,s,o){const r=Object(c["resolveComponent"])("MainNavbar"),l=Object(c["resolveComponent"])("router-view");return Object(c["openBlock"])(),Object(c["createElementBlock"])("div",null,[Object(c["createVNode"])(r),Object(c["createVNode"])(l)])}const s=e=>(Object(c["pushScopeId"])("data-v-d45ce580"),e=e(),Object(c["popScopeId"])(),e),o={class:"main-nav"},r=Object(c["createTextVNode"])(" חפיפה "),l=Object(c["createTextVNode"])(" לאיזור אישי "),i={class:"menu"},d={class:"nav-bar"},u=Object(c["createTextVNode"])("המבחן הסופי"),b=Object(c["createTextVNode"])("חוברת חפיפה"),m=s(()=>Object(c["createElementVNode"])("span",null,"בחנים",-1)),p={key:0,class:"drop-down-menu"},O={class:"drop-down-items"},j=Object(c["createTextVNode"])("בוחן 1"),h=Object(c["createTextVNode"])("בוחן 2"),f=Object(c["createTextVNode"])("בוחן 3"),g=Object(c["createTextVNode"])("בוחן 4"),v=Object(c["createTextVNode"])("תרגולים");function k(e,t,a,n,s,k){const N=Object(c["resolveComponent"])("router-link");return Object(c["openBlock"])(),Object(c["createElementBlock"])("div",o,[Object(c["createVNode"])(N,{to:{name:"HomePage"},class:"home-title"},{default:Object(c["withCtx"])(()=>[r]),_:1}),Object(c["createVNode"])(N,{to:{name:"User"},class:"user-title"},{default:Object(c["withCtx"])(()=>[l]),_:1}),Object(c["createElementVNode"])("div",i,[Object(c["createElementVNode"])("div",d,[Object(c["createElementVNode"])("ul",null,[Object(c["createElementVNode"])("li",null,[Object(c["createElementVNode"])("div",null,[Object(c["createVNode"])(N,{to:{name:"FinalExam"}},{default:Object(c["withCtx"])(()=>[u]),_:1})])]),Object(c["createElementVNode"])("li",null,[Object(c["createElementVNode"])("div",null,[Object(c["createVNode"])(N,{to:{name:"HafifaBook"}},{default:Object(c["withCtx"])(()=>[b]),_:1})])]),Object(c["createElementVNode"])("li",{onMouseleave:t[1]||(t[1]=e=>s.isOpen=!1)},[Object(c["createElementVNode"])("div",{onMouseover:t[0]||(t[0]=e=>s.isOpen=!0)},[m,s.isOpen?(Object(c["openBlock"])(),Object(c["createElementBlock"])("div",p,[Object(c["createElementVNode"])("ul",O,[Object(c["createVNode"])(N,{to:{name:"exam1"},class:"exams"},{default:Object(c["withCtx"])(()=>[j]),_:1}),Object(c["createVNode"])(N,{to:{name:"exam2"},class:"exams"},{default:Object(c["withCtx"])(()=>[h]),_:1}),Object(c["createVNode"])(N,{to:{name:"exam3"},class:"exams"},{default:Object(c["withCtx"])(()=>[f]),_:1}),Object(c["createVNode"])(N,{to:{name:"exam4"},class:"exams"},{default:Object(c["withCtx"])(()=>[g]),_:1})])])):Object(c["createCommentVNode"])("",!0)],32)],32),Object(c["createElementVNode"])("li",null,[Object(c["createElementVNode"])("div",null,[Object(c["createVNode"])(N,{to:{name:"PracticesList"}},{default:Object(c["withCtx"])(()=>[v]),_:1})])])])])])])}var N={name:"MainNavbar",data(){return{isOpen:!1}}},V=(a("b0ff"),a("d959")),E=a.n(V);const x=E()(N,[["render",k],["__scopeId","data-v-d45ce580"]]);var y=x,B={name:"App",components:{MainNavbar:y}};a("9691");const D=E()(B,[["render",n]]);var w=D,C=a("6c02");const S=e=>(Object(c["pushScopeId"])("data-v-5ced1eb5"),e=e(),Object(c["popScopeId"])(),e),T={class:"container"},_=S(()=>Object(c["createElementVNode"])("div",{class:"title"},[Object(c["createElementVNode"])("h1",null,"ברוכים הבאים לאתר חפיפה")],-1)),I=S(()=>Object(c["createElementVNode"])("div",{class:"name"},[Object(c["createElementVNode"])("h2",null,"שלום טכנאי")],-1)),A={class:"btns"},P=Object(c["createTextVNode"])("המשך תרגול"),q=Object(c["createTextVNode"])("למבחן הסופי");function Q(e,t,a,n,s,o){const r=Object(c["resolveComponent"])("router-link");return Object(c["openBlock"])(),Object(c["createElementBlock"])("div",T,[_,I,Object(c["createElementVNode"])("div",A,[Object(c["createVNode"])(r,{to:""},{default:Object(c["withCtx"])(()=>[P]),_:1}),Object(c["createVNode"])(r,{to:""},{default:Object(c["withCtx"])(()=>[q]),_:1})])])}var M={components:{}};a("d75b");const L=E()(M,[["render",Q],["__scopeId","data-v-5ced1eb5"]]);var R=L;const F=e=>(Object(c["pushScopeId"])("data-v-e396cf36"),e=e(),Object(c["popScopeId"])(),e),z=F(()=>Object(c["createElementVNode"])("h1",null,"תרגולים",-1)),U=F(()=>Object(c["createElementVNode"])("div",{class:"text-under-line"},null,-1)),$={class:"container-cards"},H={class:"flex-cards"},J=["src"],K={class:"inner-flex"},W={class:"text"},X={class:"num-of-que"};function G(e,t,n,s,o,r){const l=Object(c["resolveComponent"])("router-link");return Object(c["openBlock"])(),Object(c["createElementBlock"])(c["Fragment"],null,[z,U,Object(c["createElementVNode"])("div",$,[Object(c["createElementVNode"])("div",H,[(Object(c["openBlock"])(!0),Object(c["createElementBlock"])(c["Fragment"],null,Object(c["renderList"])(o.practices,e=>(Object(c["openBlock"])(),Object(c["createElementBlock"])("div",{class:"items",key:e},[Object(c["createVNode"])(l,{class:"router-text",to:{name:"beforeEnterQuiz",params:{practices:JSON.stringify(e),title:e.Title}}},{default:Object(c["withCtx"])(()=>[Object(c["createElementVNode"])("img",{class:"image-of-items",src:a("1771")("./"+e.Img)},null,8,J),Object(c["createElementVNode"])("div",K,[Object(c["createElementVNode"])("h4",W,Object(c["toDisplayString"])(e.Subject),1),Object(c["createElementVNode"])("span",X,"מספר שאלות: "+Object(c["toDisplayString"])(e.numOfQue),1)])]),_:2},1032,["to"])]))),128))])])],64)}const Y=e=>(Object(c["pushScopeId"])("data-v-d269323e"),e=e(),Object(c["popScopeId"])(),e),Z={class:"main-container"},ee={key:0,class:"about-quiz"},te={class:"quiz-subject"},ae=Y(()=>Object(c["createElementVNode"])("div",{class:"quiz-info"}," Lorem ipsum dolor sit, amet consectetur adipisicing elit. Qui nesciunt eius corrupti expedita necessitatibus voluptatum cumque odit deleniti aspernatur ex, pariatur assumenda labore. Vitae quasi et esse at doloremque ut aliquam, voluptate ab totam aspernatur eius earum reiciendis iste dolor aperiam saepe error eos culpa nobis nisi repellendus inventore quis, temporibus odit? Recusandae autem repellat vitae tempore repudiandae accusantium in illo quidem? Impedit, perspiciatis dignissimos. At numquam non corporis architecto quidem quaerat, ad accusantium ab fuga voluptas minima quam cupiditate ipsam, accusamus praesentium tenetur assumenda, quasi sunt adipisci aliquid necessitatibus? Doloribus ipsum praesentium, ipsa sapiente cumque voluptatem iure error repellendus. ",-1)),ce={class:"start-back-buttons"},ne=Object(c["createTextVNode"])(" התחל תרגול");function se(e,t,a,n,s,o){const r=Object(c["resolveComponent"])("router-link");return Object(c["openBlock"])(),Object(c["createElementBlock"])("div",Z,[e.isShow?Object(c["createCommentVNode"])("",!0):(Object(c["openBlock"])(),Object(c["createElementBlock"])("div",ee,[Object(c["createElementVNode"])("div",te,Object(c["toDisplayString"])(s.Subject),1),ae,Object(c["createElementVNode"])("div",ce,[Object(c["createElementVNode"])("button",{class:"back-btn",onClick:t[0]||(t[0]=e=>o.goBack())},"בחזרה לתרגולים"),Object(c["createVNode"])(r,{class:"start-btn",to:{name:"quiz"}},{default:Object(c["withCtx"])(()=>[ne]),_:1})])]))])}var oe=a("bc3a"),re=a.n(oe),le={name:"beforeEnterQuiz",data(){return{results:[],Subject:""}},methods:{goBack(){this.$router.go(-1)}},async beforeMount(){const e=await re.a.get("https://portal.army.idf/sites/hafifon383/_api/web/Lists/getByTitle('tirgulim')/Items");this.results=e.data.value,this.results=this.results.filter(e=>e.Title==this.$route.params.title)[0],this.Subject=this.results.Subject,console.log(this.Subject)}};a("57d3");const ie=E()(le,[["render",se],["__scopeId","data-v-d269323e"]]);var de=ie,ue={name:"PracticesList",components:{beforeEnterQuiz:de},data(){return{practices:[],url:"https://portal.army.idf/sites/hafifon383/_api/web/Lists/getByTitle('tirgulim')/Items"}},async beforeMount(){const e=await re.a.get(this.url);this.practices=e.data.value,console.log(this.practices)}};a("0e93");const be=E()(ue,[["render",G],["__scopeId","data-v-e396cf36"]]);var me=be;const pe={class:"final"};function Oe(e,t,a,n,s,o){return Object(c["openBlock"])(),Object(c["createElementBlock"])("div",pe," מבחן סופי ")}var je={};const he=E()(je,[["render",Oe]]);var fe=he;const ge=e=>(Object(c["pushScopeId"])("data-v-2cf3bdca"),e=e(),Object(c["popScopeId"])(),e),ve=ge(()=>Object(c["createElementVNode"])("h1",null,"האיזור האישי",-1)),ke=ge(()=>Object(c["createElementVNode"])("div",{class:"under-line"},null,-1)),Ne={class:"main"},Ve={class:"right-side-flex"},Ee={class:"fff"},xe={class:"personal-info"},ye={class:"personal-info-items"},Be={class:"inner-right-flex"},De={key:0,class:"name-detail"},we=ge(()=>Object(c["createElementVNode"])("div",{class:"hafifa-nickname"}," חפיפון מתחיל ",-1)),Ce={class:"inner-left-flex"},Se=["src"],Te={class:"progress-info"},_e={class:"progress-item"},Ie=ge(()=>Object(c["createElementVNode"])("div",{class:"title"},"כמה עברתי מהחפיפה",-1)),Ae={class:"progress-circle"},Pe={class:"left-side-flex"},qe={class:"grid-container"},Qe={class:"average"},Me=ge(()=>Object(c["createElementVNode"])("span",{class:"items-title"},"ממוצע ציונים ",-1)),Le={class:"gradeAv"},Re={class:"test-1-score"},Fe=ge(()=>Object(c["createElementVNode"])("span",{class:"items-title"},"מבחן 1",-1)),ze={class:"the-grades"},Ue={class:"test-2-score"},$e=ge(()=>Object(c["createElementVNode"])("span",{class:"items-title"},"מבחן 2",-1)),He={class:"the-grades"},Je={class:"test-3-score"},Ke=ge(()=>Object(c["createElementVNode"])("span",{class:"items-title"},"מבחן 3",-1)),We={class:"the-grades"},Xe={class:"test-4-score"},Ge=ge(()=>Object(c["createElementVNode"])("span",{class:"items-title"},"מבחן 4",-1)),Ye={class:"the-grades"};function Ze(e,t,n,s,o,r){const l=Object(c["resolveComponent"])("circle-progress");return Object(c["openBlock"])(),Object(c["createElementBlock"])(c["Fragment"],null,[ve,ke,Object(c["createElementVNode"])("div",Ne,[Object(c["createElementVNode"])("div",Ve,[Object(c["createElementVNode"])("div",Ee,[Object(c["createElementVNode"])("div",xe,[Object(c["createElementVNode"])("div",ye,[Object(c["createElementVNode"])("div",Be,[o.finished?(Object(c["openBlock"])(),Object(c["createElementBlock"])("div",De,[Object(c["createElementVNode"])("h2",null,Object(c["toDisplayString"])(o.userDetails[0].name),1),Object(c["createElementVNode"])("h5",null,Object(c["toDisplayString"])(o.userDetails[0].mahlaka),1)])):Object(c["createCommentVNode"])("",!0),we]),Object(c["createElementVNode"])("div",Ce,[Object(c["createElementVNode"])("img",{class:"user-image",src:a("fd40")},null,8,Se)])])]),Object(c["createElementVNode"])("div",Te,[Object(c["createElementVNode"])("div",_e,[Ie,Object(c["createElementVNode"])("div",Ae,[Object(c["createVNode"])(l,{percent:70,"show-percent":!0,"fill-color":"#00a2f3",viewport:!0,transition:600})])])])])]),Object(c["createElementVNode"])("div",Pe,[Object(c["createElementVNode"])("div",qe,[Object(c["createElementVNode"])("div",Qe,[Me,Object(c["createElementVNode"])("span",Le,Object(c["toDisplayString"])(o.gradesAvera[0]),1)]),Object(c["createElementVNode"])("div",Re,[Fe,Object(c["createElementVNode"])("span",ze,Object(c["toDisplayString"])(o.userDetails[0].grades.test1),1)]),Object(c["createElementVNode"])("div",Ue,[$e,Object(c["createElementVNode"])("span",He,Object(c["toDisplayString"])(o.userDetails[0].grades.test2),1)]),Object(c["createElementVNode"])("div",Je,[Ke,Object(c["createElementVNode"])("span",We,Object(c["toDisplayString"])(o.userDetails[0].grades.test3),1)]),Object(c["createElementVNode"])("div",Xe,[Ge,Object(c["createElementVNode"])("span",Ye,Object(c["toDisplayString"])(o.userDetails[0].grades.test4),1)])])])])],64)}var et=a("78da"),tt=a.n(et),at=(a("872e"),{components:{CircleProgress:tt.a},data(){return{finished:!1,userDetails:[],gradesAvera:[]}},async beforeMount(){const e=await re.a.get("http://localhost:3000/users");this.userDetails=e.data,this.finished=!0,console.log(this.userDetails);for(let o in this.userDetails){var t=parseInt(this.userDetails[o].grades.test1),a=parseInt(this.userDetails[o].grades.test2),c=parseInt(this.userDetails[o].grades.test3),n=parseInt(this.userDetails[o].grades.test4),s=(t+a+c+n)/4;this.gradesAvera.push(s)}console.log(this.gradesAvera)}});a("7fab");const ct=E()(at,[["render",Ze],["__scopeId","data-v-2cf3bdca"]]);var nt=ct;function st(e,t,a,n,s,o){return Object(c["openBlock"])(),Object(c["createElementBlock"])("h1",null," חוברת חפיפה ")}var ot={};const rt=E()(ot,[["render",st]]);var lt=rt;const it=e=>(Object(c["pushScopeId"])("data-v-4372028e"),e=e(),Object(c["popScopeId"])(),e),dt={key:0,class:"quiz-box"},ut={key:0,class:"show"},bt={class:"question"},mt={class:"questions-text"},pt={class:"current-que"},Ot=["onUpdate:modelValue","value","onClick","name","id","disabled"],jt=["for"],ht={class:"answers-text"},ft={key:1,class:"bank-quiz"},gt={class:"option-title"},vt={class:"bank-options"},kt=["onUpdate:modelValue","id","value","onClick","disabled"],Nt=["for"],Vt=["disabled"],Et=it(()=>Object(c["createElementVNode"])("span",{class:"finish-btn-text"}," סיים ",-1));function xt(e,t,a,n,s,o){const r=Object(c["resolveComponent"])("router-link");return s.isFinished?(Object(c["openBlock"])(),Object(c["createElementBlock"])("div",dt,[(Object(c["openBlock"])(!0),Object(c["createElementBlock"])(c["Fragment"],null,Object(c["renderList"])(s.examData,(e,a)=>(Object(c["openBlock"])(),Object(c["createElementBlock"])("form",{key:a},[a==s.ite?(Object(c["openBlock"])(),Object(c["createElementBlock"])("div",ut,[Object(c["createElementVNode"])("div",bt,[Object(c["createElementVNode"])("span",mt,Object(c["toDisplayString"])(e.Title),1),Object(c["createElementVNode"])("div",pt,Object(c["toDisplayString"])(s.ite+1)+"/"+Object(c["toDisplayString"])(s.examData.length),1)]),"american"==e.type?(Object(c["openBlock"])(),Object(c["createElementBlock"])("div",{key:0,class:"answer-options",ref:e["Title"]},[(Object(c["openBlock"])(!0),Object(c["createElementBlock"])(c["Fragment"],null,Object(c["renderList"])(e.answers,(t,n)=>(Object(c["openBlock"])(),Object(c["createElementBlock"])("div",{class:"answer-items",style:Object(c["normalizeStyle"])("--cursor:"+s.inputsCursor),key:n},[Object(c["withDirectives"])(Object(c["createElementVNode"])("input",{type:"radio","onUpdate:modelValue":t=>s.userData[e.Title]=t,ref:t,value:t,onClick:t=>o.clickHandler(t,a,e["Title"]),name:e.Title,id:t,disabled:s.userData[e.Title]},null,8,Ot),[[c["vModelRadio"],s.userData[e.Title]]]),Object(c["createElementVNode"])("label",{for:t},[Object(c["createElementVNode"])("div",ht,Object(c["toDisplayString"])(t),1)],8,jt)],4))),128))],512)):Object(c["createCommentVNode"])("",!0),"bankQue"==e.type?(Object(c["openBlock"])(),Object(c["createElementBlock"])("div",ft,[(Object(c["openBlock"])(!0),Object(c["createElementBlock"])(c["Fragment"],null,Object(c["renderList"])(Object.keys(e.bankOptions),(t,n)=>(Object(c["openBlock"])(),Object(c["createElementBlock"])("div",{class:"bank-quiz-que",key:t+n},[Object(c["createElementVNode"])("div",gt,Object(c["toDisplayString"])(t),1),Object(c["createElementVNode"])("div",{class:"VX",ref:t},null,512),Object(c["createElementVNode"])("div",vt,[(Object(c["openBlock"])(!0),Object(c["createElementBlock"])(c["Fragment"],null,Object(c["renderList"])(e.bankCorrect,(r,l)=>(Object(c["openBlock"])(),Object(c["createElementBlock"])("div",{class:"bank-words-items",key:r+l},[Object(c["withDirectives"])(Object(c["createElementVNode"])("input",{type:"radio","onUpdate:modelValue":a=>s.bankUserData[e.Title][t]=a,id:r+n,value:r,onClick:c=>o.clickBankHandler(c,t,s.bankUserData[e.Title],a),disabled:""!=s.bankUserData[e.Title][t]},null,8,kt),[[c["vModelRadio"],s.bankUserData[e.Title][t]]]),Object(c["createElementVNode"])("label",{for:r+n},Object(c["toDisplayString"])(r),9,Nt)]))),128))])]))),128))])):Object(c["createCommentVNode"])("",!0),s.ite!=s.examData.length-1?(Object(c["openBlock"])(),Object(c["createElementBlock"])("button",{key:2,class:"next-button",onClick:t[0]||(t[0]=(...e)=>o.nextQue&&o.nextQue(...e)),ref:"nextBtn",disabled:!s.userData[e.Title]&&s.isDisabled,style:Object(c["normalizeStyle"])("--next-btn-cusror:"+s.nextBtnCursor)},"הבא",12,Vt)):Object(c["createCommentVNode"])("",!0)])):Object(c["createCommentVNode"])("",!0)]))),128)),s.examData.length==s.ite+1?(Object(c["openBlock"])(),Object(c["createBlock"])(r,{key:0,class:"submit-btn",to:{name:"result"},onClick:o.submit},{default:Object(c["withCtx"])(()=>[Et]),_:1},8,["onClick"])):Object(c["createCommentVNode"])("",!0)])):Object(c["createCommentVNode"])("",!0)}const yt=e=>(Object(c["pushScopeId"])("data-v-5b977f7a"),e=e(),Object(c["popScopeId"])(),e),Bt={class:"results-card"},Dt={class:"score"},wt={key:0,class:"results-table"},Ct=yt(()=>Object(c["createElementVNode"])("thead",null,[Object(c["createElementVNode"])("tr",null,[Object(c["createElementVNode"])("th",null,"השאלה"),Object(c["createElementVNode"])("th",null,"התשובה שענית"),Object(c["createElementVNode"])("th",null,"התשובה הנכונה")])],-1)),St={class:"btn"},Tt=Object(c["createTextVNode"])("חזרה לתרגולים"),_t=Object(c["createTextVNode"])("לסרטון בנושא"),It={key:1,class:"all-correct"},At=yt(()=>Object(c["createElementVNode"])("span",null,"כל התשבות נכונות, עבודה מעולה !",-1)),Pt=[At];function qt(e,t,a,n,s,o){const r=Object(c["resolveComponent"])("circle-progress"),l=Object(c["resolveComponent"])("router-link");return Object(c["openBlock"])(),Object(c["createElementBlock"])("div",Bt,[Object(c["createElementVNode"])("div",Dt,[Object(c["createVNode"])(r,{percent:s.score,"show-percent":!0,"fill-color":"#00a2f3",viewport:!0,transition:700},null,8,["percent"])]),s.showMassaAllCorrect?Object(c["createCommentVNode"])("",!0):(Object(c["openBlock"])(),Object(c["createElementBlock"])("div",wt,[Object(c["createElementVNode"])("table",null,[Ct,Object(c["createElementVNode"])("tbody",null,[(Object(c["openBlock"])(!0),Object(c["createElementBlock"])(c["Fragment"],null,Object(c["renderList"])(s.userResults,e=>(Object(c["openBlock"])(),Object(c["createElementBlock"])("tr",{key:e},[Object(c["createElementVNode"])("td",null,Object(c["toDisplayString"])(e.theCorrectAns),1),Object(c["createElementVNode"])("td",null,Object(c["toDisplayString"])(e.wrongAns),1),Object(c["createElementVNode"])("td",null,Object(c["toDisplayString"])(e.wrongQue),1)]))),128)),(Object(c["openBlock"])(!0),Object(c["createElementBlock"])(c["Fragment"],null,Object(c["renderList"])(s.userBankResults,e=>(Object(c["openBlock"])(),Object(c["createElementBlock"])("tr",{key:e},[Object(c["createElementVNode"])("td",null,Object(c["toDisplayString"])(e.theCorrectBankAns),1),Object(c["createElementVNode"])("td",null,Object(c["toDisplayString"])(e.wrongBankAns),1),Object(c["createElementVNode"])("td",null,Object(c["toDisplayString"])(e.wrongBankQue),1)]))),128))])]),Object(c["createElementVNode"])("div",St,[Object(c["createVNode"])(l,{class:"back-btn",to:{name:"PracticesList"}},{default:Object(c["withCtx"])(()=>[Tt]),_:1}),Object(c["createVNode"])(l,{class:"video-btn",to:{name:"PracticesList"}},{default:Object(c["withCtx"])(()=>[_t]),_:1})])])),s.showMassaAllCorrect?(Object(c["openBlock"])(),Object(c["createElementBlock"])("div",It,Pt)):Object(c["createCommentVNode"])("",!0)])}var Qt={name:"practiceResult",components:{CircleProgress:tt.a},data(){return{userResults:[],userBankResults:[],score:"",showMassaAllCorrect:!1,isBankQue:!1}},async beforeMount(){var e=localStorage.getItem("pointsInPerc");this.score=JSON.parse(e),console.log(this.score);var t=localStorage.getItem("results");this.userResults=JSON.parse(t);var a=localStorage.getItem("bankResults");this.userBankResults=JSON.parse(a),console.log(this.userResults),0==this.userResults.length&&0==this.userBankResults.length&&(this.showMassaAllCorrect=!0)}};a("8fa9");const Mt=E()(Qt,[["render",qt],["__scopeId","data-v-5b977f7a"]]);var Lt=Mt,Rt={components:{practiceResult:Lt},data(){return{routerName:"",examData:[],url:`https://portal.army.idf/sites/hafifon383/_api/web/Lists/getByTitle('${this.$route.params.title}')/Items`,userData:{},bankUserData:{},grades:0,isFinished:!1,isFinishedButton:!1,ite:0,inputsCursor:"pointer",nextBtnCursor:"not-allowed",wrongAns:"",wrongQue:"",theCorrectAns:"",results:[],bankResults:[],bankWrongAns:[],parseAns:[],isDisabled:!0,bankQuePoints:0}},methods:{clickHandler(e,t,a){this.inputsCursor="not-allowed",this.nextBtnCursor="pointer";const c=e.target,n=c.value,s=this.examData[t]["correctAnswer"];console.log(this.$refs[a].children[s].querySelector("input"));const o=this.$refs[a].children[s].querySelector("input"),r=o.value;if(n!=r&&c.classList.add("input-answer-wrong"),o.classList.add("input-answer-right"),this.ite!=this.examData.length-1){var l=this.$refs["nextBtn"];l.classList.add("next-btn-on")}},clickBankHandler(e,t,a,c){this.checkIfcorrectBank(e,t,a,c),this.disableNextBtn(a)},checkIfcorrectBank(e,t,a,c){const n=e.target,s=n.value,o=this.$refs[t];var r=0;Object.keys(this.examData[c].bankOptions).forEach(e=>{r++}),s==this.examData[c].bankOptions[t]?(console.log("correct"),o.classList.add("input-bank-right"),this.bankQuePoints+=100/this.examData.length/r,console.log(this.bankQuePoints)):(console.log("not correct"),o.classList.add("input-bank-wrong"),this.bankResults.push({wrongBankQue:this.examData[c].Title,wrongBankAns:s+": "+t,theCorrectBankAns:this.examData[c].bankOptions[t]+": "+t,type:"bankQue"}))},disableNextBtn(e){var t=0;Object.values(e).forEach(e=>{console.log(e),""==e&&t++}),this.isDisabled=t>1},asyncParse(e){return new Promise(t=>{t(JSON.parse(e))})},nextQue(){this.isDisabled=!0,this.inputsCursor="pointer",this.nextBtnCursor="not-allowed",this.ite++,this.isFinishedButton=!1},backQue(){this.ite--},updateVmodelAmerican(){this.examData.forEach(e=>{"american"==e.type&&(console.log("american"),this.userData[e.Title]="")}),console.log(this.userData),this.isFinished=!0},updateVmodelBank(){setTimeout(()=>{this.examData.forEach(e=>{"bankQue"==e.type&&(this.bankUserData[e.Title]={},Object.keys(e.bankOptions).forEach(t=>{this.bankUserData[e.Title][t]=""}))}),console.log(this.bankUserData),this.isFinished=!0},2e3)},submit(){console.log(this.results),this.examData.forEach(e=>{"american"==e.type&&(console.log(this.userData),this.userData[e.Title]==e.answers[e.correctAnswer]?(this.grades++,console.log(this.grades)):(this.wrongQue=e.Title,this.wrongAns=this.userData[e.Title],this.theCorrectAns=e.answers[e.correctAnswer],this.results.push({wrongQue:this.wrongQue,wrongAns:this.wrongAns,theCorrectAns:this.theCorrectAns,type:"AmerQue"})))});var e=Math.round(this.grades/this.examData.length*100+this.bankQuePoints);localStorage.setItem("pointsInPerc",JSON.stringify(e)),localStorage.setItem("results",JSON.stringify(this.results)),localStorage.setItem("bankResults",JSON.stringify(this.bankResults))}},async beforeMount(){if(this.url==`https://portal.army.idf/sites/hafifon383/_api/web/Lists/getByTitle('${this.$route.params.title}')/Items`){const e=await re.a.get(this.url);this.examData=e.data.value;await Promise.all(this.examData.map(e=>this.asyncParse(e.answers).then(t=>(e["answers"]=t,{item:e})))),Promise.all(this.examData.map(e=>{if("bankQue"==e.type)return this.asyncParse(e.bankCorrect).then(t=>(e["bankCorrect"]=t,{item:e}))})),Promise.all(this.examData.map(e=>{if("bankQue"==e.type)try{return this.asyncParse(e.bankOptions).then(t=>(e["bankOptions"]=t,{bankOption:e}))}catch(t){console.error(t)}}));console.log(this.examData)}else{const e=await re.a.get(this.url);this.examData=e.data.value,this.examData=this.examData.filter(e=>e.Title==this.$route.params.title)[0],this.examData=this.examData.exam,console.log(this.examData)}this.updateVmodelBank()},mounted(){this.updateVmodelAmerican()}};a("3f03");const Ft=E()(Rt,[["render",xt],["__scopeId","data-v-4372028e"]]);var zt=Ft;function Ut(e,t,a,c,n,s){return null}var $t={data(){return{exam1Data:[]}},async beforeMount(){const e=await re.a.get("http://localhost:3000/exam1");this.exam1Data=e.data.value,console.log(this.exam1Data)}};const Ht=E()($t,[["render",Ut]]);var Jt=Ht;const Kt={},Wt=Kt;var Xt=Wt;const Gt={},Yt=Gt;var Zt=Yt;const ea={},ta=ea;var aa=ta;const ca=[{path:"/HomePage",name:"HomePage",component:R},{path:"/Practices",name:"PracticesList",component:me},{path:"/FinalExam",name:"FinalExam",component:fe},{path:"/User",name:"User",component:nt},{path:"/HafifaBook",name:"HafifaBook",component:lt},{path:"/exam1",name:"exam1",component:Jt},{path:"/exam2",name:"exam2",component:Xt},{path:"/exam3",name:"exam3",component:Zt},{path:"/exam4",name:"exam4",component:aa},{path:"/Practices/:title",name:"beforeEnterQuiz",component:de,props:e=>({...e.params})},{path:"/Practices/:title/quiz",name:"quiz",component:zt,props:e=>({...e.params})},{path:"/Practices/:title/result",name:"result",component:Lt,props:e=>({...e.params})}],na=Object(C["a"])({history:Object(C["b"])(""),routes:ca});var sa=na;Object(c["createApp"])(w).use(sa).mount("#app")},"57d3":function(e,t,a){"use strict";a("6ce8")},"580a":function(e,t,a){e.exports=a.p+"img/xrm.0eb906a3.jpg"},"606a":function(e,t,a){},"6ce8":function(e,t,a){},"713a":function(e,t,a){e.exports=a.p+"img/bios.ea33ba68.png"},"7fab":function(e,t,a){"use strict";a("3499")},"80e6":function(e,t,a){e.exports=a.p+"img/onlineCourse.fd2b6fae.jpg"},8134:function(e,t,a){e.exports=a.p+"img/CMD.4a05cdd1.png"},"8e4a":function(e,t,a){e.exports=a.p+"img/mail.b1be72ce.jpg"},"8fa9":function(e,t,a){"use strict";a("3efc")},"914e":function(e,t,a){e.exports=a.p+"img/communication.51737fd5.png"},9691:function(e,t,a){"use strict";a("606a")},"9db6":function(e,t,a){e.exports=a.p+"img/printer.8bd0f703.jpg"},b0ff:function(e,t,a){"use strict";a("02a8")},b943:function(e,t,a){},d75b:function(e,t,a){"use strict";a("1b5b")},df0b:function(e,t,a){e.exports=a.p+"img/active-directory-logo2.6af63782.png"},e0d7:function(e,t,a){e.exports=a.p+"img/fileServer.9953c2a0.jpg"},ed98:function(e,t,a){e.exports=a.p+"img/mivzOper.996f2a76.png"},fd40:function(e,t,a){e.exports=a.p+"img/KioskServlet.3c3587b1.jpg"}});
//# sourceMappingURL=app.dd48ed03.js.map
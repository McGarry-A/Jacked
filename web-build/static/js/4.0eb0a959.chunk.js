(this.webpackJsonp=this.webpackJsonp||[]).push([[4],{961:function(e,t,o){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=[128339,"clock-four"],l="M232 120C232 106.7 242.7 96 256 96C269.3 96 280 106.7 280 120V243.2L365.3 300C376.3 307.4 379.3 322.3 371.1 333.3C364.6 344.3 349.7 347.3 338.7 339.1L242.7 275.1C236 271.5 232 264 232 255.1L232 120zM256 0C397.4 0 512 114.6 512 256C512 397.4 397.4 512 256 512C114.6 512 0 397.4 0 256C0 114.6 114.6 0 256 0zM48 256C48 370.9 141.1 464 256 464C370.9 464 464 370.9 464 256C464 141.1 370.9 48 256 48C141.1 48 48 141.1 48 256z";t.definition={prefix:"far",iconName:"clock",icon:[512,512,r,"f017",l]},t.faClock=t.definition,t.prefix="far",t.iconName="clock",t.width=512,t.height=512,t.ligatures=r,t.unicode="f017",t.svgPathData=l,t.aliases=r},966:function(e,t,o){"use strict";o.r(t);var r=o(3),l=o.n(r),n=o(961),c=o(220),i=o(101),s=o(30),a=o(302),d=o(0),u=o(13),f=o.n(u),j=function(e){var t=f()(),o=f()(e),r=t.diff(o,"days");return 0===r?"Today":1===r?"1 day ago":r<30?r+" days ago":e},b=o(38),h=o(61),x=o(142),O=o(1),g=Object(d.lazy)((function(){return o.e(6).then(o.bind(null,963))}));t.default=Object(d.memo)((function(e){var t=e.workoutName,o=e.date,r=e.lifts,u=(e.isLoaded,e.workoutId),f=Object(d.useState)(!1),m=l()(f,2),p=m[0],C=m[1],k=Object.keys(r).length>0,y=Object(h.default)(),w=y.pTextColorMode,z=y.h2ColorMode,v=function(e){if(!k)return null;var t=e.reduce((function(e,t){return e.weight*e.reps<t.weight*t.reps?t:e}),{weight:0,reps:0});return Object(O.jsxs)(i.default,{fontSize:"sm",color:"coolGray.500",flex:1,children:[t.weight,"KG x ",t.reps]})};return Object(O.jsxs)(O.Fragment,{children:[Object(O.jsx)(x.default,{onPress:function(){return C(!0)},children:Object(O.jsxs)(a.default,{space:1,w:"full",borderRadius:5,padding:3,marginY:1,borderWidth:2,borderColor:"coolGray.100",backgroundColor:"transparent",children:[Object(O.jsx)(c.default,{alignItems:"center",children:Object(O.jsx)(i.default,{flex:1,fontSize:"md",fontWeight:"bold",color:z,children:null===t?"Quick Workout":t})}),k?Object(O.jsxs)(c.default,{marginTop:1,children:[Object(O.jsx)(i.default,{fontWeight:"semibold",color:w,flex:1,children:"Exercise Name"}),Object(O.jsx)(i.default,{fontWeight:"semibold",color:w,flex:1,children:"Best Set"})]}):null,Object(O.jsx)(s.default,{marginBottom:1,children:Object.values(r).map((function(e,t){var o=e.set.length;return Object(O.jsxs)(c.default,{children:[Object(O.jsxs)(i.default,{display:"block",fontSize:"sm",color:"coolGray.500",flex:1,children:[e.exercise_name," x ",o]}),v(e.set)]},t)}))}),k?null:Object(O.jsx)(i.default,{fontSize:"sm",color:"coolGray.500",children:"No Lifts"}),Object(O.jsxs)(c.default,{alignItems:"center",children:[Object(O.jsx)(b.FontAwesomeIcon,{icon:n.faClock,size:10,color:"gray"}),Object(O.jsx)(i.default,{fontSize:"xs",color:"text.400",ml:2,children:j(o)})]})]})}),p?Object(O.jsx)(d.Suspense,{children:Object(O.jsx)(g,{isVisible:p,setIsVisible:C,workoutId:u})}):null]})}))}}]);
//# sourceMappingURL=4.0eb0a959.chunk.js.map
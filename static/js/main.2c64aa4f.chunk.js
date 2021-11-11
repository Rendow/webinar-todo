(this["webpackJsonpwebinar-frontend-test-task"]=this["webpackJsonpwebinar-frontend-test-task"]||[]).push([[0],{82:function(t,e,n){},93:function(t,e,n){"use strict";n.r(e);var a=n(0),c=n.n(a),o=n(9),r=n.n(o),i=(n(82),n(143)),d=n(46),s=n(68),O=n(142),l=n(25),u=n(16),j=n(136),b=n(137),f=n(140),h=n(138),m=n(146),p=n(139),x=n(67),D=n.n(x),T=n(135),g=n(61),v=n.n(g),I=n(144),y=n(19),E=n(14),S=n(32);function A(t,e){switch(e.type){case"TODO/LOAD-STATE":return e.data;case"TODO/ADD-TODO":return Object(S.a)(t,(function(t){t.todoItems.unshift(Object(u.a)({id:"".concat(Date.now().toString(36),"-").concat(Math.floor(1e16*Math.random()).toString(36)),done:!1},e.data))}));case"TODO/DELETE-TODO":return Object(S.a)(t,(function(t){t.todoItems=t.todoItems.filter((function(t){return t.id!==e.data.id}))}));case"TODO/TOGGLE-DONE-TODO":var n=t.todoItems.findIndex((function(t){return t.id===e.data.id}));return Object(S.a)(t,(function(t){t.todoItems[n].done=!t.todoItems[n].done}));case"TODO/DRAG-AND-DROP":var a=e.data,c=a.source,o=a.destination;return Object(S.a)(t,(function(t){var e,n=t.todoItems.splice(c,1);(e=t.todoItems).splice.apply(e,[o,0].concat(Object(E.a)(n)))}));case"TODO/SORT":return Object(S.a)(t,(function(t){t.todoItems.sort((function(t,e){return t.done===e.done?0:t.done?1:-1}))}));case"TODO/UPDATE-TASK":var r=t.todoItems.findIndex((function(t){return t.id===e.data.id}));return Object(S.a)(t,(function(t){t.todoItems[r].title=e.data.title}));default:throw new Error}}var C=n(6),k=Object(a.createContext)(null),w={todoItems:[]},P="todoListState",R=function(t){var e=t.children,n=Object(a.useReducer)(A,w),c=Object(y.a)(n,2),o=c[0],r=c[1];return Object(a.useEffect)((function(){var t=localStorage.getItem(P);if(t)try{r({type:"TODO/LOAD-STATE",data:JSON.parse(t)})}catch(e){}}),[]),Object(a.useEffect)((function(){localStorage.setItem(P,JSON.stringify(o))}),[o]),Object(C.jsx)(k.Provider,{value:Object(u.a)(Object(u.a)({},o),{},{dispatch:r}),children:e})},L=function(){var t=Object(a.useContext)(k);if(!t)throw new Error("useTodoItems hook should only be used inside TodoItemsContextProvider");return t},N=n(53),G=n(145),B=c.a.memo((function(t){var e=Object(a.useState)(!1),n=Object(y.a)(e,2),c=n[0],o=n[1],r=Object(a.useState)(""),i=Object(y.a)(r,2),d=i[0],s=i[1];return c?Object(C.jsx)(G.a,{value:d,onChange:function(t){s(t.currentTarget.value)},onBlur:function(){o(!1),t.changeTitle(d)},variant:"standard",size:"small",color:"secondary",autoFocus:!0}):Object(C.jsx)("span",{onDoubleClick:function(){o(!0),s(t.title)},children:t.title})})),F={type:"spring",damping:25,stiffness:120,duration:.25},J=Object(T.a)({root:{listStyle:"none",padding:"20px 0"}}),M=function(){var t=L().todoItems,e=L().dispatch,n=J();return Object(C.jsx)(N.a,{onDragEnd:function(t,n){var a=t.destination,c=t.source;a&&(a.index===c.index&&a.droppableId===c.droppableId||e({type:"TODO/DRAG-AND-DROP",data:{source:c.index,destination:a.index}}))},children:Object(C.jsx)(N.c,{droppableId:"todo",direction:"vertical",children:function(e){return Object(C.jsxs)("ul",Object(u.a)(Object(u.a)({className:n.root,ref:e.innerRef},e.droppableProps),{},{children:[t.map((function(t,e){return Object(C.jsx)(I.a.li,{transition:F,children:Object(C.jsx)(K,{index:e,item:t})},t.id)})),e.placeholder]}))}})})},W=Object(T.a)({root:{marginTop:24,marginBottom:24},doneRoot:{textDecoration:"line-through",color:"#888888"}}),K=function(t){var e=t.item,n=t.index,c=W(),o=L().dispatch,r=Object(a.useCallback)((function(){return o({type:"TODO/DELETE-TODO",data:{id:e.id}})}),[e.id,o]),i=Object(a.useCallback)((function(){o({type:"TODO/TOGGLE-DONE-TODO",data:{id:e.id}}),o({type:"TODO/SORT"})}),[e.id,o]),s=Object(a.useCallback)((function(t){o({type:"TODO/UPDATE-TASK",data:{id:e.id,title:t}})}),[e.id,o]);return Object(C.jsx)(N.b,{draggableId:e.id,index:n,children:function(t){return Object(C.jsxs)(j.a,Object(u.a)(Object(u.a)(Object(u.a)({className:v()(c.root,Object(l.a)({},c.doneRoot,e.done)),ref:t.innerRef},t.draggableProps),t.dragHandleProps),{},{children:[Object(C.jsx)(b.a,{action:Object(C.jsx)(h.a,{"aria-label":"delete",onClick:r,children:Object(C.jsx)(D.a,{})}),title:Object(C.jsx)(p.a,{control:Object(C.jsx)(m.a,{checked:e.done,onChange:i,name:"checked-".concat(e.id),color:"primary"}),label:Object(C.jsx)(B,{changeTitle:s,title:e.title})})}),e.details?Object(C.jsx)(f.a,{children:Object(C.jsx)(d.a,{variant:"body2",component:"p",children:e.details})}):null]}))}})},U=n(54),V=n(141),q=Object(T.a)((function(){return{root:{marginBottom:24}}}));function z(){var t=q(),e=L().dispatch,n=Object(U.b)(),a=n.control,c=n.handleSubmit,o=n.reset,r=n.watch;return Object(C.jsxs)("form",{onSubmit:c((function(t){e({type:"TODO/ADD-TODO",data:t}),o({title:"",details:""})})),children:[Object(C.jsx)(U.a,{name:"title",control:a,defaultValue:"",rules:{required:!0},render:function(e){var n=e.field;return Object(C.jsx)(G.a,Object(u.a)(Object(u.a)({},n),{},{label:"TODO",fullWidth:!0,className:t.root}))}}),Object(C.jsx)(U.a,{name:"details",control:a,defaultValue:"",render:function(e){var n=e.field;return Object(C.jsx)(G.a,Object(u.a)(Object(u.a)({},n),{},{label:"Details",fullWidth:!0,multiline:!0,className:t.root}))}}),Object(C.jsx)(V.a,{variant:"contained",color:"primary",type:"submit",disabled:!r("title"),children:"Add"})]})}var H=Object(s.a)({palette:{primary:{main:"#9012fe"},secondary:{main:"#b2aabf"}}});function Q(){return Object(C.jsxs)(i.a,{maxWidth:"sm",children:[Object(C.jsx)("header",{children:Object(C.jsx)(d.a,{variant:"h2",component:"h1",children:"Todo List"})}),Object(C.jsxs)("main",{children:[Object(C.jsx)(z,{}),Object(C.jsx)(M,{})]})]})}var X=function(){return Object(C.jsx)(R,{children:Object(C.jsx)(O.a,{theme:H,children:Object(C.jsx)(Q,{})})})},Y=function(t){t&&t instanceof Function&&n.e(3).then(n.bind(null,147)).then((function(e){var n=e.getCLS,a=e.getFID,c=e.getFCP,o=e.getLCP,r=e.getTTFB;n(t),a(t),c(t),o(t),r(t)}))};r.a.render(Object(C.jsx)(c.a.StrictMode,{children:Object(C.jsx)(X,{})}),document.getElementById("root")),Y()}},[[93,1,2]]]);
//# sourceMappingURL=main.2c64aa4f.chunk.js.map
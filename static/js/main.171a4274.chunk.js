(this.webpackJsonpdeckglenvirocar=this.webpackJsonpdeckglenvirocar||[]).push([[0],{134:function(t,e,n){t.exports=n(147)},139:function(t,e,n){},142:function(t,e){},147:function(t,e,n){"use strict";n.r(e);var a=n(9),o=n.n(a),i=n(108),r=n.n(i),l=(n(139),n(122)),s=n(109),c=n(110),h=n(119),u=n(111),d=n(121),m=n(159),b=n(161),f=n(116),p=[0,128,255],g=[255,0,128],v=function(t){function e(){var t,n;Object(s.a)(this,e);for(var a=arguments.length,o=new Array(a),i=0;i<a;i++)o[i]=arguments[i];return(n=Object(h.a)(this,(t=Object(u.a)(e)).call.apply(t,[this].concat(o)))).state={data:[],X:"",Y:""},n}return Object(d.a)(e,t),Object(c.a)(e,[{key:"componentDidMount",value:function(){var t=this;fetch("https://envirocar.org/api/stable/measurements").then((function(t){return t.json()})).then((function(e){var n=e.features.map((function(t){return t.properties.phenomenons["GPS Speed"].value}));(e=e.features.map((function(t){return t.geometry.coordinates}))).forEach((function(t,e){var a=Math.floor(3*Math.random());t.push(a,n[e])})),console.log(e),t.setState({data:e})}))}},{key:"render",value:function(){var t=this,e=[new b.a({id:"scatter-plot",data:this.state.data,radiusScale:12,radiusMinPixels:3,pickable:!0,getPosition:function(t){return[t[0],t[1],0]},getColor:function(t){return 1===t[2]?p:g},onHover:function(e){return t.setState(Object(l.a)({},t.state,{X:e.x,Y:e.y}))}})];return o.a.createElement("div",null,o.a.createElement("a",{className:"btn btn-dark bg-white",style:{color:"black",fontWeight:"bold",position:"absolute",top:"15vh",left:"10%",zIndex:1},href:"https://github.com/SaiAshish9/deck.glEnviroCar"},"Source Code"),o.a.createElement("a",{className:"btn btn-dark bg-white",style:{color:"black",fontWeight:"bold",position:"absolute",bottom:"15vh",right:"10%",zIndex:1},href:"https://envirocar.org/api/stable/measurements"},"Show JSON Data"),o.a.createElement("a",{className:"btn btn-dark ",style:{color:"white",fontWeight:"bold",position:"absolute",bottom:"15vh",left:"10%",zIndex:1}},"Check Console Data"),o.a.createElement("div",{className:"bg-dark",style:{color:"white",textAlign:"center",fontWeight:"bold",position:"absolute",zIndex:1,top:0,width:"100%",minHeight:"8vh",display:"flex",justifyContent:"center",alignItems:"center"}},o.a.createElement("h3",null,"deck.gl React Based Visualization Of Envirocar Measurements Api Data")),o.a.createElement(m.a,{initialViewState:{longitude:6.4847,latitude:51.26,zoom:12,maxZoom:16},controller:!0,layers:e},o.a.createElement(f.a,{mapboxApiAccessToken:"pk.eyJ1Ijoic2FpYXNoaXNoIiwiYSI6ImNrMWdyNTc4cjA3dzEzb2sxaTlrdzFiOHoifQ.B1JQ-8A43BNcL-0kMxO9Bg",mapStyle:"mapbox://styles/mapbox/light-v9"}),this.state.X?o.a.createElement("div",{style:{display:"flex",alignItems:"center",justifyContent:"center",background:"white",border:"1px solid black",textAlign:"center",fontWeight:"bold",height:"5vh",width:"8%",position:"absolute",zIndex:1,left:this.state.X,top:this.state.Y}},o.a.createElement("h6",{style:{fontWeight:"bold",margin:"auto"}},this.state.X," km/h")):null),o.a.createElement("div",{className:"bg-dark",style:{color:"white",textAlign:"center",fontWeight:"bold",position:"absolute",zIndex:1,bottom:0,width:"100%",minHeight:"6vh",display:"flex",justifyContent:"center",alignItems:"center"}},o.a.createElement("h3",null,"Made with \ud83d\udc96 by Sai Ashish")))}}]),e}(o.a.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));r.a.render(o.a.createElement(v,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(t){t.unregister()})).catch((function(t){console.error(t.message)}))},95:function(t,e){}},[[134,1,2]]]);
//# sourceMappingURL=main.171a4274.chunk.js.map
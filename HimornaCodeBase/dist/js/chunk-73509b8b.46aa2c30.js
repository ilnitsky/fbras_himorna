(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-73509b8b"],{"08a1":function(t,a,e){"use strict";var r=e("a4f2"),o=e.n(r);o.a},"81d3":function(t,a,e){"use strict";var r=function(){var t=this,a=t.$createElement,r=t._self._c||a;return t.data?r("div",{staticClass:"block links"},t._l(t.data,(function(a,o){return r("a",{key:o,staticClass:"link",attrs:{href:a.link,target:"_blank"}},[r("img",{attrs:{src:e("8f9d")}}),r("p",{staticClass:"link__name"},[t._v(t._s(a.name))])])})),0):t._e()},o=[],n={name:"link",props:{data:{type:Array,required:!1}}},s=n,i=e("2877"),l=Object(i["a"])(s,r,o,!1,null,null,null);a["a"]=l.exports},"8f9d":function(t,a,e){t.exports=e.p+"img/icon_link.39c32537.svg"},a4f2:function(t,a,e){},fcb9:function(t,a,e){"use strict";e.r(a);var r,o,n=function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("main",{staticClass:"main"},[e("Header"),e("section",{staticClass:"detail"},[e("div",{staticClass:"wrap"},[t.getdata||t.corr?e("h2",{staticClass:"section-title"},[e("a",{directives:[{name:"tooltip",rawName:"v-tooltip",value:"Tooltip for title_peak",expression:"'Tooltip for title_peak'"}],attrs:{href:t.getData.link_coord}},[t._v(t._s(t.getData.title_peak||t.corr.title_peak))]),t._v(" "),e("br"),e("a",{directives:[{name:"tooltip",rawName:"v-tooltip",value:"Tooltip for title_lncrna",expression:"'Tooltip for title_lncrna'"}],attrs:{href:t.getData.link_lnc_name}},[t._v(t._s(t.getData.title_lncrna||t.corr.title_lncrna))])]):t._e(),t.getData||t.corr?e("div",{staticClass:"dropdown"},[e("button",{staticClass:"dropdown-toggle",attrs:{type:"button"},on:{click:t.toggleDropdown}},[t._v(" Toggle Dropdown ")]),e("ul",{directives:[{name:"show",rawName:"v-show",value:t.showDropdown,expression:"showDropdown"}],staticClass:"dropdown-menu"},[e("li",[e("a",{attrs:{href:t.getData.link}},[t._v(t._s(t.getData.title_peak||t.corr.title_peak))])]),e("li",[e("a",{attrs:{href:t.getData.link_lnc_name}},[t._v(t._s(t.getData.title_lncrna||t.corr.title_lncrna))])])])]):t._e(),e("div",{staticClass:"block"},[t.getData||t.corr?e("div",{staticClass:"block-wrap"},[e("h4",[t._v(t._s(t.corr.chart.title))]),e("ChartCombo",{attrs:{data:t.getData.chart||t.corr.chart}})],1):t._e(),t.getData||this.$store.getters.loader?t._e():e("div",{staticClass:"block-none"},[e("h4",[t._v("There is no data")])])]),t.corr?e("Links",{attrs:{data:t.corr.links}}):t._e(),t.getData||t.corr?e("Table",{staticClass:"table-wrap_long",attrs:{max:10,title:"Data by choosen Correlation",data:t.getData.table||t.corr.table}}):t._e(),e("Loader")],1)]),e("Footer")],1)},s=[],i=(e("96cf"),e("1da1")),l=e("0418"),c=e("fd2d"),d=e("0748"),p=e("81d3"),u=e("555f"),_=e("1fca"),h={name:"ChartPeaks",props:{data:{type:Object,required:!0}},extends:_["a"],components:{Bar:_["a"]},data:function(){return{options:{legend:{display:!1},responsive:!0,maintainAspectRatio:!1,scales:{xAxes:[{id:"left-x-axis",type:"linear",position:"bottom",scaleLabel:{display:!0,labelString:"Histone peak signal",fontSize:18,weight:"bold"}}],yAxes:[{display:!0,scaleLabel:{display:!0,labelString:"Gene expression, RPKM",fontSize:18}}]}}}},mounted:function(){var t={datasets:[{type:"scatter",label:"Scatter",data:this.data.points,borderColor:"#31b0d9",backgroundColor:"#31b0d9"},{type:"line",label:"Line",data:this.data.line,fill:!1,backgroundColor:"#fe5c78",borderColor:"#fe5c78"}]},a=this.data.elements;console.log(a,"chart"),this.renderChart(t,this.options)}},f=h,g=e("2877"),b=Object(g["a"])(f,r,o,!1,null,null,null),m=b.exports,k={name:"lncrna",components:{Header:l["a"],Table:d["a"],Links:p["a"],Footer:c["a"],Loader:u["a"],ChartCombo:m},data:function(){return{corr:null,showDropdown:!0}},methods:{toggleDropdown:function(){this.showDropdown=!this.showDropdown}},computed:{getData:function(){return this.$store.getters.getCorr}},mounted:function(){var t=this;return Object(i["a"])(regeneratorRuntime.mark((function a(){return regeneratorRuntime.wrap((function(a){while(1)switch(a.prev=a.next){case 0:return t.$store.dispatch("setLoader",!0),a.next=3,t.$store.dispatch("fetchCorr",[t.$route.query,1,10]);case 3:t.corr=a.sent,t.$store.dispatch("setLoader",!1);case 5:case"end":return a.stop()}}),a)})))()}},v=k,w=(e("08a1"),Object(g["a"])(v,n,s,!1,null,null,null));a["default"]=w.exports}}]);
//# sourceMappingURL=chunk-73509b8b.46aa2c30.js.map
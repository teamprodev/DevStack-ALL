/*
jQWidgets v15.0.0 (2022-Nov)
Copyright (c) 2011-2022 jQWidgets.
License: https://jqwidgets.com/license/
*/
/* eslint-disable */

(function(a){a.extend(a.jqx._jqxGrid.prototype,{savestate:function(b){var c=this.getstate();if(b!==undefined&&!a.isEmptyObject(b)){if(b.indexOf("sort")==-1){delete c.sortcolumn;delete c.sortdirection}if(b.indexOf("pager")==-1){delete c.pagenum;delete c.pagesizeoptions;delete c.pagesize}if(b.indexOf("selection")==-1){delete c.selectedcells;delete c.selectedrowindexes;delete c.selectedrowindex}if(b.indexOf("grouping")==-1){delete c.groups}if(b.indexOf("filter")==-1){delete c.filters}a.each(this.columns.records,function(e){var d=c.columns[this.datafield];if(b.indexOf("hidden_columns")==-1){delete d.hidden}if(b.indexOf("reorder")==-1){delete d.index}if(b.indexOf("columns_width")==-1){delete d.width}if(b.indexOf("columns_text")==-1){delete d.text}if(b.indexOf("alignment")==-1){delete d.align;delete d.cellsalign}})}if(window.localStorage){window.localStorage["jqxGrid"+this.element.id]=this._stringify(c)}this._savedstate=c;return c},loadstate:function(d,j){var g="";if(d!=undefined&&d.width!=undefined){g=d}else{if(window.localStorage){var c=window.localStorage["jqxGrid"+this.element.id];if(c){var g=a.parseJSON(window.localStorage["jqxGrid"+this.element.id])}}else{if(this._savedstate){var g=this._savedstate}}}if(g!=null&&g!==""){if(this.virtualmode||(this.source._source.url&&this.source._source.url!="")){this.source.beginUpdate()}var f=g;if(f.width!==undefined){this.width=f.width}if(f.height!==undefined){this.height=f.height}if(this.pageable){if(f.pagesize!=undefined){this.pagesize=f.pagesize;this.dataview.pagesize=f.pagesize}if(f.pagenum!=undefined){this.dataview.pagenum=f.pagenum}if(f.pagesizeoptions!=undefined){this.pagesizeoptions=f.pagesizeoptions}if(this.pagesizeoptions){var e=0;for(var b=0;b<this.pagesizeoptions.length;b++){if(this.pagesize>=this.pagesizeoptions[b]){e=b}}if(this.pagershowrowscombo){this.pagershowrowscombo.jqxDropDownList({selectedIndex:e})}}}if(this.sortable){if(this._loading){this._loading=false}if(f.sortdirection){if(f.sortdirection.ascending||f.sortdirection.descending){this.dataview.sortfield=f.sortcolumn;var h=f.sortdirection.ascending?"asc":"desc";this.dataview.sortfielddirection=h;this.source.sortcolumn=f.sortcolumn;this.source.sortdirection=h;this.sortby(f.sortcolumn,h)}}else{if(this.dataview.sortfield!=null&&(this.dataview.sortfielddirection=="asc"||this.dataview.sortfielddirection=="desc")){this.sortby(this.dataview.sortfield,null)}}}if(this.groupable&&f.groups){this.dataview.groups=f.groups;this.groups=f.groups}this.loadingstate=true;if(this.virtualsizeinfo){this._loadselectionandcolumnwidths(f)}this.loadingstate=false;if(this.virtualmode||(this.source._source.url&&this.source._source.url!="")){if(j==true){this.source.endUpdate(false)}else{this.source.endUpdate(false);if(this.virtualmode||this.source._source.filter||this.source._source.sort){this.updatebounddata("state")}}}}},_loadselectionandcolumnwidths:function(j){this.loadingstate=true;var m="";if(j!=undefined&&j.width!=undefined){m=j}else{if(window.localStorage){if(window.localStorage["jqxGrid"+this.element.id]){var m=a.parseJSON(window.localStorage["jqxGrid"+this.element.id])}}else{if(this._savedstate){var m=this._savedstate}}}if(m!=null&&m!=""){var E=this._loading;this._loading=false;var G=m;var F=this;var g=false;var d=[];d.length=0;var D=[];a.each(this.columns.records,function(I){var i=G.columns[this.datafield];if(i!=undefined){if(this.text!=i.text){g=true}if(this.hidden!=i.hidden){g=true}if(i.width!==undefined){this.width=i.width;if(this._width){this._width=null}if(this._percentagewidth){this._percentagewidth=null}}if(i.hidden!==undefined){this.hidden=i.hidden}if(i.pinned!==undefined){this.pinned=i.pinned}if(i.groupable!==undefined){this.groupable=i.groupable}if(i.resizable!==undefined){this.resizable=i.resizable}this.draggable=i.draggable;if(i.text!==undefined){this.text=i.text}if(i.align!==undefined){this.align=i.align}if(i.cellsalign!==undefined){this.cellsalign=i.cellsalign}if(F._columns){for(var H=0;H<F._columns.length;H++){if(F._columns[H].datafield==this.datafield){if(i.hidden!==undefined){F._columns[H]["hidden"]=i.hidden}if(i.width!==undefined){F._columns[H]["width"]=i.width}}}}if(i.index!==undefined){d[this.datafield]=i.index;d.length++}}});if(d.length>0){if(this.setcolumnindex){var x=this.rowdetails?1:0;x+=this.groupable?this.groups.length:0;var v=new Array();for(var C=0;C<this.columns.records.length;C++){v.push(this.columns.records[C])}var B=0;var f=new Array();for(var C=0;C<v.length;C++){var k=v[C];var n=d[k.datafield];if(this.groupable&&k.grouped){B++;continue}if(C==0&&this.rowdetails){B++;continue}if(C!==n||this.groupable||this.rowdetails){var q=B+n;f.push({column:k,key:q})}}f.sort(function(H,i){if(H.key<i.key){return -1}if(H.key>i.key){return 1}return 0});f.reverse();a.each(f,function(i,I){var H=this.key;F.setcolumnindex(this.column.datafield,H,false)})}this.prerenderrequired=true;if(this.groupable){this._refreshdataview()}this.rendergridcontent(true);if(this._updatefilterrowui&&this.filterable&&this.showfilterrow){this._updatefilterrowui()}this._renderrows(this.virtualsizeinfo)}if(this.filterable&&G.filters!==undefined){if(this.clearfilters){this._loading=false;this.clearfilters(false)}var c="";var p=new a.jqx.filter();for(var C=0;C<G.filters.filterscount;C++){var A=G.filters["filtercondition"+C];var u=G.filters["filterdatafield"+C];var k=this.getcolumn(u);if(u!=c){p=new a.jqx.filter()}c=u;if(k&&k.filterable){var y=G.filters["filtervalue"+C];var r=G.filters["filteroperator"+C];var b=G.filters["filtertype"+C];if(b=="datefilter"){var s=p.createfilter(b,y,A,null,k.cellsformat,this.gridlocalization)}else{var s=p.createfilter(b,y,A)}p.addfilter(r,s);if(this.showfilterrow){var l=k._filterwidget;var e=k._filterwidget.parent();if(l!=null){switch(k.filtertype){case"number":e.find("input").val(y);if(this.host.jqxDropDownList){var o=p.getoperatorsbyfiltertype("numericfilter");l.find(".filter").jqxDropDownList("selectIndex",o.indexOf(A))}break;case"date":if(this.host.jqxDateTimeInput){a(e.children()[0]).jqxDateTimeInput("setDate",y)}else{l.val(y)}break;case"range":if(this.host.jqxDateTimeInput){var t=G.filters["filtervalue"+(C+1)];var b=G.filters["filtertype"+C];var s=p.createfilter(b,t,"LESS_THAN_OR_EQUAL");p.addfilter(r,s);var z=new Date(y);var h=new Date(t);if(isNaN(z)){z=a.jqx.dataFormat.tryparsedate(y)}if(isNaN(h)){h=a.jqx.dataFormat.tryparsedate(y)}a(e.children()[0]).jqxDateTimeInput("setRange",z,h);C++}else{l.val(y)}break;case"textbox":case"default":l.val(y);F["_oldWriteText"+l[0].id]=y;break;case"list":if(this.host.jqxDropDownList){var w=a(e.children()[0]).jqxDropDownList("getItems");var n=-1;a.each(w,function(H){if(this.value==y){n=H;return false}});a(e.children()[0]).jqxDropDownList("selectIndex",n)}else{l.val(y)}break;case"checkedlist":if(!this.host.jqxDropDownList){l.val(y)}break;case"bool":case"boolean":if(!this.host.jqxCheckBox){l.val(y)}else{a(e.children()[0]).jqxCheckBox({checked:y})}break}}}this.addfilter(u,p)}}if(G.filters&&G.filters.filterscount>0){this.applyfilters();if(this.showfilterrow){a.each(this.columns.records,function(){if(this.filtertype=="checkedlist"&&this.filterable){if(F.host.jqxDropDownList){var L=this;var J=L._filterwidget;var O=J.jqxDropDownList("getItems");var H=J.jqxDropDownList("listBox");H.checkAll(false);if(L.filter){H.uncheckAll(false);var N=L.filter.getfilters();for(var K=0;K<H.items.length;K++){var I=H.items[K].label;a.each(N,function(){if(this.condition=="NOT_EQUAL"){return true}if(I==this.value){H.checkIndex(K,false,false)}})}H._updateCheckedItems();var M=H.getCheckedItems().length;if(H.items.length!=M&&M>0){H.host.jqxListBox("indeterminateIndex",0,true,false)}}}}})}}if(this.pageable&&G.pagenum!==undefined){if(this.gotopage&&!this.virtualmode){this.dataview.pagenum=-1;this.gotopage(G.pagenum)}else{if(this.gotopage&&this.virtualmode){this.gotopage(G.pagenum)}}}}if(G.selectedrowindexes&&G.selectedrowindexes&&G.selectedrowindexes.length>0){this.selectedrowindexes=G.selectedrowindexes;this.selectedrowindex=G.selectedrowindex;if(this.selectionmode==="checkbox"){this._updatecheckboxselection()}}if(G.selectedcells){if(this._applycellselection){a.each(G.selectedcells,function(){F._applycellselection(this.rowindex,this.datafield,true,false)})}}if(this.groupable&&G.groups!==undefined){this._refreshdataview();this.render();this._loading=E;this.loadingstate=false;return}if(g){this.prerenderrequired=true;this.rendergridcontent(true);this._loading=E;this.loadingstate=false;if(this.updating()){return false}}else{this._loading=E;this._updatecolumnwidths();this._updatecellwidths();this.loadingstate=false}this.loadingstate=false;this._loading=E;this._renderrows(this.virtualsizeinfo)}this.loadingstate=false},getstate:function(){var p=this.getdatainformation();var h={};h.width=this.width;h.height=this.height;h.pagenum=p.paginginformation.pagenum;h.pagesize=p.paginginformation.pagesize;h.pagesizeoptions=this.pagesizeoptions;h.sortcolumn=p.sortinformation.sortcolumn;h.sortdirection=p.sortinformation.sortdirection;if(this.selectionmode!=null){if(this.getselectedcells){if(this.selectionmode.toString().indexOf("cell")!=-1){var o=this.getselectedcells();var q=new Array();a.each(o,function(){q.push({datafield:this.datafield,rowindex:this.rowindex})});h.selectedcells=q}else{var n=this.getselectedrowindexes();h.selectedrowindexes=n;h.selectedrowindex=this.selectedrowindex}}}var i={};var d=0;if(this.dataview.filters){for(var j=0;j<this.dataview.filters.length;j++){var e=this.dataview.filters[j].datafield;var b=this.dataview.filters[j].filter;var c=b.getfilters();i[e+"operator"]=b.operator;for(var f=0;f<c.length;f++){c[f].datafield=e;if(c[f].type=="datefilter"){if(c[f].value&&c[f].value.toLocaleString){var g=this.getcolumn(c[f].datafield);if(g.cellsformat){var l=this.source.formatDate(c[f].value,g.cellsformat,this.gridlocalization);if(l){i["filtervalue"+d]=l}else{i["filtervalue"+d]=c[f].value.toLocaleString()}}else{i["filtervalue"+d]=c[f].value.toLocaleString()}}else{i["filtervalue"+d]=c[f].value}}else{i["filtervalue"+d]=c[f].value}i["filtercondition"+d]=c[f].condition;i["filteroperator"+d]=c[f].operator;i["filterdatafield"+d]=e;i["filtertype"+d]=c[f].type;d++}}}i.filterscount=d;h.filters=i;h.groups=this.groups;h.columns={};var k=0;if(this.columns.records){a.each(this.columns.records,function(m,r){if(!this.datafield){return true}var s={};s.width=this.width;s.hidden=this.hidden;s.pinned=this.pinned;s.groupable=this.groupable;s.resizable=this.resizable;s.draggable=this.draggable;s.text=this.text;s.align=this.align;s.cellsalign=this.cellsalign;s.index=k++;h.columns[this.datafield]=s})}return h},_stringify:function(e){if(window.JSON&&typeof window.JSON.stringify==="function"){var d=this;var c="";try{c=window.JSON.stringify(e)}catch(b){return d._str("",{"":e})}return c}var c=this._str("",{"":e});return c},_quote:function(b){var d=/[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,c={"\b":"\\b","\t":"\\t","\n":"\\n","\f":"\\f","\r":"\\r",'"':'\\"',"\\":"\\\\"};return'"'+b.replace(d,function(e){var f=c[e];return typeof f==="string"?f:"\\u"+("0000"+e.charCodeAt(0).toString(16)).slice(-4)})+'"'},_stringifyArray:function(e){var b=e.length,c=[],d;for(var d=0;d<b;d++){c.push(this._str(d,e)||"null")}return"["+c.join(",")+"]"},_stringifyObject:function(f){var c=[],d,b;var e=this;for(d in f){if(Object.prototype.hasOwnProperty.call(f,d)){b=e._str(d,f);if(b){c.push(e._quote(d)+":"+b)}}}return"{"+c.join(",")+"}"},_stringifyReference:function(b){switch(Object.prototype.toString.call(b)){case"[object Array]":return this._stringifyArray(b)}return this._stringifyObject(b)},_stringifyPrimitive:function(c,b){switch(b){case"string":return this._quote(c);case"number":return isFinite(c)?c:"null";case"boolean":return c}return"null"},_str:function(c,b){var e=b[c],d=typeof e;if(e&&typeof e==="object"&&typeof e.toJSON==="function"){e=e.toJSON(c);d=typeof e}if(/(number|string|boolean)/.test(d)||(!e&&d==="object")){return this._stringifyPrimitive(e,d)}else{return this._stringifyReference(e)}}})})(jqxBaseFramework);


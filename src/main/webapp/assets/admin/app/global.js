var AdminGlobal=function(){var a;return{init:function(){var b=$("div.page-content");if(b.size()>0){var j=$(window).height()-b.offset().top-$("div.footer").outerHeight()-8;b.css({"min-height":j})}if($.fn.editable){$.fn.editable.defaults.inputclass="form-control"}$(".theme-panel .theme-options").find("select").each(function(){$(this).val($(this).attr("data-selected")).change()});var f=$(window).height()-$("body > .header").height()-$("body > .footer").height()-15;$(".page-container > .page-content").css({"min-height":f+"px"});$(window).resize(function(){if($.fn.jqGrid){Grid.refreshWidth()}$("div[data-chart='echarts']").each(function(){var k=$(this).data("echart");if(k!=undefined){k.resize()}})});$("#a-logout").click(function(){bootbox.confirm("确认注销登录吗？",function(k){if(k){window.location.href=WEB_ROOT+"/admin/logout"}})});$("div#portlet-layout > .portlet-title-layout > .tools > .reload").click(function(o){var k=$("div#portlet-layout").find(" > .portlet-body > .portlet-tabs");var n=k.find("> .nav > li.active > a");var m=k.find(n.attr("href"));var l=n.attr("data-url");m.ajaxGetUrl(l)});var c=$(".page-sidebar-menu");if(c.size()>0){var d=function(o,q){var n=o.initOpen?"open":"";var p=o.active?"active":"";var l=o.url?WEB_ROOT+"/admin":"javascript:;";var r=q[q.length-1];var m=false;if(o.url){m=(Pinyin.getCamelChars(r)+"").toLowerCase()}var k='<li class="menu '+p+" "+n+'" data-path="'+o.path+'">';k+='<a href="javascript:;" '+(m?' data-py="'+m+'"':"")+(o.url?' rel="address:'+o.url+"|"+o.path+'"':"")+">";if(o.style){k+='<i class="fa '+o.style+'"></i>'}else{if(q.length==1){k+='<i class="fa fa-cogs"></i>'}else{if(o.url){k+='<i class="fa fa-dot-circle-o"></i>'}else{k+='<i class="fa fa-ellipsis-vertical"></i>'}}}if(q.length==1){k+='<span class="title">'+r+"</span>";k+='<span class="selected"></span>'}else{k+=r}if(!o.url){k+='<span class="arrow  '+n+'"></span></a></li>'}k+="</a></li>";return k};c.ajaxJsonUrl(WEB_ROOT+"/admin/menus",function(m){var k=undefined;var l=window.location.hash;if(l&&l!=""){l=l.replace("#","").split("|")[0];$.each(m,function(n,o){if(l==o.url){k=o.path;return false}})}$.each(m,function(q,r){if(Util.startWith(k,r.path)){r.initOpen=true;r.active=true}var s=r.path.split(":");if(s.length==1){c.append(d(r,s))}else{var p=[];$.each(s,function(v,u){if(v<s.length-1){p.push(u)}});var o=p.join(":");var t=c.find("li[data-path='"+o+"']");var n=t.find("> ul.sub-menu");if(n.size()==0){n=$('<ul class="sub-menu" style="display: '+(t.is(".open")?"block":"none")+';">').appendTo(t)}n.append(d(r,s))}})});$.address.change(function(n){if(n.value=="/dashboard"){AdminGlobal.addOrActivePanel(DASHBOARD_URI+"|Dashboard")}else{if(n.value=="/"){var l=window.location.href.replace(/.*\/admin/g,"");if(l==""||l=="/"||l=="#"){AdminGlobal.addOrActivePanel(DASHBOARD_URI+"|Dashboard")}else{AdminGlobal.addOrActivePanel("/admin/"+l+"|Dashboard")}}else{if(n.value=="/lock"){$.backstretch(["assets/img/bg/1.jpg","assets/img/bg/2.jpg","assets/img/bg/3.jpg","assets/img/bg/4.jpg"],{fade:1000,duration:8000});$(".page-container,.header,.footer").hide();$("#form-unlock").find(":text").focus().val("");$("#page-lock").show();$("#form-unlock").find("input").first().focus();$("body").ajaxPostURL({url:WEB_ROOT+"/layout!lock",confirmMsg:false})}else{var o=$('.page-sidebar li.menu > a[rel^="address:'+n.value+'"]');if(o.size()>0){AdminGlobal.addOrActivePanel(o.attr("rel").replace("address:",""));var r=$(".page-sidebar-menu").find("li");r.removeClass("active").removeClass("open");var q=o.parent("li");q.addClass("active");var k=q.closest("ul.sub-menu");while(k.size()>0){k.show();var m=k.parent("li");m.addClass("open");m.addClass("active");m.find(" > a > span.arrow").addClass("open");k=m.closest("ul.sub-menu")}}else{var p=window.location.hash;if(p!=""&&!Util.startWith(p,"#/")){return false}AdminGlobal.addOrActivePanel(n.value)}}}}});$('.sidebar-search input[name="search"]').autocomplete({autoFocus:true,source:function(m,k){var l=c.find("a[data-py]");return k(l.map(function(){var q=m.term.toLowerCase();var n=$(this);var p=n.text();var o=n.attr("data-py");if(o.indexOf(q)>-1||p.indexOf(q)>-1){return{label:$.trim(p),link:n,href:n.attr("href")}}}))},minLength:1,select:function(l,m){var k=m.item;$(this).parent().find(".submit").data("link",k.link);k.link.click();return true}}).focus(function(){$(this).select()}).val("").focus();$('.sidebar-search input[name="search"]').parent().find(".submit").click(function(){var k=$(this).data("link");if(k){k.click()}return false})}var h=$("#header_notification_bar");if(h.size()>0){$.ajax({dataType:"json",method:"get",url:WEB_ROOT+"/notify-message/count",success:function(k){var l=k.data;if(l>0){var m="<a href='javascripts:;' rel='address:/admin/profile/notify-message?readed=no|未读公告信息列表'>您有 "+l+" 条未读公告信息</a>";$(".message-info",h).html(m);$(".badge",h).html(l).show()}else{var m="<a href='javascripts:;' rel='address:/admin/profile/notify-message|公告信息列表'>暂无未读，点击查看公告信息列表</a>";$(".message-info",h).html(m);$(".badge",h).html(0).hide()}}})}var i=$("#header_inbox_bar");if(i.size()>0){$.ajax({dataType:"json",method:"get",url:WEB_ROOT+"/user-message/count",success:function(k){var l=k.data;if(l>0){var m="<a href='javascripts:;' rel='address:/admin/profile/user-message?readed=no|未读个人消息列表'>您有 "+l+" 条未读个人消息</a>";$(".message-info",i).html(m);$(".badge",i).html(l).show()}else{var m="<a href='javascripts:;' rel='address:/admin/profile/user-message|个人消息列表'>暂无未读，点击查看个人消息列表</a>";$(".message-info",i).html(m);$(".badge",i).html(0).hide()}}})}$("div#portlet-layout > .portlet-title-layout > .tools > .reload").click(function(o){var k=$("div#portlet-layout").find(" > .portlet-body > .portlet-tabs");var n=k.find("> .nav > li.active > a");var m=k.find(n.attr("href"));var l=n.attr("data-url");m.ajaxGetUrl(l)});jQuery("body").on("click","#layout-nav >  li > .btn-close-active",function(n){var m=$("#layout-nav");var l=m.next(".tab-content").find(".panel-content:visible").attr("data-url");var k=m.find(" > .btn-group > ul.dropdown-menu");k.find("a[href='"+l+"']").find(".badge").click()});jQuery("body").on("click","ul.nav > li.tools > .reload",function(o){o.preventDefault();var k=$(this).closest(".nav");var n=k.find("li.active > a");var m=k.closest(".tabbable").find(n.attr("href"));if(n.attr("data-url")){var l=n.attr("data-url");m.ajaxGetUrl(l,function(){m.find(".tabbable:first > .nav > li.active > a").click()})}else{if(jQuery().jqGrid){m.find("table.ui-jqgrid-btable").each(function(){var p=$(this);p.trigger("clearToolbar");var q=p.attr("data-url");p.jqGrid("setGridParam",{datatype:"json",url:q}).trigger("reloadGrid")})}}});$(".page-sidebar, .header").on("click",".sidebar-toggler",function(k){Grid.refreshWidth()});if($.fn.fileupload){$("#fileupload").fileupload({autoUpload:false,dataType:"json",url:WEB_ROOT+"/sys/attachment-file!uploadMulti"});var e=$("#fileupload");var g=null;jQuery("body").on("click","a.btn-fileinput-trigger",function(l){g=$(this);var k=g.attr("data-category");if(k){e.find("input[name='attachmentName']").val("_attachment_"+k)}e.find("tbody.files").empty()});jQuery("#fileupload-dialog").on("click",".modal-footer .btn-add",function(m){var l=g.parent().find("table.table-filelist");if(l.size()==0){l=$('<table role="presentation" class="table table-striped table-filelist clearfix"><tbody class="files"></tbody></table>').insertAfter(g)}var k=l.find("tbody.files");$("#fileupload").find("tbody.files tr.template-download").each(function(){k.append($(this).clone(true))});$("#fileupload-dialog").find('.modal-footer [data-dismiss="modal"]').click()})}jQuery("body").on("click",'a[data-toggle="panel"],button[data-toggle="panel"]',function(l){l.preventDefault();var k=$(this);AdminGlobal.addOrActivePanel(k)});jQuery("body").on("click",'a[data-upload="btn-single-file"],button[data-upload="btn-single-file"]',function(l){l.preventDefault();var k=$(this);Global.triggerSingleFileUpload(k)});jQuery("body").on("click","tbody.select-table-checkbox",function(l){var k=$(this).find(".table-checkbox :checkbox");if(!(k.is(l.target)||k.find(l.target).length)){k.attr("checked",!k.is(":checked"))}})},findUserProfileParams:function(b){if(a==undefined||a==null){a=$("body").cacheData(WEB_ROOT+"/admin/sys/user-profile-data/params.json")}return a[b]},setUserProfileParams:function(b,c){if(a==undefined||a==null){a=$("body").cacheData(WEB_ROOT+"/admin/sys/user-profile-data/params.json")}a[b]=c},addOrActivePanel:function(l,m){l=decodeURI(l);var b=l;var j=l.split("|");if(j.length>1){b=j[0];if(m==undefined){m=j[1]}}b=WEB_ROOT+b;var h=m.split(":");var d=h[h.length-1];var m='<li><a href="#/dashboard" class="btn-dashboard"><i class="fa fa-home"></i> 首页 </a></li> ';var f=$("#layout-nav");f.find("> li:not(.btn-group)").remove();$.each(h,function(o,n){n=n;if(o<h.length-1){m+='<li class="hidden-inline-xs"><i class="fa fa-angle-right"></i> '+n+" </li>"}else{m+='<li class="hidden-inline-xs"><i class="fa fa-angle-right"></i> <a class="reload" href="javascript:;">'+n+"</a> </li>"}});f.append(m);var e=f.next(".tab-content");var k=e.find("> div[data-url='"+b+"']");if(k.length==0){k=$('<div data-url="'+b+'" class="panel-content"></div>').appendTo(e);k.ajaxGetUrl(b)}else{k.show()}e.find("> div").not(k).hide();var c=f.find(" > .btn-group > ul.dropdown-menu");var g=c.find("> li > a[rel='address:"+l+"']");if(g.length==0){g=$('<a href="javascripts:;" rel="address:'+l+'">'+d+'<span class="badge badge-default">X</span></a>').appendTo(c).wrap("<li/>");g.find(".badge").click(function(p){p.preventDefault();p.stopPropagation();var o=false;k.find("form[method='post']:not(.form-track-disabled)[form-data-modified='true']").each(function(){var r=$(this);if(!confirm("当前表单有修改数据未保存，确认离开当前表单吗？")){o=true;return false}});if(!o){g.parent("li").remove();k.remove();var n=1;c.find("> li").not(g).each(function(){var r=$(this).attr("count");if(r){if(Number(r)>n){n=Number(r)}}});var q=c.find("> li[count='"+n+"'] > a");if(q.length>0){q.click()}else{$("#layout-nav >  li > .btn-dashboard").click()}}})}var i=1;c.find("> li").each(function(){$(this).removeClass("active");var n=$(this).attr("count");if(n){if(Number(n)>i){i=Number(n)}}});g.parent("li").addClass("active");g.parent("li").attr("count",i+1);f.find("> li:not(.btn-group) > a.reload").click(function(n){n.preventDefault();k.ajaxGetUrl(b)})}}}();
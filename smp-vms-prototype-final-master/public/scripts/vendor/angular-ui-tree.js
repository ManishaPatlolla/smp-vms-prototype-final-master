
/**
 * @license Angular UI Tree v2.0.11
 * (c) 2010-2014. https://github.com/JimLiu/angular-ui-tree
 * License: MIT
 */
!function(){"use strict";angular.module("ui.tree",[]).constant("treeConfig",{treeClass:"angular-ui-tree",emptyTreeClass:"angular-ui-tree-empty",hiddenClass:"angular-ui-tree-hidden",nodesClass:"angular-ui-tree-nodes",nodeClass:"angular-ui-tree-node",handleClass:"angular-ui-tree-handle",placeHolderClass:"angular-ui-tree-placeholder",dragClass:"angular-ui-tree-drag",dragThreshold:3,levelThreshold:30})}(),function(){"use strict";angular.module("ui.tree").factory("$uiTreeHelper",["$document","$window",function($document,$window){return{nodesData:{},setNodeAttribute:function(scope,attrName,val){var data=this.nodesData[scope.$modelValue.$$hashKey];data||(data={},this.nodesData[scope.$modelValue.$$hashKey]=data),data[attrName]=val},getNodeAttribute:function(scope,attrName){var data=this.nodesData[scope.$modelValue.$$hashKey];return data?data[attrName]:null},nodrag:function(targetElm){return"undefined"!=typeof targetElm.attr("data-nodrag")},eventObj:function(e){var obj=e;return void 0!==e.targetTouches?obj=e.targetTouches.item(0):void 0!==e.originalEvent&&void 0!==e.originalEvent.targetTouches&&(obj=e.originalEvent.targetTouches.item(0)),obj},dragInfo:function(node){return{source:node,sourceInfo:{nodeScope:node,index:node.index(),nodesScope:node.$parentNodesScope},index:node.index(),siblings:node.siblings().slice(0),parent:node.$parentNodesScope,moveTo:function(parent,siblings,index){this.parent=parent,this.siblings=siblings.slice(0);var i=this.siblings.indexOf(this.source);i>-1&&(this.siblings.splice(i,1),this.source.index()<index&&index--),this.siblings.splice(index,0,this.source),this.index=index},parentNode:function(){return this.parent.$nodeScope},prev:function(){return this.index>0?this.siblings[this.index-1]:null},next:function(){return this.index<this.siblings.length-1?this.siblings[this.index+1]:null},isDirty:function(){return this.source.$parentNodesScope!=this.parent||this.source.index()!=this.index},eventArgs:function(elements,pos){return{source:this.sourceInfo,dest:{index:this.index,nodesScope:this.parent},elements:elements,pos:pos}},apply:function(){var nodeData=this.source.$modelValue;this.source.remove(),this.parent.insertNode(this.index,nodeData)}}},height:function(element){return element.prop("scrollHeight")},width:function(element){return element.prop("scrollWidth")},offset:function(element){var boundingClientRect=element[0].getBoundingClientRect();return{width:element.prop("offsetWidth"),height:element.prop("offsetHeight"),top:boundingClientRect.top+($window.pageYOffset||$document[0].body.scrollTop||$document[0].documentElement.scrollTop),left:boundingClientRect.left+($window.pageXOffset||$document[0].body.scrollLeft||$document[0].documentElement.scrollLeft)}},positionStarted:function(e,target){var pos={};return pos.offsetX=e.pageX-this.offset(target).left,pos.offsetY=e.pageY-this.offset(target).top,pos.startX=pos.lastX=e.pageX,pos.startY=pos.lastY=e.pageY,pos.nowX=pos.nowY=pos.distX=pos.distY=pos.dirAx=0,pos.dirX=pos.dirY=pos.lastDirX=pos.lastDirY=pos.distAxX=pos.distAxY=0,pos},positionMoved:function(e,pos,firstMoving){pos.lastX=pos.nowX,pos.lastY=pos.nowY,pos.nowX=e.pageX,pos.nowY=e.pageY,pos.distX=pos.nowX-pos.lastX,pos.distY=pos.nowY-pos.lastY,pos.lastDirX=pos.dirX,pos.lastDirY=pos.dirY,pos.dirX=0===pos.distX?0:pos.distX>0?1:-1,pos.dirY=0===pos.distY?0:pos.distY>0?1:-1;var newAx=Math.abs(pos.distX)>Math.abs(pos.distY)?1:0;return firstMoving?(pos.dirAx=newAx,void(pos.moving=!0)):(pos.dirAx!==newAx?(pos.distAxX=0,pos.distAxY=0):(pos.distAxX+=Math.abs(pos.distX),0!==pos.dirX&&pos.dirX!==pos.lastDirX&&(pos.distAxX=0),pos.distAxY+=Math.abs(pos.distY),0!==pos.dirY&&pos.dirY!==pos.lastDirY&&(pos.distAxY=0)),void(pos.dirAx=newAx))}}}])}(),function(){"use strict";angular.module("ui.tree").controller("TreeController",["$scope","$element","$attrs","treeConfig",function($scope,$element){this.scope=$scope,$scope.$element=$element,$scope.$nodesScope=null,$scope.$type="uiTree",$scope.$emptyElm=null,$scope.$callbacks=null,$scope.dragEnabled=!0,$scope.maxDepth=0,$scope.dragDelay=0,$scope.isEmpty=function(){return $scope.$nodesScope&&$scope.$nodesScope.$modelValue&&0===$scope.$nodesScope.$modelValue.length},$scope.place=function(placeElm){$scope.$nodesScope.$element.append(placeElm),$scope.$emptyElm.remove()},$scope.resetEmptyElement=function(){0===$scope.$nodesScope.$modelValue.length?$element.append($scope.$emptyElm):$scope.$emptyElm.remove()};var collapseOrExpand=function(scope,collapsed){for(var nodes=scope.childNodes(),i=0;i<nodes.length;i++){collapsed?nodes[i].collapse():nodes[i].expand();var subScope=nodes[i].$childNodesScope;subScope&&collapseOrExpand(subScope,collapsed)}};$scope.collapseAll=function(){collapseOrExpand($scope.$nodesScope,!0)},$scope.expandAll=function(){collapseOrExpand($scope.$nodesScope,!1)}}])}(),function(){"use strict";angular.module("ui.tree").controller("TreeNodesController",["$scope","$element","$timeout","treeConfig",function($scope,$element,$timeout){this.scope=$scope,$scope.$element=$element,$scope.$modelValue=null,$scope.$nodeScope=null,$scope.$treeScope=null,$scope.$type="uiTreeNodes",$scope.$nodesMap={},$scope.nodrop=!1,$scope.maxDepth=0,$scope.initSubNode=function(subNode){$timeout(function(){$scope.$nodesMap[subNode.$modelValue.$$hashKey]=subNode})},$scope.destroySubNode=function(subNode){$scope.$nodesMap[subNode.$modelValue.$$hashKey]=null},$scope.accept=function(sourceNode,destIndex){return $scope.$treeScope.$callbacks.accept(sourceNode,$scope,destIndex)},$scope.isParent=function(node){return node.$parentNodesScope==$scope},$scope.hasChild=function(){return $scope.$modelValue.length>0},$scope.safeApply=function(fn){var phase=this.$root.$$phase;"$apply"==phase||"$digest"==phase?fn&&"function"==typeof fn&&fn():this.$apply(fn)},$scope.removeNode=function(node){var index=$scope.$modelValue.indexOf(node.$modelValue);return index>-1?($scope.safeApply(function(){$scope.$modelValue.splice(index,1)[0]}),node):null},$scope.insertNode=function(index,nodeData){$scope.safeApply(function(){$scope.$modelValue.splice(index,0,nodeData)})},$scope.childNodes=function(){var nodes=[];if($scope.$modelValue)for(var i=0;i<$scope.$modelValue.length;i++)nodes.push($scope.$nodesMap[$scope.$modelValue[i].$$hashKey]);return nodes},$scope.depth=function(){return $scope.$nodeScope?$scope.$nodeScope.depth():0},$scope.outOfDepth=function(sourceNode){var maxDepth=$scope.maxDepth||$scope.$treeScope.maxDepth;return maxDepth>0?$scope.depth()+sourceNode.maxSubDepth()+1>maxDepth:!1}}])}(),function(){"use strict";angular.module("ui.tree").controller("TreeNodeController",["$scope","$element","$attrs","treeConfig",function($scope,$element){this.scope=$scope,$scope.$element=$element,$scope.$modelValue=null,$scope.$parentNodeScope=null,$scope.$childNodesScope=null,$scope.$parentNodesScope=null,$scope.$treeScope=null,$scope.$handleScope=null,$scope.$type="uiTreeNode",$scope.$$apply=!1,$scope.collapsed=!1,$scope.init=function(controllersArr){var treeNodesCtrl=controllersArr[0];$scope.$treeScope=controllersArr[1]?controllersArr[1].scope:null,$scope.$parentNodeScope=treeNodesCtrl.scope.$nodeScope,$scope.$modelValue=treeNodesCtrl.scope.$modelValue[$scope.$index],$scope.$parentNodesScope=treeNodesCtrl.scope,treeNodesCtrl.scope.initSubNode($scope),$element.on("$destroy",function(){treeNodesCtrl.scope.destroySubNode($scope)})},$scope.index=function(){return $scope.$parentNodesScope.$modelValue.indexOf($scope.$modelValue)},$scope.dragEnabled=function(){return!($scope.$treeScope&&!$scope.$treeScope.dragEnabled)},$scope.isSibling=function(targetNode){return $scope.$parentNodesScope==targetNode.$parentNodesScope},$scope.isChild=function(targetNode){var nodes=$scope.childNodes();return nodes&&nodes.indexOf(targetNode)>-1},$scope.prev=function(){var index=$scope.index();return index>0?$scope.siblings()[index-1]:null},$scope.siblings=function(){return $scope.$parentNodesScope.childNodes()},$scope.childNodesCount=function(){return $scope.childNodes()?$scope.childNodes().length:0},$scope.hasChild=function(){return $scope.childNodesCount()>0},$scope.childNodes=function(){return $scope.$childNodesScope&&$scope.$childNodesScope.$modelValue?$scope.$childNodesScope.childNodes():null},$scope.accept=function(sourceNode,destIndex){return $scope.$childNodesScope&&$scope.$childNodesScope.accept(sourceNode,destIndex)},$scope.remove=function(){return $scope.$parentNodesScope.removeNode($scope)},$scope.toggle=function(){$scope.collapsed=!$scope.collapsed},$scope.collapse=function(){$scope.collapsed=!0},$scope.expand=function(){$scope.collapsed=!1},$scope.depth=function(){var parentNode=$scope.$parentNodeScope;return parentNode?parentNode.depth()+1:1};var subDepth=0,countSubDepth=function(scope){for(var count=0,nodes=scope.childNodes(),i=0;i<nodes.length;i++){var childNodes=nodes[i].$childNodesScope;childNodes&&(count=1,countSubDepth(childNodes))}subDepth+=count};$scope.maxSubDepth=function(){return subDepth=0,$scope.$childNodesScope&&countSubDepth($scope.$childNodesScope),subDepth}}])}(),function(){"use strict";angular.module("ui.tree").controller("TreeHandleController",["$scope","$element","$attrs","treeConfig",function($scope,$element){this.scope=$scope,$scope.$element=$element,$scope.$nodeScope=null,$scope.$type="uiTreeHandle"}])}(),function(){"use strict";angular.module("ui.tree").directive("uiTree",["treeConfig","$window",function(treeConfig,$window){return{restrict:"A",scope:!0,controller:"TreeController",link:function(scope,element,attrs){var callbacks={accept:null},config={};angular.extend(config,treeConfig),config.treeClass&&element.addClass(config.treeClass),scope.$emptyElm=angular.element($window.document.createElement("div")),config.emptyTreeClass&&scope.$emptyElm.addClass(config.emptyTreeClass),scope.$watch("$nodesScope.$modelValue.length",function(){scope.$nodesScope.$modelValue&&scope.resetEmptyElement()},!0),attrs.$observe("dragEnabled",function(val){var de=scope.$eval(val);"boolean"==typeof de&&(scope.dragEnabled=de)}),attrs.$observe("maxDepth",function(val){var md=scope.$eval(val);"number"==typeof md&&(scope.maxDepth=md)}),attrs.$observe("dragDelay",function(val){var dd=scope.$eval(val);"number"==typeof dd&&(scope.dragDelay=dd)}),callbacks.accept=function(sourceNodeScope,destNodesScope){return destNodesScope.nodrop||destNodesScope.outOfDepth(sourceNodeScope)?!1:!0},callbacks.dropped=function(){},callbacks.dragStart=function(){},callbacks.dragMove=function(){},callbacks.dragStop=function(){},scope.$watch(attrs.uiTree,function(newVal){angular.forEach(newVal,function(value,key){callbacks[key]&&"function"==typeof value&&(callbacks[key]=value)}),scope.$callbacks=callbacks},!0)}}}])}(),function(){"use strict";angular.module("ui.tree").directive("uiTreeNodes",["treeConfig","$window",function(treeConfig){return{require:["ngModel","?^uiTreeNode","^uiTree"],restrict:"A",scope:!0,controller:"TreeNodesController",link:function(scope,element,attrs,controllersArr){var config={};angular.extend(config,treeConfig),config.nodesClass&&element.addClass(config.nodesClass);var ngModel=controllersArr[0],treeNodeCtrl=controllersArr[1],treeCtrl=controllersArr[2];treeNodeCtrl?(treeNodeCtrl.scope.$childNodesScope=scope,scope.$nodeScope=treeNodeCtrl.scope):treeCtrl.scope.$nodesScope=scope,scope.$treeScope=treeCtrl.scope,ngModel&&(ngModel.$render=function(){ngModel.$modelValue&&angular.isArray(ngModel.$modelValue)||ngModel.$setViewValue([]),scope.$modelValue=ngModel.$modelValue}),attrs.$observe("maxDepth",function(val){var md=scope.$eval(val);"number"==typeof md&&(scope.maxDepth=md)}),attrs.$observe("nodrop",function(val){scope.nodrop="undefined"!=typeof val})}}}])}(),function(){"use strict";angular.module("ui.tree").directive("uiTreeNode",["treeConfig","$uiTreeHelper","$window","$document","$timeout",function(treeConfig,$uiTreeHelper,$window,$document,$timeout){return{require:["^uiTreeNodes","^uiTree"],restrict:"A",controller:"TreeNodeController",link:function(scope,element,attrs,controllersArr){var config={};angular.extend(config,treeConfig),config.nodeClass&&element.addClass(config.nodeClass),scope.init(controllersArr),scope.collapsed=!!$uiTreeHelper.getNodeAttribute(scope,"collapsed"),attrs.$observe("collapsed",function(val){var collapsed=scope.$eval(val);"boolean"==typeof collapsed&&(scope.collapsed=collapsed)}),scope.$watch("collapsed",function(val){$uiTreeHelper.setNodeAttribute(scope,"collapsed",val),attrs.$set("collapsed",val)});var firstMoving,dragInfo,pos,placeElm,hiddenPlaceElm,dragElm,elements,hasTouch="ontouchstart"in window,treeScope=null,dragTimer=null,dragStart=function(e){if((hasTouch||2!=e.button&&3!=e.which)&&!(e.uiTreeDragging||e.originalEvent&&e.originalEvent.uiTreeDragging)){var eventElm=angular.element(e.target),eventScope=eventElm.scope();if(eventScope&&eventScope.$type&&!("uiTreeNode"!=eventScope.$type&&"uiTreeHandle"!=eventScope.$type||"uiTreeNode"==eventScope.$type&&eventScope.$handleScope)){for(;eventElm&&eventElm[0]&&eventElm[0]!=element;){if($uiTreeHelper.nodrag(eventElm))return;eventElm=eventElm.parent()}e.uiTreeDragging=!0,e.originalEvent&&(e.originalEvent.uiTreeDragging=!0),e.preventDefault();var eventObj=$uiTreeHelper.eventObj(e);firstMoving=!0,dragInfo=$uiTreeHelper.dragInfo(scope);var tagName=scope.$element.prop("tagName");if("tr"===tagName.toLowerCase()){placeElm=angular.element($window.document.createElement(tagName));var tdElm=angular.element($window.document.createElement("td")).addClass(config.placeHolderClass);placeElm.append(tdElm)}else placeElm=angular.element($window.document.createElement(tagName)).addClass(config.placeHolderClass);hiddenPlaceElm=angular.element($window.document.createElement(tagName)),config.hiddenClass&&hiddenPlaceElm.addClass(config.hiddenClass),pos=$uiTreeHelper.positionStarted(eventObj,scope.$element),placeElm.css("height",$uiTreeHelper.height(scope.$element)+"px"),dragElm=angular.element($window.document.createElement(scope.$parentNodesScope.$element.prop("tagName"))).addClass(scope.$parentNodesScope.$element.attr("class")).addClass(config.dragClass),dragElm.css("width",$uiTreeHelper.width(scope.$element)+"px"),dragElm.css("z-index",9999),scope.$element.after(placeElm),scope.$element.after(hiddenPlaceElm),dragElm.append(scope.$element),$document.find("body").append(dragElm),dragElm.css({left:eventObj.pageX-pos.offsetX+"px",top:eventObj.pageY-pos.offsetY+"px"}),elements={placeholder:placeElm,dragging:dragElm},scope.$apply(function(){scope.$callbacks.dragStart(dragInfo.eventArgs(elements,pos))}),angular.element($document).bind("touchend",dragEndEvent),angular.element($document).bind("touchcancel",dragEndEvent),angular.element($document).bind("touchmove",dragMoveEvent),angular.element($document).bind("mouseup",dragEndEvent),angular.element($document).bind("mousemove",dragMoveEvent),angular.element($window.document.body).bind("mouseleave",dragCancelEvent)}}},dragMove=function(e){var prev,eventObj=$uiTreeHelper.eventObj(e);if(dragElm){if(e.preventDefault(),$window.getSelection().removeAllRanges(),dragElm.css({left:eventObj.pageX-pos.offsetX+"px",top:eventObj.pageY-pos.offsetY+"px"}),$uiTreeHelper.positionMoved(e,pos,firstMoving),firstMoving)return void(firstMoving=!1);if(pos.dirAx&&pos.distAxX>=config.levelThreshold&&(pos.distAxX=0,pos.distX>0&&(prev=dragInfo.prev(),prev&&!prev.collapsed&&prev.accept(scope,prev.childNodesCount())&&(prev.$childNodesScope.$element.append(placeElm),dragInfo.moveTo(prev.$childNodesScope,prev.childNodes(),prev.childNodesCount()))),pos.distX<0)){var next=dragInfo.next();if(!next){var target=dragInfo.parentNode();target&&target.$parentNodesScope.accept(scope,target.index()+1)&&(target.$element.after(placeElm),dragInfo.moveTo(target.$parentNodesScope,target.siblings(),target.index()+1))}}var targetX=($uiTreeHelper.offset(dragElm).left-$uiTreeHelper.offset(placeElm).left>=config.threshold,eventObj.pageX-$window.document.body.scrollLeft),targetY=eventObj.pageY-(window.pageYOffset||$window.document.documentElement.scrollTop);angular.isFunction(dragElm.hide)&&dragElm.hide(),$window.document.elementFromPoint(targetX,targetY);var targetElm=angular.element($window.document.elementFromPoint(targetX,targetY));if(angular.isFunction(dragElm.show)&&dragElm.show(),!pos.dirAx){var targetBefore,targetNode;targetNode=targetElm.scope();var isEmpty=!1;if("uiTree"==targetNode.$type&&targetNode.dragEnabled&&(isEmpty=targetNode.isEmpty()),"uiTreeHandle"==targetNode.$type&&(targetNode=targetNode.$nodeScope),"uiTreeNode"!=targetNode.$type&&!isEmpty)return;if(treeScope&&placeElm.parent()[0]!=treeScope.$element[0]&&(treeScope.resetEmptyElement(),treeScope=null),isEmpty)treeScope=targetNode,targetNode.$nodesScope.accept(scope,0)&&(targetNode.place(placeElm),dragInfo.moveTo(targetNode.$nodesScope,targetNode.$nodesScope.childNodes(),0));else if(targetNode.dragEnabled()){targetElm=targetNode.$element;var targetOffset=$uiTreeHelper.offset(targetElm);targetBefore=eventObj.pageY<targetOffset.top+$uiTreeHelper.height(targetElm)/2,targetNode.$parentNodesScope.accept(scope,targetNode.index())?targetBefore?(targetElm[0].parentNode.insertBefore(placeElm[0],targetElm[0]),dragInfo.moveTo(targetNode.$parentNodesScope,targetNode.siblings(),targetNode.index())):(targetElm.after(placeElm),dragInfo.moveTo(targetNode.$parentNodesScope,targetNode.siblings(),targetNode.index()+1)):!targetBefore&&targetNode.accept(scope,targetNode.childNodesCount())&&(targetNode.$childNodesScope.$element.append(placeElm),dragInfo.moveTo(targetNode.$childNodesScope,targetNode.childNodes(),targetNode.childNodesCount()))}}scope.$apply(function(){scope.$callbacks.dragMove(dragInfo.eventArgs(elements,pos))})}},dragEnd=function(e){e.preventDefault(),dragElm&&(hiddenPlaceElm.replaceWith(scope.$element),placeElm.remove(),dragElm.remove(),dragElm=null,scope.$$apply?(dragInfo.apply(),scope.$treeScope.$apply(function(){scope.$callbacks.dropped(dragInfo.eventArgs(elements,pos))})):bindDrag(),scope.$treeScope.$apply(function(){scope.$callbacks.dragStop(dragInfo.eventArgs(elements,pos))}),scope.$$apply=!1,dragInfo=null),angular.element($document).unbind("touchend",dragEndEvent),angular.element($document).unbind("touchcancel",dragEndEvent),angular.element($document).unbind("touchmove",dragMoveEvent),angular.element($document).unbind("mouseup",dragEndEvent),angular.element($document).unbind("mousemove",dragMoveEvent),angular.element($window.document.body).unbind("mouseleave",dragCancelEvent)},dragStartEvent=function(e){scope.dragEnabled()&&dragStart(e)},dragMoveEvent=function(e){dragMove(e)},dragEndEvent=function(e){scope.$$apply=!0,dragEnd(e)},dragCancelEvent=function(e){dragEnd(e)},bindDrag=function(){element.bind("touchstart",dragStartEvent),element.bind("mousedown",function(e){dragTimer=$timeout(function(){dragStartEvent(e)},scope.dragDelay)}),element.bind("mouseup",function(){$timeout.cancel(dragTimer)})};bindDrag(),angular.element($window.document.body).bind("keydown",function(e){27==e.keyCode&&(scope.$$apply=!1,dragEnd(e))})}}}])}(),function(){"use strict";angular.module("ui.tree").directive("uiTreeHandle",["treeConfig","$window",function(treeConfig){return{require:"^uiTreeNode",restrict:"A",scope:!0,controller:"TreeHandleController",link:function(scope,element,attrs,treeNodeCtrl){var config={};angular.extend(config,treeConfig),config.handleClass&&element.addClass(config.handleClass),scope!=treeNodeCtrl.scope&&(scope.$nodeScope=treeNodeCtrl.scope,treeNodeCtrl.scope.$handleScope=scope)}}}])}();
;
var ngMap=angular.module("ngMap",[]);ngMap.directive("infoWindow",["Attr2Options",function(Attr2Options){var parser=new Attr2Options;return{restrict:"E",require:"^map",link:function(scope,element,attrs,mapController){var filtered=new parser.filter(attrs);scope.google=google;var options=parser.getOptions(filtered,scope);options.pixelOffset&&(options.pixelOffset=google.maps.Size.apply(this,options.pixelOffset));var infoWindow=new google.maps.InfoWindow(options);infoWindow.contents=element.html();var events=parser.getEvents(scope,filtered);for(var eventName in events)eventName&&google.maps.event.addListener(infoWindow,eventName,events[eventName]);mapController.infoWindows.push(infoWindow),element.css({display:"none"}),scope.showInfoWindow=function(event,id,options){var infoWindow=scope.infoWindows[id],contents=infoWindow.contents,matches=contents.match(/\[\[[^\]]+\]\]/g);if(matches)for(var i=0,length=matches.length;length>i;i++){var expression=matches[i].replace(/\[\[/,"").replace(/\]\]/,"");try{contents=contents.replace(matches[i],eval(expression))}catch(e){expression="options."+expression,contents=contents.replace(matches[i],eval(expression))}}infoWindow.setContent(contents),infoWindow.open(scope.map,this)}}}}]),ngMap.directive("map",["Attr2Options","$parse","NavigatorGeolocation","GeoCoder","$compile",function(a,b,c,d){var e=new a;return{restrict:"AE",controller:["$scope",function(a){this.map=null,this.controls={},this.markers=[],this.shapes=[],this.infoWindows=[],this.initializeMap=function(a,b,f){var g=e.filter(f);a.google=google;var h=e.getOptions(g,a),i=e.getControlOptions(g);for(var j in i)j&&(h[j]=i[j]);var k=this,l=null;if(h.zoom||(h.zoom=15),h.center instanceof Array){var m=h.center[0],n=h.center[1];h.center=new google.maps.LatLng(m,n)}else l=h.center,delete h.center;for(var o in this.controls)o&&(h[o+"Control"]="false"===this.controls[o].enabled?0:1,delete this.controls[o].enabled,h[o+"ControlOptions"]=this.controls[o]);var p=document.createElement("div");p.style.width="100%",p.style.height="100%",b.prepend(p),k.map=new google.maps.Map(p,h),"string"==typeof l?d.geocode({address:l}).then(function(a){k.map.setCenter(a[0].geometry.location)}):h.center||c.getCurrentPosition().then(function(a){var b=a.coords.latitude,c=a.coords.longitude;k.map.setCenter(new google.maps.LatLng(b,c))});var q=e.getEvents(a,g);for(var r in q)r&&google.maps.event.addListener(k.map,r,q[r]);return a.map=k.map,k.map},this.addMarker=function(b){b.setMap(this.map),b.centered&&this.map.setCenter(b.position);var c=Object.keys(a.markers).length;a.markers[b.id||c]=b},this.initializeMarkers=function(){a.markers={};for(var b=0;b<this.markers.length;b++){var c=this.markers[b];this.addMarker(c)}return a.markers},this.initializeShapes=function(){a.shapes={};for(var b=0;b<this.shapes.length;b++){var c=this.shapes[b];c.setMap(this.map),a.shapes[c.id||b+1]=c}return a.shapes},this.initializeInfoWindows=function(){a.infoWindows={};for(var b=0;b<this.infoWindows.length;b++){var c=this.infoWindows[b];a.infoWindows[c.id||b+1]=c}return a.infoWindows}}],link:function(a,b,c,d){var e=d.initializeMap(a,b,c);a.$emit("mapInitialized",[e]);var f=d.initializeMarkers();a.$emit("markersInitialized",[f]);var g=d.initializeShapes();a.$emit("shapesInitialized",[g]);var h=d.initializeInfoWindows();a.$emit("infoWindowsInitialized",[h])}}}]),ngMap.directive("marker",["Attr2Options","GeoCoder","NavigatorGeolocation",function(a,b,c){var d=new a;return{restrict:"E",require:"^map",link:function(a,e,f,g){var h=new d.filter(f);a.google=google;var i=d.getOptions(h,a),j=d.getEvents(a,h),k=function(){var a=new google.maps.Marker(i);Object.keys(j).length>0;for(var b in j)b&&google.maps.event.addListener(a,b,j[b]);return a};if(i.position instanceof Array){var l=i.position[0],m=i.position[1];i.position=new google.maps.LatLng(l,m);var n=k();i.ngRepeat?g.addMarker(n):g.markers.push(n)}else if("string"==typeof i.position){var o=i.position;o.match(/^current/i)?c.getCurrentPosition().then(function(a){var b=a.coords.latitude,c=a.coords.longitude;i.position=new google.maps.LatLng(b,c);var d=k();g.addMarker(d)}):b.geocode({address:i.position}).then(function(a){var b=a[0].geometry.location;i.position=b;var c=k();g.addMarker(c)})}}}}]),ngMap.directive("shape",["Attr2Options",function(a){var b=new a,c=function(a){return a[0]&&a[0]instanceof Array?a.map(function(a){return new google.maps.LatLng(a[0],a[1])}):new google.maps.LatLng(a[0],a[1])},d=function(a){var b=c(a);return new google.maps.LatLngBounds(b[0],b[1])},e=function(a,b){switch(a){case"circle":return b.center=c(b.center),new google.maps.Circle(b);case"polygon":return b.paths=c(b.paths),new google.maps.Polygon(b);case"polyline":return b.path=c(b.path),new google.maps.Polyline(b);case"rectangle":return b.bounds=d(b.bounds),new google.maps.Rectangle(b);case"groundOverlay":case"image":var e=b.url,f=d(b.bounds),g={opacity:b.opacity,clickable:b.clickable};return new google.maps.GroundOverlay(e,f,g)}return null};return{restrict:"E",require:"^map",link:function(a,c,d,f){var g=b.filter(d),h=g.name;delete g.name;var i=b.getOptions(g),j=e(h,i);j&&f.shapes.push(j);var k=b.getEvents(a,g);for(var l in k)k[l]&&google.maps.event.addListener(j,l,k[l])}}}]),ngMap.provider("Attr2Options",function(){this.$get=function(){return function(){this.filter=function(a){var b={};for(var c in a)c.match(/^\$/)||(b[c]=a[c]);return b},this.getOptions=function(attrs,scope){var options={};for(var key in attrs)if(attrs[key]){if(key.match(/^on[A-Z]/))continue;if(key.match(/ControlOptions$/))continue;var val=attrs[key];try{var num=Number(val);if(isNaN(num))throw"Not a number";options[key]=num}catch(err){try{options[key]=JSON.parse(val)}catch(err2){if(val.match(/^[A-Z][a-zA-Z0-9]+\(.*\)$/))try{var exp="new google.maps."+val;options[key]=eval(exp)}catch(e){options[key]=val}else if(val.match(/^[A-Z][a-zA-Z0-9]+\.[A-Z]+$/))try{options[key]=scope.$eval("google.maps."+val)}catch(e){options[key]=val}else if(val.match(/^[A-Z]+$/))try{var capitializedKey=key.charAt(0).toUpperCase()+key.slice(1);options[key]=scope.$eval("google.maps."+capitializedKey+"."+val)}catch(e){options[key]=val}else options[key]=val}}}return options},this.getEvents=function(a,b){var c={},d=function(a){return"_"+a.toLowerCase()},e=function(b){var c=b.match(/([^\(]+)\(([^\)]*)\)/),d=c[1],e=c[2].replace(/event[ ,]*/,""),f=a.$eval("["+e+"]");return function(b){a[d].apply(this,[b].concat(f))}};for(var f in b)if(b[f]){if(!f.match(/^on[A-Z]/))continue;var g=f.replace(/^on/,"");g=g.charAt(0).toLowerCase()+g.slice(1),g=g.replace(/([A-Z])/g,d);var h=b[f];c[g]=new e(h)}return c},this.getControlOptions=function(a){var b={};for(var c in a)if(a[c]){if(!c.match(/(.*)ControlOptions$/))continue;var d=a[c],e=d.replace(/'/g,'"');e=e.replace(/([^"]+)|("[^"]+")/g,function(a,b,c){return b?b.replace(/([a-zA-Z0-9]+?):/g,'"$1":'):c});try{var f=JSON.parse(e);for(var g in f)if(f[g]){var h=f[g];if("string"==typeof h?h=h.toUpperCase():"mapTypeIds"===g&&(h=h.map(function(a){return google.maps.MapTypeId[a.toUpperCase()]})),"style"===g){var i=c.charAt(0).toUpperCase()+c.slice(1),j=i.replace(/Options$/,"")+"Style";f[g]=google.maps[j][h]}else f[g]="position"===g?google.maps.ControlPosition[h]:h}b[c]=f}catch(k){}}return b}}}}),ngMap.service("GeoCoder",["$q",function(a){return{geocode:function(b){var c=a.defer(),d=new google.maps.Geocoder;return d.geocode(b,function(a,b){b==google.maps.GeocoderStatus.OK?c.resolve(a):c.reject("Geocoder failed due to: "+b)}),c.promise}}}]),ngMap.service("NavigatorGeolocation",["$q",function(a){return{getCurrentPosition:function(){var b=a.defer();return navigator.geolocation?navigator.geolocation.getCurrentPosition(function(a){b.resolve(a)},function(a){b.reject(a)}):b.reject("Browser Geolocation service failed."),b.promise},watchPosition:function(){return"TODO"},clearWatch:function(){return"TODO"}}}]);
;
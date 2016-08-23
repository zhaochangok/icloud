// var todu=[
// 	{
// 		id:1,
// 		title:'新列表',
// 		list:[]
// 	}
// ]
var app=angular.module('app',[]);
app.controller('icloud',function($scope){
	if(getdate()==null){
		$scope.todu=[
			{
				id:1,
				title:'新列表',
				list:[]
			}
		];
		savedate($scope.todu)
	}
	$scope.todu=getdate();
	$scope.ids=0;
	$scope.index=0;
	$scope.leftadd=function(){
		$scope.ids=$scope.todu[$scope.todu.length-1].id+1;
		$scope.index=$scope.ids-1;
		var o={			
			id:$scope.ids,
			title:'新列表'+$scope.ids,
			list:[
			]
		};
		$scope.todu.push(o);
		$scope.flag=true;

		getNum();
	}
	$scope.flag=true;
	$scope.flags=function(){
		$scope.flag=!$scope.flag;
	}
	$scope.colors=['#CC73E1',"#60D836","#1BADF8","#F7C900","#A58861","#FF2A6B","#FF8100"]
	$scope.leftbg=function(aa){
		$scope.index=aa;
		$scope.flag=true;
		$scope.f=false;
		getNum();
	}
	$scope.adding=function(val,i,arr){
		return val.done==true?true:false;
	}
	$scope.doing=function(val,i,arr){
		return val.done==false?true:false;
	}
	getNum();
	function getNum(){
		$scope.getNum=0;
		angular.forEach($scope.todu[$scope.index].list,function(obj,i){
			if(obj.done==true){
				$scope.getNum++;
			}
		})
	}
	$scope.rightadd=function(){		
		$scope.todu[$scope.index].list.push({
			content:'',
			date:new Date().getTime(),
			done:false
		})
	}
	$scope.weiwan=function(v,type){
		v.done=type;
	}
	$scope.getTitle=function(){
		$scope.titles=$scope.todu[$scope.index].title;
		$scope.getcolor=$scope.colors[$scope.index%7];
		$scope.f=!$scope.f;
	}
	
	$scope.changecolor=function(i){
		$scope.getcolor=$scope.colors[i];
	}
	$scope.del=function(){
		$scope.todu.splice($scope.index,1);
		$scope.f=false;
		$scope.index=0;
		if($scope.index==-1){
			$scope.index=0;
		}
	}
	$scope.xzok=function(){
		$scope.todu[$scope.index].title=$scope.titles;
		$scope.colors[$scope.index]=$scope.getcolor;
		$scope.f=false;
	}
	$scope.xzqx=function(){
		$scope.f=false;
	}
	$scope.f2=true;
	$scope.focus=function(){
		$scope.f2=false;
		if($scope.filt.length==0){
			$scope.f2=true;
		}
	}
	$scope.sousuox=function(){
		$scope.f2=true;
		$scope.filt='';
	}

	$scope.boxi=0;
	$scope.$watch("todu",function(){
		getNum();
		savedate($scope.todu);
	},true)

})


function getdate(){
	var date=JSON.parse(localStorage.getItem("todu"));
	return date;
}
function savedate(dat){
	var date=JSON.stringify(dat);
	localStorage.setItem("todu",date)
}
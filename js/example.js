        var TREE = angular.module('tree', ['ui.bootstrap', 'customServices']);
        TREE.controller('table', function ($scope, $http, dataTaken) {
			$scope.forbidden1 = false;//禁用图标的样式控制
            $scope.forbidden2 = false;//禁用图标的样式控制
            $scope.selectArray = [];
            $scope.Tem = {};
            $scope.tabs = [
                            { title: '全国', content: {}, pid: {}, show: true },
                            { title: '', content: {}, pid: {}, show: false, num: '', disable: false },
                            { title: '', content: {}, pid: {}, show: false, num: '', disable: false }
            ];
            $scope.select0 = function () {
                $scope.tabs[1].show = false;
                $scope.tabs[2].show = false;
                // 这个时候请求数据，并加载到tabs[0].content中
                 dataTaken.getData('cities.json')
                .success(function (response) {
                    angular.forEach(response[90], function (value) {//中国默认行政区号是90，第一页打开是90
                        $scope.tabs[0].content[value.text] = '';
                        $scope.tabs[0].pid[value.text] = value.id;
                    })
                    $scope.checkSelected0();
                })
                .error(function () {
                    alert('数据加载失败')
                })
               //原来是这么写的，后来封装了服务，如上边那样调用
                //$http({
                //    method: 'GET',
                //    url: 'Action/BindTranDivisionDataByPID.ashx?pid=90'
                //}).then(function successCallback(response) {
                //    console.log(response)
                //    angular.forEach(response.data, function (value) {
                //        $scope.tabs[0].content[value.text] = '';
                //        $scope.tabs[0].pid[value.text] = value.id;
                //    })
                //    $scope.checkSelected0();
                //}, function errorCallback(response) {
                //    alert('error')
                //});
            }
            $scope.select1 = function () {
                $scope.tabs[2].show = false;
                $scope.checkSelected1();
            }
            $scope.show1 = function (index) {
                $scope.active = 1;
                $scope.tabs[1].show = true;
                $scope.tabs[1].title = index;
                // 这个时候请求数据，并加载到tabs[1].content中  
                //先清空content和pid
                $scope.tabs[1].content = {};
                $scope.tabs[1].pid = {};
                dataTaken.getData('cities.json')
                .success(function (response) {
                    angular.forEach(response[$scope.tabs[0].pid[index]], function (value) {//请求其实这里不用请求的，但是，为了模拟还是在请求一次，然后把id传进去，遍历
                        $scope.tabs[1].content[value.text] = '';
                        $scope.tabs[1].pid[value.text] = value.id;
                    })
                    $scope.checkSelected1();
                })
                .error(function () {
                    alert('数据加载失败')
                })
            }
            $scope.show2 = function (index) {
				if($scope.tabs[1].disable==false){
					$scope.forbidden1=false;
					$scope.active = 2;
					$scope.tabs[2].show = true;
					$scope.tabs[2].title = index;

					$scope.tabs[2].content = {};
					$scope.tabs[2].pid = {};
					$scope.tabs[2].num = "";
					dataTaken.getData('cities.json')
					.success(function (response) {
						angular.forEach(response[$scope.tabs[1].pid[index]], function (value) {
							$scope.tabs[2].content[value.text] = 'text-primary';
							$scope.tabs[2].pid[value.text] = value.id;
						})
						$scope.checkSelected2();
					})
					.error(function () {
						alert('数据加载失败')
					})
				}
                
            }
            $scope.checkSelected0 = function () {
                for (j in $scope.tabs[0].content) {
                    $scope.tabs[0].content[j] = '';
                }
                //根据selectarray中的数据（id)的前2位与tabs0中id进行对比。如果一样，加样式
                angular.forEach($scope.selectArray, function (value, key) {
                    var provId = String(value[1]).substr(0, 2)
                    for (i in $scope.tabs[0].pid) {
                        if ($scope.tabs[0].pid[i] == provId) {
                            $scope.tabs[0].content[i]++;
                        }
                    }
                })
            }
            $scope.checkSelected1 = function () {
				$scope.tabs[1].disable=false;
				$scope.forbidden1=false;
                //angular.forEach($scope.tabs[1].content, function (value, key) {
                //    value = 0;
                //})为嘛这不行，我操类
                //将tabs【1】content中的数据清空，重新赋值
                for (j in $scope.tabs[1].content) {
                    $scope.tabs[1].content[j] = '';
                }
				//判断是否被全选了
                /*angular.forEach($scope.selectArray, function (value,key) {
					if(value[1]/100<1){//因为省级单位都是两位数，所以先判断一下是不是两位数
						if(value[1]!=$scope.tabs[0].pid[$scope.tabs[1].title]){
							$scope.tabs[1].disable=false;// 卧槽执行两边
							continue;
						}
					}
				})*/
				for (var i=0;i<$scope.selectArray.length;i++ )
				{
					if($scope.selectArray[i][1]/100<1){//因为省级单位都是两位数，所以先判断一下是不是两位数
						if($scope.selectArray[i][1]==$scope.tabs[0].pid[$scope.tabs[1].title]){
							$scope.tabs[1].disable=true;// 卧槽执行两边
							$scope.forbidden1=true;
							return;
						}
					}
				}
				
                //根据selectarray中的数据（id)的前四位与tabs1中id进行对比。如果一样，加样式
                angular.forEach($scope.selectArray, function (value) {
                    angular.forEach($scope.tabs[1].pid, function (value1, key1) {
                        if (value1 == String(value[1]).substr(0, 4)) {
                            $scope.tabs[1].content[key1]++;
                        }
                    })
                })
            }
            $scope.checkSelected2 = function () {
                //先检查是不是被全选了，即判断是不是选中了title，如果选中就不用判断子项
                var isAllin = false;
                for (var i = 0; i < $scope.selectArray.length; i++) {
                    if ($scope.selectArray[i][0] == $scope.tabs[2].title) {
                        isAllin = true;
                        $scope.tabs[2].num = 1;
                    }
                }
                if (isAllin) {
                    $scope.forbidden2 = true;
                    $scope.tabs[2].disable = true;
                } else {
                    $scope.forbidden2 = false;
                    $scope.tabs[2].disable = false;
                    for (var i = 0; i < $scope.selectArray.length; i++) {
                        angular.forEach($scope.tabs[2].content, function (value, key) {
                            if ($scope.selectArray[i][0] == key) {
                                $scope.tabs[2].content[key] = 'bg-primary';
                                $scope.tabs[2].num++;
                            }
                        })
                    }
                }
            }
            $scope.pushInArray = function (key) {
                if ($scope.tabs[2].disable == false) {
                    if ($scope.isThere(key)) {
                        //因为这里传的key是个值，而删除的时候智能删值对应的index，so 循环一下找到对应的index
                        for (var i = 0; i < $scope.selectArray.length; i++) {
                            if ($scope.selectArray[i][0] == key) {
                                $scope.removeItem(i, key);
                            }
                        }
                    } else {
                        $scope.selectArray.push([key, $scope.tabs[2].pid[key]]);
                        $scope.tabs[2].num++;
                        $scope.tabs[2].content[key] = 'bg-primary';
                    }
                }
            }
            $scope.removeItem = function (index, i) {//index是数组的index，i是数组的值
                $scope.selectArray.splice(index, 1)
                for (t in $scope.tabs[2].content) {
                    if (t = i) {
                        $scope.tabs[2].content[t] = 'text-primary';
                    }
                }
                //删除以后需要减tabs的num，如果为0，付给其空字符串不占位置
                if ($scope.tabs[2].num == 1) {
                    $scope.tabs[2].num = ''
                } else {
                    $scope.tabs[2].num--
                }
                if (i == $scope.tabs[2].title) {
                    $scope.tabs[2].disable = !$scope.tabs[2].disable;
                    $scope.forbidden2 = !$scope.forbidden2;
                }
                $scope.checkSelected0();
                $scope.checkSelected1();
            }
            // 判断点击的值(县城名字）是不是已经被选择了（是不是已加入selectarray数组），that参数，传入要比较的值
            $scope.isThere = function (that) {
                for (var i = 0; i < $scope.selectArray.length; i++) {
                    if ($scope.selectArray[i][0] == that) {
                        return true;
                    }
                }
                return false;
            }
            $scope.replaceAll1 = function () {
                var targetNum=$scope.tabs[0].pid[$scope.tabs[1].title];
				//其实我也不知道为啥正向写不行。搞死人正向反正就是不行
                
				 if ($scope.isThere($scope.tabs[1].title)) {
					for(var i=$scope.selectArray.length-1;i>=0;i--){
						if(String($scope.selectArray[i][1]).substr(0,2)==targetNum){
							$scope.removeItem(i)
							
						}
					}
					$scope.tabs[1].disable=false;
					$scope.forbidden1=false;
                } else {
					for(var i=$scope.selectArray.length-1;i>=0;i--){
						if(String($scope.selectArray[i][1]).substr(0,2)==targetNum){
							$scope.removeItem(i)
							
						}
					}
                    $scope.selectArray.push([$scope.tabs[1].title, $scope.tabs[0].pid[$scope.tabs[1].title]]);
                    //$scope.tabs[2].num++;
					$scope.tabs[1].disable=true;
					$scope.forbidden1=true;
                }
				
            }          
			/*$scope.replaceAll1 = function () {
                var targetNum=$scope.tabs[0].pid[$scope.tabs[1].title];
				//其实我也不知道为啥正向写不行。搞死人正向反正就是不行
                for(var i=$scope.selectArray.length-1;i>=0;i--){
                    if(String($scope.selectArray[i][1]).substr(0,2)==targetNum){
                        $scope.removeItem(i)
                        
                    }
                }
				 if ($scope.isThere($scope.tabs[1].title)) {
                    for (var i = 0; i < $scope.selectArray.length; i++) {
                        if ($scope.selectArray[i][0] == $scope.tabs[1].title) {
                            $scope.removeItem(i);
                        }
                    }
                } else {
                    $scope.selectArray.push([$scope.tabs[1].title, $scope.tabs[0].pid[$scope.tabs[1].title]]);
                    //$scope.tabs[2].num++;
                }
				$scope.tabs[1].disable=true;
				//$scope.forbidden1=true;
            }*/
            $scope.replaceAll2 = function () {
                // 把selectarray这个选中的数组和content这个完整的数组分别循环，然后找到相同的值，在selectarray里边给删了
                for (j in $scope.tabs[2].content) {
                    for (var i = 0; i < $scope.selectArray.length; i++) {
                        if (j == $scope.selectArray[i][0]) {
                            $scope.removeItem(i);
                        }
                    }
                    //$scope.tabs[2].content[j]='text-primary';
                }
                for (j in $scope.tabs[2].content) {
                    $scope.tabs[2].content[j] = 'text-primary';
                }
                $scope.tabs[2].disable = !$scope.tabs[2].disable;//这是个控制click事件是否可用的开关
                $scope.forbidden2 = !$scope.forbidden2; //这是给他禁用样式改变的开关
                //然后判断一下这个父级区域是否已被选，被选了就删了，没被选就添加上
                if ($scope.isThere($scope.tabs[2].title)) {
                    for (var i = 0; i < $scope.selectArray.length; i++) {
                        if ($scope.selectArray[i][0] == $scope.tabs[2].title) {
                            $scope.removeItem(i);
                        }
                    }
                } else {
                    $scope.selectArray.push([$scope.tabs[2].title, $scope.tabs[1].pid[$scope.tabs[2].title]]);
                    $scope.tabs[2].num++;
                }
            }


        });
        angular.module('customServices',[])
       .service('dataTaken', function ($http) {
           return {
               getData: function (url) {
                   return $http.get(url)
               }
           }
       })
  
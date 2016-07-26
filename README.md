# three-level-linkage(三级联动)

it's a component to build the three-level-linkage webpage,it may be used to orangise the relationship of the province city and country just as the example.the advantages of it comparing with its similarities are the nice surface, friendly interaction ,multiSelect and parent-node-select. 

这是一个三级联动的小组件，可以用它来组织像省市县这种关系的HTML页面结构。它和其他的插件不同的地方就是，样式好看，交互友好，还可以多选以及选取父级节点。

it can be used to show your linked static data by handling the cities.json in the master,you can alse let your back-end partners to write a api,which is more convenient(if you used api,just forget the cities.json)

它可以通过cities.json的操作用来静态的展示三级的联动数据，也可以让你的后端小伙伴来帮你写个接口，直接请求接口更方便。（如果你有后台接口可以完全抛弃cities.json）

if you want exhibit the data bg cities.json,you can ask for it just like below(如果你是静态的请求cities.json，你可以酱紫)
```sh
//example.js
dataTaken.getData('cities.json')//方法在下边的service里边定义
.success(function (response) {
    angular.forEach(response[$scope.tabs[0].pid[index]], function (value) 
    //$scope.tabs[0].pid[index]是取json里边对应的值进行操作
        $scope.tabs[1].content[value.text] = '';
        $scope.tabs[1].pid[value.text] = value.id;
    })
    $scope.checkSelected1();
})
```
fortunately if you have api written bg your colleague,you can ask for it like that(如果有后台小伙伴帮你写接口，你可以酱紫)
```sh
//example.js
dataTaken.getData($scope.tabs[0].pid[index])
//这里index是参数咯，$scope.tabs[0].pid[index]就是取它的id，作为参数进行api，人家接口就是这么写的
.success(function (response) {
    angular.forEach(response, function (value) {
        $scope.tabs[1].content[value.text] = '';
        $scope.tabs[1].pid[value.text] = value.id;
    })
    $scope.checkSelected1();
})
```
once your request is successful,and your $scope.tabs is contain exact data,this  component starts up
如果您请求成功，并且js中的 $scope.tabs填入正确的数据，这个插件就会正常的工作。

the normal looking just like that

![success look](/img/success.png "cool ？")

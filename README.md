# three-level-linkage(��������)

it's a component to build the three-level-linkage webpage,it may be used to orangise the relationship of the province city and country just as the example.the advantages of it comparing with its similarities are the nice surface, friendly interaction ,multiSelect and parent-node-select. 

����һ������������С�����������������֯��ʡ�������ֹ�ϵ��HTMLҳ��ṹ�����������Ĳ����ͬ�ĵط����ǣ���ʽ�ÿ��������Ѻã������Զ�ѡ�Լ�ѡȡ�����ڵ㡣

it can be used to show your linked static data by handling the cities.json in the master,you can alse let your back-end partners to write a api,which is more convenient(if you used api,just forget the cities.json)

������ͨ��cities.json�Ĳ���������̬��չʾ�������������ݣ�Ҳ��������ĺ��С���������д���ӿڣ�ֱ������ӿڸ����㡣��������к�̨�ӿڿ�����ȫ����cities.json��

if you want exhibit the data bg cities.json,you can ask for it just like below(������Ǿ�̬������cities.json������Խ���)
```sh
//example.js
dataTaken.getData('cities.json')//�������±ߵ�service��߶���
.success(function (response) {
    angular.forEach(response[$scope.tabs[0].pid[index]], function (value) 
    //$scope.tabs[0].pid[index]��ȡjson��߶�Ӧ��ֵ���в���
        $scope.tabs[1].content[value.text] = '';
        $scope.tabs[1].pid[value.text] = value.id;
    })
    $scope.checkSelected1();
})
```
fortunately if you have api written bg your colleague,you can ask for it like that(����к�̨С������д�ӿڣ�����Խ���)
```sh
//example.js
dataTaken.getData($scope.tabs[0].pid[index])
//����index�ǲ�������$scope.tabs[0].pid[index]����ȡ����id����Ϊ��������api���˼ҽӿھ�����ôд��
.success(function (response) {
    angular.forEach(response, function (value) {
        $scope.tabs[1].content[value.text] = '';
        $scope.tabs[1].pid[value.text] = value.id;
    })
    $scope.checkSelected1();
})
```
once your request is successful,and your $scope.tabs is contain exact data,this  component starts up
���������ɹ�������js�е� $scope.tabs������ȷ�����ݣ��������ͻ������Ĺ�����

the normal looking just like that

![success look](/img/success.png "cool ��")

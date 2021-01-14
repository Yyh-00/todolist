$(function() {
    load();
    // keydown事件不要写错，最后一个是n！
    $("#title").on("keydown", function(event) {
        if (event.keyCode === 13) {
            if ($(this).val() === "") {
                // 启用bootstrap中的模态框
                // $('#myModal').modal();
                alert("请输入您要的操作")
            } else {
                // 先得到本地存储中的数据，在把输入的内容放到新的数组中，然后在把新数组
                // 存储进本地存储
                var local = getData();
                local.push({ title: $(this).val(), done: false })
                saveData(local);
                // 渲染页面
                load();
                // 把input里面的数据清空
                $(this).val("");
            }
        }
    });
    // todolist正在进行和已完成选项操作
    $("ol, ul").on("click", "input", function() {
        var data = getData();
        var index = $(this).siblings("a").attr("id");
        console.log(index);
        data[index].done = $(this).prop("checked");
        console.log(data);
        saveData(data);
        load();
    });
    // 封装函数得到本地存储中的数据
    function getData() {
        var data = localStorage.getItem("todolist");
        if (data !== null) {
            // 本地存储里的数据是字符串格式的，我们需要的是对象格式的
            return JSON.parse(data);
        } else {
            return [];
        }
    };
    // 封装函数保存数据到本地存储
    function saveData(data) {
        // 把需要的数据转换为字符串格式的在存储进本地存储里面
        localStorage.setItem("todolist", JSON.stringify(data));
    };
    // 封装函数将本地存储中的数据渲染在页面上
    function load() {
        var data = getData();
        // console.log(data);
        // 先清空ol,ul里的内容
        $("ol,ul").empty();
        var todocount = 0; //正在进行的个数
        var donecount = 0; //已经完成的个数
        // 遍历这个数据
        $.each(data, function(i, ele) {
            if (ele.done) {
                // 复选框上的对勾需要自己写，checked=checked；
                $("ul").prepend("<li><input type='checkbox' checked='checked'><p>" + ele.title + "</p><a href='javascript:;'id=" + i + "></a></li>")
                donecount++;
            } else {
                $("ol").prepend("<li><input type='checkbox'><p>" + ele.title + "</p><a href='javascript:;'id=" + i + "></a></li>")
                todocount++;
            }
        })
        $("#todocount").text(todocount);
        $("#donecount").text(donecount);
    };
    // 点击右侧圆圈删除本条记录,删除操作
    $("ol,ul").on("click", "a", function() {
        // alert("11");
        var data = getData();
        // 获取a的自定义属性
        var index = $(this).attr('id');
        // console.log(index);
        // 删除数组中对应序列号的数据
        data.splice(index, 1);
        // 保存到本地存储
        saveData(data);
        // 重新渲染
        load();
    });


})
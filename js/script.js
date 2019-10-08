var Confirm = /** @class */ (function () {

    
    function Confirm(_vals) {
        this.vals = _vals;
    }
    Confirm.prototype.init = function () {
        this.vuePage = new Vue({
            el: "#Confirm",
            data: {}
        });
        $('.socalledChoose').on('click', function () {
            $('.socalledBox').addClass('active');
        });
        $('.socalledBox .text').on('click', function (ele) {
            $('.socalledChoose .text').text($(ele.currentTarget).text());
            $('.socalledBox').removeClass('active');
        });
        // $('.schoolChoose').on('click', function () {
        //     $('.schoolBox').addClass('active');
        // });
        // $('.schoolBox .text').on('click', function (ele) {
        //     $('.schoolChoose .text').text($(ele.currentTarget).text());
        //     $('.schoolBox').removeClass('active');
        // });
       
        //確認條款
        $('.terms .btn-Y').on('click', function () {
            
            // alert(lineid);
            if ($('#inputCheck1').prop('checked') && $('#inputCheck2').prop('checked')) {
                $('.terms').removeClass('active');
                $('.bind').addClass('active');
                $('.outer').addClass('BGimg');
                $('.terms .warning').hide();

                // $('.addKids').addClass('active');
                //         $('.outer').addClass('BGimg');
                //         $('.bind').removeClass('active');
                // $('.addKids').addClass('active');
                //             $('.outer').addClass('BGimg');
                //             $('.bind').removeClass('active');
            }
            else {
                $('.terms .warning').show();
            }
        });
        //註冊帳號 需身分證字號存在
        $('.bind .btn-Y').on('click', function () {
            var lineid = "";
            liff.init(
                data => {
                 // Now you can call LIFF API
                 lineid = data.context.userId;
                },
                err => {
                 // LIFF initialization failed
                }
            );
            var r=confirm("確定註冊帳號嗎?")
            if (r==true){
                $.ajax({
                    url: 'https://scampus.yunlin.gov.tw/FRONTAPI/Api/Register',
                    //url: 'https://localhost:44330/Api/Register',
                    contentType: 'application/json',
                    type: 'Post',
                    data: JSON.stringify({ 
                      ParentName:$("#ParentName").val(),
                      IdentityCardNumber:$("#IdentityCardNumber").val(),
                      MobileNumber:$("#MobileNumber").val(),
                      SoCalled:$(".socalledChoose .text").html(),
                      LineId: lineid ,
                    }),
                    error: function (xhr) {
                        alert('Ajax request 發生錯誤');
                    },
                    success: function (response) {

                        if(response.returnCode ==  4 ){
                            $("#alerttext").html(response.message);
                            return;
                        }

                        if(response.returnCode ==  0 ){
                            alert('註冊成功');
                            $('.addKids').addClass('active');
                            $('.outer').addClass('BGimg');
                            $('.bind').removeClass('active');
                            // if(alert('感謝您 註冊成功')){
                            //     $('.addKids').addClass('active');
                            //     $('.outer').addClass('BGimg');
                            //     $('.bind').removeClass('active');
                            // }
                        }
                        
                    },
                    complete: function(response) {
                    }
                });
            }
            else{
            }
           
            // $('.bind').removeClass('active');
            // $('.addKids').addClass('active');
        });
        var texgroup = 2;
        $('.add').on('click', function () {
                $('.inputBox').append('<br> <span class="text title">第'+texgroup+'張卡片</span>')
                $('.inputBox').append('<input id="Card'+texgroup+'" maxlength="10" type="text" placeholder="1234567890" />');
                $('.inputBox').append('<input id="Birth'+texgroup+'" maxlength="10" type="text" placeholder="2014/10/26" />');
                texgroup += 1;
                if(texgroup == 4){
                    $(".add").hide();
                }
        });

        $('.addKids .btn-Y').on('click', function(){
            
            if($("#Card1").val() =="" ){
                    alert("請輸入第1張卡 號碼");
                    return;
                }
                if($("#Birth1").val() =="" ){
                    alert("請輸入第1張卡 生日");
                    return;
    
                }
                if($("#Card1").val().length != 10 ){
                    alert("第1張卡 號碼格式不正確");
                    return;
    
                }
                if($("#Birth1").val().length != 10 ){
                    alert("第1張卡 生日格式不正確");
                    return;
    
                }
            var r=confirm("確定綁定以上卡片嗎?")
            if (r==true){
                var lineid = "";
                liff.init(
                    data => {
                    // Now you can call LIFF API
                    lineid = data.context.userId;
                    },
                    err => {
                    // LIFF initialization failed
                    }
                );
                $.ajax({
                    url: 'https://scampus.yunlin.gov.tw/FRONTAPI/Api/BindCard',
                    //url: 'https://localhost:44330/Api/BindCard',
                    contentType: 'application/json',
                    type: 'Post',
                    data: JSON.stringify(
                    { 
                      LineId: lineid,
                      Group1: {
                        CardNum:$("#Card1").val(),
                        BirthDate:$("#Birth1").val(),
                      },
                      Group2: {
                        CardNum:$("#Card2").val(),
                        BirthDate:$("#Birth2").val(),
                      },
                      Group3: {
                        CardNum:$("#Card3").val(),
                        BirthDate:$("#Birth3").val(),
                      },
                    }),
                    error: function (xhr) {
                        alert('Ajax request 發生錯誤');
                    },
                    success: function (response) {
                        if(response.returnCode == 4){
                            alert(response.message);
                        }
                        if(response.returnCode == 0){
                            alert(response.message);
                            liff.closeWindow();
                        }
                    },
                    complete: function(response) {
                    }
                });
            }else{

            }
           

            
        });

        

        if (location.hash == '#add') {
            $('.addKids').addClass('active');
            $('.outer').addClass('BGimg');
        }
        else {
            $('.terms').addClass('active');
        }
    };
    return Confirm;
}());
var Diary = /** @class */ (function () {

    function Diary(_vals) {
        this.vals = _vals;
    }
    Diary.prototype.init = function () {
        
        this.vuePage = new Vue({
            el: "#Diary",
            data: {
                calender: {
                    year: -1,
                    month: -1,
                    day: -1,
                    monthDays: -1,
                    initDate: new Date(),
                    today: new Date(),
                    start: "",
                    end: "",
                    confirmStart: "",
                    confirmEnd: "",
                    confirmStartStr: "",
                    confirmEndStr: "",
                    monthArr: [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
                    weekStr: ["日", "一", "二", "三", "四", "五", "六"]
                },
                daily: [
                    {
                        "arrive": true,
                        "leave": true,
                        "consume": true,
                        "recycle": true
                    },
                    {
                        "arrive": true,
                        "leave": true,
                        "consume": true,
                        "recycle": true
                    },
                    {
                        "arrive": false,
                        "leave": false,
                        "consume": false,
                        "recycle": false
                    },
                    {
                        "arrive": false,
                        "leave": false,
                        "consume": false,
                        "recycle": false
                    },
                    {
                        "arrive": true,
                        "leave": true,
                        "consume": true,
                        "recycle": true
                    },
                    {
                        "arrive": true,
                        "leave": true,
                        "consume": true,
                        "recycle": true
                    },
                    {
                        "arrive": false,
                        "leave": false,
                        "consume": false,
                        "recycle": false
                    },
                    {
                        "arrive": false,
                        "leave": false,
                        "consume": false,
                        "recycle": false
                    },
                    {
                        "arrive": false,
                        "leave": false,
                        "consume": false,
                        "recycle": false
                    },
                    {
                        "arrive": false,
                        "leave": false,
                        "consume": false,
                        "recycle": false
                    },
                    {
                        "arrive": false,
                        "leave": false,
                        "consume": false,
                        "recycle": false
                    },
                    {
                        "arrive": false,
                        "leave": false,
                        "consume": false,
                        "recycle": false
                    },
                    {
                        "arrive": false,
                        "leave": false,
                        "consume": false,
                        "recycle": false
                    },
                    {
                        "arrive": false,
                        "leave": false,
                        "consume": false,
                        "recycle": false
                    },
                    {
                        "arrive": false,
                        "leave": false,
                        "consume": false,
                        "recycle": false
                    },
                    {
                        "arrive": false,
                        "leave": false,
                        "consume": false,
                        "recycle": false
                    },
                    {
                        "arrive": false,
                        "leave": false,
                        "consume": false,
                        "recycle": false
                    },
                    {
                        "arrive": false,
                        "leave": false,
                        "consume": false,
                        "recycle": false
                    },
                    {
                        "arrive": false,
                        "leave": false,
                        "consume": false,
                        "recycle": false
                    },
                    {
                        "arrive": false,
                        "leave": false,
                        "consume": false,
                        "recycle": false
                    },
                    {
                        "arrive": false,
                        "leave": false,
                        "consume": false,
                        "recycle": false
                    },
                    {
                        "arrive": false,
                        "leave": false,
                        "consume": false,
                        "recycle": false
                    },
                    {
                        "arrive": false,
                        "leave": false,
                        "consume": false,
                        "recycle": false
                    },
                    {
                        "arrive": false,
                        "leave": false,
                        "consume": false,
                        "recycle": false
                    },
                    {
                        "arrive": false,
                        "leave": false,
                        "consume": false,
                        "recycle": false
                    },
                    {
                        "arrive": false,
                        "leave": false,
                        "consume": false,
                        "recycle": false
                    },
                    {
                        "arrive": false,
                        "leave": false,
                        "consume": false,
                        "recycle": false
                    },
                    {
                        "arrive": false,
                        "leave": false,
                        "consume": false,
                        "recycle": false
                    },
                    {
                        "arrive": false,
                        "leave": false,
                        "consume": false,
                        "recycle": false
                    },
                    {
                        "arrive": false,
                        "leave": false,
                        "consume": false,
                        "recycle": false
                    },
                    {
                        "arrive": false,
                        "leave": false,
                        "consume": false,
                        "recycle": false
                    }
                ]
            },
            methods: {
                setDate: function (n) {
                    var i = 1;
                    var j = this.calender.month == 0 ? this.calender.monthArr[11] : this.calender.monthArr[this.calender.month - 1];
                    if (n < this.calender.day) {
                        return j - (this.calender.day - n) + 1;
                    }
                    else if (n < this.calender.day + this.calender.monthDays) {
                        return n - this.calender.day + 1;
                    }
                    else {
                        return n - (this.calender.day + this.calender.monthDays) + 1;
                    }
                },
                setDateClass: function (n) {
                    var i = 1;
                    var j = this.calender.month == 0 ? this.calender.monthArr[11] : this.calender.monthArr[this.calender.month - 1];
                    if (n < this.calender.day || n >= this.calender.day + this.calender.monthDays) {
                        return "disabled";
                    }
                },
                setTypeClass: function (n) {
                    var str = '';
                    var today = new Date();
                    if (n >= this.calender.day && n < this.calender.day + this.calender.monthDays) {
                        if (this.daily[n - this.calender.day]["arrive"]) {
                            str += 'arrive ';
                        }
                        if (this.daily[n - this.calender.day]["leave"]) {
                            str += 'leave ';
                        }
                        if (this.daily[n - this.calender.day]["consume"]) {
                            str += 'consume ';
                        }
                        if (this.daily[n - this.calender.day]["recycle"]) {
                            str += 'recycle ';
                        }
                        if ((n - this.calender.day + 1) == today.getDate() && this.calender.month == today.getMonth() && this.calender.year == today.getFullYear()) {
                            str += 'today ';
                        }
                        return str;
                    }
                }
            }
        });
        this.setCalender();
        $('.calendar .dateBox li').on('click', function (ele) {
            if ($(ele.currentTarget).children('.text').hasClass('arrive') || $(ele.currentTarget).children('.text').hasClass('leave') || $(ele.currentTarget).children('.text').hasClass('consume') || $(ele.currentTarget).children('.text').hasClass('recycle')) {
                $('.calenderBottom').addClass('active');
                $('.inner.diary').addClass('detailMode');
                $('.calenderBottom').animate({ 'top': '-190px' }, 500);
            }
            
        });
        $('.diary .backBtn').on('click', function () {
            $('.calenderBottom').animate({ 'top': '0' }, 500);
            $('.inner.diary').removeClass('detailMode');
            setTimeout(function () {
                $('.calenderBottom').removeClass('active');
            }, 500);
        });
    };
    
     
    Diary.prototype.setCalender = function () {
        this.vuePage.$data["calender"]["initDate"].setDate(1);
        this.vuePage.$data["calender"]["year"] = this.vuePage.$data["calender"]["initDate"].getFullYear();
        this.vuePage.$data["calender"]["month"] = this.vuePage.$data["calender"]["initDate"].getMonth();
        this.vuePage.$data["calender"]["day"] = this.vuePage.$data["calender"]["initDate"].getDay();
        if (this.vuePage.$data["calender"]["month"] != 2) {
            this.vuePage.$data["calender"]["monthDays"] = this.vuePage.$data["calender"]["monthArr"][this.vuePage.$data["calender"]["month"]];
        }
        else {
            if (this.leapYear(this.vuePage.$data["calender"]["year"])) {
                this.vuePage.$data["calender"]["monthArr"][1] = 29;
                this.vuePage.$data["calender"]["monthDays"] = 29;
            }
            else {
                this.vuePage.$data["calender"]["monthArr"][1] = 28;
                this.vuePage.$data["calender"]["monthDays"] = 28;
            }
        }
    };
    Diary.prototype.prevMonth = function () {
        this.vuePage.$data["calender"]["initDate"].setMonth(this.vuePage.$data["calender"]["initDate"].getMonth() - 1);
        this.setCalender();
        
    };
    Diary.prototype.nextMonth = function () {
        this.vuePage.$data["calender"]["initDate"].setMonth(this.vuePage.$data["calender"]["initDate"].getMonth() + 1);
        this.setCalender();
    };
    Diary.prototype.leapYear = function (year) {
        if ((year % 4 == 0 && year % 100 != 0) || year % 400 == 0) {
            return true;
        }
        else {
            return false;
        }
    };
    return Diary;
}());
var Student = /** @class */ (function () {
    function Student(_vals) {
        this.vals = _vals;
    }
    var lineid ="";
    window.onload = function (e) {
        liff.init(function (data) {
            lineid = data.context.userId;
            console.log(lineid);
        });
    };
    
    Student.prototype.init = function () {
        
        var _this = this;
        this.vuePage = new Vue({
            el: "#Student",
            data: {
                calender: {
                    year: -1,
                    month: -1,
                    day: -1,
                    monthDays: -1,
                    initDate: new Date(),
                    today: new Date(),
                    start: "",
                    end: "",
                    confirmStart: "",
                    confirmEnd: "",
                    confirmStartStr: "",
                    confirmEndStr: "",
                    monthArr: [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
                    weekStr: ["日", "一", "二", "三", "四", "五", "六"]
                },
                type: 1,
                daily: [
                    {
                        "arrive": true,
                        "leave": true,
                        "consume": true,
                        "recycle": true
                    },
                    {
                        "arrive": true,
                        "leave": true,
                        "consume": true,
                        "recycle": true
                    },
                    {
                        "arrive": false,
                        "leave": false,
                        "consume": false,
                        "recycle": false
                    },
                    {
                        "arrive": false,
                        "leave": false,
                        "consume": false,
                        "recycle": false
                    },
                    {
                        "arrive": true,
                        "leave": false,
                        "consume": false,
                        "recycle": false
                    },
                    {
                        "arrive": false,
                        "leave": false,
                        "consume": false,
                        "recycle": false
                    },
                    {
                        "arrive": false,
                        "leave": false,
                        "consume": false,
                        "recycle": false
                    },
                    {
                        "arrive": false,
                        "leave": false,
                        "consume": false,
                        "recycle": false
                    },
                    {
                        "arrive": false,
                        "leave": false,
                        "consume": false,
                        "recycle": false
                    },
                    {
                        "arrive": false,
                        "leave": false,
                        "consume": false,
                        "recycle": false
                    },
                    {
                        "arrive": false,
                        "leave": false,
                        "consume": false,
                        "recycle": false
                    },
                    {
                        "arrive": false,
                        "leave": false,
                        "consume": false,
                        "recycle": false
                    },
                    {
                        "arrive": false,
                        "leave": false,
                        "consume": false,
                        "recycle": false
                    },
                    {
                        "arrive": false,
                        "leave": false,
                        "consume": false,
                        "recycle": false
                    },
                    {
                        "arrive": false,
                        "leave": false,
                        "consume": false,
                        "recycle": false
                    },
                    {
                        "arrive": false,
                        "leave": false,
                        "consume": false,
                        "recycle": false
                    },
                    {
                        "arrive": false,
                        "leave": false,
                        "consume": false,
                        "recycle": false
                    },
                    {
                        "arrive": false,
                        "leave": false,
                        "consume": false,
                        "recycle": false
                    },
                    {
                        "arrive": false,
                        "leave": false,
                        "consume": false,
                        "recycle": false
                    },
                    {
                        "arrive": false,
                        "leave": false,
                        "consume": false,
                        "recycle": false
                    },
                    {
                        "arrive": false,
                        "leave": false,
                        "consume": false,
                        "recycle": false
                    },
                    {
                        "arrive": false,
                        "leave": false,
                        "consume": false,
                        "recycle": false
                    },
                    {
                        "arrive": false,
                        "leave": false,
                        "consume": false,
                        "recycle": false
                    },
                    {
                        "arrive": false,
                        "leave": false,
                        "consume": false,
                        "recycle": false
                    },
                    {
                        "arrive": false,
                        "leave": false,
                        "consume": false,
                        "recycle": false
                    },
                    {
                        "arrive": false,
                        "leave": false,
                        "consume": false,
                        "recycle": false
                    },
                    {
                        "arrive": false,
                        "leave": false,
                        "consume": false,
                        "recycle": false
                    },
                    {
                        "arrive": false,
                        "leave": false,
                        "consume": false,
                        "recycle": false
                    },
                    {
                        "arrive": false,
                        "leave": false,
                        "consume": false,
                        "recycle": false
                    },
                    {
                        "arrive": false,
                        "leave": false,
                        "consume": false,
                        "recycle": false
                    },
                    {
                        "arrive": false,
                        "leave": false,
                        "consume": false,
                        "recycle": false
                    }
                ]
            },
            methods: {
                setDate: function (n) {
                    
                    var i = 1;
                    var j = this.calender.month == 0 ? this.calender.monthArr[11] : this.calender.monthArr[this.calender.month - 1];
                    if (n < this.calender.day) {
                        return j - (this.calender.day - n) + 1;
                    }
                    else if (n < this.calender.day + this.calender.monthDays) {
                        return n - this.calender.day + 1;
                    }
                    else {
                        return n - (this.calender.day + this.calender.monthDays) + 1;
                    }
                },
                setDateClass: function (n) {
                    var i = 1;
                    var j = this.calender.month == 0 ? this.calender.monthArr[11] : this.calender.monthArr[this.calender.month - 1];
                    if (n < this.calender.day || n >= this.calender.day + this.calender.monthDays) {
                        return "disabled";
                    }
                },
                setTypeClass: function (n) {
                    var str = '';
                    var today = new Date();
                    if (n >= this.calender.day && n < this.calender.day + this.calender.monthDays) {
                        if (this.daily[n - this.calender.day]["arrive"] && this.type == 1) {
                            str += 'arrive ';
                        }
                        if (this.daily[n - this.calender.day]["leave"] && this.type == 1) {
                            str += 'leave ';
                        }
                        if (this.daily[n - this.calender.day]["consume"] && this.type == 2) {
                            str += 'consume ';
                        }
                        if (this.daily[n - this.calender.day]["recycle"] && this.type == 3) {
                            str += 'recycle ';
                        }
                        if ((n - this.calender.day + 1) == today.getDate() && this.calender.month == today.getMonth() && this.calender.year == today.getFullYear()) {
                            str += 'today ';
                        }
                        return str;
                    }
                }
            }
        });
        
        this.setCalender();
        $('.calendar .dateBox li').on('click', function (ele) {
            $('.calendar .dateBox li').children('.text').removeClass('choose');
            $(ele.currentTarget).children('.text').addClass('choose');
            $('.calenderBottom').addClass('active');
        });
        $('.btnDel').on('click', function () {
            $('.delBox').show();
        });
        $('.btnAttendence').on('click', function () {
            _this.vuePage.$data['type'] = 1;
            $('.studentList').removeClass('active');
            $('.outer').removeClass('BGimg');
            $('.daily').addClass('active');
            $('.infoBox .info .icon').removeClass('active');
            $('.infoBox .info .icon1, .infoBox .info .icon2, .infoBox .info .icon3, .infoBox .info .icon6').addClass('active');
            $('.detailBox').removeClass('type2');
            $('.detailBox').removeClass('type3');
            $('.detailBox').addClass('type1');
        });
        $('.btnConsume').on('click', function () {
            _this.vuePage.$data['type'] = 2;
            $('.studentList').removeClass('active');
            $('.outer').removeClass('BGimg');
            $('.daily').addClass('active');
            $('.infoBox .info .icon').removeClass('active');
            $('.infoBox .info .icon1, .infoBox .info .icon4, .infoBox .info .icon6').addClass('active');
            $('.detailBox').removeClass('type1');
            $('.detailBox').removeClass('type3');
            $('.detailBox').addClass('type2');
        });
        $('.btnRecycle').on('click', function () {
            _this.vuePage.$data['type'] = 3;
            $('.studentList').removeClass('active');
            $('.outer').removeClass('BGimg');
            $('.daily').addClass('active');
            $('.infoBox .info .icon').removeClass('active');
            $('.infoBox .info .icon1, .infoBox .info .icon5, .infoBox .info .icon6').addClass('active');
            $('.detailBox').removeClass('type2');
            $('.detailBox').removeClass('type1');
            $('.detailBox').addClass('type3');
        });
        $('.delBox .btnCancel').on('click', function () {
            $('.delBox').hide();
        });
        $('.delBox .btnOK').on('click', function () {
            $('.delBox').hide();
        });
        $('.backBtn').on('click', function () {
            $('.calendar .dateBox li').children('.text').removeClass('choose');
            $('.detailBox').removeClass('type1');
            $('.detailBox').removeClass('type2');
            $('.detailBox').removeClass('type3');
            $('.calenderBottom').removeClass('active');
            $('.daily').removeClass('active');
            $('.outer').addClass('BGimg');
            $('.studentList').addClass('active');
        });
    };
    Student.prototype.setCalender = function () {
        
        this.vuePage.$data["calender"]["initDate"].setDate(1);
        this.vuePage.$data["calender"]["year"] = this.vuePage.$data["calender"]["initDate"].getFullYear();
        this.vuePage.$data["calender"]["month"] = this.vuePage.$data["calender"]["initDate"].getMonth();
        this.vuePage.$data["calender"]["day"] = this.vuePage.$data["calender"]["initDate"].getDay();
        if (this.vuePage.$data["calender"]["month"] != 2) {
            this.vuePage.$data["calender"]["monthDays"] = this.vuePage.$data["calender"]["monthArr"][this.vuePage.$data["calender"]["month"]];
        }
        else {
            if (this.leapYear(this.vuePage.$data["calender"]["year"])) {
                this.vuePage.$data["calender"]["monthArr"][1] = 29;
                this.vuePage.$data["calender"]["monthDays"] = 29;
            }
            else {
                this.vuePage.$data["calender"]["monthArr"][1] = 28;
                this.vuePage.$data["calender"]["monthDays"] = 28;
            }
        }
    };
    Student.prototype.prevMonth = function () {
        this.vuePage.$data["calender"]["initDate"].setMonth(this.vuePage.$data["calender"]["initDate"].getMonth() - 1);
        this.setCalender();
    };
    Student.prototype.nextMonth = function () {
        this.vuePage.$data["calender"]["initDate"].setMonth(this.vuePage.$data["calender"]["initDate"].getMonth() + 1);
        this.setCalender();
    };
    Student.prototype.leapYear = function (year) {
        if ((year % 4 == 0 && year % 100 != 0) || year % 400 == 0) {
            return true;
        }
        else {
            return false;
        }
    };
    
    return Student;
}());
var Map = /** @class */ (function () {
    function Map(_vals) {
        this.vals = _vals;
    }
    Map.prototype.init = function () {
        this.vuePage = new Vue({
            el: "#Map",
            data: {}
        });
        $('.tabBox .tabTitle .text').on('click', function (ele) {
            var tab = '.' + $(ele.currentTarget).data('tab');
            $('.tabBox .tabTitle .text').removeClass('active');
            $(ele.currentTarget).addClass('active');
            $('.tabBox .tabInner').removeClass('active');
            $(tab).addClass('active');
        });
    };
    return Map;
}());

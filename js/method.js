
function diaryGetChildData(){
    //userid
    //username
    $.ajax({
        url: 'https://localhost:44330/Api/Students',
        type: 'Post',
        dataType: 'json',
        data: { lineid: '123123' },
        error: function (xhr) {
            alert('Ajax request 發生錯誤');
        },
        success: function (response) {
            console.log(response);
        }
    });
}

function diaryGetMonthData(userid){

}

function diaryGetDayData(userid,date){

}

function studentGetChildData(){

}

var thongkedauduoi = {
    "0":[],
    "1":[],
    "2":[],
    "3":[],
    "4":[],
    "5":[],
    "6":[],
    "7":[],
    "8":[],
    "9":[],
};

const socket = io("/test_socket");
$(document).ready(function () {
    socket.on('connect', function () {
        socket.emit('hello', 'Hello everyone');
        socket.on('hello.response', function (res) {
            console.log(res);
        });
    });

    input_onchage();
});

function input_onchage() {
    $('#result_table_form input').change((e)=>{
        // let value = e.target.value;
        let listInput = $('#result_table_form input').toArray();
        thongkedauduoi = {
            "0":[],
            "1":[],
            "2":[],
            "3":[],
            "4":[],
            "5":[],
            "6":[],
            "7":[],
            "8":[],
            "9":[],
        };
        listInput.forEach((item)=>{
            let value = item.value;
            splitString(value);
        });
        console.log(thongkedauduoi);
        render_table_daucuoi();
        checkdacbiet();
    });
}

function splitString(str){
    str = str.toString().trim();
    let twoEndNumber = str.substring(str.length-2);
    if(twoEndNumber.length === 2){
        let dauduoi = Array.from(twoEndNumber);
        if( thongkedauduoi.hasOwnProperty(dauduoi[0])){
            (thongkedauduoi[dauduoi[0]]).push(dauduoi[1]);
        }
        else{
            thongkedauduoi[dauduoi[0]] = [dauduoi[1]];
        }
    }
}

function render_table_daucuoi(){
    for(let i=0; i<10; i++){
        let value = thongkedauduoi[i.toString()];
        $('#dau'+i.toString()).text(value.join(", "));
    }
}

function setCharAt(str,index,chr) {
    if(index > str.length-1) return str;
    return str.substr(0,index) + chr + str.substr(index+1);
}

function checkdacbiet() {
    let value = $('#result_table_form #txtGiaidacbiet').val();
    let dauduoi = Array.from(value.substring(value.length-2));
    let textShow = $('#dau'+dauduoi[0].toString()).text();
    let text_index = textShow.indexOf(dauduoi[1]);
    textShow = setCharAt(textShow,text_index,`<span class="clnote">${dauduoi[1]}</span>`);
    $('#dau'+dauduoi[0].toString()).html(textShow);
}

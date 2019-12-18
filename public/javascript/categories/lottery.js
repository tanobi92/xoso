import _ from 'lodash';
import Base from '../base';
import axios from  '../axios';
import api from  '../api';
import ejs from 'ejs/ejs.min';

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

class Lottery extends Base {
    select() {
        this.initSelect2();
        const location = $('#cbxLocation');
        const province = $('#cbxProvince');

        location.select2({
            width: 'resolve',
            placeholder: 'Chọn',
        }).on('change', e => {
            const target = e.target;
            let value = target.value;
            if(value) {
                axios.get({
                    url: api.getProvinceByLocation,
                    params: {
                        code: value
                    }
                }, resp => {
                    let result = [];
                    if (resp.status === 200) {
                        const data = resp.data;
                        _.forEach(data, item => {
                            result.push({
                                id: item.code,
                                text: item.name
                            })
                        });
                    }
                    province.refreshDataSelect2(result, true);
                });
                this.renderResult();
            }
        });

        province.select2({
            width: 'resolve',
            placeholder: 'Chọn',
        }).on('change', e => {
            this.renderResult();
        });

    }

    input_onchage() {
        const $province = $('#cbxProvince');
        $('#tblResult').change((e)=>{
            const {target} = e;

            if(target.localName === 'input') {
                // let value = e.target.value;
                let data = {};
                let listInput = $('#tblResult input').toArray();
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
                    const _result = item.getAttribute('result');
                    let _val = data[_result];
                    if(_.isNil(_val)) {
                        data[_result] = value;
                    } else {
                        data[_result] = value?`${_val},${value}` : _val;
                    }
                    if(!item.classList.contains('symbol')) {
                        this.splitString(value);
                    }
                });
                this.render_table_daucuoi();
                this.checkdacbiet();
                const province = $province.val();
                if(province) {
                    this.socket.emit('input', {...data, province});
                }
            }

        });
    }

    splitString(str){
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

    render_table_daucuoi(){
        for(let i=0; i<10; i++){
            let value = thongkedauduoi[i.toString()];
            $('#dau'+i.toString()).text(value.join(", "));
        }
    }

    setCharAt(str,index,chr) {
        if(index > str.length-1) return str;
        return str.substr(0,index) + chr + str.substr(index+1);
    }

    checkdacbiet() {
        let value = $('#tblResult #txtSpecial').val();
        if(value) {
            let dauduoi = Array.from(value.substring(value.length-2));
            let textShow = $('#dau'+dauduoi[0].toString()).text();
            let text_index = textShow.indexOf(dauduoi[1]);
            textShow = this.setCharAt(textShow,text_index,`<span class="clnote">${dauduoi[1]}</span>`);
            $('#dau'+dauduoi[0].toString()).html(textShow);
        }
    }


    renderResult() {
        const cbxLocation = $('#cbxLocation');
        const location = cbxLocation.val() || 'MB';
        //#region template HTML
        const HTML = `<tbody>
            <%if (location === "MB") { %>
                <tr>
                    <td class="td-title">Giải bảy</td>
                    <td colspan="3">
                        <input type="text" class="form-control" result="seventh" id="txtSeventh1" data-mask="99" placeholder="_ _">
                    </td>
                    <td colspan="3">
                        <input type="text" class="form-control" result="seventh" id="txtSeventh2" data-mask="99" placeholder="_ _">
                    </td>
                    <td colspan="3">
                        <input type="text" class="form-control" result="seventh" id="txtSeventh3" data-mask="99" placeholder="_ _">
                    </td>
                    <td colspan="3">
                        <input type="text" class="form-control" result="seventh" id="txtSeventh4" data-mask="99" placeholder="_ _">
                    </td>
                </tr>
                <tr>
                    <td class="td-title">Giải sáu</td>
                    <td colspan="4">
                        <input type="text" class="form-control" result="sixth" id="txtSixth1" data-mask="999" placeholder="_ _ _">
                    </td>
                    <td colspan="4">
                        <input type="text" class="form-control" result="sixth" id="txtSixth2" data-mask="999" placeholder="_ _ _">
                    </td>
                    <td colspan="4">
                        <input type="text" class="form-control" result="sixth" id="txtSixth3" data-mask="999" placeholder="_ _ _">
                    </td>
                </tr>
                <tr>
                    <td class="td-title" rowspan="2">Giải năm</td>
                    <td colspan="4">
                        <input type="text" class="form-control" result="fifth" id="txtFifth1" data-mask="9999" placeholder="_ _ _ _">
                    </td>
                    <td colspan="4">
                        <input type="text" class="form-control" result="fifth" id="txtFifth2" data-mask="9999" placeholder="_ _ _ _">
                    </td>
                    <td colspan="4">
                        <input type="text" class="form-control" result="fifth" id="txtFifth3" data-mask="9999" placeholder="_ _ _ _">
                    </td>
                </tr>
                <tr>
                    <td colspan="4">
                        <input type="text" class="form-control" result="fifth" id="txtFifth4" data-mask="9999" placeholder="_ _ _ _">
                    </td>
                    <td colspan="4">
                        <input type="text" class="form-control" result="fifth" id="txtFifth5" data-mask="9999" placeholder="_ _ _ _">
                    </td>
                    <td colspan="4">
                        <input type="text" class="form-control" result="fifth" id="txtFifth6" data-mask="9999" placeholder="_ _ _ _">
                    </td>
                </tr>
                <tr>
                    <td class="td-title">Giải tư</td>
                    <td colspan="3">
                        <input type="text" class="form-control" result="fourth" id="txtFourth1" data-mask="9999" placeholder="_ _ _ _">
                    </td>
                    <td colspan="3">
                        <input type="text" class="form-control" result="fourth" id="txtFourth2" data-mask="9999" placeholder="_ _ _ _">
                    </td>
                    <td colspan="3">
                        <input type="text" class="form-control" result="fourth" id="txtFourth3" data-mask="9999" placeholder="_ _ _ _">
                    </td>
                    <td colspan="3">
                        <input type="text" class="form-control" result="fourth" id="txtFourth4" data-mask="9999" placeholder="_ _ _ _">
                    </td>
                </tr>
                <tr>
                    <td class="td-title" rowspan="2">Giải ba</td>
                    <td colspan="4">
                        <input type="text" class="form-control" result="third" id="txtThird1" data-mask="99999" placeholder="_ _ _ _ _">
                    </td>
                    <td colspan="4">
                        <input type="text" class="form-control" result="third" id="txtThird2" data-mask="99999" placeholder="_ _ _ _ _">
                    </td>
                    <td colspan="4">
                        <input type="text" class="form-control" result="third" id="txtThird3" data-mask="99999" placeholder="_ _ _ _ _" />
                    </td>
                </tr>
                <tr>
                    <td colspan="4">
                        <input type="text" class="form-control" result="third" id="txtThird4" data-mask="99999" placeholder="_ _ _ _ _">
                    </td>
                    <td colspan="4">
                        <input type="text" class="form-control" result="third" id="txtThird5" data-mask="99999" placeholder="_ _ _ _ _">
                    </td>
                    <td colspan="4">
                        <input type="text" class="form-control" result="third" id="txtThird6" data-mask="99999" placeholder="_ _ _ _ _">
                    </td>
                </tr>
                <tr>
                    <td class="td-title">Giải nhì</td>
                    <td colspan="6">
                        <input type="text" class="form-control" result="second" id="txtSecond1" data-mask="99999" placeholder="_ _ _ _ _">
                    </td>
                    <td colspan="6">
                        <input type="text" class="form-control" result="second" id="txtSecond2" data-mask="99999" placeholder="_ _ _ _ _">
                    </td>
                </tr>
                <tr>
                    <td class="td-title">Giải nhất</td>
                    <td colspan="12">
                        <input type="text" class="form-control" result="first" id="txtFirst" data-mask="99999" placeholder="_ _ _ _ _">
                    </td>
                </tr>
                <tr>
                    <td class="td-title">Đặc biệt</td>
                    <td colspan="12">
                        <input type="text" class="form-control" result="special" id="txtSpecial" data-mask="99999" placeholder="_ _ _ _ _">
                    </td>
                </tr>
                <tr>
                    <td class="td-title">Ký hiệu trúng ĐB</td>
                    <td colspan="4">
                        <input type="text" class="form-control" result="symbol" id="txtSymbol1">
                    </td>
                    <td colspan="4">
                        <input type="text" class="form-control" result="symbol" id="txtSymbol2">
                    </td>
                    <td colspan="4">
                        <input type="text" class="form-control" result="symbol" id="txtSymbol3">
                    </td>
                </tr>
            <% } else if(location === "MT" || location === "MN") { %>
                <tr>
                    <td class="td-title">Giải tám</td>
                    <td colspan="12">
                        <input type="text" class="form-control eighth" id="txtEighth" data-mask="99" placeholder="_ _">
                    </td>
                </tr>
                <tr>
                    <td class="td-title">Giải bảy</td>
                    <td colspan="12">
                        <input type="text" class="form-control" result="seventh" id="txtSeventh" data-mask="99" placeholder="_ _ _">
                    </td>
                </tr>
                <tr>
                    <td class="td-title">Giải sáu</td>
                    <td colspan="4">
                        <input type="text" class="form-control" result="sixth" id="txtSixth1" data-mask="999" placeholder="_ _ _ _">
                    </td>
                    <td colspan="4">
                        <input type="text" class="form-control" result="sixth" id="txtSixth2" data-mask="999" placeholder="_ _ _ _">
                    </td>
                    <td colspan="4">
                        <input type="text" class="form-control" result="sixth" id="txtSixth3" data-mask="999" placeholder="_ _ _ _">
                    </td>
                </tr>
                <tr>
                    <td class="td-title">Giải năm</td>
                    <td colspan="12">
                        <input type="text" class="form-control" result="fifth" id="txtFifth" data-mask="9999" placeholder="_ _ _ _">
                    </td>
                </tr>
                <tr>
                    <td class="td-title" rowspan="2">Giải tư</td>
                    <td colspan="3">
                        <input type="text" class="form-control" result="fourth" id="txtFourth1" data-mask="9999" placeholder="_ _ _ _ _">
                    </td>
                    <td colspan="3">
                        <input type="text" class="form-control" result="fourth" id="txtFourth2" data-mask="9999" placeholder="_ _ _ _ _">
                    </td>
                    <td colspan="3">
                        <input type="text" class="form-control" result="fourth" id="txtFourth3" data-mask="9999" placeholder="_ _ _ _ _">
                    </td>
                    <td colspan="3">
                        <input type="text" class="form-control" result="fourth" id="txtFourth4" data-mask="9999" placeholder="_ _ _ _ _">
                    </td>
                </tr>
                <tr>
                    <td colspan="4">
                        <input type="text" class="form-control" result="fourth" id="txtFourth5" data-mask="9999" placeholder="_ _ _ _ _">
                    </td>
                    <td colspan="4">
                        <input type="text" class="form-control" result="fourth" id="txtFourth6" data-mask="9999" placeholder="_ _ _ _ _">
                    </td>
                    <td colspan="4">
                        <input type="text" class="form-control" result="fourth" id="txtFourth7" data-mask="9999" placeholder="_ _ _ _ _">
                    </td>
                </tr>
                <tr>
                    <td class="td-title">Giải ba</td>
                    <td colspan="6">
                        <input type="text" class="form-control" result="third" id="txtThird1" data-mask="99999" placeholder="_ _ _ _ _">
                    </td>
                    <td colspan="6">
                        <input type="text" class="form-control" result="third" id="txtThird2" data-mask="99999" placeholder="_ _ _ _ _">
                    </td>
                </tr>
                <tr>
                    <td class="td-title">Giải nhì</td>
                    <td colspan="12">
                        <input type="text" class="form-control" result="second" id="txtSecond" data-mask="99999" placeholder="_ _ _ _ _">
                    </td>
                </tr>
                <tr>
                    <td class="td-title">Giải nhất</td>
                    <td colspan="12">
                        <input type="text" class="form-control" result="first" id="txtFirst" data-mask="99999" placeholder="_ _ _ _ _">
                    </td>
                </tr>
                <tr>
                    <td class="td-title">Đặc biệt</td>
                    <td colspan="12">
                        <input type="text" class="form-control" result="special" id="txtSpecial" data-mask="99999" placeholder="_ _ _ _ _ _">
                    </td>
                </tr>
            <% } %>
        </tbody>`;
        //#endregion
        const tbody = $('#tblResult');
        let template = ejs.render(HTML, {location});

        tbody.html(template);
    }

    initSocket() {
        this.socket = io("http://172.27.229.69:3333/lottery");
        this.socket.on('connect', () => {
            // this.socket.emit('hello', 'Hello everyone');
            this.socket.on('hello', function (res) {
                console.log(res);
            });

            this.socket.on('input_successful', function (resp) {
                // console.log(resp);
            });

            this.socket.on('input_unsuccessful', function (resp) {
                toastr.error(resp);
            });
        });
    }

    init() {
        this.initSocket();
        this.select();
        this.renderResult();
	    this.input_onchage();
    }
}

window.onload = () => {
    new Lottery().init();
};








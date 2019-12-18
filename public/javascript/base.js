import _ from "lodash";

class Base {
	initSelect2() {
		$.fn.select2.defaults.set("theme", "bootstrap");
		$.fn.refreshDataSelect2 = function (data, placeholder) {
			this.select2('data', data);

			// Update options
			let $select = $(this[0]);
			let HTML = placeholder? [`<option></option>`]: [];
			_.forEach(data, item => {
				HTML.push('<option value="' + item.id + '">' + item.text + '</option>');
			});
			$select.html(HTML.join('')).change();
		};
	}

	initICheck() {
		$('.i-checks').iCheck({
			checkboxClass: 'icheckbox_square-green',
			radioClass: 'iradio_square-green',
		});
	}

	xoa_dau(str) {
		str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, "A");
		str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
		str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, "E");
		str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
		str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, "I");
		str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
		str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, "O");
		str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
		str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, "U");
		str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
		str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, "Y");
		str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
		str = str.replace(/Đ/g, "D");
		str = str.replace(/đ/g, "d");
		return str;
	}

	highlight(element){
		$(element).closest('.form-group').addClass('has-error');
	}

	success(element) {
		const formGroup = $(element).closest('.form-group');
		formGroup.removeClass('has-error');
		formGroup.find('.error').remove();
	}

	errorPlacement( error, element ) {
		// Add the `help-block` class to the error element
		error.addClass( "help-block" );

		if ( element.prop( "type" ) === "checkbox" ) {
			error.insertAfter( element.parent( "label" ) );
		} if(element.prop('tagName').toLocaleLowerCase() === 'select' && element.hasClass('select2-hidden-accessible')) {
			error.insertAfter(element.next());
		} else {
			error.insertAfter( element );
		}
	}

	loading() {
		return pleaseWait({
			logo: "",
			backgroundColor: 'rgba(213, 213, 211, 0.5)',
			loadingHtml: "<div class='sk-spinner sk-spinner-wave'><div class='sk-rect1'></div><div class='sk-rect2'></div><div class='sk-rect3'></div><div class='sk-rect4'></div><div class='sk-rect5'></div></div><div class='mess-wait'>Vui lòng chờ ...</div>"
		});
	};

}

export default Base;
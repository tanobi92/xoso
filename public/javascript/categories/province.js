import Base from '../base';
import api from '../api';
import axios from "../axios";

class Province extends Base {

    validate_code() {
        let arrayOfMentions = ['host', 'interface'];

        $('#content').textcomplete([{
            mentions: arrayOfMentions,
            match: /\B\$(\w*)$/,
            search: function(term, callback) {
                callback($.map(this.mentions, function(mention) {
                    return mention.indexOf(term) === 0 ? mention : null;
                }));
            },
            template: function(mention) {
                return '$' + mention;
            },
            index: 1,
            replace: function(mention) {
                return '${' + mention + '}';
            }
        }]);
    }

    refresh() {
        $('#lottery_type_id').val('');
        $('#lottery_type_name').val('');
        $('#lottery_type_code').val('');
        $('#lottery_location').val('MIENBAC');
        $('#status').val(1);
    }

    renderTable() {
        let tableData = $('#tblProvince');
        const columns = [
            {
                title: 'STT',
                field: 'index',
                align: 'left',
                valign: 'middle',
                formatter: function (value, row, index, field) {
                    return index + 1;
                }
            },
            {
                title: 'Id',
                field: 'provinceId',
                align: 'left',
                valign: 'middle',
                visible: false
            },
            {
                title: 'Tỉnh/TP',
                field: 'provinceName',
                align: 'left',
                valign: 'middle',
            },
            {
                title: 'Mã',
                field: 'code',
                align: 'left',
                valign: 'middle',
            },
            {
                title: 'Loại Xổ số',
                field: 'locationName',
                align: 'left',
                valign: 'middle',
            },
            {
                title: 'Ngày tạo',
                field: 'createdDate',
                align: 'left',
                valign: 'middle',
            },
            {
                title: '',
                align: 'center',
                valign: 'middle',
                events: window.optEvents,
                formatter: function (value, row, index, field) {
                    return `<button title="Sửa" class="btn btn-info btn-sm btn-flat btn-update"><i class="fa fa-pencil"></i></button>
                    <button title="Xóa" class="btn btn-danger btn-sm btn-flat btn-delete"><i class="fa fa-close"></i></button>`;
                }
            }
        ];

        tableData.bootstrapTable({
            columns: columns,
            search: true,
            searchAlign: 'left',
            toolbarAlign: 'right',
            classes: 'table table-bordered table-hover table-striped',
            maxHeight: '500',
            sidePagination: "server",
            pagination: true,
            locale: 'vi-VN',
            pageSize: 10,
            pageNumber: 1,
            paginationSuccessivelySize: 5,
            paginationPagesBySide: 0,
            searchOnEnterKey: true,
            ajax: params => {
                axios.get( {
                    url: api.getProvince,
                    params: {
                        ...params.data
                    }
                }, resp => {
                    if(resp.status === 200) {
                        const data = resp.data;
                        if(data.status === 200) {
                            params.success({
                                total: data.total,
                                rows: data.list
                            })
                        }
                    }
                });
            }
        });
    }

    handleAction() {
        const mdDelete = $('#mdDeleteProvince');
        const mdUpdate = $('#mdUpdateProvince');
        const tblProvince = $('#tblProvince');
        const title = $('#mdUpdateProvince .modal-title');
        const provinceId = $('#txtProvinceId');
        const _provinceId = $('#txtProvinceIdDel');
        const provinceName = $('#txtProvinceName');
        const cbxLocation = $('#cbxLocation');
        const cbxStatus = $('#cbxStatus');
        let $this = this;

        window.optEvents = {
            'click .btn-delete': function(e, value, row, index) {
                _provinceId.val(row.provinceId);

                mdDelete.modal({
                    backdrop: 'static',
                    keyboard: false
                });
            },

            'click .btn-update': function(e, value, row, index, test) {
                title.html('Sửa Tỉnh/TP');
                $this.prize = row;
                provinceId.val(row.provinceId);
                provinceName.val(row.provinceName);
                if(row.location) cbxLocation.val(row.location).change();
                if(row.status) cbxStatus.val(row.status).change();

                mdUpdate.modal({
                    backdrop: 'static',
                    keyboard: false
                });
            },
        };

        $('.btn-create').click(e => {
            // mdUpdate.attr('prize', JSON.stringify(row));
            mdUpdate.modal({
                backdrop: 'static',
                keyboard: false
            });
        });

        $('.btn-save').click(e => {
            e.preventDefault();
            if(!$('#frmUpdateProvince').valid()){
                return false;
            }

            const id = provinceId.val();
            let body = {
                name: provinceName.val().trim(),
                location: cbxLocation.val(),
                status: cbxStatus.val()
            };

            if(id) {
                body.provinceId = id;
            }

            const loading = this.loading();

            axios.post({
                url:api.updateProvince,
                params: body
            }, resp => {
                loading.finish();
                if(resp.status === 200) {
                    const data = resp.data;
                    if(data.status === 200) {
                        toastr.success(data.message);
                        tblProvince.bootstrapTable('refresh', {silent: true});
                    } else {
                        toastr.error(data.message);
                    }
                } else {
                    toastr.error(resp.message);
                }
                mdUpdate.modal('hide');
            });
        });

        $('.btn-delete').click(e => {
            e.preventDefault();

            const id = _provinceId.val();

            if(!id) return false;

            let body = {
                provinceId: id
            };

            const loading = this.loading();

            axios.post({
                url: api.deleteProvince,
                params: body
            }).then(resp => {
                loading.finish();
                if(resp.status === 200) {
                    const data = resp.data;
                    if(data.status === 200) {
                        toastr.success(data.message);
                        tblProvince.bootstrapTable('refresh', {silent: true});
                    } else {
                        toastr.error(data.message);
                    }
                } else {
                    toastr.error(resp.message);
                }
                mdDelete.modal('hide');
            }).catch(error => {
                loading.finish();
                mdDelete.modal('hide');
                toastr.error(error.message);
            });

        });
    }

    registerValid() {
        $('#frmUpdateProvince').validate({
            rules: {
                provinceName: {
                    required: true,
                },
            },
            messages: {
                provinceName: {
                    required: "Không để trống",
                },
            },
            highlight: this.highlight,
            success: this.success,
            errorElement: "em",
            errorPlacement: this.errorPlacement,
        });
    }

    init() {
        this.handleAction();
        this.renderTable();
        this.registerValid();
    }
}

window.onload = () => {
  new Province().init();
};



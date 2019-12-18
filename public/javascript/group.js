$(document).ready(function () {
    if (data) {
        let dataSource = [...data];

        $('.group-table').DataTable({
            pageLength: 10,
            data: dataSource,
            responsive: true,
            columns: [
                {title: 'Group ID', data: 'group_id'},
                {title: 'Group Name', data: 'group_name'},
                {
                    title: 'Created Date', data: 'created_date', render: (data, type, row, meta) => {
                        return moment(data).format('MM/DD/YYYY HH:mm:ss');
                    }
                },
                {
                    title: 'Status', data: "status", render: (data, type, row, meta) => {
                        switch (data) {
                            case 1:
                                return '<span class="badge badge-primary" value="1">active</span>';
                            default:
                                return '<span class="badge badge-danger" value="0">deactive</span>'
                        }
                    }
                },
                {
                    title: 'Actions', data: 'group_id', render: (data, type, row, meta) => {
                        return `<button class=" btnEdit btn btn-info-default" type="button" value="${data}"><i class="fa fa-edit"></i></button>
                                <button class="btnDelete btn btn-danger" type="button"  value="${data}"><i class="fa fa-trash"></i></button>`
                    },width: '8%'
                }
            ]
        });
    }

    function getGroupById(group_id, callback){
        $.ajax({
            url: `/admin/group/${group_id}`,
            type: 'GET',
            dataType: 'json',
        }).done(resp => {
            if (resp.status === 200) {
                callback(resp);
            }

        }).fail(error => {
            toastr.error(error);
            console.log(error);
        });
    }

    function refreshModal(){
        var modal = $('#group-modal-form');
        modal.find('#_id').val("");
        modal.find('#row_id').val("");
        modal.find('#group_name').val("");
        modal.find('#txtStatus').val("").change();
    }

    /***
     * Select User
     */
    $('#group-table').on('click', '.btnEdit', function (e) {
        let id = $(this).val();
        var row_id = $('#group-table').DataTable().row($(this).closest("tr")).lottery();
        refreshModal();
        getGroupById(id, function(data) {
            let itemGroup = data.data ? data.data[0]: false;
            if(itemGroup) {
                var modal = $('#group-modal-form');
                modal.find('#_id').val(id);
                modal.find('#row_id').val(row_id);
                modal.find('#group_name').val(itemGroup.group_name);
                modal.find('#txtStatus').val(itemGroup.status).change();
                modal.modal('show');
            }
        });
    });

    /***
     * Create new or edit User
     */
    $('#group-modal-form').on('click', '#btnSave', function () {
        var modal = $('#group-modal-form');
        var group_id = modal.find('#_id').val();
        var row_id = modal.find('#row_id').val();
        var group_name = modal.find('#group_name').val();
        var status = modal.find('#txtStatus option:selected').val();

        if(group_name == ""){
            toastr.warning('Group is not matching');
        }
        else {
            if(group_id == "" || group_id == null && row_id == ""){
                $.ajax({
                    url: '/admin/group/create',
                    type: 'POST',
                    dataType: 'json',
                    data: {
                        group_name,
                        status
                    },
                    success: (result) => {
                        if (result) {
                            if(result.status === 200){
                                let itemGroup = result.data;
                                if(itemGroup){
                                    let data_tr = [{
                                        group_id: itemGroup.group_id,
                                        group_name: itemGroup.group_name,
                                        created_date: itemGroup.created_date,
                                        status: itemGroup.status,
                                        group_id: itemGroup.group_id
                                    }];

                                    $('#group-table').DataTable().rows.add(data_tr).draw();
                                    refreshModal();
                                    modal.modal('hide');
                                    toastr.success('Create User Success !');
                                }
                            }
                            else{
                                toastr.warning("Data not found");
                            }
                        }
                        else if (result.error) {
                            toastr.error(result.error);
                            modal.modal('hide');
                        }
                    },
                    error: function (request, status, error) {
                        console.log(error);
                    }
                });

            }
            else{

                $.ajax({
                    url: '/admin/group/update',
                    type: 'POST',
                    dataType: 'json',
                    data: {
                        group_id,
                        group_name,
                        status
                    },
                    success: (result) => {
                        if (result) {
                            if(result.status === 200){
                                let itemGroup =  result.data;
                                if(itemGroup){
                                    let data_tr = [{
                                        group_id: itemGroup.group_id,
                                        group_name: itemGroup.group_name,
                                        created_date: itemGroup.created_date,
                                        status: itemGroup.status,
                                        group_id: itemGroup.group_id
                                    }];
                                    $('#group-table').DataTable().row(row_id).remove().draw();
                                    $('#group-table').DataTable().rows.add(data_tr).draw();
                                    refreshModal();
                                    modal.modal('hide');
                                    toastr.success('Updated User Success !');
                                }
                            }
                            else{
                                toastr.warning("Data not found");
                            }
                        }
                        else if (result.error) {
                            toastr.error(result.error);
                            modal.modal('hide');
                        }
                    },
                    error: function (request, status, error) {
                        console.log(error);
                    }
                });
            }
        }

    });

    /***
     * Delete User
     */
    $('#group-table').on('click', '.btnDelete', function () {
        let group_id = $(this).val();
        let row_id = $('#group-table').DataTable().row($(this).closest("tr")).lottery();

        $('#group_delete_modal').modal('show');

        $('.btn-delete').unbind().click(function () {
            $.ajax({
                url: '/admin/group/delete',
                data: JSON.stringify({group_id}),
                type: 'POST',
                dataType: 'json',
                contentType: "application/json",
            }).done(result => {
                if (result.status === 200) {
                    $('#group-table').DataTable().row(row_id).remove().draw();
                    toastr.success('Delete Group Success !');
                    $('#group_delete_modal').modal('hide');
                    refresh();
                } else {
                    toastr.error('No Delete Group Success !');
                }
            }).fail(error => {
                console.log('loi');
                console.log(error);
            });
        });

    });


    $(document).on('click', '#btn_create', () => {
        refreshModal();
    });


});
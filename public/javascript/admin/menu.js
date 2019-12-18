$(document).ready(function () {
    if (data) {
        let dataSource = [...data];

        $('.menus-table').DataTable({
            pageLength: 10,
            data: dataSource,
            responsive: true,
            columns: [
                {title: 'Parent ID', data: 'idtbl_menu', width: '8%'},
                {title: 'Label', data: 'label'},
                {title: 'Href', data: 'href'},
                {title: 'icon', data: 'icon'},
                {title: 'Order', data: 'order'},
                {title: 'Parent', data: 'parent_id'},
                {
                    title: 'Actions', data: 'idtbl_menu', render: (data, type, row, meta) => {
                        return `<button class=" btnEdit btn btn-info-default" type="button" value="${data}"><i class="fa fa-edit"></i></button>
                                <button class="btnDelete btn btn-danger" type="button"  value="${data}"><i class="fa fa-trash"></i></button>`
                    },width: '8%'
                }
            ]
        });

        let sel_parent = $('#txt_parent');
        sel_parent.empty();
        let opt = '<option value="">Root</option>';
        dataSource.forEach((item)=>{
            if(item.parent_id == null){
                opt += `<option value="${item.idtbl_menu}">${item.label}</option>`;
            }
        });
        sel_parent.append(opt).trigger('change');

    }

    function getMenuById(idtbl_menu, callback){
        $.ajax({
            url: `/admin/menu/${idtbl_menu}`,
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
        var modal = $('#menu-modal-form');
        modal.find('#_id').val("");
        modal.find('#row_id').val("");
        modal.find('#txt_label').val("");
        modal.find('#txt_parent').val("").change();
        modal.find('#txt_href').val("");
        modal.find('#txt_icon').val("");
        modal.find('#txt_order').val("");
    }

    /***
     * edit menu show value modal
     */
    $('#menus-table').on('click', '.btnEdit', function () {
        let id = $(this).val();
        var row_id = $('#menus-table').DataTable().row($(this).closest("tr")).lottery();
        refreshModal();
        getMenuById(id, function(data) {
            let itemMenu = data.data ? data.data[0]: false;
            if(itemMenu) {
                let modal = $('#menu-modal-form');
                modal.find('#_id').val(id);
                modal.find('#row_id').val(row_id);
                modal.find('#txt_label').val(itemMenu.label);
                modal.find('#txt_parent').val(itemMenu.parent_id).change();
                modal.find('#txt_href').val(itemMenu.href);
                modal.find('#txt_icon').val(itemMenu.icon);
                modal.find('#txt_order').val(itemMenu.order);
                modal.modal('show');
            }
        });
    });

    /***
     * Create new or edit nenu
     */
    $('#menu-modal-form').on('click', '#btnSave', function () {
        let modal = $('#menu-modal-form');
        let menu_id = modal.find('#_id').val();
        let row_id = modal.find('#row_id').val();
        let label = modal.find('#txt_label').val().trim();
        let parent_id = modal.find('#txt_parent option:selected').val();
        let href = modal.find('#txt_href').val();
        let icon = modal.find('#txt_icon').val();
        let order = modal.find('#txt_order').val();

        if(label == ""){
            toastr.warning('Label is not matching');
        }else {
            if(menu_id == "" || menu_id == null && row_id == ""){

                $.ajax({
                    url: '/admin/menu/create',
                    type: 'POST',
                    dataType: 'json',
                    data: {
                        label,
                        href,
                        icon,
                        order,
                        parent_id
                    },
                    success: (result) => {
                        if (result) {
                            if(result.status === 200){
                                let itemMenu = result.data;
                                if(itemMenu){
                                    let data_tr = [{
                                        idtbl_menu: itemMenu.idtbl_menu,
                                        label: itemMenu.label,
                                        href: itemMenu.href,
                                        icon: itemMenu.icon,
                                        order: itemMenu.order,
                                        parent_id: itemMenu.parent_id,
                                        idtbl_menu: itemMenu.idtbl_menu
                                    }];

                                    $('#menus-table').DataTable().rows.add(data_tr).draw();
                                    refreshModal();
                                    if(itemMenu.parent_id == null){
                                        let opt = `<option value="${itemMenu.idtbl_menu}">${itemMenu.label}</option>`;
                                        modal.find('#txt_parent').append(opt)
                                    }
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
                    url: '/admin/menu/update',
                    type: 'POST',
                    dataType: 'json',
                    data: {
                        menu_id,
                        label,
                        parent_id,
                        href,
                        icon,
                        order
                    },
                    success: (result) => {
                        if (result) {
                            if(result.status === 200){
                                let itemMenu =  result.data;
                                if(itemMenu){
                                    let data_tr = [{
                                        idtbl_menu: itemMenu.idtbl_menu,
                                        label: itemMenu.label,
                                        href: itemMenu.href,
                                        icon: itemMenu.icon,
                                        order: itemMenu.order,
                                        parent_id: itemMenu.parent_id,
                                        idtbl_menu: itemMenu.idtbl_menu
                                    }];
                                    $('#menus-table').DataTable().row(row_id).remove().draw();
                                    $('#menus-table').DataTable().rows.add(data_tr).draw();
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
     * Delete model
     */
    $('#menus-table').on('click', '.btnDelete', function () {
        let menu_id = $(this).val();
        let row_id = $('#menus-table').DataTable().row($(this).closest("tr")).lottery();

        $('#menu_delete_modal').modal('show');

        $('.btn-delete').unbind().click(function () {
            $.ajax({
                url: '/admin/menu/delete',
                data: JSON.stringify({menu_id}),
                type: 'POST',
                dataType: 'json',
                contentType: "application/json",
            }).done(result => {
                if (result.status === 200) {
                    $('#menus-table').DataTable().row(row_id).remove().draw();
                    toastr.success('Delete  Success !');
                    $('#menu_delete_modal').modal('hide');
                    refresh();
                } else {
                    toastr.error('No Delete Menu !');
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
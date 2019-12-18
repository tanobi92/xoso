$(document).ready(function () {
    if (data) {
        let dataSource = [...data];

        $('.users-table').DataTable({
            pageLength: 10,
            data: dataSource,
            responsive: true,
            initComplete: function() {
                $(this.api().table().container()).find('input').parent().wrap('<form>').parent().attr('autocomplete', 'off');
            },
            columns: [
                {title: 'User ID', data: 'user_id'},
                {title: 'User Name', data: 'username'},
                {title: 'Full Name', data: 'fullname'},
                {title: 'Email', data: 'email'},
                {title: 'Mobile', data: 'mobile'},
                {title: 'Department', data: 'department'},
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
                    title: 'Actions', data: 'user_id', render: (data, type, row, meta) => {
                        return `<button class=" btnEdit btn btn-info-default" type="button" value="${data}"><i class="fa fa-edit"></i></button>
                                <button class="btnDelete btn btn-danger" type="button"  value="${data}"><i class="fa fa-trash"></i></button>`
                    }
                }
            ]
        });
    }

    function validateTextBox(textbox) {

        if (textbox.value == '') {
            textbox.setCustomValidity('The field cannot be left blank');
        }
        else if(textbox.validity.typeMismatch){
            textbox.setCustomValidity('The field is not valid');
        }
        else {
            textbox.setCustomValidity('');
        }

        return true;
    };

    function getUserById(user_id, callback){
        $.ajax({
            url: `/admin/user/${user_id}`,
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
        var modal = $('#user-modal-form');
        modal.find('#_id').val("");
        modal.find('#row_id').val("");
        modal.find('#username').val("");
        modal.find('#fullname').val("");
        modal.find('#password').val("");
        modal.find('#conf_password').val("");
        modal.find('#email').val("");
        modal.find('#mobile').val("");
        modal.find('#ddlDepartment').val("NOC").change();
        modal.find('#txtStatus').val("1").change();
        modal.find("#user_avatar").val("");
    }

    /***
     * Select User
     */
    $('#users-table').on('click', '.btnEdit', function (e) {
        let id = $(this).val();
        var row_id = $('#users-table').DataTable().row($(this).closest("tr")).lottery();
        refreshModal();
        getUserById(id, function(data) {
            let itemUser = data.data ? data.data[0]: false;
            if(itemUser) {
                var modal = $('#user-modal-form');
                modal.find('#_id').val(id);
                modal.find('#row_id').val(row_id);
                modal.find('#username').val(itemUser.username);
                modal.find('#fullname').val(itemUser.fullname);
                modal.find('#password').val('');
                modal.find('#conf_password').val('');
                modal.find('#email').val(itemUser.email);
                modal.find('#mobile').val(itemUser.mobile);
                modal.find('#ddlDepartment').val(itemUser.department).change();
                modal.find('#txtStatus').val(itemUser.status).change();
                modal.find('.profile-pic').attr('src', itemUser.avatar ? itemUser.avatar : "/upload/avatar/avatar-bg.png");
                modal.modal('show');
            }
        });
    });

    /***
     * Create new or edit User
     */
    $('#user-modal-form').on('click', '#btnSave', async function () {
        var modal = $('#user-modal-form');
        var user_id = modal.find('#_id').val();
        var row_id = modal.find('#row_id').val();
        var username = modal.find('#username').val().trim();
        var fullname = modal.find('#fullname').val().trim();
        var password = modal.find('#password').val();
        var conf_password = modal.find('#conf_password').val();
        var email = modal.find('#email').val().trim();
        var mobile = modal.find('#mobile').val().trim();
        var department = modal.find('#ddlDepartment option:selected').val();
        var status = modal.find('#txtStatus option:selected').val();
        var avatar = modal.find("#user_avatar")[0];

        let data = new FormData();
        data.append('username', username);
        data.append('fullname', fullname);
        data.append('password', password.toString());
        data.append('email', email);
        data.append('mobile', mobile);
        data.append('status', status);
        data.append('department', department);
        data.append('avatar', avatar.files[0]);

        if(password != conf_password){
            toastr.warning('Password are not matching');
        }
        else if ( username.length > 0 && fullname.length > 0 /*&& password.length >0 */) {
            if(user_id == "" || user_id == null && row_id == ""){
                if(password.length >0){
                    let response = await fetch('/admin/user/create', {
                        method: 'POST',
                        body: data
                    });

                    response = await response.json();
                    if(response){
                        if(response.status === 200){
                            let itemUser = response.data;
                            if(itemUser){
                                let data_tr = [{
                                    user_id: itemUser.user_id,
                                    username: itemUser.username,
                                    fullname: itemUser.fullname,
                                    email: itemUser.email,
                                    mobile: itemUser.mobile,
                                    department: itemUser.department,
                                    created_date: itemUser.created_date,
                                    status: itemUser.status,
                                    user_id: itemUser.user_id
                                }];

                                $('#users-table').DataTable().rows.add(data_tr).draw();
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
                }else {
                    toastr.warning('Input can not be blank');
                }
            }
            else{
                let data = new FormData();
                data.append('user_id', user_id);
                data.append('username', username);
                data.append('fullname', fullname);
                data.append('password', password.toString());
                data.append('email', email);
                data.append('mobile', mobile);
                data.append('status', status);
                data.append('department', department);
                if(avatar.files.length == 0){
                    let avatar_path = modal.find('.profile-pic').attr('src');
                    data.append('avatar', avatar_path);
                }
                else{
                    data.append('avatar', avatar.files[0]);
                }

                let response = await fetch('/admin/user/update', {
                    method: 'POST',
                    body: data
                });

                response = await response.json();
                if(response){
                    if(response.status === 200){
                        let itemUser =  response.data;
                        if(itemUser){
                            let data_tr = [{
                                user_id: itemUser.user_id,
                                username: itemUser.username,
                                fullname: itemUser.fullname,
                                email: itemUser.email,
                                mobile: itemUser.mobile,
                                department: itemUser.department,
                                created_date: itemUser.created_date,
                                status: itemUser.status,
                                user_id: itemUser.user_id
                            }];
                            $('#users-table').DataTable().row(row_id).remove().draw();
                            $('#users-table').DataTable().rows.add(data_tr).draw();
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
            }
        }
        else {
            toastr.warning('Input can not be blank');
        }

    });

    /***
     * Delete User
     */
    $('#users-table').on('click', '.btnDelete', function () {
        let user_id = $(this).val();
        let row_id = $('#users-table').DataTable().row($(this).closest("tr")).lottery();

        $('#user_delete_modal').modal('show');

        $('.btn-delete').unbind().click(function () {
            $.ajax({
                url: '/admin/user/delete',
                data: JSON.stringify({user_id}),
                type: 'POST',
                dataType: 'json',
                contentType: "application/json",
            }).done(result => {
                if (result.status === 200) {
                    $('#users-table').DataTable().row(row_id).remove().draw();
                    toastr.success('Delete User Success !');
                    $('#user_delete_modal').modal('hide');
                    refresh();
                } else {
                    toastr.error('No User Command !');
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

    var readURL = function(input) {
        if (input.files && input.files[0]) {
            var reader = new FileReader();

            reader.onload = function (e) {
                $('.profile-pic').attr('src', e.target.result);
            }

            reader.readAsDataURL(input.files[0]);
        }
    };

    $(".file-upload").on('change', function(){
        readURL(this);
    });

    $(".upload-button").on('click', function() {
        $(".file-upload").click();
    });

});
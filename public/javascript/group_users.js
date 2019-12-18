$(document).ready(function () {
    initActiveDragDrop();
    search_user();
    suggest_search_user();
    suggest_search_group();
    save_user_group();
    delete_user_group();
    reset_input_user();
});

function initActiveDragDrop() {
    $("#listUser, #userGroup").sortable({
        connectWith: ".connectList",
        update: function(event, ui) {
        }
    }).disableSelection();
}

function search_user() {
    $(document).on('click', '#searchUser', async () => {
        let data = {
            user_id: $.trim($('#selectedUserId').val())
        };
        const searchParams = new URLSearchParams();
        for (const prop in data) {
            searchParams.set(prop, data[prop]);
        }

        let response = await fetch('/admin/group-users/user-id/', {
            method: 'POST',
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: searchParams
        });

        response = await response.json();
        if (response.status === 200) {
            let data = response.data;
            updateListUser(data,$("#listUser"));
        }
    });
}

function updateListUser(users, item) {
    let strListUser = '';
    item.empty();
    for (let user of users) {
        strListUser += '<li class="danger-element" id="' + user.user_id + '">';
        strListUser += user.username + '<a href="#" class="delete-user-group"><i class="fa fa-remove text-danger"></i></a></li>';
    }
    item.append(strListUser);
}

function suggest_search_user() {
    let userData = {
        item: $('#userName'),
        itemId: $('#selectedUserId'),
        itemDisplay: $('#selectedUserName'),
        itemRefresh: $('#userNameRefesh'),
        url: 'group-users/user'
    };
    initAutoComplete(userData);
}

function reset_input_user() {
    $('#resetUser').click(() => {
        $('#listUser').empty();
        $('#selectedUserid').val('');
        $('#selectedUserName').val('');
        $('#userName').val('');
    });
}

function suggest_search_group() {
    let groupUserData = {
        item: $('#groupUser'),
        itemId: $('#selectedGroupUserId'),
        itemDisplay: $('#selectedGroupUserName'),
        itemRefresh: $('#groupUserRefesh'),
        url: 'group-users/group',
        extend: true
    };
    initAutoComplete(groupUserData);
}

function initAutoComplete(data) {
    let userInvalidate = function () {
        data.itemId.val('');
        data.itemDisplay.val('');
    };

    data.item.autocomplete({
        serviceUrl: data.url,
        noCache: true,
        minChars: 0,
        lookupFilter: (suggestion, originalQuery, queryLowerCase) => {
            let re = new RegExp('\\b' + $.Autocomplete.utils.escapeRegExChars(queryLowerCase), 'gi');
            return re.test(suggestion.value);
        },
        onSelect: (suggestion) => {
            data.itemId.val(suggestion.data);
            data.itemDisplay.val(suggestion.value);
            if (data.extend) {
                refreshListUserByGroupUser();
                extend(suggestion.data);
            }
        },
        onInvalidateSelection: function() {
            userInvalidate();
        }
    });

    data.itemRefresh.click(() => {
        userInvalidate();
        data.item.val('');
    });

    data.item.dblclick(() => {
        userInvalidate();
        $(this).val('');
        $(this).focus();
    });
}


async function extend(groupId) {
    let data = {
        id_group: groupId
    };

    const searchParams = new URLSearchParams();
    for (const prop in data) {
        searchParams.set(prop, data[prop]);
    }

    let response = await fetch('/admin/group-users/group-id', {
        method: 'POST',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: searchParams
    });

    response = await response.json();

    if (response.status === 200) {
        let data = response.suggestions;
        updateListUser(data, $("#userGroup"));
    }
}

function refreshListUserByGroupUser() {
    $('#userGroup').empty();
}

function save_user_group() {
    $(document).on('click', '#createUserGroup', async() => {
        let listUser = [];
        $('#group_modal').find('li').each(function () {
            listUser.push($(this).attr('id'));
        });

        let list_user = listUser.filter((item, index) => listUser.indexOf(item) === index);
        let id_group = $('#selectedGroupUserId').val();

        let data = {
            id_group,
            list_user
        };

        const searchParams = new URLSearchParams();
        for (const prop in data) {
            searchParams.set(prop, data[prop]);
        }

        let response = await fetch('/admin/group-users/save', {
            method: 'POST',
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: searchParams
        });

        response = await response.json();

        if(response.status === 200){
            toastr.success('Update Success');
        }
    })
}

function delete_user_group() {
    $('#group_modal').on('click', '.delete-user-group', async (e) => {
        let del_li = e.target.parentElement.parentElement;
        let id_group = $('#selectedGroupUserId').val();
        let data = {
            id_group,
            id_user: $(del_li).attr('id')
        };

        if(id_group == ''){
            toastr.error('Would you like user in group ?');
        }else {
            const searchParams = new URLSearchParams();
            for (const prop in data) {
                searchParams.set(prop, data[prop]);
            }

            let response = await fetch('/admin/group-users/delete', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                body: searchParams
            });

            response = await response.json();
            if(response.status === 200){
                $(del_li).remove();
                toastr.success('Delete user in group success ?');
            }
        }
    })
}
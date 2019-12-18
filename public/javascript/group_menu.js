$(document).ready(function () {
    initActiveDragDrop();
    search_menu();
    suggest_search_menu();
    suggest_search_group();
    save_menu_group();
    delete_menu_group();
    reset_input_menu();
});

function initActiveDragDrop() {
    $("#listMenu, #menuGroup").sortable({
        connectWith: ".connectList",
        update: function(event, ui) {
        }
    }).disableSelection();
}

function search_menu() {
    $(document).on('click', '#searchMenu', async () => {
        let data = {
            menu_id: $.trim($('#selectedMenuId').val())
        };
        const searchParams = new URLSearchParams();
        for (const prop in data) {
            searchParams.set(prop, data[prop]);
        }

        let response = await fetch('/admin/group-menu/menu-id/', {
            method: 'POST',
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: searchParams
        });

        response = await response.json();
        if (response.status === 200) {
            let data = response.data;
            updateListMenu(data,$("#listMenu"));
        }
    });
}

function updateListMenu(menus, item) {
    let strListMenu = '';
    item.empty();
    for (let menu of menus) {
        strListMenu += '<li class="danger-element" id="' + menu.idtbl_menu + '">';
        strListMenu += menu.label + ' <a href="#" class="delete-menu-group"><i class="fa fa-remove text-danger"></i></a></li>';
    }
    item.append(strListMenu);
}

function suggest_search_menu() {
    let menuData = {
        item: $('#menuName'),
        itemId: $('#selectedMenuId'),
        itemDisplay: $('#selectedMenuName'),
        itemRefresh: $('#menuNameRefesh'),
        url: 'group-menu/menu'
    };
    initAutoComplete(menuData);
}

function reset_input_menu() {
    $('#resetMenu').click(() => {
        $('#listMenu').empty();
        $('#selectedMenuid').val('');
        $('#selectedMenuName').val('');
        $('#menuName').val('');
    });
}

function suggest_search_group() {
    let groupMenuData = {
        item: $('#groupMenu'),
        itemId: $('#selectedGroupMenuId'),
        itemDisplay: $('#selectedGroupMenuName'),
        itemRefresh: $('#groupMenuRefesh'),
        url: 'group-menu/group',
        extend: true
    };
    initAutoComplete(groupMenuData);
}

function initAutoComplete(data) {
    let menuInvalidate = function () {
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
                refreshListMenuByGroupMenu();
                extend(suggestion.data);
            }
        },
        onInvalidateSelection: function() {
            menuInvalidate();
        }
    });

    data.itemRefresh.click(() => {
        menuInvalidate();
        data.item.val('');
    });

    data.item.dblclick(() => {
        menuInvalidate();
        $(this).val('');
        $(this).focus();
    });
}


async function extend(groupId) {
    let data = {
        group_id: groupId
    };

    const searchParams = new URLSearchParams();
    for (const prop in data) {
        searchParams.set(prop, data[prop]);
    }

    let response = await fetch('/admin/group-menu/group-id', {
        method: 'POST',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: searchParams
    });

    response = await response.json();

    if (response.status === 200) {
        let data = response.suggestions;
        updateListMenu(data, $("#menuGroup"));
    }
}

function refreshListMenuByGroupMenu() {
    $('#menuGroup').empty();
}

function save_menu_group() {
    $(document).on('click', '#createMenuGroup', async() => {
        let listMenu = [];
        $('#group_modal').find('li').each(function () {
            listMenu.push($(this).attr('id'));
        });

        let list_menu = listMenu.filter((item, index) => listMenu.indexOf(item) === index);
        let group_id = $('#selectedGroupMenuId').val();

        let data = {
            group_id,
            list_menu
        };

        const searchParams = new URLSearchParams();
        for (const prop in data) {
            searchParams.set(prop, data[prop]);
        }

        let response = await fetch('/admin/group-menu/save', {
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

function delete_menu_group() {
    $('#group_modal').on('click', '.delete-menu-group', (e) => {
        $('#menu_delete_modal').modal('show');
        $('.btn-delete').unbind().click(async () => {
            let del_li = e.target.parentElement.parentElement;
            let group_id = $('#selectedGroupMenuId').val();
            let data = {
                group_id,
                menu_id: $(del_li).attr('id')
            };

            if (group_id == '') {
                toastr.error('Would you like menu in group ?');
            } else {
                const searchParams = new URLSearchParams();
                for (const prop in data) {
                    searchParams.set(prop, data[prop]);
                }

                let response = await fetch('/admin/group-menu/delete', {
                    method: 'POST',
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded"
                    },
                    body: searchParams
                });

                response = await response.json();
                if (response.status === 200) {
                    $(del_li).remove();
                    $('#menu_delete_modal').modal('hide');
                    toastr.success('Delete menu in group success ?');
                }
            }
        });
    })
}
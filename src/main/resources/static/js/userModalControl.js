document.addEventListener('DOMContentLoaded', () => {
    document.body.addEventListener('click', async event => {
        const btn = event.target.closest('.edit-btn');
        if (!btn) return;

        const id = btn.getAttribute('data-id');
        const name = btn.getAttribute('data-name');
        const lastName = btn.getAttribute('data-lastname');
        const email = btn.getAttribute('data-email');

        // подтягиваем роли для последующего сохранения
        const responseUser = await fetch(`/api/users/get?id=${id}`);
        const userData = await responseUser.json();
        const roles = userData.roles;

        // ======= если кнопка в таблице (внутри таблицы есть class="main-content") =======
        const isFromTable = btn.closest('.main-content');

        if (isFromTable && document.getElementById('adminEditModal')) {
            document.getElementById('adminEditId').value = id;
            document.getElementById('adminEditName').value = name;
            document.getElementById('adminEditLastName').value = lastName;
            document.getElementById('adminEditEmail').value = email;

            const roleSelect = document.getElementById('adminRoles');
            Array.from(roleSelect.options).forEach(option => option.selected = false);

            userData.roles.forEach(role => {
                for (let option of roleSelect.options) {
                    if (option.text === role.name.replace('ROLE_', '')) {
                        option.selected = true;
                    }
                }
            });

            $('#adminEditModal').modal('show');
        } else {
            // редактирование своего профиля
            document.getElementById('editId').value = userData.id;
            document.getElementById('editName').value = userData.name;
            document.getElementById('editLastName').value = userData.lastName;
            document.getElementById('editEmail').value = userData.email;
            document.getElementById('editPassword').value = userData.password;

            $('#editModal').modal('show');
        }
        window._currentUserRoles = roles;
    });

    const form = document.getElementById('editProfileForm');
    if (form) {
        form.addEventListener('submit', async (event) => {
            event.preventDefault();

            const id = document.getElementById('editId').value;
            const name = document.getElementById('editName').value;
            const lastName = document.getElementById('editLastName').value;
            const email = document.getElementById('editEmail').value;
            const password = document.getElementById('editPassword').value;

            const roles = window._currentUserRoles || []; // полученные при открытии модалки

            const response = await fetch(`/api/users/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    id,
                    name,
                    lastName,
                    email,
                    password,
                    roles
                })
            });

            if (response.ok) {
                const updatedUser = await response.json();
                $('#editModal').modal('hide');

                // Обновляем sidebar
                document.getElementById('sidebarName').textContent = updatedUser.name;
                document.getElementById('sidebarLastName').textContent = updatedUser.lastName;
                document.getElementById('sidebarEmail').textContent = updatedUser.email;

                const rolesEl = document.getElementById('sidebarRoles');
                rolesEl.innerHTML = '';
                updatedUser.roles.forEach(role => {
                    const span = document.createElement('span');
                    span.textContent = role.name.replace('ROLE_', '') + ' ';
                    rolesEl.appendChild(span);
                });

                // 🔄 Добавить вот это:
                const currentUserId = document.body.getAttribute('data-current-user-id');
                const userRow = document.querySelector(`tr[data-user-id="${currentUserId}"]`);

                if (userRow) {
                    userRow.children[1].textContent = updatedUser.name;
                    userRow.children[2].textContent = updatedUser.lastName;
                    userRow.children[3].textContent = updatedUser.email;

                    const rolesCell = userRow.querySelector('.user-roles');
                    rolesCell.innerHTML = updatedUser.roles
                        .map(r => `<span>${r.name.replace('ROLE_', '')}</span>`)
                        .join(' ');
                }

                alert('Профиль обновлён');
            }
        });
    }

    const adminForm = document.getElementById('adminEditForm');
    if (adminForm) {
        adminForm.addEventListener('submit', async (event) => {
            event.preventDefault();

            const id = document.getElementById('adminEditId').value;

            const selectedRoles = Array.from(document.getElementById('adminRoles').selectedOptions)
                .map(opt => ({
                    id: parseInt(opt.value),
                    name: 'ROLE_' + opt.textContent.trim()
                }));

            const response = await fetch(`/api/users/${id}/roles`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(selectedRoles)
            });

            if (response.ok) {
                $('#adminEditModal').modal('hide');
                alert('Роли обновлены');

                const updatedRolesText = selectedRoles
                    .map(r => `<span>${r.name.replace('ROLE_', '')}</span>`)
                    .join(' ');

                const userRow = document.querySelector(`tr[data-user-id="${id}"]`);
                const rolesCell = userRow?.querySelector('.user-roles');

                if (rolesCell) {
                    rolesCell.innerHTML = updatedRolesText;
                    console.log('Роль изменена на: ', rolesCell);
                }

            } else {
                const error = await response.text();
                alert('Ошибка при обновлении ролей: ' + error);
            }
        });
    }
});

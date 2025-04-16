export function setupProfileForm() {
    // Обработчик кнопки "Редактировать профиль"
    document.body.addEventListener('click', async (event) => {
        const btn = event.target.closest('.edit-btn[data-target="#editModal"]');
        if (!btn) return;

        const id = btn.getAttribute('data-id');
        const responseUser = await fetch(`/api/user/getMyProfile`);
        const userData = await responseUser.json();

        document.getElementById('editId').value = userData.id;
        document.getElementById('editName').value = userData.name;
        document.getElementById('editLastName').value = userData.lastName;
        document.getElementById('editEmail').value = userData.email;
        document.getElementById('editPassword').value = '';

        window._currentUserRoles = userData.roles;

        $('#editModal').modal('show');
    });

    // Обработчик сабмита формы профиля
    const form = document.getElementById('editProfileForm');
    if (!form) return;

    form.addEventListener('submit', async (event) => {
        event.preventDefault();

        const id = document.getElementById('editId').value;
        const name = document.getElementById('editName').value;
        const lastName = document.getElementById('editLastName').value;
        const email = document.getElementById('editEmail').value;
        const password = document.getElementById('editPassword').value;
        const roles = window._currentUserRoles || [];

        const response = await fetch(`/api/user/updateMyProfile`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id, name, lastName, email, password, roles })
        });

        if (response.ok) {
            const updatedUser = await response.json();
            $('#editModal').modal('hide');

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

            const currentUserId = document.body.getAttribute('data-current-user-id');
            const userRow = document.querySelector(`tr[data-user-id="${currentUserId}"]`);
            if (userRow) {
                userRow.children[1].textContent = updatedUser.name;
                userRow.children[2].textContent = updatedUser.lastName;
                userRow.children[3].textContent = updatedUser.email;
                const rolesCell = userRow.querySelector('.user-roles');
                rolesCell.innerHTML = updatedUser.roles.map(r => `<span>${r.name.replace('ROLE_', '')}</span>`).join(' ');
            }

            alert('Профиль обновлён');
        } else {
            const error = await response.text();
            alert('Ошибка при обновлении: ' + error);
        }
    });
}
document.addEventListener('DOMContentLoaded', () => {
    let selectedUserId = null;

    // Обработка нажатия кнопки "Редактировать"
    document.body.addEventListener('click', async (e) => {
        if (e.target.classList.contains('edit-btn')) {
            selectedUserId = e.target.getAttribute('data-id');

            const res = await fetch(`/api/admin/users/${selectedUserId}`);
            const user = await res.json();

            document.getElementById('edit-user-id').value = user.id;
            document.getElementById('edit-firstName').value = user.name;
            document.getElementById('edit-lastName').value = user.lastName;
            document.getElementById('edit-email').value = user.email;
            document.getElementById('edit-password').value = '';

            const roleSelect = document.getElementById('edit-roles');
            Array.from(roleSelect.options).forEach(option => {
                option.selected = user.roles.some(r => r.name === option.value);
            });

            $('#editUserModal').modal('show');
        }
    });

    // Обработка отправки формы редактирования
    document.getElementById('edit-user-form').addEventListener('submit', async (e) => {
        e.preventDefault();

        const id = document.getElementById('edit-user-id').value;
        const name = document.getElementById('edit-firstName').value;
        const lastName = document.getElementById('edit-lastName').value;
        const email = document.getElementById('edit-email').value;
        const password = document.getElementById('edit-password').value;

        const selectedRoles = Array.from(document.getElementById('edit-roles').selectedOptions).map(opt => ({
            name: opt.value
        }));

        const user = {
            id,
            name,
            lastName,
            email,
            password: password || null, // не отправлять пустую строку
            roles: selectedRoles
        };

        const response = await fetch(`/api/admin/users`, {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(user)
        });

        if (response.ok) {
            $('#editUserModal').modal('hide');

            // обновляем таблицу
            const usersRes = await fetch('/api/admin/users');
            const users = await usersRes.json();
            renderTable(users, true);
        } else {
            alert('Ошибка при обновлении пользователя');
        }
    });
});

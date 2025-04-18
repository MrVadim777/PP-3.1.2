document.addEventListener('DOMContentLoaded', () => {
    let selectedUserId = null;

    // Слушаем все кнопки "Удалить"
    document.body.addEventListener('click', (e) => {
        if (e.target.classList.contains('delete-btn')) {
            selectedUserId = e.target.getAttribute('data-user-id');
            const row = e.target.closest('tr');

            const user = {
                id: row.children[0].textContent,
                name: row.children[1].textContent,
                lastName: row.children[2].textContent,
                email: row.children[3].textContent,
                roles: Array.from(row.children[4].querySelectorAll('span')).map(span => ({
                    name: span.textContent.includes('Администратор') ? 'ROLE_ADMIN' : 'ROLE_USER'
                }))
            };

            document.getElementById('delete-id').value = user.id;
            document.getElementById('delete-name').value = user.name;
            document.getElementById('delete-lastname').value = user.lastName;
            document.getElementById('delete-email').value = user.email;

            const rolesSelect = document.getElementById('delete-roles');
            rolesSelect.innerHTML = '';
            user.roles.forEach(role => {
                const option = document.createElement('option');
                option.text = role.name.replace('ROLE_', '');
                option.selected = true;
                rolesSelect.appendChild(option);
            });

            $('#deleteUserModal').modal('show');
        }
    });

    // Обработка подтверждения удаления
    const confirmDeleteBtn = document.getElementById('confirm-delete-btn');
    confirmDeleteBtn.addEventListener('click', async () => {
        if (!selectedUserId) return;

        if (+selectedUserId === window.currentUserId) {
            alert("Нельзя удалить самого себя");
            return;
        }

        try {
            const response = await fetch(`/api/admin/users/${selectedUserId}`, {
                method: 'DELETE'
            });

            if (response.ok) {
                $('#deleteUserModal').modal('hide');
                document.querySelector(`button[data-user-id="${selectedUserId}"]`).closest('tr').remove();
                selectedUserId = null;
            } else {
                alert('Ошибка при удалении пользователя');
            }
        } catch (error) {
            console.error('Ошибка при запросе:', error);
            alert('Произошла ошибка');
        }
    });
});

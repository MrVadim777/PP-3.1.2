document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('new-user-form');

    if (form) {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();

            const user = {
                name: document.getElementById('firstName').value,
                lastName: document.getElementById('lastName').value,
                email: document.getElementById('email').value,
                password: document.getElementById('password').value,
                roles: Array.from(document.getElementById('roles').selectedOptions).map(opt => ({
                    name: opt.value
                }))
            };

            const res = await fetch('/api/admin/users', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(user)
            });

            if (res.ok) {
                form.reset();

                // Переключаемся на вкладку таблицы
                document.getElementById('users-tab').click();

                // Загружаем пользователей и обновляем таблицу
                const usersRes = await fetch('/api/admin/users');
                const users = await usersRes.json();

                if (window.renderTable) {
                    window.renderTable(users, true);
                }
            } else {
                alert('Что-то пошло не так...');
            }
        });
    }
});

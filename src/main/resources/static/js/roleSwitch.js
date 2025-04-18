document.addEventListener('DOMContentLoaded', () => {
    const adminBtn = document.getElementById('admin-view-btn');
    const userBtn = document.getElementById('user-view-btn');
    const tableBody = document.querySelector('tbody');

    let currentUserRoles = [];
    let currentViewMode = 'user'; // начнем с пользовательского режима

    // Загружаем пользователя при загрузке страницы
    fetch('/api/user/getMyProfile')
        .then(res => res.json())
        .then(user => {
            currentUserRoles = user.roles.map(r => r.name);
            const isAdmin = currentUserRoles.includes('ROLE_ADMIN');

            updateHeader(user); // <== ВАЖНО

            if (!isAdmin) {
                hideAdminColumns();
                renderTable([user], false);
            } else {
                showAdminColumns();
                fetch('/api/admin/users')
                    .then(res => res.json())
                    .then(users => renderTable(users, true));
                currentViewMode = 'admin';
            }
        });

    if (adminBtn) {
        adminBtn.addEventListener('click', () => {
            currentViewMode = 'admin';

            fetch('/api/admin/users')
                .then(res => res.json())
                .then(users => renderTable(users, true));

            fetch('/api/user/getMyProfile')
                .then(res => res.json())
                .then(user => updateHeader(user));
        });
    }

    if (userBtn) {
        userBtn.addEventListener('click', () => {
            currentViewMode = 'user';

            fetch('/api/user/getMyProfile')
                .then(res => res.json())
                .then(user => {
                    hideAdminColumns();
                    renderTable([user], false);
                    updateHeader(user);
                });
        });
    }

    function renderTable(users, isAdminView) {
        tableBody.innerHTML = '';

        users.forEach(user => {
            const roles = user.roles.map(r =>
                r.name === 'ROLE_ADMIN' ? 'Администратор' :
                    r.name === 'ROLE_USER' ? 'Пользователь' :
                        r.name
            );

            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${user.id}</td>
                <td>${user.name}</td>
                <td>${user.lastName}</td>
                <td>${user.email}</td>
                <td>${roles.map(r => `<span class="badge ${r === 'Администратор' ? 'badge-danger' : 'badge-primary'} mr-1">${r}</span>`).join('')}</td>
                <td class="admin-only">
                    <button class="btn btn-primary btn-sm btn-block edit-btn" data-id="${user.id}">Редактировать</button>
                </td>
                <td class="admin-only">
                    <button class="btn btn-danger btn-sm btn-block delete-btn" data-user-id="${user.id}">Удалить</button>
                </td>
            `;
            tableBody.appendChild(tr);
        });

        if (!isAdminView) {
            hideAdminColumns();
        } else {
            showAdminColumns();
        }
    }

    function updateHeader(user) {
        const userInfo = document.querySelector('.user-info');
        const roles = user.roles.map(r => r.name);
        const fullName = `${user.name} ${user.lastName}`;

        let roleLabel = roles.includes('ROLE_ADMIN') ? 'Администратор' : 'Пользователь';
        let modeLabel = currentViewMode === 'admin' ? 'Режим: админ' : 'Режим: пользователь';

        userInfo.innerHTML = `${roleLabel}: ${fullName} <span class="text-muted" style="font-size: 0.9em;">[${modeLabel}]</span>`;
    }

    function hideAdminColumns() {
        document.querySelectorAll('.admin-only').forEach(el => el.style.display = 'none');
        document.getElementById('edit-header')?.style.setProperty('display', 'none');
        document.getElementById('delete-header')?.style.setProperty('display', 'none');
    }

    function showAdminColumns() {
        document.querySelectorAll('.admin-only').forEach(el => el.style.display = '');
        document.getElementById('edit-header')?.style.setProperty('display', '');
        document.getElementById('delete-header')?.style.setProperty('display', '');
    }
});

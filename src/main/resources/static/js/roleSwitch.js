document.addEventListener('DOMContentLoaded', () => {
    const adminBtn = document.getElementById('admin-view-btn');
    const userBtn = document.getElementById('user-view-btn');
    const tableBody = document.querySelector('#users-tbody');
    const tableContainer = document.querySelector('.main-content');
    const panelTitle = document.getElementById('panel-title');
    const userInfo = document.querySelector('.user-info');

    let currentViewMode = 'user';
    let currentUserRoles = [];

    function fadeOut(el, callback) {
        el.classList.remove('fade-in');
        el.classList.add('fade-out');
        setTimeout(callback, 200);
    }

    function fadeIn(el) {
        el.classList.remove('fade-out');
        el.classList.add('fade-in');
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

            let rowHtml = `
                <td>${user.id}</td>
                <td>${user.name}</td>
                <td>${user.lastName}</td>
                <td>${user.email}</td>
                <td class="roles-cell text-center">
                ${roles.map(r => `<div><span class="badge ${r === 'Администратор' ? 'badge-danger' : 'badge-primary'}">
                ${r}</span></div>`).join('')}</td>
    
            `;

            if (isAdminView) {
                rowHtml += `
                    <td><button class="btn btn-primary btn-sm btn-block">Редактировать</button></td>
                    <td><button class="btn btn-danger btn-sm btn-block delete-btn" data-user-id="${user.id}">Удалить</button></td>
                `;
            }

            tr.innerHTML = rowHtml;
            tableBody.appendChild(tr);
        });

        toggleAdminElements(isAdminView);
    }
    window.renderTable = renderTable;

    function toggleAdminElements(show) {
        document.querySelectorAll('.admin-only').forEach(el => {
            el.style.display = show ? '' : 'none';
        });

        document.getElementById('edit-header')?.style.setProperty('display', show ? '' : 'none');
        document.getElementById('delete-header')?.style.setProperty('display', show ? '' : 'none');
    }

    function updateHeader(user) {
        const fullName = `${user.name} ${user.lastName}`;
        const isAdmin = user.roles.some(r => r.name === 'ROLE_ADMIN');

        const roleLabel = isAdmin ? 'Администратор' : 'Пользователь';
        const modeLabel = currentViewMode === 'admin' ? 'Режим: админ' : 'Режим: пользователь';

        userInfo.innerHTML = `${roleLabel}: ${fullName} <span class="text-muted" style="font-size: 0.9em;">[${modeLabel}]</span>`;
        panelTitle.textContent = currentViewMode === 'admin' ? 'Панель Администратора' : 'Панель Пользователя';
    }

    function switchToAdmin() {
        currentViewMode = 'admin';
        fadeOut(tableContainer, () => {
            Promise.all([
                fetch('/api/admin/users').then(r => r.json()),
                fetch('/api/user/getMyProfile').then(r => r.json())
            ]).then(([users, user]) => {
                renderTable(users, true);
                updateHeader(user);
                fadeIn(tableContainer);
            });
        });
    }

    function switchToUser() {
        currentViewMode = 'user';
        fadeOut(tableContainer, () => {
            fetch('/api/user/getMyProfile')
                .then(r => r.json())
                .then(user => {
                    renderTable([user], false);
                    updateHeader(user);
                    fadeIn(tableContainer);
                });
        });
    }

    // Первичная загрузка
    fetch('/api/user/getMyProfile')
        .then(res => res.json())
        .then(user => {
            window.currentUserId = user.id;
            currentUserRoles = user.roles.map(r => r.name);
            if (currentUserRoles.includes('ROLE_ADMIN')) {
                switchToAdmin();
            } else {
                switchToUser();
            }
        });

    adminBtn?.addEventListener('click', () => {
        if (currentViewMode !== 'admin') switchToAdmin();
    });

    userBtn?.addEventListener('click', () => {
        if (currentViewMode !== 'user') switchToUser();
    });
});

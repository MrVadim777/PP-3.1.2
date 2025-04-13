export function setupAdminForm() {

    document.querySelectorAll('.edit-btn[data-target="#adminEditModal"]')
        .forEach(btn => btn.addEventListener('click', () => {
            const id = btn.getAttribute('data-id');
            const name = btn.getAttribute('data-name');
            const lastName = btn.getAttribute('data-lastname');
            const email = btn.getAttribute('data-email');
            const rolesStr = btn.getAttribute('data-roles') || "";
            const roleNames = rolesStr.split(',');

            document.getElementById('adminEditId').value = id;
            document.getElementById('adminEditName').value = name;
            document.getElementById('adminEditLastName').value = lastName;
            document.getElementById('adminEditEmail').value = email;

            const roleSelect = document.getElementById('adminRoles');
            Array.from(roleSelect.options).forEach(option => {
                const fullRole = 'ROLE_' + option.textContent.trim();
                option.selected = roleNames.includes(fullRole);
            });

            $('#adminEditModal').modal('show');
        }));

    const adminForm = document.getElementById('adminEditForm');
    if (!adminForm) return;

    adminForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        const id = document.getElementById('adminEditId').value;
        const selectedRoles = Array.from(document.getElementById('adminRoles').selectedOptions)
            .map(opt => ({
                id: parseInt(opt.value),
                name: 'ROLE_' + opt.textContent.trim()
            }));

        const response = await fetch(`/api/admin/users/${id}/roles`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
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
            if (rolesCell) rolesCell.innerHTML = updatedRolesText;
        } else {
            const error = await response.text();
            alert('Ошибка при обновлении ролей: ' + error);
        }
    });
}

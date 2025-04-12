document.addEventListener('DOMContentLoaded', () => {
    document.body.addEventListener('click', (event) => {
        const target = event.target;
        if (target.classList.contains('edit-btn')) {
            const id = target.getAttribute('data-id');
            const name = target.getAttribute('data-name');
            const lastName = target.getAttribute('data-lastname');
            const email = target.getAttribute('data-email');
            openEditModal(id, name, lastName, email);
        }
    });
});

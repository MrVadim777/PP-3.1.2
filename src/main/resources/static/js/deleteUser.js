export function setupDeleteButtons() {
    const table = document.querySelector('.table');
    const currentUserId = document.body.getAttribute('data-current-user-id');

    table.addEventListener('click', async (event) => {
        const target = event.target;

        if (target.classList.contains('delete-btn')) {
            const userId = target.getAttribute('data-user-id');

            if (userId === currentUserId) {
                alert('Вы не можете удалить самого себя.');
                return;
            }

            if (confirm('Вы уверены, что хотите удалить пользователя?')) {
                try {
                    const response = await fetch(`/api/users/${userId}`, {
                        method: 'DELETE',
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    });

                    if (response.ok) {
                        const row = target.closest('tr');
                        row.remove();
                    } else {
                        const errorText = await response.text();
                        alert('Ошибка при удалении: ' + errorText);
                    }
                } catch (error) {
                    console.error('Ошибка запроса:', error);
                    alert('Ошибка при удалении пользователя.');
                }
            }
        }
    });
}

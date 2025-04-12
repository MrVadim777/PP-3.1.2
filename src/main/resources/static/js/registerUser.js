export function setupRegisterForm() {
    const form = document.getElementById('registerForm');
    if (!form) return;

    form.addEventListener('submit', async (event) => {
        event.preventDefault();
        console.log('[registerUser.js] Форма отправлена');

        const name = document.getElementById('registerName').value;
        const lastName = document.getElementById('registerLastName').value;
        const email = document.getElementById('registerEmail').value;
        const password = document.getElementById('registerPassword').value;

        // Устанавливаем роль по умолчанию — USER
        const selectedRoles = [{ name: 'ROLE_USER' }];

        const response = await fetch('/api/users', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, lastName, email, password, roles: selectedRoles })
        });

        if (response.ok) {
            $('#registerModal').modal('hide');
            alert('Пользователь зарегистрирован');
            console.log('[registerUser.js] Пользователь зарегистрирован, перенаправление...');
            window.location.href = '/user'; // 👈 редирект вручную
        } else {
            const error = await response.text();
            alert('Ошибка регистрации: ' + error);
        }
    });
}

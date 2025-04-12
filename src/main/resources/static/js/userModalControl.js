import { setupDeleteButtons } from './deleteUser.js';
import { setupProfileForm } from './editProfile.js';
import { setupAdminForm } from './editUserAdmin.js';

document.addEventListener('DOMContentLoaded', () => {
    if (document.querySelector('.table')) {
        setupDeleteButtons();
    }
    if (document.getElementById('editProfileForm')) {
        setupProfileForm();
    }
    if (document.getElementById('adminEditForm')) {
        setupAdminForm();
    }
});

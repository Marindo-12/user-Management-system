import { UserManager } from './models/UserManager.js';
import { UIManager } from './ui/UIManager.js';
import { Toast } from './ui/Toast.js';

document.addEventListener('DOMContentLoaded', async () => {
  try {
    const userManager = new UserManager();

    const existingUsers = userManager.getAll();
    if (existingUsers.length === 0) {
      try {
        const response = await fetch('data.json');
        if (response.ok) {
          const data = await response.json();
          for (const user of data.users) {
            await userManager.addUser(user);
          }
          Toast.info('Données initiales chargées depuis data.json');
        }
      } catch {
        Toast.error('Impossible de charger les données initiales');
      }
    }

    const ui = new UIManager(userManager, 'user-form', 'users-table');

    ui.render();

  } catch (error) {
    console.error('Erreur d’initialisation :', error);
    Toast.error('Erreur critique lors du démarrage');
  }
});

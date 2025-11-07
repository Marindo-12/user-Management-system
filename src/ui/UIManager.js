import { Toast } from './Toast.js';

export class UIManager {
  constructor(userM, formId, tableId) {
    this.userM = userM;
    this.form = document.getElementById(formId);
    this.table = document.getElementById(tableId);

    this.FormSubmit = this.FormSubmit.bind(this);
    this.onTableClick = this.onTableClick.bind(this);

    this.form.addEventListener('submit', this.FormSubmit);

    this.tbody = this.table.querySelector('tbody');

    this.tbody.addEventListener('click', this.onTableClick);
  }

  onTableClick(e) {
    const target = e.target;
    if (target.classList.contains('edit')) {
      this.editUser(parseInt(target.dataset.id, 10));
    } else if (target.classList.contains('delete')) {
      this.confirmDelete(parseInt(target.dataset.id, 10));
    }
  }

  async FormSubmit(e) {
    e.preventDefault();

    const idRaw = this.form.querySelector('#user-id').value;
    const id = idRaw ? parseInt(idRaw, 10) : NaN;
    const name = this.form.querySelector('#name').value.trim();
    const email = this.form.querySelector('#email').value.trim();
    const ageRaw = this.form.querySelector('#age').value;
    const age = ageRaw ? parseInt(ageRaw, 10) : NaN;

    if (!name) {
      Toast.error('Le nom est obligatoire');
      return;
    }
    if (!email) {
      Toast.error('L\'email est obligatoire');
      return;
    }
    if (isNaN(age) || age <= 0) {
      Toast.error('L\'âge est invalide');
      return;
    }

    try {
      if (!isNaN(id)) {
        await this.userM.updateUser(id, { name, email, age });
        Toast.success('Utilisateur mis à jour');
      } else {
        await this.userM.addUser({ name, email, age });
        Toast.success('Utilisateur ajouté');
      }
      this.clearForm();
      this.render();
    } catch (err) {
      Toast.error(err.message || 'Erreur inconnue');
      console.error(err);
    }
  }

  editUser(id) {
    try {
      const user = this.userM.getUser(id);
      this.form.querySelector('#user-id').value = user.id;
      this.form.querySelector('#name').value = user.name;
      this.form.querySelector('#email').value = user.email;
      this.form.querySelector('#age').value = user.age;
      Toast.info('Mode édition activé');
    } catch (err) {
      Toast.error(err.message || 'Utilisateur introuvable');
    }
  }

  async confirmDelete(id) {
    if (!confirm('Voulez-vous vraiment supprimer cet utilisateur ?')) return;
    try {
      await this.userM.deleteUser(id);
      Toast.success('Utilisateur supprimé');
      this.render();
    } catch (err) {
      Toast.error(err.message || 'Erreur suppression');
    }

    const utl = document.querySelector('.utl-su');
    
    utl.classList.add('active');
  }

  clearForm() {
    this.form.reset();
    const hid = this.form.querySelector('#user-id');
    if (hid) hid.value = '';
  }

  render() {
    const users = this.userM.getAll();
    if (!this.tbody) {
      console.error('tbody introuvable dans la table');
      return;
    }
    this.tbody.innerHTML = '';

    users.forEach(user => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td>${user.id}</td>
        <td>${user.name}</td>
        <td>${user.email}</td>
        <td>${user.age}</td>
        <td>
          <button class="edit" data-id="${user.id}">Editer</button>
          <button class="delete" data-id="${user.id}">Supprimer</button>
        </td>
      `;
      this.tbody.appendChild(tr);
    });
  }
}

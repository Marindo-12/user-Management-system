export class Toast {
  static show(message, type = 'info') {
    const old = document.querySelector('.modal-overlay');
    if (old) old.remove();

    const overlay = document.createElement('div');
    overlay.className = 'modal-overlay';

    const popup = document.createElement('div');
    popup.className = `modal-box ${type}`;
    popup.innerHTML = `
      <p>${message}</p>
    `;

    overlay.appendChild(popup);
    document.body.appendChild(overlay);

    requestAnimationFrame(() => overlay.classList.add('active'));

    setTimeout(() => {
      overlay.classList.remove('active');
      setTimeout(() => overlay.remove(), 400);
    }, 3000);
  }

  static success(msg) {
    this.show(msg, 'success');
  }

  static error(msg) {
    this.show(msg, 'error');
  }

  static info(msg) {
    this.show(msg, 'info');
  }
}

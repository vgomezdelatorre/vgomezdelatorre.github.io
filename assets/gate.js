(function () {
  var STORAGE_KEY = 'vgdlt_unlocked';
  var PASSWORD_HASH = 'f6cace02ce5c079c41c7394b948a6a69844a563a3acb3a8d936cb11d165878bd';

  function unlock() {
    document.documentElement.classList.remove('gate-active');
    try { localStorage.setItem(STORAGE_KEY, '1'); } catch (e) {}
  }

  async function sha256Hex(text) {
    var data = new TextEncoder().encode(text);
    var digest = await crypto.subtle.digest('SHA-256', data);
    return Array.prototype.map
      .call(new Uint8Array(digest), function (b) { return b.toString(16).padStart(2, '0'); })
      .join('');
  }

  document.addEventListener('DOMContentLoaded', function () {
    var form = document.getElementById('gate-form');
    var input = document.getElementById('gate-input');
    var error = document.getElementById('gate-error');
    if (!form) return;

    form.addEventListener('submit', function (evt) {
      evt.preventDefault();
      sha256Hex(input.value).then(function (hex) {
        if (hex === PASSWORD_HASH) {
          unlock();
        } else {
          error.classList.add('show');
          input.select();
        }
      });
    });
  });
})();

(function () {
  var input = document.getElementById('json-tool-input');
  var output = document.getElementById('json-tool-output');
  var errEl = document.getElementById('json-tool-error');
  var copyBtn = document.getElementById('json-tool-copy');
  if (!input || !output || !errEl) return;

  var debounceTimer;

  function setError(msg) {
    if (msg) {
      errEl.textContent = msg;
      errEl.hidden = false;
      output.textContent = '';
    } else {
      errEl.textContent = '';
      errEl.hidden = true;
    }
  }

  function format() {
    var raw = input.value.trim();
    if (!raw) {
      setError('');
      output.textContent = '';
      return;
    }
    try {
      var parsed = JSON.parse(raw);
      setError('');
      output.textContent = JSON.stringify(parsed, null, 2);
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e));
    }
  }

  function debouncedFormat() {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(format, 120);
  }

  input.addEventListener('input', debouncedFormat);
  input.addEventListener('paste', function () {
    setTimeout(format, 0);
  });

  if (copyBtn) {
    copyBtn.addEventListener('click', function () {
      var text = output.textContent;
      if (!text) return;
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(function () {
          var prev = copyBtn.textContent;
          copyBtn.textContent = '已复制';
          setTimeout(function () {
            copyBtn.textContent = prev;
          }, 1500);
        });
      } else {
        var ta = document.createElement('textarea');
        ta.value = text;
        document.body.appendChild(ta);
        ta.select();
        try {
          document.execCommand('copy');
          copyBtn.textContent = '已复制';
          setTimeout(function () {
            copyBtn.textContent = '复制';
          }, 1500);
        } finally {
          document.body.removeChild(ta);
        }
      }
    });
  }
})();

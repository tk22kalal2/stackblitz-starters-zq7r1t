export function initializeEditor() {
  tinymce.init({
    selector: '#notesEditor',
    plugins: [
      'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
      'searchreplace', 'visualblocks', 'code', 'fullscreen',
      'insertdatetime', 'media', 'table', 'help', 'wordcount'
    ],
    toolbar: 'undo redo | formatselect | ' +
      'bold italic backcolor | alignleft aligncenter ' +
      'alignright alignjustify | bullist numlist outdent indent | ' +
      'removeformat | image | help',
    height: 500,
    menubar: true,
    image_title: true,
    automatic_uploads: true,
    file_picker_types: 'image',
    readonly: false,
    content_style: 'body { font-family: Arial, sans-serif; font-size: 14px; }',
    branding: false,
    promotion: false,
    file_picker_callback: function (cb, value, meta) {
      const input = document.createElement('input');
      input.setAttribute('type', 'file');
      input.setAttribute('accept', 'image/*');

      input.onchange = function () {
        const file = this.files[0];
        const reader = new FileReader();
        reader.onload = function () {
          const id = 'blobid' + (new Date()).getTime();
          const blobCache = tinymce.activeEditor.editorUpload.blobCache;
          const base64 = reader.result.split(',')[1];
          const blobInfo = blobCache.create(id, file, base64);
          blobCache.add(blobInfo);
          cb(blobInfo.blobUri(), { title: file.name });
        };
        reader.readAsDataURL(file);
      };

      input.click();
    },
    setup: function(editor) {
      editor.on('init', function() {
        editor.setMode('design');
      });
    }
  });
}

export function updateEditorContent(content) {
  const maxAttempts = 50;
  let attempts = 0;
  
  const checkEditor = setInterval(() => {
    const editor = tinymce.get('notesEditor');
    if (editor && editor.initialized) {
      clearInterval(checkEditor);
      editor.setContent(content);
      editor.setMode('design');
    }
    
    attempts++;
    if (attempts >= maxAttempts) {
      clearInterval(checkEditor);
      console.error('Failed to initialize TinyMCE editor');
    }
  }, 100);
}
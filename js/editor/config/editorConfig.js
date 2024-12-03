export const editorConfig = {
  selector: '#notesEditor',
  plugins: [
    'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
    'searchreplace', 'visualblocks', 'code', 'fullscreen',
    'insertdatetime', 'media', 'table', 'help', 'wordcount'
  ],
  toolbar: 'undo redo | styles | bold italic forecolor backcolor | ' +
    'alignleft aligncenter alignright alignjustify | ' +
    'bullist numlist | image | removeformat',
  height: 500,
  menubar: true,
  image_title: true,
  automatic_uploads: true,
  file_picker_types: 'image',
  content_style: `
    body { font-family: Arial, sans-serif; font-size: 14px; }
    .mce-content-body[data-mce-placeholder]:not(.mce-visualblocks)::before {
      color: #999;
    }
  `,
  branding: false,
  promotion: false,
  readonly: false
};
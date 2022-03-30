import React from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import './QuillEditor.scss';

function QuillEditor({ value, onChange, className }) {
  const modules = {
    toolbar: [
      ['bold', 'italic', 'underline', 'strike'], // toggled buttons
      ['blockquote', 'code-block'],
      [{ list: 'ordered' }, { list: 'bullet' }],
      [{ script: 'sub' }, { script: 'super' }], // superscript/subscript
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      [{ color: [] }, { background: [] }], // dropdown with defaults from theme
      [{ align: [] }],
      ['clean'],
    ],
  };
  return (
    <div>
      <ReactQuill
        theme="snow"
        modules={modules}
        value={value}
        onChange={onChange}
        className={className}
      />
    </div>
  );
}

export default QuillEditor;

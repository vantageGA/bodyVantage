import React, { useEffect, useRef } from 'react';
import Quill from 'quill';
import 'quill/dist/quill.snow.css';
import './QuillEditor.scss';

const modules = {
  toolbar: [
    ['bold', 'italic', 'underline', 'strike'],
    ['blockquote', 'code-block'],
    [{ list: 'ordered' }, { list: 'bullet' }],
    [{ script: 'sub' }, { script: 'super' }],
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    [{ color: [] }, { background: [] }],
    [{ align: [] }],
    ['clean'],
  ],
};

function QuillEditor({ value = '', onChange, className }) {
  const editorRef = useRef(null);
  const quillInstance = useRef(null);

  // Initialize Quill once
  useEffect(() => {
    if (!editorRef.current) return;

    quillInstance.current = new Quill(editorRef.current, {
      theme: 'snow',
      modules,
    });

    const handler = () => {
      const html = quillInstance.current.root.innerHTML;
      onChange && onChange(html);
    };

    quillInstance.current.on('text-change', handler);

    // Set initial value
    quillInstance.current.root.innerHTML = value || '';

    return () => {
      quillInstance.current?.off('text-change', handler);
      quillInstance.current = null;
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Keep external value in sync
  useEffect(() => {
    if (!quillInstance.current) return;
    const currentHtml = quillInstance.current.root.innerHTML;
    if (value !== currentHtml) {
      quillInstance.current.root.innerHTML = value || '';
    }
  }, [value]);

  return <div ref={editorRef} className={className} />;
}

export default QuillEditor;

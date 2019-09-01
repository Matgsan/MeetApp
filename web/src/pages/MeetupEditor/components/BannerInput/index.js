import React, { useState, useRef, useEffect } from 'react';
import { useField } from '@rocketseat/unform';
import { toast } from 'react-toastify';
import { MdCameraAlt } from 'react-icons/md';
import { Container } from './styles';
import api from '~/services/api';

export default function BannerInput() {
  const { defaultValue, registerField } = useField('file');
  const [file, setFile] = useState(defaultValue && defaultValue.id);
  const [preview, setPreview] = useState(defaultValue && defaultValue.url);
  const ref = useRef();

  useEffect(() => {
    if (ref.current) {
      registerField({
        name: 'file_id',
        ref: ref.current,
        path: 'dataset.file',
      });
    }
  }, [ref]);//eslint-disable-line


  async function handleChange(e) {
    const data = new FormData();
    data.append('file', e.target.files[0]);
    try {
      const response = await api.post('files', data);

      const { id, url } = response.data;
      setPreview(url);
      setFile(id);
    } catch (err) {
      toast.error('Ocorreu um erro ao fazer o upload do seu avatar.');
    }
  }
  return (
    <Container>
      <label htmlFor="file">
        <input
          name="file"
          type="file"
          id="file"
          accept="image/*"
          data-file={file}
          onChange={handleChange}
          ref={ref}
        />
        {preview ? (
          <img src={preview} alt="User" />
        ) : (
          <>
            <MdCameraAlt size={54} color="#FFF" />
            <p>Selecionar imagem</p>
          </>
        )}
      </label>
    </Container>
  );
}

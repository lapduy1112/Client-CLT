'use client';
import {
  DialogTitle,
  Divider,
  Modal,
  ModalDialog,
  DialogActions,
  Button,
  Avatar,
} from '@mui/joy';
import { Stack } from '@mui/material';
import { useRef, useState, useCallback } from 'react';
import React from 'react';
import { useDropzone } from 'react-dropzone';
import Image from 'next/image';
import EasyCrop from '../crop/ImageCrop';
import { uploadImage } from '@/libs/common/utils/fetch';
import { toast } from 'react-toastify';
import { useStore } from '@/providers/ZustandProvider';
import { useMutation } from '@tanstack/react-query';
import { b64toBlob } from '@/libs/common/utils/b64ToBlob';
import axios, { AxiosError } from 'axios';
import { getErrorMessage } from '@/libs/common/utils/error';
import { useQueryClient } from '@tanstack/react-query';
import { PermissionInterface } from '@/libs/common/interfaces/permission.interface';
import { UserInterface } from '@/libs/common/interfaces/user.interface';
export default function UploadImageModal({
  open,
  setOpen,
  id,
  setSelectedId,
}: {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  id: string;
  setSelectedId: React.Dispatch<React.SetStateAction<string>>;
}) {
  const setUser = useStore((state) => state.setUser);
  const queryClient = useQueryClient();
  const filePickerRef = useRef<HTMLInputElement>(null);
  const [croppedImage, setCroppedImage] = useState<string | null>(null);
  const mutation = useMutation({
    mutationFn: uploadImage,
    onSuccess: (data: any) => {
      queryClient.setQueryData(['user', { id: data.id }], data);
      queryClient.invalidateQueries({
        queryKey: ['users'],
      });
      toast.success('User Updated successfully');
      console.log('data', data);
      const permission: PermissionInterface[] = [];
      for (let i = 0; i < data.role.permission.length; i++) {
        permission.push({
          action: data.role.permission[i].action,
          object: data.role.permission[i].object,
          possession: data.role.permission[i].possession,
        });
      }
      const user: UserInterface = {
        ...data,
        role: data.role.role,
        permission: permission,
      };
      setUser(user);
    },
    onError: (error: Error | AxiosError) => {
      if (axios.isAxiosError(error)) {
        toast.error(getErrorMessage(error?.response?.data));
      } else {
        toast.error(getErrorMessage(error));
      }
    },
  });
  const [imageFile, setImageFile] = useState<{
    file: File | null;
    ImageURL: string | null;
  }>({ file: null, ImageURL: null });
  const onDrop = useCallback((acceptedFiles: any) => {
    if (acceptedFiles[0]) {
      setImageFile({
        file: acceptedFiles[0],
        ImageURL: URL.createObjectURL(acceptedFiles[0]),
      });
    }
  }, []);
  const { getRootProps } = useDropzone({
    noClick: true,
    onDrop,
    accept: {
      'image/jpeg': [],
      'image/png': [],
      'image/jpg': [],
    },
  });
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setImageFile({ file, ImageURL: URL.createObjectURL(file) });
    }
  };
  const resetImageFile = () => {
    if (filePickerRef.current) {
      filePickerRef.current.value = '';
    }
    setImageFile({ file: null, ImageURL: null });
  };
  const handleUpload = async () => {
    if (!croppedImage) return;
    const file = b64toBlob(croppedImage);
    const name = imageFile?.file?.name || new Date().toISOString();
    const avatar = new File([file], name, { type: 'image/jpeg' });
    mutation.mutate({ avatar: avatar, id });
    setSelectedId('');
    resetImageFile();
    setCroppedImage(null);
    setOpen(false);
  };
  return (
    <>
      <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        ref={filePickerRef}
        hidden
      />
      <Modal
        open={open}
        onClose={() => {
          setOpen(false);
          setSelectedId('');
          resetImageFile();
          setCroppedImage(null);
        }}
      >
        <ModalDialog variant="outlined" role="alertdialog">
          <DialogTitle>Upload Your Profile</DialogTitle>
          <Divider />
          {!imageFile.ImageURL && !croppedImage && (
            <>
              <Stack
                spacing={2}
                direction="column"
                sx={{
                  minWidth: '600px',
                  minHeight: '200px',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <div {...getRootProps()}>
                  <div className="flex justify-center">
                    <Avatar
                      variant="plain"
                      sx={{
                        '--Avatar-size': '90px',
                      }}
                    />
                  </div>
                </div>
                <h2 className="text-center mt-4">Drag photo here</h2>
              </Stack>
              <Divider>Or</Divider>
              <DialogActions>
                <Stack
                  direction="row"
                  spacing={2}
                  sx={{
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <Button
                    sx={{ backgroundColor: '#000000' }}
                    variant="solid"
                    color="neutral"
                    onClick={() =>
                      filePickerRef.current && filePickerRef.current.click()
                    }
                  >
                    Upload Image
                  </Button>
                  <Button
                    variant="plain"
                    color="neutral"
                    onClick={() => {
                      setOpen(false), setSelectedId('');
                      resetImageFile();
                      setCroppedImage(null);
                    }}
                  >
                    Cancel
                  </Button>
                </Stack>
              </DialogActions>
            </>
          )}
          {imageFile.ImageURL && !croppedImage && (
            <EasyCrop
              image={imageFile.ImageURL}
              setCroppedImage={setCroppedImage}
              resetImageFile={resetImageFile}
            />
          )}
          {croppedImage && (
            <Stack spacing={2} direction="column" justifyContent="center">
              <div className="flex justify-center mt-4">
                <Image
                  src={croppedImage || ''}
                  width={0}
                  height={0}
                  alt="user"
                  style={{
                    width: '50%',
                    height: 'auto',
                    borderRadius: '9999px',
                  }}
                ></Image>
              </div>
              <Divider />
              <DialogActions>
                <Stack
                  direction="row"
                  spacing={2}
                  sx={{
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <Button
                    form="udpatedForm"
                    sx={{ backgroundColor: '#000000' }}
                    variant="solid"
                    color="neutral"
                    onClick={handleUpload}
                  >
                    Save as profile image
                  </Button>
                  <Button
                    variant="plain"
                    color="neutral"
                    onClick={() => {
                      setCroppedImage(null);
                    }}
                  >
                    Cancel
                  </Button>
                </Stack>
              </DialogActions>
            </Stack>
          )}
        </ModalDialog>
      </Modal>
    </>
  );
}
{
  /* {imageFile.ImageURL ? (
              <div className="flex justify-center mt-4">
                <Image
                  src={imageFile.ImageURL || ''}
                  width={0}
                  height={0}
                  alt="user"
                  style={{ width: '50%', height: 'auto' }}
                ></Image>
              </div>
            ) : (
              <div {...getRootProps()}>
                <div className="flex justify-center">
                  <Avatar
                    variant="plain"
                    sx={{
                      '--Avatar-size': '90px',
                    }}
                  />
                </div>
              </div>
            )} */
}

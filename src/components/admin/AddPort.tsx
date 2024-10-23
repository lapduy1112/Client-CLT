"use client";
import React, { useState } from "react";
import {
  Button,
  Modal,
  ModalDialog,
  Typography,
  FormControl,
  FormLabel,
  Input,
} from "@mui/joy";
import { addPort, uploadImage } from "@/services/api";
import { toast } from "react-toastify";

interface AddPortProps {
  open: boolean;
  onClose: () => void;
  onPortAdded: (newPort: any) => void;
}

const AddPort: React.FC<AddPortProps> = ({ open, onClose, onPortAdded }) => {
  const [portName, setPortName] = useState<string>("");
  const [selectedImageFile, setSelectedImageFile] = useState<File | null>(null);
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    setSelectedImageFile(file);
  };
  const handleAddPort = async () => {
    if (!portName) {
      toast.error("Please insert Port name");
      return;
    }

    if (!selectedImageFile) {
      toast.error("Please select an image");
      return;
    }
    console.log(selectedImageFile);
    try {
      const formData = new FormData();
      if (selectedImageFile) {
        formData.append("image", selectedImageFile);
        const uploadResponse = await uploadImage(formData);
        const imageUrl = uploadResponse.data.url;
        console.log(selectedImageFile);
        const response = await addPort({
          address: portName,
          imageUrl: imageUrl,
        });

        onPortAdded(response);
        setPortName("");
        setSelectedImageFile(null);
        onClose();
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Error adding port");
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <ModalDialog>
        <Typography component="h2">Add New Port</Typography>
        <FormControl sx={{ mt: 2 }}>
          <FormLabel>Address</FormLabel>
          <Typography component="h4">
            Enter the address name, we will show the port based on the available
            information
          </Typography>
          <Input
            autoFocus
            fullWidth
            value={portName}
            onChange={(e) => setPortName(e.target.value)}
          />
        </FormControl>
        <FormControl sx={{ mt: 2 }}>
          <FormLabel>Upload Image</FormLabel>
          <Input type="file" onChange={handleImageChange} />
        </FormControl>
        <Button
          sx={{ mt: 2 }}
          onClick={handleAddPort}
          color="primary"
          variant="solid">
          Add
        </Button>
        <Button
          sx={{ mt: 2, mr: 1 }}
          onClick={onClose}
          color="neutral"
          variant="plain">
          Cancel
        </Button>
      </ModalDialog>
    </Modal>
  );
};

export default AddPort;

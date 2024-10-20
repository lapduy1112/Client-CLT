import React, { useCallback, useState } from 'react';
import Cropper from 'react-easy-crop';
import getCroppedImg from './Crop';
import CropRotateIcon from '@mui/icons-material/CropRotate';
import { Button, Stack } from '@mui/joy';
import styles from './cropContainer.module.css';
import { toast } from 'react-toastify';
function EasyCrop({
  image,
  setCroppedImage,
  resetImageFile,
}: {
  image: string;
  setCroppedImage: React.Dispatch<React.SetStateAction<string | null>>;
  resetImageFile: () => void;
}) {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);
  const changeRotation = () => {
    setRotation((prevState) => {
      return prevState + 90;
    });
  };
  const showCroppedImage = useCallback(async () => {
    try {
      const croppedImg = await getCroppedImg(
        image,
        croppedAreaPixels,
        rotation
      );
      setCroppedImage(croppedImg);
    } catch (e) {
      toast.error('Error cropping image');
    }
  }, [croppedAreaPixels, rotation, image, setCroppedImage]);

  return (
    <>
      <Stack spacing={2} direction="column" sx={{ minWidth: '600px' }}>
        <div className="flex justify-center">
          <div className={styles.cropContainer}>
            <Cropper
              image={image}
              crop={crop}
              rotation={rotation}
              zoom={zoom}
              zoomSpeed={1}
              maxZoom={18}
              zoomWithScroll={true}
              showGrid={false}
              objectFit={'contain'}
              cropShape={'round'}
              aspect={3 / 3}
              onCropChange={setCrop}
              onCropComplete={onCropComplete}
              onZoomChange={setZoom}
              onRotationChange={setRotation}
            />
          </div>
        </div>
        <Stack spacing={2} direction="column" justifyContent="center">
          <Button
            variant="plain"
            color="neutral"
            onClick={changeRotation}
            startDecorator={<CropRotateIcon />}
          >
            Rotate
          </Button>
          <Button variant="plain" color="neutral" onClick={showCroppedImage}>
            Next
          </Button>
          <Button variant="plain" color="neutral" onClick={resetImageFile}>
            Cancel
          </Button>
        </Stack>
      </Stack>
      <div className="cropped-image-container"></div>
    </>
  );
}

export default EasyCrop;

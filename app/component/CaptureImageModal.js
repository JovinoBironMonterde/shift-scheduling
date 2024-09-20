import React, { useState, useRef, useEffect } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Box } from '@mui/material';

function CaptureImageModal({ open, onClose, onCapture }) {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  // Start capturing from the webcam when the modal is opened
  useEffect(() => {
    if (open) {
      startCapture();
    } else {
      stopCapture();
    }
    // Cleanup when modal is closed
    return () => {
      stopCapture();
    };
  }, [open]);

  const startCapture = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      videoRef.current.srcObject = stream;
      videoRef.current.play();
    } catch (error) {
      console.error('Error accessing webcam:', error);
    }
  };

  const stopCapture = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject;
      const tracks = stream.getTracks();
      tracks.forEach((track) => track.stop()); // Stop all tracks (i.e., stop webcam)
    }
  };

  const captureImage = () => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
    const imageData = canvas.toDataURL('image/png');
    onCapture(imageData); // Pass the captured image back to parent
    onClose(); // Close modal after capturing
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Capture Image</DialogTitle>
      <DialogContent>
        <Box>
          <video ref={videoRef} style={{ width: '100%', maxHeight: '300px' }}></video>
          <canvas ref={canvasRef} style={{ display: 'none' }} width="320" height="240"></canvas>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={captureImage}>Take Photo</Button>
        <Button onClick={onClose}>Cancel</Button>
      </DialogActions>
    </Dialog>
  );
}

export default CaptureImageModal;

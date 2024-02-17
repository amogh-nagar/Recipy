"use client";
import { useRef, useState } from "react";
import classes from "./image-picker.module.css";
import Image from "next/image";
const ImagePicker = ({ name, label }) => {
  const pickRef = useRef();
  const [pickedImage, setPickedImage] = useState();
  function handlePickClick() {
    pickRef.current.click();
  }
  function handleImageChange(event) {
    const file = event.target.files[0];
    if (!file) return setPickedImage(null);
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = () => {
      setPickedImage(fileReader.result);
    };
  }
  return (
    <div className={classes.picker}>
      <label htmlFor={name}>{label}</label>
      <div className={classes.controls}>
        <div className={classes.preview}>
          {!pickedImage && <p>No Image Picked yet.</p>}
          {pickedImage && <Image src={pickedImage} alt="Selected Image" fill />}
        </div>
        <input
          ref={pickRef}
          className={classes.input}
          id={name}
          onChange={handleImageChange}
          type="file"
          accept="image/png, image/jpeg"
          name={name}
          required
        />
        <button
          onClick={handlePickClick}
          className={classes.button}
          type="button"
        >
          Pick an Image
        </button>
      </div>
    </div>
  );
};

export default ImagePicker;

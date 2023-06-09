import React from 'react';
import styles from './App.module.css';
import initialImage from './image-placeholder.png';
import IconUpload from './svg/IconUpload';
import IconDownload from './svg/IconDownload';

function App() {
  const [brightness, setBrightness] = React.useState(100); // 0-200%
  const [contrast, setContrast] = React.useState(100); // 0-1000%
  const [grayscale, setGrayscale] = React.useState(0); // 0-100%
  const [hueRotate, setHueRotate] = React.useState(0); // 0-360deg
  const [invert, setInvert] = React.useState(0); // 0-100%
  const [saturate, setSaturate] = React.useState(100); // 0-1000%
  const [sepia, setSepia] = React.useState(0); // 0-100%

  const [image, setImage] = React.useState('');

  const handleImageUpload = (event) => {
    if (event.target.files.length) {
      const file = event.target.files[0];
      const reader = new FileReader();

      reader.onload = () => {
        setImage(reader.result);
      };

      reader.readAsDataURL(file);
    }
  };

  const handleResetFilters = () => {
    setBrightness(100);
    setContrast(100);
    setGrayscale(0);
    setHueRotate(0);
    setInvert(0);
    setSaturate(100);
    setSepia(0);
  };

  const handleDownloadImage = () => {
    const canvasElement = document.createElement('canvas');
    const imageElement = new Image();
    imageElement.src = image ? image : initialImage;
    console.log(imageElement);
    imageElement.onload = () => {
      canvasElement.width = imageElement.width;
      canvasElement.height = imageElement.height;
      const context = canvasElement.getContext('2d');
      context.filter = `brightness(${brightness}%) grayscale(${grayscale}%) contrast(${contrast}%) hue-rotate(${hueRotate}deg) invert(${invert}%) saturate(${saturate}%) sepia(${sepia}%)`;
      context.drawImage(imageElement, 0, 0);
      console.log(context);
      const linkElement = document.createElement('a');
      linkElement.download = 'filtered-image.jpg';
      linkElement.href = canvasElement.toDataURL('image/jpg');
      console.log(linkElement);
      linkElement.click();
    };
  };

  return (
    <main>
      <h1 className={styles.titulo}>- Image Filters -</h1>
      <div className={styles.contentContainer}>
        <div className={styles.imageSide}>
          <div className={styles.fileInputContainer}>
            <label className={styles.inputFileButton} htmlFor='fileInput'>
              upload a picture
              <IconUpload />
            </label>
            <input
              className={styles.inputFileHidden}
              type='file'
              id='fileInput'
              name='fileInput'
              onChange={handleImageUpload}
            />
          </div>
          <div className={styles.imageContainer}>
            <img
              style={{
                filter: `brightness(${brightness}%) 
                        grayscale(${grayscale}%) 
                        contrast(${contrast}%)
                        hue-rotate(${hueRotate}deg)
                        invert(${invert}%)
                        saturate(${saturate}%)
                        sepia(${sepia}%)
                        `,
              }}
              src={image ? image : initialImage}
              className={styles.editableImage}
              alt='EditableImage'
            />
          </div>
          <button
            className={`${styles.resetButton} ${styles.downloadButton}`}
            onClick={handleDownloadImage}
          >
            <p>download</p>
            <IconDownload />
          </button>
        </div>
        <div className={styles.filterSide}>
          <div className={styles.resetButtonTopContainer}>
            <h3 className={styles.filterOptionsTitle}>
              <span className={styles.extendedTitleText}>
                ⚙️ Filter Options
              </span>
              <span className={styles.collapsedTitleText}>⚙️ Filters</span>
            </h3>
            <button
              onClick={handleResetFilters}
              className={`${styles.resetButton} ${styles.resetButtonTop}`}
            >
              reset filters
            </button>
          </div>
          <div className={styles.filterContainer}>
            <label className={styles.filterLabel}>
              <p>Brightness</p>
              <span>{brightness}%</span>
            </label>
            <input
              className={styles.slider}
              type='range'
              onChange={(event) => setBrightness(event.target.value)}
              min={0}
              max={200}
              step={1}
              value={brightness}
            ></input>
          </div>
          <div className={styles.filterContainer}>
            <label className={styles.filterLabel}>
              <p>Contrast</p>
              <span>{contrast}%</span>
            </label>
            <input
              className={styles.slider}
              type='range'
              onChange={(event) => setContrast(event.target.value)}
              min={0}
              max={1000}
              step={1}
              value={contrast}
            ></input>
          </div>
          <div className={styles.filterContainer}>
            <label className={styles.filterLabel}>
              <p>Grayscale</p>
              <span>{grayscale}%</span>
            </label>
            <input
              className={styles.slider}
              type='range'
              onChange={(event) => setGrayscale(event.target.value)}
              min={0}
              max={100}
              step={1}
              value={grayscale}
            ></input>
          </div>
          <div className={styles.filterContainer}>
            <label className={styles.filterLabel}>
              <p>Hue Rotate</p>
              <span>{hueRotate}°</span>
            </label>
            <input
              className={styles.slider}
              type='range'
              onChange={(event) => setHueRotate(event.target.value)}
              min={0}
              max={360}
              step={1}
              value={hueRotate}
            ></input>
          </div>
          <div className={styles.filterContainer}>
            <label className={styles.filterLabel}>
              <p>Invert</p>
              <span>{invert}%</span>
            </label>
            <input
              className={styles.slider}
              type='range'
              onChange={(event) => setInvert(event.target.value)}
              min={0}
              max={100}
              step={1}
              value={invert}
            ></input>
          </div>
          <div className={styles.filterContainer}>
            <label className={styles.filterLabel}>
              <p>Saturate</p>
              <span>{saturate}%</span>
            </label>
            <input
              className={styles.slider}
              type='range'
              onChange={(event) => setSaturate(event.target.value)}
              min={0}
              max={1000}
              step={1}
              value={saturate}
            ></input>
          </div>
          <div className={styles.filterContainer}>
            <label className={styles.filterLabel}>
              <p>Sepia</p>
              <span>{sepia}%</span>
            </label>
            <input
              className={styles.slider}
              type='range'
              onChange={(event) => setSepia(event.target.value)}
              min={0}
              max={100}
              step={1}
              value={sepia}
            ></input>
          </div>

          <div
            className={`${styles.resetButtonContainer} ${styles.resetButtonDown}`}
          >
            <button onClick={handleResetFilters} className={styles.resetButton}>
              reset filters
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}

export default App;

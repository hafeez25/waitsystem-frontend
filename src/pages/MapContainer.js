import React, { useEffect, useState, useRef } from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import Radio from '@mui/material/Radio';
import Typography from '@mui/material/Typography';
import 'leaflet/dist/leaflet.css';
import './MapContainerStyles.css'; // External CSS file
import Iconify from '../components/Iconify';

const MapComponent = () => {
  const mapRef = useRef(null); // Ref for the map container
  const [isFullscreen, setIsFullscreen] = useState(false); // Fullscreen state
  const [center, setCenter] = useState(JSON.parse(localStorage.getItem('mcenter')) || [20.5937, 78.9629]);
  const [zoom, setZoom] = useState(localStorage.getItem('mzoom') || 2);
  const [layer, setLayer] = useState(
    localStorage.getItem('layer') || 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
  );
  const [showLayerPopup, setShowLayerPopup] = useState(false);

  const layerOptions = [
    { label: 'OpenStreetMap', value: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png' },
    {
      label: 'USGS Topo',
      value: 'https://basemap.nationalmap.gov/arcgis/rest/services/USGSTopo/MapServer/tile/{z}/{y}/{x}',
    },
    { label: 'OpenTopoMap', value: 'https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png' },
    {
      label: 'Esri World Topo',
      value: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}',
    },
    {
      label: 'USGS Satellite',
      value: 'https://basemap.nationalmap.gov/arcgis/rest/services/USGSImageryOnly/MapServer/tile/{z}/{y}/{x}',
    },
    {
      label: 'Esri World Overview',
      value: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
    },
  ];

  const handleTileLayerChange = (selectedLayer) => {
    localStorage.setItem('layer', selectedLayer);
    setLayer(selectedLayer);
    setShowLayerPopup(false);
  };

  const handleZoomIn = () => setZoom((prev) => Math.min(prev + 1, 18));
  const handleZoomOut = () => setZoom((prev) => Math.max(prev - 1, 2));

  const toggleFullscreen = () => {
    const element = mapRef.current;

    if (!isFullscreen) {
      // Enter fullscreen mode
      if (element.requestFullscreen) {
        element.requestFullscreen();
      } else if (element.mozRequestFullScreen) {
        element.mozRequestFullScreen(); // Firefox
      } else if (element.webkitRequestFullscreen) {
        element.webkitRequestFullscreen(); // Chrome, Safari, Opera
      } else if (element.msRequestFullscreen) {
        element.msRequestFullscreen(); // IE/Edge
      }
    } else if (
      document.exitFullscreen ||
      document.mozCancelFullScreen ||
      document.webkitExitFullscreen ||
      document.msExitFullscreen
    ) {
      // Exit fullscreen mode
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen(); // Firefox
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen(); // Chrome, Safari, Opera
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen(); // IE/Edge
      } else {
        console.log('Fullscreen mode not supported');
        alert('Fullscreen mode not supported');
      }
    }

    setIsFullscreen(!isFullscreen);
  };

  useEffect(() => {
    localStorage.setItem('mcenter', JSON.stringify(center));
    localStorage.setItem('mzoom', zoom);
  }, [center, zoom]);

  return (
    <Box ref={mapRef} className="map-container">
      <MapContainer center={center} zoom={zoom} scrollWheelZoom className="map" attributionControl={false}>
        <TileLayer url={layer} />
      </MapContainer>

      {/* Layer Selection Button */}
      <IconButton className="map-button layers-button" onClick={() => setShowLayerPopup(!showLayerPopup)}>
        <Iconify icon="eva:layers-fill" />
      </IconButton>

      {showLayerPopup && (
        <Paper className="layer-popup">
          {layerOptions.map((option) => (
            <Box key={option.value} className="layer-option">
              <Radio checked={layer === option.value} onChange={() => handleTileLayerChange(option.value)} />
              <Typography>{option.label}</Typography>
            </Box>
          ))}
        </Paper>
      )}

      {/* Zoom In Button */}
      <IconButton className="map-button zoom-in-button" onClick={handleZoomIn}>
        <Iconify icon="eva:plus-fill" />
      </IconButton>

      {/* Zoom Out Button */}
      <IconButton className="map-button zoom-out-button" onClick={handleZoomOut}>
        <Iconify icon="eva:minus-fill" />
      </IconButton>

      {/* Fullscreen Button */}
      <IconButton className="map-button fullscreen-button" onClick={toggleFullscreen}>
        <Iconify icon={!isFullscreen ? 'eva:expand-fill' : 'eva:collapse-fill'} />
      </IconButton>
    </Box>
  );
};

export default MapComponent;

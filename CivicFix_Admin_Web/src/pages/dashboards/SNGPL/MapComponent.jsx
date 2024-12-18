import styled from "@emotion/styled";
import { withTheme } from "@emotion/react";
import { MoreVertical } from "lucide-react";
import React, { useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Tooltip,
  useMapEvents,
  useMap,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { Box, Container } from "@mui/material";
import {
  Card as MuiCard,
  CardContent as MuiCardContent,
  CardHeader,
  IconButton,
} from "@mui/material";
import { spacing } from "@mui/system";
import RedMarker from "/static/img/red-marker-512.png";
import BlueMarker from "/static/img/blue-marker-512.png";

// Custom styles for Card and CardContent
const Card = styled(MuiCard)(spacing);

const CardContent = styled(MuiCardContent)`
  &:last-child {
    padding-top: 0;
    padding-bottom: ${(props) => props.theme.spacing(4)};
  }
`;

const UAE_CENTER = [23.4241, 53.8478]; // Center of UAE

const regions = [
  {
    id: 1,
    name: "Abu Dhabi",
    coords: [24.4539, 54.3773],
    branches: [
      { id: "1-1", name: "Abu Dhabi Branch 1", coords: [24.4539, 54.3773] },
      { id: "1-2", name: "Abu Dhabi Branch 2", coords: [24.4545, 54.3775] },
      { id: "1-3", name: "Abu Dhabi ATM 1", coords: [24.455, 54.3778] },
    ],
  },
  {
    id: 2,
    name: "Dubai",
    coords: [25.276987, 55.296249],
    branches: [
      { id: "2-1", name: "Dubai Branch 1", coords: [25.276987, 55.296249] },
      { id: "2-2", name: "Dubai Branch 2", coords: [25.27705, 55.29628] },
      { id: "2-3", name: "Dubai ATM 1", coords: [25.27695, 55.2962] },
    ],
  },
  // Add more regions and branches/ATMs as needed
];

// Custom icons
const bankIcon = new L.Icon({
  iconUrl: RedMarker,
  iconSize: [38, 38],
  iconAnchor: [22, 22],
  popupAnchor: [-3, -22],
});

const branchIcon = new L.Icon({
  iconUrl: BlueMarker,
  iconSize: [30, 30],
  iconAnchor: [15, 15],
  popupAnchor: [-3, -15],
});

const MapComponent = (props) => {
  const [zoomLevel, setZoomLevel] = useState(5);
  const [activeRegion, setActiveRegion] = useState(null);

  const MapUpdater = ({ center, zoom }) => {
    const map = useMap();
    map.flyTo(center, zoom, { animate: true });
    return null;
  };

  const handleMapClick = (region) => {
    setActiveRegion(region);
    setZoomLevel(16); // Zoom in to the region
  };

  const handleBranchClick = (branch) => {
    console.log(branch);
  };

  const MapEventsHandler = () => {
    const map = useMapEvents({
      zoomend: () => {
        setZoomLevel(map.getZoom());
      },
    });
    return null;
  };

  const allBranches = regions.flatMap((region) => region.branches);

  return (
    <Card mb={6} style={{ height: "95%", width: "100%" }}>
      <CardHeader
        action={
          <IconButton aria-label="settings" size="large">
            <MoreVertical />
          </IconButton>
        }
        title="Map of UAE"
      />
      <CardContent style={{ height: "90%", width: "100%" }}>
        <Container style={{ height: "90%", width: "100%" }}>
          <MapContainer
            center={UAE_CENTER}
            zoom={zoomLevel}
            scrollWheelZoom={true}
            style={{ height: "100%", width: "100%" }}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            <MapEventsHandler />
            {zoomLevel < 14 &&
              regions.map((region) => (
                <Marker
                  key={region.id}
                  position={region.coords}
                  icon={bankIcon}
                  eventHandlers={{
                    click: () => handleMapClick(region),
                  }}
                >
                  <Popup>{region.name}</Popup>
                  <Tooltip>{region.name}</Tooltip>
                </Marker>
              ))}
            {zoomLevel >= 14 &&
              allBranches.map((branch) => (
                <Marker
                  key={branch.id}
                  position={branch.coords}
                  icon={branchIcon}
                  eventHandlers={{
                    click: () => handleBranchClick(branch),
                  }}
                >
                  <Popup>{branch.name}</Popup>
                  <Tooltip>{branch.name}</Tooltip>
                </Marker>
              ))}
            {zoomLevel >= 14 && activeRegion && (
              <MapUpdater center={activeRegion.coords} zoom={zoomLevel} />
            )}
          </MapContainer>
        </Container>
      </CardContent>
    </Card>
  );
};

export default withTheme(MapComponent);

import React, { useState, useEffect } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  CircleMarker,
  Popup,
  Tooltip,
  useMap,
  useMapEvents,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import {
  Card as MuiCard,
  CardContent as MuiCardContent,
  CardHeader,
  IconButton,
  Container,
} from "@mui/material";
import styled from "@emotion/styled";
import { spacing } from "@mui/system";
import apiClient from "../../../utils/axiosConfig";

const Card = styled(MuiCard)(spacing);

const CardContent = styled(MuiCardContent)`
  &:last-child {
    padding-top: 0;
    padding-bottom: ${(props) => props.theme.spacing(4)};
  }
`;

const groupComplaints = (complaints, precision = 3) =>
  Object.values(
    complaints.reduce((grouped, complaint) => {
      const key = `${complaint.latitude.toFixed(
        precision
      )},${complaint.longitude.toFixed(precision)}`;
      if (!grouped[key]) {
        grouped[key] = {
          lat: parseFloat(complaint.latitude.toFixed(precision)),
          lng: parseFloat(complaint.longitude.toFixed(precision)),
          count: 1,
          department: complaint.department_name,
          complaints: [complaint],
        };
      } else {
        grouped[key].count += 1;
        grouped[key].complaints.push(complaint);
      }
      return grouped;
    }, {})
  );

const MapComponent = ({ theme, filter }) => {
  const [complaints, setComplaints] = useState([]);
  const [center, setCenter] = useState([31.5497, 74.3436]); // Lahore center
  const [zoom, setZoom] = useState(11);
  const mapRef = React.createRef();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await apiClient(
          "/complaints/map-coords?department=SNGPL&filter=" + filter
        );
        if (response) {
          setComplaints(response);
        }
      } catch (error) {
        console.error("Failed to fetch complaints", error);
        setComplaints([]);
      }
    };

    fetchData();
  }, [filter, theme]);

  useEffect(() => {
    const mapInstance = mapRef.current;
    if (mapInstance) {
      const handleZoom = () => setZoom(mapInstance.getZoom());
      mapInstance.on("zoomend", handleZoom);
      mapInstance.on("zoom", handleZoom);
      return () => {
        mapInstance.off("zoomend", handleZoom);
        mapInstance.off("zoom", handleZoom);
      };
    }
  }, [mapRef]);

  const grouped = groupComplaints(complaints);
  return (
    <Card mb={6} style={{ height: 500, width: "100%" }}>
      <CardHeader title="Complaints Highlight on Map" />
      <CardContent style={{ height: "90%", width: "100%" }}>
        <Container style={{ height: "90%", width: "100%" }}>
          <MapContainer
            center={center}
            zoom={zoom}
            scrollWheelZoom
            style={{ height: "100%", width: "100%" }}
            ref={mapRef}
            maxZoom={16}
            maxNativeZoom={16}
            maxBounds={[
              [24.5271, 66.3754],
              [36.0882, 77.0927],
            ]}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
            />

            {zoom < 16 &&
              grouped.map((group, i) => (
                <CircleMarker
                  key={i}
                  center={[group.lat, group.lng]}
                  radius={5 + group.count * 3}
                  pathOptions={{
                    color: group.department === "LESCO" ? "#e74c3c" : "#2980b9",
                    fillColor:
                      group.department === "LESCO" ? "#fadbd8" : "#d6eaf8",
                    fillOpacity: 0.7,
                  }}
                  eventHandlers={{
                    click: (e) => {
                      mapRef.current?.panTo([e.latlng.lat, e.latlng.lng]);
                    },
                  }}
                >
                  <Popup>
                    <strong>{group.department}</strong>
                    <br />
                    Complaints: {group.count}
                  </Popup>
                  <Tooltip>{`${group.department}: ${group.count}`}</Tooltip>
                </CircleMarker>
              ))}

            {zoom >= 16 &&
              complaints.map((complaint) => (
                <Marker
                  key={complaint.complaint_id}
                  position={[complaint.latitude, complaint.longitude]}
                  icon={L.divIcon({
                    className: "custom-marker",
                    html: `<div style="background:${
                      complaint.department_name === "LESCO"
                        ? "#e74c3c"
                        : "#2980b9"
                    };width:14px;height:14px;border-radius:50%"></div>`,
                  })}
                  eventHandlers={{
                    click: (e) => {
                      mapRef.current?.panTo([e.latlng.lat, e.latlng.lng]);
                    },
                  }}
                >
                  <Popup>
                    <strong>{complaint.department_name}</strong>
                    <br />
                    Complaint ID: {complaint.complaint_id}
                  </Popup>
                  <Tooltip>{`Complaint ID: ${complaint.complaint_id}`}</Tooltip>
                </Marker>
              ))}
          </MapContainer>
        </Container>
      </CardContent>
    </Card>
  );
};

export default MapComponent;

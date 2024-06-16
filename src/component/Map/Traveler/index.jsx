import React, { useRef, useEffect, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import axios from "axios";
import { ROOT_URL } from "../../../common-utlis/helper";

// Mapbox access token
mapboxgl.accessToken =
  "pk.eyJ1IjoidGlzaGFuZ3AiLCJhIjoiY2x4aGR1Z3dwMGhwMTJrc2Z6YTE4enFuMCJ9.PEvznKoQodgLrEoUrwJ9fQ";

const MapComponent = () => {
  const mapContainerRef = useRef(null);
  const mapRef = useRef(null); // Reference to store the map instance
  const [currentLocation, setCurrentLocation] = useState({ lng: 0, lat: 0 });
  const destination = {
    lng: localStorage.getItem("endLon"),
    lat: localStorage.getItem("endLat"),
  }; // Destination location
  const tripId = localStorage.getItem("tripId");

  // Initialize the currentMarker outside useEffect
  const currentMarkerRef = useRef(null);

  // Function to fetch and update the current location
  const updateCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { longitude, latitude } = position.coords;
          setCurrentLocation({ lng: longitude, lat: latitude });

          // Update the current location marker position immediately
          if (currentMarkerRef.current) {
            currentMarkerRef.current.setLngLat([longitude, latitude]);
          }
          const token = localStorage.getItem("token");

          // Uncomment below to call backend API to update location
          axios
            .post(
              `${ROOT_URL}/user/traveler/update-trip`,
              {
                currentLocation: {
                  lat: latitude,
                  lon: longitude,
                },
                tripId: tripId,
              },
              {
                headers: {
                  Authorization: token,
                },
              }
            )
            .catch((err) => console.error("Error updating location:", err));
        },
        (error) => console.error("Error fetching location:", error),
        { enableHighAccuracy: true }
      );
    }
  };

  useEffect(() => {
    if (!mapRef.current) {
      // Initialize the map
      mapRef.current = new mapboxgl.Map({
        container: mapContainerRef.current,
        style: "mapbox://styles/mapbox/streets-v11",
        center: [destination.lng, destination.lat],
        zoom: 9,
      });

      // Add navigation control (the +/- zoom buttons)
      mapRef.current.addControl(new mapboxgl.NavigationControl(), "top-right");

      // Add destination marker
      new mapboxgl.Marker({ color: "red" })
        .setLngLat([destination.lng, destination.lat])
        .addTo(mapRef.current);

      // Initialize the current location marker
      currentMarkerRef.current = new mapboxgl.Marker({ color: "blue" })
        .setLngLat([currentLocation.lng, currentLocation.lat])
        .addTo(mapRef.current);
    }

    // Fetch the initial location
    updateCurrentLocation();

    // Update the location every 5 seconds
    const intervalId = setInterval(() => {
      updateCurrentLocation();
    }, 5000);

    // Clean up on unmount
    return () => {
      clearInterval(intervalId);
    };
  }, []);

  useEffect(() => {
    if (mapRef.current) {
      // Ensure the map centers to the new current location
      mapRef.current.flyTo({
        center: [currentLocation.lng, currentLocation.lat],
      });
    }
  }, [currentLocation]);

  return (
    <div ref={mapContainerRef} style={{ width: "100%", height: "500px" }} />
  );
};

export default MapComponent;

import React, { useRef, useEffect, useState, Fragment } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { ROOT_URL } from "../../../common-utlis/helper";

// Mapbox access token
mapboxgl.accessToken =
  "pk.eyJ1IjoidGlzaGFuZ3AiLCJhIjoiY2x4aGR1Z3dwMGhwMTJrc2Z6YTE4enFuMCJ9.PEvznKoQodgLrEoUrwJ9fQ";

const MapComponent = () => {
  const mapContainerRef = useRef(null);
  const { tripId } = useParams(); // Corrected to use .get("tripId")
  const mapRef = useRef(null); // Reference to store the map instance
  const currentMarkerRef = useRef(null); // Reference to store the current location marker instance
  const [currentLocation, setCurrentLocation] = useState({ lng: 0, lat: 0 });
  const [destination, setDestination] = useState({ lng: -74.5, lat: 40 });
  const [tripDetails, setTripDetails] = useState(null);
  const [error, setError] = useState(null);

  // Function to fetch trip details and update locations
  const fetchTripDetails = async () => {
    try {
      const token = localStorage.getItem("token");
      console.log(currentLocation);
      console.log(token);
      const { data } = await axios.get(
        `${ROOT_URL}/user/traveler-companion/track-trip`,
        {
          params: { tripId },
          headers: {
            Authorization: token,
          },
        }
      );

      const tripData = data.tripInfo;
      setTripDetails(tripData);
      setCurrentLocation({
        lng: tripData.lastTrackedLocation.lon,
        lat: tripData.lastTrackedLocation.lat,
      });
      setDestination({
        lng: tripData.destinationLocation.lon,
        lat: tripData.destinationLocation.lat,
      });

      // Update current location marker
      if (currentMarkerRef.current) {
        currentMarkerRef.current.setLngLat([
          tripData.lastTrackedLocation.lon,
          tripData.lastTrackedLocation.lat,
        ]);
      }
    } catch (error) {
      console.error("Error fetching trip details:", error);
      setError(error);
    }
  };

  useEffect(() => {
    // Initialize map on component mount
    mapRef.current = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [destination.lng, destination.lat],
      zoom: 9,
    });

    // Add navigation control
    mapRef.current.addControl(new mapboxgl.NavigationControl(), "top-right");

    // Initialize current location marker
    currentMarkerRef.current = new mapboxgl.Marker({ color: "blue" })
      .setLngLat([currentLocation.lng, currentLocation.lat])
      .addTo(mapRef.current);

    // Add destination marker
    new mapboxgl.Marker({ color: "red" })
      .setLngLat([destination.lng, destination.lat])
      .addTo(mapRef.current);

    // Create a GeoJSON source for destination

    // After adding the source, wait for sourcedata event to update data

    // Fetch trip details on initial load
    fetchTripDetails();

    // Fetch trip details every 5 seconds
    const intervalId = setInterval(() => {
      fetchTripDetails();
    }, 5000);

    // Clean up interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    // Update current location marker position on map
    console.log(currentLocation);
    if (mapRef.current) {
      // Ensure the map centers to the new current location
      mapRef.current.flyTo({
        center: [currentLocation.lng, currentLocation.lat],
      });
    }
  }, [currentLocation]);

  // useEffect(() => {
  //   // Update destination marker position on map
  //   if (mapRef.current) {
  //     // Fly to the new destination
  //     mapRef.current.flyTo({
  //       center: [destination.lng, destination.lat],
  //     });
  //   }
  // }, [destination]);

  return (
    <div>
      {tripDetails && (
        <Fragment>
          <p>Trip ID: {tripDetails.tripId}</p>
          <p>
            <Link to={`/trip/${tripDetails.tripId}`}>View Trip Details</Link>
          </p>
        </Fragment>
      )}
      <div ref={mapContainerRef} style={{ width: "100%", height: "500px" }} />
    </div>
  );
};

export default MapComponent;

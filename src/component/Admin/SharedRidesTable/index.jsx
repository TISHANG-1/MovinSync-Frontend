import React, { Fragment, useEffect, useState } from "react";
import { Descriptions, Space, Table } from "antd";
import axios from "axios";
import { ROOT_URL } from "../../../common-utlis/helper";

const RidesSharedOverall = () => {
  const [sharedRides, setSharedRides] = useState([]);
  const columns = [
    {
      title: "S no.",
      dataIndex: "index",
      key: "index",
    },
    {
      title: "Traveler",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Traveler Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Shared To",
      key: "index",
      render: ({ travelerCompanions }) => (
        <div
          id="shared_to_admin_shared_rides"
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-around",
          }}
        >
          <Space wrap>
            <ul
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                maxWidth: "500px",
              }}
            >
              {travelerCompanions?.map((travelerCompanion) => (
                <li key={travelerCompanion}>{travelerCompanion}</li>
              ))}
            </ul>
          </Space>
        </div>
      ),
    },
    {
      title: "Start",
      key: "start",
      render: ({ startLocation }) => (
        <div>
          {"Longitute: "}
          {startLocation.lon}
          {"Latitude: "}
          {startLocation.lat}
        </div>
      ),
    },
    {
      title: "Destination",
      key: "end",
      render: ({ destinationLocation }) => (
        <div>
          {"Longitute: "}
          {destinationLocation.lon}
          {"Latitude: "}
          {destinationLocation.lat}
        </div>
      ),
    },
    {
      title: "Last Tracked At",
      key: "end",
      render: ({ lastTrackedLocation }) => (
        <div>
          {"Longitute: "}
          {lastTrackedLocation.lon}
          {"Latitude: "}
          {lastTrackedLocation.lat}
        </div>
      ),
    },
  ];

  const fetchSharedRides = () => {
    const token = localStorage.getItem("token");
    axios
      .get(`${ROOT_URL}/admin/list-shared-trips`, {
        headers: {
          Authorization: token,
        },
      })
      .then(({ data }) => {
        const { sharedRides } = data;
        setSharedRides(sharedRides);
      });
  };

  useEffect(() => {
    fetchSharedRides();
  }, []);

  return (
    <Fragment>
      <Descriptions title="Overall Shared Rides" />
      <Table dataSource={sharedRides} columns={columns} bordered />
    </Fragment>
  );
};

export default RidesSharedOverall;

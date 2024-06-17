import React, { Fragment, useEffect, useState } from "react";
import { Descriptions, Space, Table } from "antd";
import axios from "axios";
import { ROOT_URL } from "../../../common-utlis/helper";

const SharedTripTable = () => {
  const [sharedTrips, setSharedTrips] = useState([]);
  const columns = [
    {
      title: "S no.",
      dataIndex: "index",
      key: "index",
    },
    {
      title: "trip Id",
      dataIndex: "key",
      key: "key",
    },
    {
      title: "Driver",
      dataIndex: "driverName",
      key: "driverName",
    },
    {
      title: "Vehicle",
      dataIndex: "vechileNumber",
      key: "vechileNumber",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "Shared To",
      key: "index",
      render: ({ travelerCompanions }) => (
        <div
          id="shared_to_column"
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
  ];

  const fetchSharedRides = () => {
    const token = localStorage.getItem("token");
    axios
      .get(`${ROOT_URL}/user/traveler/list-shared-trips`, {
        headers: {
          Authorization: token,
        },
      })
      .then(({ data }) => {
        const { sharedTripList } = data;
        setSharedTrips(sharedTripList);
      });
  };

  useEffect(() => {
    fetchSharedRides();
  }, []);

  return (
    <Fragment>
      <Descriptions title="Shared Trips Table" />
      <Table dataSource={sharedTrips} columns={columns} bordered />
    </Fragment>
  );
};

export default SharedTripTable;

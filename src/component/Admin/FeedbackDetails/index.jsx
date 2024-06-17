import React, { Fragment, useEffect, useState } from "react";
import { Descriptions, Space, Table } from "antd";
import axios from "axios";
import { ROOT_URL } from "../../../common-utlis/helper";

const Feedbacks = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const columns = [
    {
      title: "S no.",
      dataIndex: "index",
      key: "index",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Rating",
      dataIndex: "rating",
      key: "rating",
    },
    {
      title: "trip Id",
      dataIndex: "tripId",
      key: "tripId",
    },
  ];

  const fetchSharedRides = () => {
    const token = localStorage.getItem("token");
    axios
      .get(`${ROOT_URL}/admin/list-feedbacks`, {
        headers: {
          Authorization: token,
        },
      })
      .then(({ data }) => {
        const { allFeedbacks } = data;
        setFeedbacks(allFeedbacks);
      });
  };

  useEffect(() => {
    fetchSharedRides();
  }, []);

  return (
    <Fragment>
      <Descriptions title="Feedback Table" />
      <Table dataSource={feedbacks} columns={columns} bordered />
    </Fragment>
  );
};

export default Feedbacks;

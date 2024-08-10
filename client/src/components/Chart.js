import React, { useEffect, useState } from "react";
import { RadarChart } from "@carbon/charts-react";
import "@carbon/charts/styles.css";

const Radar = (props) => {
  const dataset = {
    data: [
      {
        feature: "Answer Relevance",
        score: props.answer_relevance,
      },
      {
        feature: "Context Relevance",
        score: props.context_relevance,
      },
      {
        feature: "Groundedness",
        score: props.groundedness,
      },
    ],
    options: {
      title: "Hallucination Metrics",
      radar: {
        axes: {
          angle: "feature",
          value: "score",
        },
        alignment: "center",
      },
      height: "400px",
      legend: {
        enabled: false,
      },
    },
  };

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <RadarChart data={dataset.data} options={dataset.options} />
    </div>
  );
};

export default Radar;

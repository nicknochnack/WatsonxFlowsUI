import React, { useContext, useEffect } from "react";
import { Content, TextInput, Grid, Column, Button } from "@carbon/react";
import { SketchPicker } from "react-color";
import { useNavigate } from "react-router-dom";
import "./onboard.scss";
import { AppContext } from "../App";

const Onboard = () => {
  const context = useContext(AppContext);

  const navigate = useNavigate();

  const onChangeColor = (newColor) => {
    context.setColor(newColor.rgb);
    console.log(newColor);
  };

  const onChangeCustomerName = (event) => {
    context.setCustomerName(event.target.value);
  };

  const buttonHandler = (event) => {
    localStorage.setItem(
      "userProps",
      JSON.stringify({
        customerName: context.customerName,
        color: context.color,
      })
    );
  };

  const goHandler = (e) => {
    navigate("/");
  };

  useEffect(() => {
    console.log(context);
  }, []);

  return (
    <Grid narrow className="chat-container">
      <Column sm={4} md={4} lg={8} className="chat-column">
        <Content>
          <TextInput
            value={context.customerName}
            onChange={onChangeCustomerName}
            id="text-input-1"
            type="text"
            labelText="Enter the customer name."
            helperText="The name listed above will be used to set the name of the app header."
            size="lg"
          />

          <div style={{ marginTop: "20px" }}>
            <SketchPicker color={context.color} onChange={onChangeColor} />
          </div>

          <div style={{ marginTop: "20px" }}>
            <p>
              Selected Color: rgb({context.color.r}, {context.color.g},{" "}
              {context.color.b}, {context.color.a})
            </p>
            <div
              style={{
                width: "100px",
                height: "100px",
                backgroundColor: `rgba(${context.color.r}, ${context.color.g}, ${context.color.b}, ${context.color.a})`,
                border: "1px solid black",
              }}
            ></div>
          </div>
        </Content>
        <Button onClick={buttonHandler} style={{ marginRight: "10px" }}>
          Save
        </Button>
        <Button onClick={goHandler}>Go</Button>
      </Column>
      <Column sm={4} md={4} lg={8} className="info-column">
        <Content></Content>
      </Column>
    </Grid>
  );
};

export default Onboard;

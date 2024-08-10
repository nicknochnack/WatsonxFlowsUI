import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import {
  Content,
  TextInput,
  Grid,
  Column,
  InlineNotification,
  Button,
  SkeletonText,
} from "@carbon/react";
import { User, Watson } from "@carbon/icons-react";
import Radar from "./Chart";
import SwipeableCards from "./SwipeableCards";

import "./chat.scss";

const testPrompts = [
  { label: "watsonx", text: "What are the key features of watsonx?" },
  { label: "db2", text: "What is DB2?" },
  { label: "cplex", text: "What is CPLEX?" },
];

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [showWarning, setShowWarning] = useState(true);
  const [docs, setDocs] = useState([]);
  const [metrics, setMetrics] = useState({});
  const [warnings, setWarnings] = useState("");
  const [loading, setLoading] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleInputChange = (e) => setInputValue(e.target.value);

  const handlePromptClick = (prompt) => setInputValue(prompt);

  const sendMessage = async () => {
    if (!inputValue.trim()) return;

    const newMessage = {
      role: "user",
      content: inputValue,
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };
    const newMessages = [...messages, newMessage];
    setMessages(newMessages);
    setLoading(true);

    try {
      const baseURL = `${window.location.protocol}//${
        window.location.host.split(":")[0]
      }:3500`;
      const res = await axios.post(`${baseURL}/api/flows`, {
        prompt: inputValue,
      });

      setDocs(res.data?.completions?.contexts);
      setMetrics(res.data?.completions?.hallucinationScore);
      setWarnings(res.data?.completions?.scoreMessage);
      setMessages([
        ...newMessages,
        {
          role: "ai",
          content:
            res.data?.completions?.modelResponse?.results[0]?.generated_text,
          timestamp: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
        },
      ]);
    } catch (error) {
      console.error("Error sending message:", error);
      // Handle error (e.g., show an error message to the user)
    } finally {
      setLoading(false);
      setInputValue("");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  };

  const renderRadarChart = () => {
    if (!metrics || Object.keys(metrics).length === 0) return null;

    try {
      return (
        <Radar
          answer_relevance={metrics.answer_relevance || 0}
          context_relevance={metrics.context_relevance || 0}
          groundedness={metrics.groundedness || 0}
        />
      );
    } catch (error) {
      console.error("Error rendering Radar chart:", error);
      return null;
    }
  };

  return (
    <Grid narrow className="chat-container">
      <Column sm={4} md={4} lg={8} className="chat-column">
        <Content>
          <div className="messages-container">
            {messages.map((message, index) => (
              <div key={index} className={`chat-message ${message.role}`}>
                <div className="message-content">
                  <div className="message-icon">
                    {message.role === "user" ? (
                      <User size={24} />
                    ) : (
                      <Watson size={24} />
                    )}
                  </div>
                  <div className="message-text">{message.content}</div>
                  <div className="message-timestamp">{message.timestamp}</div>
                </div>
              </div>
            ))}
            {loading && <SkeletonText />}
            <div ref={messagesEndRef} />
          </div>

          <div className="input-container">
            <div
              className="test-prompts-container"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                marginBottom: "1rem",
              }}
            >
              <span style={{ fontSize: "0.875rem", color: "#525252" }}>
                Try out some test prompts:
              </span>
              {testPrompts.map((prompt, index) => (
                <Button
                  key={index}
                  size="sm"
                  kind="ghost"
                  onClick={() => handlePromptClick(prompt.text)}
                >
                  {prompt.label}
                </Button>
              ))}
            </div>

            <TextInput
              value={inputValue}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              id="text-input-1"
              type="text"
              labelText="Enter a text prompt below"
              helperText="Use the prompt to search across your watsonx flow"
              size="lg"
            />
          </div>
        </Content>
      </Column>
      <Column sm={4} md={4} lg={8} className="info-column">
        <Content>
          {showWarning && warnings && (
            <InlineNotification
              role="status"
              caption="Double check your data"
              timeout={0}
              title="Heads up!"
              subtitle={warnings}
              onClose={() => setShowWarning(false)}
            />
          )}
          {metrics && (
            <div className="metrics-container">{renderRadarChart()}</div>
          )}
          {docs && <SwipeableCards docs={docs} />}
        </Content>
      </Column>
    </Grid>
  );
};

export default Chat;

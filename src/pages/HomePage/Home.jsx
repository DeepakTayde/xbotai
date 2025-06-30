import { Box, Grid, Stack, Typography } from "@mui/material";
import InitialChat from "../../components/InitialChat/InitialChat";
import ChatInput from "../../components/ChatInput/ChatInput";
import ChattingCard from "../../components/ChattingCard/ChattingCard";
import FeedbackModal from "../../components/FeedbackModal/FeedbackModal";
import { useEffect, useRef, useState } from "react";
import data from "../../Data/sampleData.json";
import { useOutletContext } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import { ThemeContext } from "../../theme/ThemeContext";
import { useContext } from "react";

export default function Home() {
  const [showModal, setShowModal] = useState(false);
  const listRef = useRef(null);
  const [chatId, setChatId] = useState(1);
  const [selectedChatId, setSelectedChatId] = useState(null);
  const [scrollToBottom, setScrollToBottom] = useState(false);
  const { chat, setChat } = useOutletContext();
  const { mode } = useContext(ThemeContext);

  const generateResponse = (input) => {
    const response = data.find(
      (item) => input.toLowerCase() === item.question.toLowerCase()
    );

    let answer = "Sorry, Did not understand your query!";

    if (response !== undefined) {
      answer = response.response;
    }

    setChat((prev) => [
      ...prev,
      {
        type: "Human",
        text: input,
        time: new Date(),
        id: chatId,
      },
      {
        type: "AI",
        text: answer,
        time: new Date(),
        id: chatId + 1,
      },
    ]);

    setChatId((prev) => prev + 2);
  };

  useEffect(() => {
    listRef.current?.lastElementChild?.scrollIntoView();
  }, [scrollToBottom]);

  return (
    <Stack
      direction="column"
      spacing={0}
      sx={{
        height: "100%",
        minHeight: 0,
        overflow: "hidden",
        "@media (max-width:767px)": {
          background:
            mode === "light" ? "linear-gradient(#F9FAFA 60%, #EDE4FF)" : "",
        },
      }}
    >
      <Navbar />

      {/* Chat messages container */}
      <Box
        sx={{
          flex: 1,
          overflowY: "auto",
          p: { xs: 2, md: 3 },
        }}
        ref={listRef}
      >
        {chat.length === 0 ? (
          <InitialChat generateResponse={generateResponse} />
        ) : (
          <Stack spacing={{ xs: 2, md: 3 }}>
            {chat.map((item, index) => (
              <ChattingCard
                details={item}
                key={index}
                updateChat={setChat}
                setSelectedChatId={setSelectedChatId}
                showFeedbackModal={() => setShowModal(true)}
              />
            ))}
          </Stack>
        )}
      </Box>

      {/* Chat input always visible at bottom */}
      <ChatInput
        generateResponse={generateResponse}
        setScroll={setScrollToBottom}
        chat={chat}
        clearChat={() => setChat([])}
      />

      {showModal && (
        <FeedbackModal
          open={showModal}
          updateChat={setChat}
          chatId={selectedChatId}
          handleClose={() => setShowModal(false)}
        />
      )}
    </Stack>
  );
}

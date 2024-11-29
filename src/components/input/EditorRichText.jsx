import React, { useState } from "react";
import { Box, Typography, Button } from "@mui/material";
import "react-quill/dist/quill.snow.css";
import ReactQuill from "react-quill";

const EditorRichText = ({ readOnly = false }) => {
  const [content, setContent] = useState("");

  const handleContentChange = (value) => {
    setContent(value);
  };

  const modules = readOnly
    ? {
        toolbar: null,
      }
    : {
        toolbar: [
          [{ header: [1, 2, false] }],
          ["bold", "italic", "underline"],
          [{ list: "ordered" }, { list: "bullet" }],
          ["link"],
        ],
      };

  return (
    <Box width="100%">
      <Typography variant="body2" color="rgba(0, 0, 0, 0.6)">
        Observações
      </Typography>
      <ReactQuill
        readOnly={readOnly}
        value={content}
        modules={modules}
        onChange={handleContentChange}
        theme="snow"
      />
    </Box>
  );
};

export default EditorRichText;

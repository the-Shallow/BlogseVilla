import EditorJs from "@editorjs/editorjs";
import Header from "@editorjs/header";
import SimpleImage from "@editorjs/simple-image";

export const editor = new EditorJs({
  holder: "editorjs",
  tools: {
    header: {
      class: Header,
    },
    image: {
      class: SimpleImage,
    },
  },
});


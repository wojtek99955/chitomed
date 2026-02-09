// CustomBlock.ts
import { createReactBlockSpec } from "@blocknote/react";

export const IframeVideo = createReactBlockSpec(
  {
    type: "iframeVideo", // ← nowy, unikalny typ!
    propSchema: {
      url: { default: "" },
      caption: { default: "" },
    },
    content: "none",
  },
  {
    render: (props) => {
      const { url } = props.block.props;

      if (!url) return null;

      return (
        <div contentEditable={false} style={{ margin: "1rem 0" }}>
          <iframe
            src={url}
            width="100%"
            height="400"
            style={{ borderRadius: "8px", border: "1px solid #e5e7eb" }}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        </div>
      );
    },
  },
);

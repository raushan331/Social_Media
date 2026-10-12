import React, { useState, useEffect } from "react";
import { ArrowLeft, Sparkle, TextIcon, Upload } from "lucide-react";
import toast from "react-hot-toast";

const StoryModel = ({ setShowModel, fetchStories }) => {
  const bgcolors = [
    "#4f46e5",
    "#7c3aed",
    "#db2777",
    "#e11d48",
    "#ca8a04",
    "#0d9488",
  ];

  const [mode, setMode] = useState("text");
  const [background, setBackground] = useState(bgcolors[0]);
  const [text, setText] = useState("");
  const [media, setMedia] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  // Handle image and video upload
  const handleMediaUpload = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    // Previous preview URL cleanup is handled in useEffect
    setMedia(file);
    setPreviewUrl(URL.createObjectURL(file));
    setMode("media");
  };

  // Clean up temporary preview URLs
  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  // Switch to text mode
  const handleTextMode = () => {
    setMode("text");
    setMedia(null);
    setPreviewUrl(null);
  };

  // Create story
  const handleCreateStory = async () => {};

  return (
    <div className="fixed inset-0 z-[110] min-h-screen bg-black/80 backdrop-blur-sm text-white flex items-center justify-center p-4 overflow-y-auto">
      <div className="w-full max-w-md py-4">
        {/* Header */}
        <div className="text-center mb-4 flex items-center justify-between">
          <button
            onClick={() => setShowModel(false)}
            className="text-white p-2 cursor-pointer"
            type="button"
          >
            <ArrowLeft />
          </button>

          <h2 className="text-lg font-semibold">Create story</h2>

          <span className="w-10" />
        </div>

        {/* Story Preview */}
        <div
          className="rounded-lg h-96 w-full flex items-center justify-center relative overflow-hidden"
          style={{
            backgroundColor: mode === "text" ? background : "#18181b",
          }}
        >
          {mode === "text" && (
            <textarea
              className="bg-transparent text-white w-full h-full p-6 text-lg resize-none focus:outline-none placeholder:text-white/60"
              placeholder="What's on your mind?"
              onChange={(e) => setText(e.target.value)}
              value={text}
            />
          )}

          {mode === "media" &&
            previewUrl &&
            media &&
            (media.type.startsWith("image/") ? (
              <img
                src={previewUrl}
                alt="Story preview"
                className="w-full h-full object-contain"
              />
            ) : media.type.startsWith("video/") ? (
              <video
                src={previewUrl}
                controls
                playsInline
                className="w-full h-full object-contain"
              />
            ) : (
              <p>Unsupported file type</p>
            ))}

          {mode === "media" && !previewUrl && (
            <p className="text-white/70">Select a photo or video</p>
          )}
        </div>

        {/* Background Colors */}
        {mode === "text" && (
          <div className="flex mt-4 gap-2">
            {bgcolors.map((color) => (
              <button
                key={color}
                type="button"
                aria-label={`Select ${color} background`}
                className={`w-8 h-8 rounded-full cursor-pointer ring-2 ${
                  background === color ? "ring-white" : "ring-transparent"
                }`}
                style={{ backgroundColor: color }}
                onClick={() => setBackground(color)}
              />
            ))}
          </div>
        )}

        {/* Text and Media Options */}
        <div className="flex gap-2 mt-4">
          {/* Text Button */}
          <button
            type="button"
            onClick={handleTextMode}
            className={`flex-1 flex items-center justify-center gap-2 p-3 cursor-pointer rounded ${
              mode === "text" ? "bg-white text-black" : "bg-zinc-800 text-white"
            }`}
          >
            <TextIcon size={18} />
            Text
          </button>

          {/* Upload Button */}
          <label
            className={`flex-1 flex items-center justify-center gap-2 p-3 rounded cursor-pointer ${
              mode === "media"
                ? "bg-white text-black"
                : "bg-zinc-800 text-white"
            }`}
          >
            <Upload size={18} />

            <span>Photo / Video</span>

            <input
              type="file"
              accept="image/*,video/*"
              className="hidden"
              onChange={handleMediaUpload}
            />
          </label>
        </div>

        {/* Create Story Button */}
        <button
          type="button"
          onClick={() =>
            toast.promise(handleCreateStory(), {
              loading: "Saving...",
              success: <p>Story Added</p>,
              error: (e) => <p>{e.message}</p>,
            })
          }
          className="flex items-center justify-center gap-2 text-white py-3 mt-4 w-full rounded bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 active:scale-95 transition cursor-pointer"
        >
          <Sparkle size={18} />
          Create story
        </button>
      </div>
    </div>
  );
};

export default StoryModel;

import React from "react";

type Props = {
  onDrop: (event: React.DragEvent<HTMLLabelElement>) => void;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

function DragAndDropFilesArea({ onDrop, onChange }: Props): JSX.Element {
  return (
    <>
      <label
        onDragOver={(event) => {
          event.preventDefault();
          event.stopPropagation();
        }}
        onDrop={(event) => {
          event.preventDefault();
          event.stopPropagation();
          onDrop(event);
        }}
        htmlFor="image-upload"
        className="flex flex-col items-center justify-center cursor-pointer rounded-lg bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600/50 h-full w-full dark:text-gray-300 text-gray-600"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="36"
          height="36"
          fill="currentColor"
          className="block"
          viewBox="0 0 16 16"
        >
          <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
          <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
        </svg>
        <span className="block mt-5">Drag and drop or click to upload</span>
      </label>
      <input
        id="image-upload"
        className="hidden"
        type="file"
        accept=".jpg,.png,.jpeg,.webp"
        name="uploadImage"
        onChange={onChange}
      />
    </>
  );
}

export default DragAndDropFilesArea;

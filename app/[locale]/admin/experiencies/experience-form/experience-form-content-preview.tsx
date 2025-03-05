type ExperienceFormContentPreviewProps = {
  content: string;
};
export const ExperienceFormContentPreview = ({
  content,
}: ExperienceFormContentPreviewProps) => {
  return (
    <div
      className="editor-preview border-input bg-input max-h-80 min-h-30 overflow-y-auto rounded-md border px-3 py-2"
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );
};

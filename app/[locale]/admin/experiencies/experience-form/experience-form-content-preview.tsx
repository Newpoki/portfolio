type ExperienceFormContentPreviewProps = {
  content: string;
};
export const ExperienceFormContentPreview = ({
  content,
}: ExperienceFormContentPreviewProps) => {
  return (
    <div
      className="editor-preview border-input bg-input rounded-md border px-3 py-2"
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );
};

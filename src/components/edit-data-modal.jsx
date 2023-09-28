import { Button, Dialog } from "@radix-ui/themes";
import CodeEditor from "@uiw/react-textarea-code-editor";
import React, { useEffect } from "react";

const EditDataModal = ({
  triggerText = "Edit Data",
  data = [],
  onSave = () => null,
}) => {
  const [val, setVal] = React.useState(structuredClone(data));

  useEffect(() => {
    setVal(structuredClone(data));
  }, []);

  return (
    <Dialog.Root>
      <Dialog.Trigger>
        <Button>{triggerText}</Button>
      </Dialog.Trigger>

      <Dialog.Content style={{ maxWidth: 1024 }}>
        <div className="flex gap-4">
          <CodeEditor
            value={JSON.stringify(val, null, 2)}
            language="json"
            placeholder="Please enter JS code."
            onChange={(evn) => {
              console.log(evn.target.value);
              try {
                setVal(JSON.parse(evn.target.value, null, 2));
              } catch (e) {
                console.log(e);
              }
            }}
            className="w-[80%]"
            padding={15}
            data-color-mode="dark"
          />
          <div className="w-[20%] relative">
            <Dialog.Close>
              <Button
                className="w-full sticky top-0"
                onClick={() => onSave(val)}
              >
                Save
              </Button>
            </Dialog.Close>
          </div>
        </div>
      </Dialog.Content>
    </Dialog.Root>
  );
};

export default EditDataModal;

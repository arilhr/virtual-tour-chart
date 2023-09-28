import { Dialog, Flex, Text, Button, TextField } from "@radix-ui/themes";
import { useReducer } from "react";

const SettingsModal = ({ settings = {}, onSave = () => null }) => {
  const [value, setValue] = useReducer((prev, next) => ({ ...prev, ...next }), {
    x: settings?.scales?.x?.title?.text,
    y: settings?.scales?.y?.title?.text,
  });

  return (
    <Dialog.Root>
      <Dialog.Trigger>
        <Button>Settings Chart</Button>
      </Dialog.Trigger>

      <Dialog.Content style={{ maxWidth: 450 }}>
        <Dialog.Title>Edit Settings Chart</Dialog.Title>

        <Flex direction="column" gap="3">
          <label>
            <Text as="div" size="2" mb="1" weight="bold">
              X-Axis Label
            </Text>
            <TextField.Input
              defaultValue={settings?.scales?.x?.title?.text}
              placeholder="Enter X Axis Label"
              onChange={(e) => {
                setValue({
                  x: e.target.value,
                });
              }}
            />
          </label>
          <label>
            <Text as="div" size="2" mb="1" weight="bold">
              Y-Axis Label
            </Text>
            <TextField.Input
              defaultValue={settings?.scales?.y?.title?.text}
              placeholder="Enter Y Axis Label"
              onChange={(e) => {
                setValue({
                  y: e.target.value,
                });
              }}
            />
          </label>
        </Flex>

        <Flex gap="3" mt="4" justify="end">
          <Dialog.Close>
            <Button variant="soft" color="gray">
              Cancel
            </Button>
          </Dialog.Close>
          <Dialog.Close>
            <Button
              onClick={() => {
                onSave(value);
              }}
            >
              Save
            </Button>
          </Dialog.Close>
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  );
};

export default SettingsModal;

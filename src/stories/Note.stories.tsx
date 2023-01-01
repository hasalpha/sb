import Note from "./Note";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { Grid } from "@mui/material";

export default {
  title: "Note",
  component: Note,
  decorators: [
    (Story) => (
      <Grid container>
        <Grid item>
          <Story />
        </Grid>
      </Grid>
    ),
  ],
} as ComponentMeta<typeof Note>;

const NoteTemplate: ComponentStory<typeof Note> = (args) => <Note {...args} />;

export const EmptyNote = NoteTemplate.bind({});
EmptyNote.storyName = "I am an Empty Note";
EmptyNote.args = {
  styles: { top: "2px", right: "2px" },
};

export const NoteWithItems = NoteTemplate.bind({});
NoteWithItems.storyName = "This note contains note items";
NoteWithItems.args = {
  ...EmptyNote.args,
  children: (
    <>
      <Note.Item>
        Driver Elmer May has been assigned to a load and needs to be manually
        removed from this bulk optimization list
      </Note.Item>
      <Note.Item>
        L46694 = non-brokerable load that should be added to the optymization
      </Note.Item>
      <Note.Item>L32195 = historically brokered load</Note.Item>
      <Note.Item>
        Sarah James should take the non-brokerable load (L46694)
      </Note.Item>
      <Note.Item>Larry Thompson needs a long-haul load</Note.Item>
    </>
  ),
};

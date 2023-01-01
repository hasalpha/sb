import { Grid } from "@mui/material";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import FancyTag from "./FancyTag";

export default {
  title: "Notify Tag",
  component: FancyTag,
  decorators: [
    (Story) => (
      <Grid container>
        <Grid item>
          <Story />
        </Grid>
      </Grid>
    ),
  ],
} as ComponentMeta<typeof FancyTag>;

const FancyTagTemplate: ComponentStory<typeof FancyTag> = (args) => (
  <FancyTag {...args} />
);

export const EmptyTag = FancyTagTemplate.bind({});
EmptyTag.storyName = "This is an empty tag";
EmptyTag.args = {};

export const TagWithHeading = FancyTagTemplate.bind({});
TagWithHeading.storyName = "This tag contains a heading";
TagWithHeading.args = {
  heading: "86",
  badgeColor: "green",
};

export const TagWithHeadingAndSubHeading = FancyTagTemplate.bind({});
TagWithHeadingAndSubHeading.storyName =
  "This tag contains heading and subheading";
TagWithHeadingAndSubHeading.args = {
  heading: "2000",
  subHeading: "Brokered Loads",
  badgeColor: "green",
};

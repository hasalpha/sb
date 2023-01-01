import { Box, Checkbox, List, ListItemText } from "@mui/material";
import "@fontsource/poppins";
import ListItem from "@mui/material/ListItem";
import {
  Children,
  cloneElement,
  memo,
  ReactNode,
  useCallback,
  useMemo,
  useState,
} from "react";
import { noteStyles, polygonStyles } from "./Note.styles";
import { INoteItemProps, INoteProps } from "./types";

const callAll =
  (...fns: any[]) =>
  (...args: any) =>
    fns?.forEach?.((fn) => fn?.(...args));

const useNoteItem = () => {
  const [checked, setChecked] = useState<boolean>(false);
  const toggleChecked = useCallback(() => {
    setChecked((prevChecked) => !prevChecked);
  }, []);
  const getListItemProps = useCallback(
    ({ onClick, ...props }: Record<string | "onClick", any>) => ({
      checked,
      onClick: callAll(onClick, toggleChecked),
      ...props,
    }),
    [checked, toggleChecked]
  );
  return getListItemProps;
};

const useNote = (children: ReactNode) => {
  const newChildren = useMemo(
    () =>
      Children.map(children, (c, i) => {
        if (c && typeof c === "object" && "type" in c) {
          const labelId: string = `checkbox-list-label-${i}`;
          return cloneElement(c, {
            id: labelId,
            key: labelId,
          });
        }
        return c;
      }),
    [children]
  );

  return newChildren;
};

/**
 * @param {object} [props={}] Pass css properties within the styles object and items as children
 * @returns Note component absolutely positioned within a relative parent
 */
const Note = ({ styles = {}, children }: INoteProps) => {
  const newChildren = useNote(children);
  return (
    <Box sx={{ ...noteStyles, ...styles }}>
      <Box sx={polygonStyles} component="span" />
      <List disablePadding>{newChildren}</List>
    </Box>
  );
};

/**
 * Note.Item component to be used within a Note parent component
 * @param {object} [props={}] These props will be composed by the Note parent component
 * @returns Note.Item component with checkboxes and appropriate styling
 */
const Item = ({ children, id = "", key = "" }: INoteItemProps) => {
  const { checked, ...props } = useNoteItem()({
    onClick: () => {},
    "aria-labelledby": id,
    sx: { "&.Mui-checked": { color: "#00b400" } },
    edge: "start",
  });

  return (
    <ListItem disablePadding key={key}>
      <Checkbox aria-pressed={checked ? "true" : "false"} {...props} />
      <ListItemText
        id={id}
        disableTypography
        sx={{
          fontWeight: "bolder",
          ...(checked && { textDecoration: "line-through" }),
        }}
      >
        {children}
      </ListItemText>
    </ListItem>
  );
};

Note.Item = memo(Item);

export default Note;

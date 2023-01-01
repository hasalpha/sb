import { Box, Typography } from "@mui/material";
import Stack from "@mui/material/Stack";
import React, { ReactNode } from "react";

const defaultStyles = {
	maxWidth: "1389px",
	maxHeight: "218px",
	border: "1px solid #94BBFF",
	borderRadius: "16px",
	paddingBlock: "16px",
	paddingInline: "32px",
};

const stackProps = {
	direction: "row",
	alignItems: "center",
	style: defaultStyles,
	justifyContent: "space-between",
} as const;

interface IFinancialContainerProps {
	children?: [JSX.Element, JSX.Element, JSX.Element];
}

const FinancialContainer = ({
	children = [<></>, <></>, <></>],
}: IFinancialContainerProps) => {
	return <Stack {...stackProps}>{children}</Stack>;
};

const financeBoxStyles = {
	display: "flex",
	flexDirection: "column",
	padding: "16px",
	gap: "16px",
	minWidth: "232px",
	minHeight: "186px",
	maxWidth: "232px",
	maxHeight: "186px",
	borderRadius: "16px",
	overflow: 'hidden'
};

const bgColors = {
	blue: "#ecf3ff",
	red: "#faa19b",
	green: "#a5d7a7"
} as const;

const fgColors = {
	blue: '#2B64CB',
	red: '#C8372C',
	green: '#3B873E',
} as const;

interface IFinanceBoxProps {
	headerText?: string;
	content?: string;
	footerText?: string;
	backgroundColor?: "blue" | "red" | "green";
	children?: ReactNode;
}

const headerStyles = {
	fontFamily: "'Poppins'",
	fontStyle: "normal",
	fontWeight: 500,
	fontSize: "20px",
	lineHeight: "160%",
	letterSpacing: "0.4px",
	flex: "none",
	order: 0,
	flexGrow: 0,
}

const headerProps = {
	sx: headerStyles
}

const composeChildren = (c: ReactNode) => {
	if (typeof c === 'string' || typeof c === 'number') return <Typography {...headerProps}>{c}</Typography>
	return c;
}

const getColorStyles = (c: Exclude<IFinanceBoxProps['backgroundColor'], undefined>) => (
	{ backgroundColor: bgColors[c], color: fgColors[c] }
)

FinancialContainer.FinanceBox = ({
	backgroundColor = "blue",
	children = null,
	headerText = '',
	content = ''
}: IFinanceBoxProps) => {
	const newChildren = composeChildren(children);
	console.log(newChildren);
	return (
		<Box sx={{ ...financeBoxStyles, ...getColorStyles(backgroundColor) }}>
			{newChildren ? newChildren : <Typography {...headerProps}>{headerText}</Typography>}
			<Typography {...headerProps}>{content}</Typography>
		</Box>
	);
};

const FinanceContainer = React.memo(FinancialContainer);
FinanceContainer.displayName = "FinanceBox";
export default FinanceContainer;
export const FinanceBox = FinancialContainer.FinanceBox;

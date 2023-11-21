import { LinkProps, Link as MuiLink } from "@mui/material";
import { Link as ReactRouterLink, To } from "react-router-dom";

export interface ITLinkProps extends Omit<LinkProps, "href"> {
  to: To;
  replace?: boolean;
}

export const TLink = ({ to, replace = false, ...props }: ITLinkProps) => {
	return (
		<MuiLink {...props} replace={replace} component={ReactRouterLink} to={to} />
	);
};

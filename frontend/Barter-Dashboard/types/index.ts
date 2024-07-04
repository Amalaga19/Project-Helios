// This file defines the types and properties for SVG icons used in the project.
import { SVGProps } from "react";

// This type extends the SVGProps for an SVG element to include an optional size property.
export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

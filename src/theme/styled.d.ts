
import "styled-components";
import { Theme } from "./ThemeContext";

declare module "styled-components" {
  export interface DefaultTheme extends Theme {}
}

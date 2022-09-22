import { v4 } from "uuid";
import qs from "qs";
declare module "uuid" {
  v4;
}
declare module "qs" {
  qs;
}

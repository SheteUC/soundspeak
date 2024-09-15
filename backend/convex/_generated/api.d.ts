/* prettier-ignore-start */

/* eslint-disable */
/**
 * Generated `api` utility.
 *
 * THIS CODE IS AUTOMATICALLY GENERATED.
 *
 * To regenerate, run `npx convex dev`.
 * @module
 */

import type {
  ApiFromModules,
  FilterApi,
  FunctionReference,
} from "convex/server";
import type * as mutations_addPatient from "../mutations/addPatient.js";
import type * as mutations_generateSong from "../mutations/generateSong.js";
import type * as queries_getSongStatus from "../queries/getSongStatus.js";
import type * as queries_listPatients from "../queries/listPatients.js";

/**
 * A utility for referencing Convex functions in your app's API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = api.myModule.myFunction;
 * ```
 */
declare const fullApi: ApiFromModules<{
  "mutations/addPatient": typeof mutations_addPatient;
  "mutations/generateSong": typeof mutations_generateSong;
  "queries/getSongStatus": typeof queries_getSongStatus;
  "queries/listPatients": typeof queries_listPatients;
}>;
export declare const api: FilterApi<
  typeof fullApi,
  FunctionReference<any, "public">
>;
export declare const internal: FilterApi<
  typeof fullApi,
  FunctionReference<any, "internal">
>;

/* prettier-ignore-end */

import * as React from "react";
import { toast } from "react-toastify";

export const error = (message: string) =>
    toast.error(<span>{message}</span>);

export const info = (message: string) =>
    toast.info(<span>{message}</span>);

export const warning = (message: string) =>
    toast.warn(<span>{message}</span>);

export const success = (message: string) =>
    toast.success(<span>{message}</span>);
